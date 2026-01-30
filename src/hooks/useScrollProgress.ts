import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0);
      return;
    }

    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        setProgress(Math.min(scrollPercent, 1));
        rafId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return progress;
};
