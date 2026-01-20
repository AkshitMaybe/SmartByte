import { useEffect, useState, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ParallaxState {
  x: number;
  y: number;
}

export const useMouseParallax = (
  ref: RefObject<HTMLElement>,
  intensity: number = 0.05
): ParallaxState => {
  const [position, setPosition] = useState<ParallaxState>({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * intensity;
      const deltaY = (e.clientY - centerY) * intensity;

      rafId = requestAnimationFrame(() => {
        setPosition({ x: deltaX, y: deltaY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref, intensity, reducedMotion]);

  return reducedMotion ? { x: 0, y: 0 } : position;
};

export const useScrollParallax = (speed: number = 0.5): number => {
  const [offset, setOffset] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, reducedMotion]);

  return reducedMotion ? 0 : offset;
};
