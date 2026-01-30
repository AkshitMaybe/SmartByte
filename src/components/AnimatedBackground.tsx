import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const AnimatedBackground = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Animated mesh gradient */}
      <div
        className={`absolute inset-0 ${reducedMotion ? '' : 'animated-bg'} opacity-60`}
        style={reducedMotion ? { background: 'var(--gradient-mesh)' } : undefined}
      />
      
      {/* Floating orbs */}
      {!reducedMotion && (
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
      {!reducedMotion && (
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
