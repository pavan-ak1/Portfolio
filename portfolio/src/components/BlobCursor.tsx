"use client";

import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export interface BlobCursorProps {
  blobType?: "circle" | "square";
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

function BlobCursor({
  blobType = "circle",
  fillColor = "#5227FF",
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = "rgba(255,255,255,0.8)",
  opacities = [0.6, 0.6, 0.6],
  shadowColor = "rgba(0,0,0,0.75)",
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = "blob",
  filterStdDeviation = 30,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = "power3.out",
  slowEase = "power1.out",
  zIndex = 100,
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = React.useState(true);
  
  // Initialize blobs array
  useEffect(() => {
    blobsRef.current = blobsRef.current.slice(0, trailCount);
  }, [trailCount]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isVisible) setIsVisible(true);
      
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      // Check if hovering over clickable elements
      const target = (e as MouseEvent).target as HTMLElement;
      const isHovering = target.closest('a, button, [role="button"], [data-clickable]');

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        const scale = isHovering ? 1.5 : 1;
        
        gsap.to(el, {
          x: x - left - (sizes[i] / 2),
          y: y - top - (sizes[i] / 2),
          scale,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase,
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase, sizes]
  );

  useEffect(() => {
    // Initialize GSAP animations
    gsap.set(blobsRef.current, { x: -100, y: -100 });
    
    // Add event listeners
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    
    const onResize = () => updateOffset();
    window.addEventListener("resize", onResize);
    
    // Add hover effect to all clickable elements
    const clickableElements = document.querySelectorAll('a, button, [role="button"], [data-clickable]');
    clickableElements.forEach(el => {
      el.setAttribute('data-clickable', 'true');
    });
    
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("resize", onResize);
    };
  }, [handleMove, updateOffset]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex, opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation={filterStdDeviation}
            />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: useFilter ? `url(#${filterId})` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              if (el) blobsRef.current[i] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === "circle" ? "50%" : "0",
              backgroundColor: fillColor,
              opacity: opacities[i % opacities.length],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`,
              transform: 'translate(-50%, -50%) scale(1)'
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i % innerSizes.length],
                height: innerSizes[i % innerSizes.length],
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: innerColor,
                borderRadius: blobType === "circle" ? "50%" : "0",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlobCursor;
