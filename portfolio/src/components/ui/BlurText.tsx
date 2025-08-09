import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;

  easing?: string;
  stepDuration?: number;
  onAnimationComplete?: () => void;
};



const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = "",
  delay = 200,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom = {},
  easing = "easeOut",
  stepDuration = 0.35,
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // Animation variants
  const variants = useMemo(() => {
    const baseFrom = {
      opacity: 0,
      filter: 'blur(8px)',
      y: direction === 'top' ? -20 : direction === 'bottom' ? 20 : 0,
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      ...animationFrom, // Spread the custom animationFrom props
    };

    const baseTo = {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      x: 0,
    };

    // Split text into elements based on animateBy prop
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    
    return {
      hidden: baseFrom,
      visible: (i: number) => ({
        ...baseTo,
        transition: {
          duration: stepDuration,
          delay: i * (delay / 1000),
          ease: easing,
          onComplete: () => {
            if (onAnimationComplete && i === elements.length - 1) {
              onAnimationComplete();
            }
          },
        },
      }),
    } as Variants;
  }, [direction, animationFrom, delay, onAnimationComplete, stepDuration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );  

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const elements = useMemo(() => {
    if (!text) return [];
    return animateBy === 'words' 
      ? text.split(/(\s+)/).filter(s => s.trim().length > 0)
      : text.split('');
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          className="inline-block"
          custom={index}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={variants}
          style={{ whiteSpace: 'pre' }}
        >
          {segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
