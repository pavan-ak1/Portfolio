import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";

export interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
}

// This component will only be rendered on the client side
const ClientSideCursor: React.FC<TargetCursorProps> = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement>>(null);
  const spinTl = useRef<gsap.core.Timeline>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const constants = useMemo(
    () => ({
      borderWidth: 2, // Slightly thinner border
      cornerSize: 14, // Slightly larger corners for better visibility
      parallaxStrength: 0.00005,
      hoverPadding: 16, // Increased padding for better spacing
      animationDuration: 0.3, // Slightly faster animation
    }),
    []
  );

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLDivElement>(
      ".target-cursor-corner"
    );

    let activeTarget: Element | null = null;
    let currentTargetMove: ((ev: Event) => void) | null = null;
    let currentLeaveHandler: (() => void) | null = null;
    let isAnimatingToTarget = false;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (target: Element) => {
      if (currentTargetMove) {
        target.removeEventListener("mousemove", currentTargetMove);
      }
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      
      const mouseX = gsap.getProperty(cursorRef.current, "x") as number;
      const mouseY = gsap.getProperty(cursorRef.current, "y") as number;
      
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget = elementUnderMouse && (
        elementUnderMouse === activeTarget || 
        elementUnderMouse.closest(targetSelector) === activeTarget
      );
      
      if (!isStillOverTarget) {
        if (currentLeaveHandler) {
          currentLeaveHandler();
        }
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Click animation handlers
    const mouseDownHandler = (): void => {
      if (!dotRef.current || !cursorRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = (): void => {
      if (!dotRef.current || !cursorRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as Element;

      const allTargets: Element[] = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement!;
      }

      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;

      if (activeTarget === target) return;

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();

      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mouseX?: number, mouseY?: number) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = cursorRef.current!.getBoundingClientRect();

        // Use the padding constant for consistent spacing
        const padding = constants.hoverPadding;
        
        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(cornersRef.current!);

        const { borderWidth, cornerSize, parallaxStrength } = constants;

        // Adjust positions to be outside the element with padding
        let tlOffset = {
          x: (rect.left - padding) - cursorCenterX - borderWidth,
          y: (rect.top - padding) - cursorCenterY - borderWidth,
        };
        let trOffset = {
          x: (rect.right + padding) - cursorCenterX + borderWidth - cornerSize,
          y: (rect.top - padding) - cursorCenterY - borderWidth,
        };
        let brOffset = {
          x: (rect.right + padding) - cursorCenterX + borderWidth - cornerSize,
          y: (rect.bottom + padding) - cursorCenterY + borderWidth - cornerSize,
        };
        let blOffset = {
          x: (rect.left - padding) - cursorCenterX - borderWidth,
          y: (rect.bottom + padding) - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );
        });
      };

      isAnimatingToTarget = true;
      updateCorners();

      setTimeout(() => {
        isAnimatingToTarget = false;
      }, 1);

      let moveThrottle: number | null = null;
      const targetMove = (ev: Event) => {
        if (moveThrottle || isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev as MouseEvent;
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = () => {
        activeTarget = null;
        isAnimatingToTarget = false;

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);

          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];
          
          // Add a small delay before resetting the cursor position
          // to prevent flickering when moving between elements

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(
              cursorRef.current,
              "rotation"
            ) as number;
            const normalizedRotation = currentRotation % 360;

            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });

            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;
    
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
    }
  }, [spinDuration]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform' }}
    >
      <div 
        ref={dotRef}
        className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3.5 h-3.5 border-2 border-white transform -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0 transition-all duration-300 ease-out" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3.5 h-3.5 border-2 border-white transform translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0 transition-all duration-300 ease-out" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3.5 h-3.5 border-2 border-white transform translate-x-1/2 translate-y-1/2 border-l-0 border-t-0 transition-all duration-300 ease-out" 
        style={{ willChange: 'transform' }}
      />
      <div 
        className="target-cursor-corner absolute left-1/2 top-1/2 w-3.5 h-3.5 border-2 border-white transform -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0 transition-all duration-300 ease-out" 
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

// This is the main component that handles device detection and cursor rendering
const TargetCursor: React.FC<TargetCursorProps> = (props) => {
  const [hasMouse, setHasMouse] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsMounted(true);
    
    // Check if the device has a mouse
    const checkForMouse = () => {
      const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setHasMouse(hasMouse);
    };
    
    // Initial check
    checkForMouse();
    
    // Listen for changes in input type (e.g., when switching between touch and mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handleChange = () => setHasMouse(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Don't render anything on the server, during hydration, or if no mouse is detected
  if (!isMounted || !hasMouse) {
    return null;
  }

  return <ClientSideCursor {...props} />;
};

export default TargetCursor;
