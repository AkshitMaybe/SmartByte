import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'small' | 'large';
}

export const Container = ({ children, className, size = 'default' }: ContainerProps) => {
  const sizeClasses = {
    small: 'max-w-5xl',
    default: 'max-w-7xl',
    large: 'max-w-[1600px]',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  );
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      {children}
    </section>
  );
};

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  gradient?: boolean;
}

export const SectionHeading = ({ 
  title, 
  subtitle, 
  className,
  align = 'center',
  gradient = false,
}: SectionHeadingProps) => {
  return (
    <motion.div 
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight',
        gradient ? 'text-gradient-primary' : 'text-foreground'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
