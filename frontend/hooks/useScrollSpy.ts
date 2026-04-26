import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollSpy(sectionIds: string[], options: IntersectionObserverInit = {}) {
  const [activeId, setActiveId] = useState<string>('');
  const isManualScroll = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to manually set active section (e.g., on click)
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Lock observer updates
    isManualScroll.current = true;
    setActiveId(id);

    // Clear existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Perform smooth scroll
    const offset = 80; // Navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Unlock after animation (approx 1000ms safe buffer)
    timeoutRef.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isManualScroll.current) return;

      // Find the visible section with the highest intersection ratio
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      
      if (visibleSections.length > 0) {
        // Sort by intersection ratio (most visible wins)
        const bestCandidate = visibleSections.reduce((prev, current) => {
          return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
        });

        if (bestCandidate?.target?.id) {
          setActiveId(bestCandidate.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -35% 0px', // Adjusted to trigger earlier/later appropriately
      threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for granular updates
      ...options,
    });

    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sectionIds, options.rootMargin, options.threshold]);

  return { activeId, scrollToSection };
}
