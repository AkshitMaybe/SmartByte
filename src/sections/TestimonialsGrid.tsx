import { TestimonialCard } from '@/components/TestimonialCard';
import { Testimonial } from '@/data/testimonials';

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

const TestimonialsGrid = ({ testimonials }: TestimonialsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
      ))}
    </div>
  );
};

export default TestimonialsGrid;
