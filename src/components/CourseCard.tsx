import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, IndianRupee, ArrowRight, Monitor, Table, Calculator, Shield, Code } from 'lucide-react';
import { Course } from '@/data/courses';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Table,
  Calculator,
  Shield,
  Code,
};

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  gold: 'from-amber-500 to-orange-500',
  green: 'from-emerald-500 to-green-600',
  purple: 'from-purple-500 to-violet-600',
  cyan: 'from-cyan-500 to-blue-500',
};

interface CourseCardProps {
  course: Course;
  index?: number;
}

export const CourseCard = ({ course, index = 0 }: CourseCardProps) => {
  const Icon = iconMap[course.icon] || Monitor;
  const gradientClass = colorClasses[course.color];

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={cardHover}
      className="h-full"
    >
      <Link
        to={`/courses/${course.slug}`}
        className="block h-full"
      >
        <motion.div
          className="glass-card h-full flex flex-col relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: index * 0.1 }}
        >
          {/* Popular badge */}
          {course.popular && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-full">
                Popular
              </span>
            </div>
          )}

          {/* Header with icon */}
          <div className={cn(
            'relative h-28 sm:h-32 w-full bg-gradient-to-br overflow-hidden',
            gradientClass
          )}>
            <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-white/15 float pointer-events-none" />
            <div className="absolute -bottom-12 -right-8 h-28 w-28 rounded-full bg-white/10 float-delayed pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg flex items-center justify-center">
                <Icon className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col h-full p-6">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
            {course.shortName}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
              {course.benefit}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4" />
                {course.fees}
              </span>
            </div>

            {/* CTA */}
            <div className="flex items-center text-primary font-medium group/cta">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/cta:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Hover gradient */}
          <div className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br pointer-events-none',
            gradientClass
          )} />
        </motion.div>
      </Link>
    </motion.div>
  );
};
