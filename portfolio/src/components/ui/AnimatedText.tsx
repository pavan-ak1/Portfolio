import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import type { Variants } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 100,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  const elements = useMemo(() => {
    if (!text) return [];
    return animateBy === 'words' 
      ? text.split(/(\s+)/).filter(s => s.trim().length > 0)
      : text.split('');
  }, [text, animateBy]);

  // Animation variants
  const variants = useMemo<Variants>(() => {
    const baseFrom = {
      opacity: 0,
      filter: 'blur(8px)',
      y: direction === 'top' ? -20 : direction === 'bottom' ? 20 : 0,
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
    };

    return {
      hidden: baseFrom,
      visible: (i: number) => {
        const isLastElement = i === elements.length - 1;
        return {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          x: 0,
          transition: {
            duration: 0.35,
            delay: i * (delay / 1000),
            ease: [0.16, 1, 0.3, 1],
            ...(isLastElement && onAnimationComplete
              ? { onComplete: onAnimationComplete }
              : {}),
          },
        };
      },
    };
  }, [direction, delay, elements.length, onAnimationComplete]);

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

  return (
    <p ref={ref} className={`animated-text ${className} flex flex-wrap`}>
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
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </p>
  );
};

export default AnimatedText;
