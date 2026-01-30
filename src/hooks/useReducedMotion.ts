import { useEffect, useState } from 'react';

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

const getDeviceSignals = () => {
  if (typeof window === 'undefined') {
    return {
      prefersReducedMotion: false,
      isMobileLike: false,
      saveData: false,
      lowMemory: false,
    };
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const widthQuery = window.matchMedia('(max-width: 768px)');
  const pointerQuery = window.matchMedia('(pointer: coarse)');
  const hoverQuery = window.matchMedia('(hover: none)');

  const isMobileLike = widthQuery.matches && (pointerQuery.matches || hoverQuery.matches);

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = connection?.saveData === true;

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = typeof deviceMemory === 'number' && deviceMemory <= 4;

  return {
    prefersReducedMotion: motionQuery.matches,
    isMobileLike,
    saveData,
    lowMemory,
  };
};

export const useReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    const signals = getDeviceSignals();
    return signals.prefersReducedMotion || signals.isMobileLike || signals.saveData || signals.lowMemory;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(max-width: 768px)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const hoverQuery = window.matchMedia('(hover: none)');

    const update = () => {
      const signals = getDeviceSignals();
      setReducedMotion(
        signals.prefersReducedMotion ||
        signals.isMobileLike ||
        signals.saveData ||
        signals.lowMemory
      );
    };

    const subscribe = (query: MediaQueryList) => {
      if ('addEventListener' in query) {
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
      }
      const legacyQuery = query as LegacyMediaQueryList;
      legacyQuery.addListener?.(update);
      return () => legacyQuery.removeListener?.(update);
    };

    update();
    const unsubscribers = [
      subscribe(motionQuery),
      subscribe(widthQuery),
      subscribe(pointerQuery),
      subscribe(hoverQuery),
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return reducedMotion;
};
