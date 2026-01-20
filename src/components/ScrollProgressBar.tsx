import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export const ScrollProgressBar = () => {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress }}
    />
  );
};
