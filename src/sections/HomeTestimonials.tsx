import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { MarqueeTestimonialCard } from '@/components/TestimonialCard';
import { Marquee } from '@/components/Marquee';
import { testimonials } from '@/data/testimonials';

const HomeTestimonials = () => {
  return (
    <Section>
      <Container>
        <SectionHeading title="What Students Say" subtitle="Join 45,000+ successful learners" />
      </Container>
      <Marquee className="py-4">
        {testimonials.map((t) => (
          <MarqueeTestimonialCard key={t.id} testimonial={t} />
        ))}
      </Marquee>
      <Container className="text-center mt-8">
        <Button asChild variant="outline">
          <Link to="/testimonials">Read All Reviews <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </Container>
    </Section>
  );
};

export default HomeTestimonials;
