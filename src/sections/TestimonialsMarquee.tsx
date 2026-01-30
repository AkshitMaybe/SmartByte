import { Marquee } from '@/components/Marquee';
import { MarqueeTestimonialCard } from '@/components/TestimonialCard';
import { Testimonial } from '@/data/testimonials';

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
}

const TestimonialsMarquee = ({ testimonials }: TestimonialsMarqueeProps) => {
  return (
    <Marquee className="mb-12">
      {testimonials.slice(0, 6).map((t) => (
        <MarqueeTestimonialCard key={t.id} testimonial={t} />
      ))}
    </Marquee>
  );
};

export default TestimonialsMarquee;
