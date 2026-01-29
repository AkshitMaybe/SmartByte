import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Award, Users, MapPin, Calendar, GraduationCap, Sparkles, CheckCircle } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { StatCard } from '@/components/StatCard';
import { MarqueeTestimonialCard } from '@/components/TestimonialCard';
import { Marquee } from '@/components/Marquee';
import { WhatsAppForm } from '@/components/WhatsAppForm';
import { useMouseParallax } from '@/hooks/useParallax';
import { pageTransition, staggerChildren, staggerItem } from '@/lib/motion';
import { site } from '@/data/site';
import { courses } from '@/data/courses';
import { testimonials } from '@/data/testimonials';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallax = useMouseParallax(heroRef, 0.02);

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{site.seo.defaultTitle}</title>
        <meta name="description" content={site.seo.defaultDescription} />
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Container className="relative z-10 py-20">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {/* Trust badge */}
            <motion.div variants={staggerItem} className="mb-6">
              <span className="trust-badge">
                <Award className="w-4 h-4" />
                {site.trust.govtAuthorized}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6"
            >
              <span className="text-foreground">Chalo</span>{' '}
              <span className="text-gradient-primary">Digitally Smart</span>{' '}
              <span className="text-foreground">Bane</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Maharashtra's trusted computer education center. Learn CCC, Tally, Excel, 
              Cybersecurity & Python from industry experts.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-shine bg-gradient-to-r from-primary to-primary-glow text-lg h-14 px-8">
                <Link to="/courses">
                  Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8">
                <Link to="/locations">
                  <MapPin className="mr-2 w-5 h-5" /> Visit Branch
                </Link>
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={staggerItem}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <StatCard icon={Calendar} value={site.trust.since.replace('Since ', '')} label="Established" index={0} />
              <StatCard icon={Users} value={site.trust.students} label={site.trust.studentsLabel} index={1} variant="accent" />
              <StatCard icon={MapPin} value={site.trust.branches} label={site.trust.branchesLabel} index={2} />
              <StatCard icon={GraduationCap} value="5+" label="Popular Courses" index={3} />
            </motion.div>
          </motion.div>

          {/* Floating elements with parallax */}
          <motion.div
            className="absolute top-20 left-10 hidden lg:block pointer-events-none -z-10"
            style={{ x: parallax.x * 2, y: parallax.y * 2 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur float" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-20 hidden lg:block pointer-events-none -z-10"
            style={{ x: parallax.x * -1.5, y: parallax.y * -1.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-accent/20 backdrop-blur float-delayed" />
          </motion.div>
        </Container>
      </section>

      {/* Featured Courses */}
      <Section>
        <Container>
          <SectionHeading
            title="Our Popular Courses"
            subtitle="Industry-relevant programs designed to make you job-ready"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course, index) => (
              <CourseCard key={course.slug} course={course} index={index} />
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/courses">View All Courses <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </Container>
      </Section>

      {/* Why SmartByte */}
      <Section className="bg-card/30">
        <Container>
          <SectionHeading
            title="Why Choose SmartByte?"
            subtitle="Your success is our mission"
            gradient
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Award, title: "Govt. Authorized", desc: "Recognized training center with certified courses" },
              { icon: Users, title: "Expert Faculty", desc: "Learn from industry professionals with real experience" },
              { icon: Sparkles, title: "Practical Training", desc: "Hands-on learning with real projects and case studies" },
              { icon: MapPin, title: `${site.trust.branches} Branches`, desc: "Convenient locations across Mumbai Metropolitan Region" },
              { icon: GraduationCap, title: "Job Assistance", desc: "Placement support and career guidance" },
              { icon: CheckCircle, title: "Flexible Timings", desc: "Morning to evening batches to suit your schedule" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials Marquee */}
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

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <Container size="small">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Start Your <span className="text-gradient-primary">Digital Journey</span>?
              </h2>
              <p className="text-muted-foreground mb-6">
                Enquire now and get a free counseling session. Our team will help you 
                choose the right course for your goals.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Free Counseling</span>
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Flexible EMI</span>
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Certificate</span>
              </div>
            </motion.div>
            <WhatsAppForm />
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Index;
