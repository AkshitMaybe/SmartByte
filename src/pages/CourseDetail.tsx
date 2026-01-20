import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Clock, IndianRupee, CheckCircle, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { WhatsAppForm } from '@/components/WhatsAppForm';
import { pageTransition, staggerChildren, staggerItem } from '@/lib/motion';
import { getCourseBySlug } from '@/data/courses';

const CourseDetail = () => {
  const { slug } = useParams();
  const course = getCourseBySlug(slug || '');

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{course.name} - SmartByte Computer Education</title>
        <meta name="description" content={course.benefit} />
      </Helmet>

      {/* Hero */}
      <Section className="pt-8">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={staggerChildren} initial="initial" animate="animate">
              <motion.div variants={staggerItem} className="mb-4">
                <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                  {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                </span>
              </motion.div>
              
              <motion.h1 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                {course.name}
              </motion.h1>
              
              <motion.p variants={staggerItem} className="text-lg text-muted-foreground mb-6">
                {course.description}
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-accent" />
                  <span className="font-medium">{course.fees}</span>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex gap-4">
                <Button asChild size="lg" className="btn-shine bg-gradient-to-r from-primary to-primary-glow">
                  <Link to="/locations">
                    Visit Branch <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <WhatsAppForm defaultCourse={course.slug} />
          </div>
        </Container>
      </Section>

      {/* Syllabus */}
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
            {course.syllabus.map((item, i) => (
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

      {/* Levels for Cybersecurity */}
      {course.levels && (
        <Section>
          <Container>
            <SectionHeading title="Program Levels" subtitle="Progress at your own pace" />
            <div className="grid md:grid-cols-3 gap-6">
              {course.levels.map((level, i) => (
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
      )}

      {/* FAQ */}
      <Section>
        <Container size="small">
          <SectionHeading title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="space-y-4">
            {course.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6">
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </motion.div>
  );
};

export default CourseDetail;
