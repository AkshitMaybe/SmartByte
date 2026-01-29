import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Award, Users, MapPin, Calendar, Target, Heart } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/Container';
import { StatCard } from '@/components/StatCard';
import { pageTransition, staggerChildren, staggerItem } from '@/lib/motion';
import { site } from '@/data/site';

const About = () => {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>About Us - SmartByte Computer Education</title>
        <meta name="description" content="Learn about SmartByte Computer Education - Maharashtra's trusted computer training center since 2005." />
      </Helmet>

      <Section>
        <Container>
          <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={staggerChildren} initial="initial" animate="animate">
            <motion.div variants={staggerItem} className="trust-badge mb-6 mx-auto">
              <Award className="w-4 h-4" /> {site.trust.govtAuthorized}
            </motion.div>
            <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Empowering Digital <span className="text-gradient-primary">Futures</span>
            </motion.h1>
            <motion.p variants={staggerItem} className="text-lg text-muted-foreground">
              Since 2005, SmartByte Computer Education has been at the forefront of quality computer training 
              in Maharashtra. Our mission is simple: make everyone digitally smart.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <StatCard icon={Calendar} value="2005" label="Established" index={0} />
            <StatCard icon={Users} value="45,000+" label="Students Trained" index={1} variant="accent" />
            <StatCard icon={MapPin} value={site.trust.branches} label="Branches" index={2} />
            <StatCard icon={Award} value="5+" label="Courses" index={3} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-heading font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                What started as a single computer training center in Kalyan has grown into a network of 19 branches 
                across the Mumbai Metropolitan Region. Our founder's vision was clear: bridge the digital divide 
                and empower individuals with practical computer skills.
              </p>
              <p className="text-muted-foreground">
                Today, we offer industry-relevant courses from basic computer literacy (CCC) to advanced programs 
                like Cybersecurity and Python Programming. Our government-authorized certification ensures our 
                students are recognized across India.
              </p>
            </motion.div>
            <motion.div 
              className="glass-card p-8 space-y-6"
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">To provide accessible, quality computer education that transforms lives and careers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">Our Values</h3>
                  <p className="text-sm text-muted-foreground">Student success, practical learning, integrity, and community impact.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default About;
