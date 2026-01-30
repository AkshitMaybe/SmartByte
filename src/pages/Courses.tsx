import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { MobileDefer } from '@/components/MobileDefer';
import { pageTransition } from '@/lib/motion';
import { lazy, Suspense } from 'react';

const CoursesGrid = lazy(() => import('@/sections/CoursesGrid'));
const WhatsAppForm = lazy(() => import('@/components/WhatsAppForm'));

const Courses = () => {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Courses - SmartByte Computer Education</title>
        <meta name="description" content="Explore our computer courses: CCC, Tally, Advanced Excel, Cybersecurity, Python. Job-ready programs with certification." />
      </Helmet>

      <Section>
        <Container>
          <SectionHeading
            title="Our Courses"
            subtitle="Industry-relevant programs designed to make you job-ready"
            gradient
          />
          
          <Suspense fallback={<div className="min-h-[520px]" />}>
            <CoursesGrid />
          </Suspense>

          <MobileDefer minHeight={480}>
            <div className="max-w-xl mx-auto">
              <Suspense fallback={<div className="h-[480px]" />}>
                <WhatsAppForm />
              </Suspense>
            </div>
          </MobileDefer>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Courses;
