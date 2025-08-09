import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type SplitTextType = 'chars' | 'words' | 'lines' | 'words, chars';

interface SplitTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  delay?: number;
  duration?: number;
  ease?: string | gsap.EaseFunction;
  splitType?: SplitTextType;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  onLetterAnimationComplete?: (index: number, total: number) => void;
  as?: React.ElementType;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  style,
  onAnimationComplete,
  onLetterAnimationComplete,
  as: Component = 'span',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const animationCompletedRef = useRef(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const splitterRef = useRef<GSAPSplitText | null>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || !text) return;

    const el = ref.current;
    
    // Store the context for cleanup
    ctx.current = gsap.context(() => {
      // Revert any previous split text
      if (splitterRef.current) {
        try {
          splitterRef.current.revert();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }

      // Create new split text
      splitterRef.current = new GSAPSplitText(el, {
        type: splitType as any,
        linesClass: 'split-line',
      });

      const splitter = splitterRef.current;
      
      // Get targets based on split type
      let targets: HTMLElement[] = [];
      if (splitType.includes('chars') && splitter.chars) {
        targets = Array.from(splitter.chars) as HTMLElement[];
      } else if (splitType.includes('words') && splitter.words) {
        targets = Array.from(splitter.words) as HTMLElement[];
      } else if (splitType.includes('lines') && splitter.lines) {
        targets = Array.from(splitter.lines) as HTMLElement[];
      }

      if (targets.length === 0) {
        console.warn('No targets found for SplitText animation');
        return;
      }

      // Set initial state
      gsap.set(targets, {
        ...from,
        display: 'inline-block',
        willChange: 'transform, opacity',
      });

      // Create scroll trigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: el,
        start: `top ${100 - (threshold * 100)}%${rootMargin}`,
        onEnter: () => {
          if (animationCompletedRef.current) return;
          
          const tl = gsap.timeline({
            onComplete: () => {
              animationCompletedRef.current = true;
              onAnimationComplete?.();
            },
          });

          // Animate each target
          targets.forEach((target, i) => {
            tl.to(
              target,
              {
                ...to,
                duration,
                ease,
                onComplete: () => {
                  onLetterAnimationComplete?.(i, targets.length);
                },
              },
              i * (delay / 1000)
            );
          });
        },
        once: true,
      });
    }, el);

    // Cleanup
    return () => {
      if (ctx.current) {
        ctx.current.revert();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (splitterRef.current) {
        try {
          splitterRef.current.revert();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [text, splitType, from, to, delay, duration, ease, threshold, rootMargin, onAnimationComplete, onLetterAnimationComplete]);

  return (
    <Component
      ref={ref}
      className={`split-parent ${className}`.trim()}
      style={style}
      {...props}
    >
      {text}
    </Component>
  );
};

export default SplitText;
