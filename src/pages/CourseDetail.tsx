import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { MobileDefer } from '@/components/MobileDefer';
import { pageTransition, staggerChildren, staggerItem } from '@/lib/motion';
import { getCourseBySlug } from '@/data/courses';
import { lazy, Suspense } from 'react';

const WhatsAppForm = lazy(() => import('@/components/WhatsAppForm'));
const CourseDetailSyllabus = lazy(() => import('@/sections/CourseDetailSyllabus'));
const CourseDetailLevels = lazy(() => import('@/sections/CourseDetailLevels'));
const CourseDetailFaq = lazy(() => import('@/sections/CourseDetailFaq'));

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

            <MobileDefer minHeight={480}>
              <Suspense fallback={<div className="h-[480px]" />}>
                <WhatsAppForm defaultCourse={course.slug} />
              </Suspense>
            </MobileDefer>
          </div>
        </Container>
      </Section>

      {/* Syllabus */}
      <MobileDefer minHeight={560}>
        <Suspense fallback={<div className="min-h-[560px] bg-card/30" />}>
          <CourseDetailSyllabus syllabus={course.syllabus} />
        </Suspense>
      </MobileDefer>

      {/* Levels for Cybersecurity */}
      {course.levels && (
        <MobileDefer minHeight={520}>
          <Suspense fallback={<div className="min-h-[520px]" />}>
            <CourseDetailLevels levels={course.levels} />
          </Suspense>
        </MobileDefer>
      )}

      {/* FAQ */}
      <MobileDefer minHeight={520}>
        <Suspense fallback={<div className="min-h-[520px]" />}>
          <CourseDetailFaq faq={course.faq} />
        </Suspense>
      </MobileDefer>
    </motion.div>
  );
};

export default CourseDetail;
