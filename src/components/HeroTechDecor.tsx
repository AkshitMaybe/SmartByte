import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobileLike } from '@/hooks/useIsMobileLike';
import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

interface TechBadge {
  icon: string;
  label: string;
  positionClass: string;
  mobileHidden?: boolean;
  duration: number;
  delay: number;
}

const TECH_BADGES: TechBadge[] = [
  {
    icon: 'python.svg',
    label: 'Python',
    positionClass: 'left-4 top-20 md:left-10 lg:left-16',
    duration: 9.5,
    delay: 0,
  },
  {
    icon: 'windows.svg',
    label: 'Windows',
    positionClass: 'right-4 top-24 md:right-12 lg:right-20',
    duration: 10.5,
    delay: 0.4,
  },
  {
    icon: 'html5.svg',
    label: 'Web',
    positionClass: 'left-2 top-[46%] md:left-8 lg:left-12',
    duration: 8.8,
    delay: 0.8,
    mobileHidden: true,
  },
  {
    icon: 'javascript.svg',
    label: 'JavaScript',
    positionClass: 'right-1 top-[45%] md:right-8 lg:right-16',
    duration: 9.8,
    delay: 1.2,
    mobileHidden: true,
  },
  {
    icon: 'mysql.svg',
    label: 'Database',
    positionClass: 'bottom-20 left-14 md:left-24 lg:left-36',
    duration: 11,
    delay: 0.6,
    mobileHidden: true,
  },
  {
    icon: 'react.svg',
    label: 'Projects',
    positionClass: 'bottom-20 right-14 md:right-24 lg:right-36',
    duration: 10.8,
    delay: 1,
    mobileHidden: true,
  },
  {
    icon: 'linux.svg',
    label: 'Linux',
    positionClass: 'bottom-28 left-[44%]',
    duration: 10.2,
    delay: 1.4,
    mobileHidden: true,
  },
];

export const HeroTechDecor = () => {
  const reducedMotion = useReducedMotion();
  const isMobileLike = useIsMobileLike();
  const { lowPerformance, ultraLowPerformance } = usePerformanceProfile();
  const shouldAnimate = !reducedMotion && !isMobileLike && !lowPerformance;
  const baseUrl = import.meta.env.BASE_URL;
  const visibleBadges = ultraLowPerformance ? TECH_BADGES.filter((badge) => !badge.mobileHidden).slice(0, 3) : TECH_BADGES;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(hsl(221 83% 53% / 0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(221 83% 53% / 0.16) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage:
            'radial-gradient(circle at center, black 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 20%, transparent 75%)',
        }}
      />

      {!ultraLowPerformance && (
        <>
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
          <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/12" />
        </>
      )}

      {visibleBadges.map((badge) => {
        const badgeContent = (
          <div className="flex items-center gap-2 rounded-2xl border border-primary/35 bg-background/65 px-3 py-2 backdrop-blur-md shadow-[0_12px_30px_hsl(222_60%_3%_/_0.35)]">
            <img
              src={`${baseUrl}tech-icons/${badge.icon}`}
              alt={badge.label}
              className="h-5 w-5 rounded-sm object-contain"
              loading="lazy"
              decoding="async"
            />
            <span className="text-xs font-medium text-foreground/90">{badge.label}</span>
          </div>
        );

        const className = cn(
          'absolute',
          badge.positionClass,
          badge.mobileHidden && 'hidden md:block'
        );

        if (!shouldAnimate) {
          return (
            <div key={badge.label} className={className}>
              {badgeContent}
            </div>
          );
        }

        return (
          <motion.div
            key={badge.label}
            className={className}
            animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
            transition={{
              duration: badge.duration,
              delay: badge.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {badgeContent}
          </motion.div>
        );
      })}
    </div>
  );
};
