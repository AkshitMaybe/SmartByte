import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export const Marquee = ({ 
  children, 
  className,
  reverse = false,
  pauseOnHover = true 
}: MarqueeProps) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={cn('flex overflow-x-auto gap-6 py-4', className)}>
        {children}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'flex overflow-hidden',
        pauseOnHover && '[&:hover_.marquee-content]:animation-play-state-paused',
        className
      )}
    >
      <div 
        className={cn(
          'flex marquee-content',
          reverse ? 'marquee-reverse' : 'marquee'
        )}
        style={{ 
          animationPlayState: 'running',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
