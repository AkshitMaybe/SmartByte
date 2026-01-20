import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Testimonial } from '@/data/testimonials';
import { cardHover } from '@/lib/motion';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export const TestimonialCard = ({ testimonial, index = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className="h-full"
    >
      <motion.div
        className="glass-card p-6 h-full flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar with initials */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
            <span className="font-heading font-semibold text-primary-foreground">
              {testimonial.initials}
            </span>
          </div>
          <div className="flex-grow">
            <h4 className="font-heading font-semibold text-foreground">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.course} • {testimonial.branch}
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>

        {/* Review */}
        <p className="text-muted-foreground flex-grow leading-relaxed">
          "{testimonial.review}"
        </p>

        {/* Date */}
        <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
          {new Date(testimonial.date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
          })}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Marquee testimonial for continuous scroll
export const MarqueeTestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="glass-card p-4 w-80 flex-shrink-0 mx-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
          <span className="text-sm font-semibold text-primary-foreground">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground">{testimonial.name}</h4>
          <p className="text-xs text-muted-foreground">{testimonial.course}</p>
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < testimonial.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-3">
        "{testimonial.review}"
      </p>
    </div>
  );
};
