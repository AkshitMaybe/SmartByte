import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { TestimonialCard, MarqueeTestimonialCard } from '@/components/TestimonialCard';
import { Marquee } from '@/components/Marquee';
import { pageTransition } from '@/lib/motion';
import { testimonials } from '@/data/testimonials';

const Testimonials = () => {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Student Reviews - SmartByte Computer Education</title>
        <meta name="description" content="Read reviews from 45,000+ students trained at SmartByte Computer Education." />
      </Helmet>

      <Section className="pt-8">
        <Container>
          <SectionHeading
            title="Student Reviews"
            subtitle="Hear from our 45,000+ successful learners"
            gradient
          />
        </Container>

        <Marquee className="mb-12">
          {testimonials.slice(0, 6).map((t) => (
            <MarqueeTestimonialCard key={t.id} testimonial={t} />
          ))}
        </Marquee>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Testimonials;
