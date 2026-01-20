import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { CourseCard } from '@/components/CourseCard';
import { WhatsAppForm } from '@/components/WhatsAppForm';
import { pageTransition } from '@/lib/motion';
import { courses } from '@/data/courses';

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {courses.map((course, index) => (
              <CourseCard key={course.slug} course={course} index={index} />
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <WhatsAppForm />
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Courses;
