import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobileLike } from '@/hooks/useIsMobileLike';

interface MobileDeferProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: number;
}

export const MobileDefer = ({
  children,
  className,
  rootMargin = '200px 0px',
  minHeight = 320,
}: MobileDeferProps) => {
  const isMobileLike = useIsMobileLike();
  const [isVisible, setIsVisible] = useState(!isMobileLike);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileLike) {
      setIsVisible(true);
      return;
    }

    const node = hostRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isMobileLike, rootMargin]);

  if (!isMobileLike) {
    return <>{children}</>;
  }

  return (
    <div
      ref={hostRef}
      className={cn('mobile-defer', className)}
      style={{ minHeight }}
    >
      {isVisible ? children : null}
    </div>
  );
};
