import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const ScrollProgressBar = () => {
  const reducedMotion = useReducedMotion();
  const progress = useScrollProgress();

  if (reducedMotion) return null;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress }}
    />
  );
};
