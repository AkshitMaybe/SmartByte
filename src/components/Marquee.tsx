import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  durationSeconds?: number;
}

export const Marquee = ({ 
  children, 
  className,
  reverse = false,
  pauseOnHover = true,
  durationSeconds = 30,
}: MarqueeProps) => {
  const reducedMotion = useReducedMotion();
  const { lowPerformance } = usePerformanceProfile();
  const shouldReduceAnimation = reducedMotion || lowPerformance;

  if (shouldReduceAnimation) {
    return (
      <div className={cn('flex overflow-x-auto gap-4 py-4 sm:gap-6', className)}>
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
          'flex marquee-content gap-4 sm:gap-6',
          reverse ? 'marquee-reverse' : 'marquee'
        )}
        style={{ 
          animationPlayState: 'running',
          animationDuration: `${durationSeconds}s`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};
