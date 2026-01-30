import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { MobileDefer } from '@/components/MobileDefer';
import { pageTransition } from '@/lib/motion';
import { testimonials } from '@/data/testimonials';
import { lazy, Suspense } from 'react';

const TestimonialsMarquee = lazy(() => import('@/sections/TestimonialsMarquee'));
const TestimonialsGrid = lazy(() => import('@/sections/TestimonialsGrid'));

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

        <MobileDefer minHeight={260}>
          <Suspense fallback={<div className="min-h-[260px]" />}>
            <TestimonialsMarquee testimonials={testimonials} />
          </Suspense>
        </MobileDefer>

        <Container>
          <MobileDefer minHeight={720}>
            <Suspense fallback={<div className="min-h-[720px]" />}>
              <TestimonialsGrid testimonials={testimonials} />
            </Suspense>
          </MobileDefer>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Testimonials;
