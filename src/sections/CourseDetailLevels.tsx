import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/Container';

interface CourseLevel {
  level: number;
  name: string;
  fees: string;
  upgradeNote?: string;
  topics: string[];
}

interface CourseDetailLevelsProps {
  levels: CourseLevel[];
}

const CourseDetailLevels = ({ levels }: CourseDetailLevelsProps) => {
  return (
    <Section>
      <Container>
        <SectionHeading title="Program Levels" subtitle="Progress at your own pace" />
        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level, i) => (
            <motion.div
              key={level.level}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-sm text-primary mb-2">Level {level.level}</div>
              <h3 className="text-xl font-heading font-semibold mb-2">{level.name}</h3>
              <p className="text-2xl font-bold text-accent mb-1">{level.fees}</p>
              {level.upgradeNote && (
                <p className="text-sm text-muted-foreground mb-4">{level.upgradeNote}</p>
              )}
              <ul className="space-y-2 text-sm">
                {level.topics.slice(0, 4).map((t, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" /> {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default CourseDetailLevels;
