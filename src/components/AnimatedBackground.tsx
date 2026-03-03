import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';

export const AnimatedBackground = () => {
  const reducedMotion = useReducedMotion();
  const { lowPerformance, ultraLowPerformance } = usePerformanceProfile();
  const shouldReduceEffects = reducedMotion || lowPerformance;
  const shouldDisableFloatingOrbs = shouldReduceEffects || ultraLowPerformance;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Animated mesh gradient */}
      <div
        className={`absolute inset-0 ${shouldReduceEffects ? '' : 'animated-bg'} opacity-60`}
        style={shouldReduceEffects ? { background: 'var(--gradient-mesh)' } : undefined}
      />

      {/* Tech grid overlay */}
      {!ultraLowPerformance && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(hsl(221 83% 53% / 0.12) 1px, transparent 1px), linear-gradient(90deg, hsl(221 83% 53% / 0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(circle at center, black 24%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 24%, transparent 78%)',
          }}
        />
      )}
      
      {/* Floating orbs */}
      {!shouldDisableFloatingOrbs && (
        <>
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(221 83% 53% / 0.4) 0%, transparent 70%)',
              top: '10%',
              left: '10%',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, hsl(38 92% 50% / 0.3) 0%, transparent 70%)',
              bottom: '20%',
              right: '10%',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
            style={{
              background: 'radial-gradient(circle, hsl(245 80% 60% / 0.3) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}
      
      {/* Noise overlay */}
      {!shouldReduceEffects && (
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </div>
  );
};
