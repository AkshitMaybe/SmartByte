import { useEffect, useState } from 'react';

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

const getIsMobileLike = () => {
  if (typeof window === 'undefined') return false;

  const widthQuery = window.matchMedia('(max-width: 768px)');
  const pointerQuery = window.matchMedia('(pointer: coarse)');
  const hoverQuery = window.matchMedia('(hover: none)');

  return widthQuery.matches && (pointerQuery.matches || hoverQuery.matches);
};

export const useIsMobileLike = (): boolean => {
  const [isMobileLike, setIsMobileLike] = useState(getIsMobileLike);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const widthQuery = window.matchMedia('(max-width: 768px)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const hoverQuery = window.matchMedia('(hover: none)');

    const update = () => setIsMobileLike(getIsMobileLike());

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
      subscribe(widthQuery),
      subscribe(pointerQuery),
      subscribe(hoverQuery),
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return isMobileLike;
};
