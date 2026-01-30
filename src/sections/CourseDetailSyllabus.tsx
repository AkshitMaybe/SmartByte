import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/Container';
import { staggerChildren, staggerItem } from '@/lib/motion';

interface CourseDetailSyllabusProps {
  syllabus: string[];
}

const CourseDetailSyllabus = ({ syllabus }: CourseDetailSyllabusProps) => {
  return (
    <Section className="bg-card/30">
      <Container>
        <SectionHeading title="What You'll Learn" align="left" />
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {syllabus.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex items-start gap-3 p-4 glass-card"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default CourseDetailSyllabus;
