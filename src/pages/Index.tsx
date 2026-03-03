import { lazy, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Award,
  Users,
  MapPin,
  Calendar,
  GraduationCap,
  Sparkles,
  CheckCircle,
  MessageSquareText,
  PhoneCall,
  Star,
} from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { MobileDefer } from '@/components/MobileDefer';
import { useIsMobileLike } from '@/hooks/useIsMobileLike';
import { pageTransition, staggerChildren, staggerItem } from '@/lib/motion';
import { site } from '@/data/site';
import { courses } from '@/data/courses';
import { HeroTechDecor } from '@/components/HeroTechDecor';

const HomeTestimonials = lazy(() => import('@/sections/HomeTestimonials'));
const WhatsAppForm = lazy(() =>
  import('@/components/WhatsAppForm').then((module) => ({ default: module.WhatsAppForm }))
);
const HomeCoursesGrid = lazy(() => import('@/sections/HomeCoursesGrid'));

const Index = () => {
  const isMobileLike = useIsMobileLike();
  const baseUrl = import.meta.env.BASE_URL;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.seo.domain}/#organization`,
        name: site.name,
        url: site.seo.domain,
        logo: `${site.seo.domain}${baseUrl}brand/shortlogo.png`,
        email: "contact@smartbytecomputers.com",
        telephone: "+91 7304006693",
        sameAs: [site.social.instagram],
      },
      {
        "@type": "ItemList",
        name: "Popular Computer Courses",
        itemListElement: courses.map((course, index) => ({
          "@type": "Course",
          position: index + 1,
          name: course.name,
          description: course.description,
          provider: {
            "@type": "Organization",
            name: site.name,
          },
        })),
      },
    ],
  };

  useEffect(() => {
    if (!isMobileLike) {
      void import('@/sections/HomeTestimonials');
      void import('@/components/WhatsAppForm');
      void import('@/sections/HomeCoursesGrid');
    }
  }, [isMobileLike]);

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{site.seo.defaultTitle}</title>
        <meta name="description" content={site.seo.defaultDescription} />
        <meta property="og:title" content={site.seo.defaultTitle} />
        <meta property="og:description" content={site.seo.defaultDescription} />
        <meta property="og:image" content={`${baseUrl}brand/shortlogo.png`} />
        <meta property="og:url" content={site.seo.domain} />
        <meta name="twitter:title" content={site.seo.defaultTitle} />
        <meta name="twitter:description" content={site.seo.defaultDescription} />
        <meta name="twitter:image" content={`${baseUrl}brand/shortlogo.png`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HeroTechDecor />
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.3] mb-6"
            >
              <span className="text-foreground">Smart Logon Ki </span>
              <span className="text-gradient-primary">Smart Choice</span>
              <span className="text-foreground"> Only SmartByte</span>
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
        </Container>
      </section>

      {/* Quick Enquiry Strip */}
      <Section className="py-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card grid gap-4 rounded-3xl border-2 border-primary/55 bg-card/80 p-5 md:grid-cols-[1.4fr_auto_auto_auto] md:items-center"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-primary">Fast Support</p>
              <h2 className="mt-1 text-xl font-heading font-bold text-foreground">Get Course Guidance in 15 Minutes</h2>
              <p className="mt-1 text-sm text-muted-foreground">Call, WhatsApp, or visit your nearest SmartByte branch.</p>
            </div>
            <a
              href={`tel:${site.whatsappHO}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/45 bg-black/70 px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/80"
            >
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${site.whatsappHO.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi SmartByte, please guide me for the right course.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/45 bg-black/70 px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/80"
            >
              <MessageSquareText className="h-4 w-4" />
              WhatsApp
            </a>
            <Button asChild className="h-11 rounded-full bg-gradient-to-r from-primary to-primary-glow">
              <Link to="/locations">Nearest Branch</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>

      {/* Featured Courses */}
      <Section className="tech-surface-subtle rounded-3xl">
        <Container>
          <SectionHeading
            title="Our Popular Courses"
            subtitle="Industry-relevant programs designed to make you job-ready"
          />
          <MobileDefer minHeight={520}>
            <Suspense fallback={<div className="min-h-[520px]" />}>
              <HomeCoursesGrid />
            </Suspense>
          </MobileDefer>
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
      <Section className="tech-surface-subtle rounded-3xl">
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

      {/* Credibility Strip */}
      <Section className="py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-4 md:grid-cols-3"
          >
            {[
              {
                title: "Rated by Learners",
                text: "Thousands of students have trained with SmartByte since 2005.",
                icon: Star,
              },
              {
                title: "Job-Oriented Syllabus",
                text: "Courses are practical-first with lab-based learning and guided projects.",
                icon: GraduationCap,
              },
              {
                title: "Nearby Branch Access",
                text: "Study at your nearest branch with flexible morning-to-evening batches.",
                icon: MapPin,
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl border-2 border-primary/40 bg-card/75 p-5">
                <item.icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="text-lg font-heading font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials Marquee */}
      <MobileDefer minHeight={420}>
        <Suspense fallback={<div className="py-16 md:py-24" />}>
          <HomeTestimonials />
        </Suspense>
      </MobileDefer>

      {/* CTA Section */}
      <Section className="rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10">
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
            <MobileDefer minHeight={480}>
              <Suspense fallback={<div className="h-[480px]" />}>
                <WhatsAppForm />
              </Suspense>
            </MobileDefer>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Index;
