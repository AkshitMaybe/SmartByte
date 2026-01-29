import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  index?: number;
  variant?: 'default' | 'accent';
}

export const StatCard = ({ icon: Icon, value, label, index = 0, variant = 'default' }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();

  const { target, suffix, useGrouping } = useMemo(() => {
    const trimmed = value.trim();
    const numeric = Number(trimmed.replace(/[^0-9]/g, ''));
    return {
      target: Number.isFinite(numeric) ? numeric : 0,
      suffix: trimmed.endsWith('+') ? '+' : '',
      useGrouping: trimmed.includes(','),
    };
  }, [value]);

  const [count, setCount] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (reducedMotion) {
      setCount(target);
    }
  }, [reducedMotion, target]);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    let rafId = 0;
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const next = Math.floor(progress * target);
      setCount(next);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, reducedMotion, target]);

  const formattedValue = useGrouping ? count.toLocaleString('en-US') : String(count);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'glass-card p-6 text-center',
        variant === 'accent' && 'border-accent/30 bg-accent/5'
      )}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className={cn(
          'w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center',
          variant === 'accent' 
            ? 'bg-accent/20' 
            : 'bg-primary/10'
        )}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Icon className={cn(
          'w-7 h-7',
          variant === 'accent' ? 'text-accent' : 'text-primary'
        )} />
      </motion.div>
      <motion.p
        className={cn(
          'text-3xl md:text-4xl font-heading font-bold mb-1',
          variant === 'accent' ? 'text-gradient-gold' : 'text-foreground'
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        {formattedValue}
        {suffix}
      </motion.p>
      <p className="text-muted-foreground text-sm">{label}</p>
    </motion.div>
  );
};
