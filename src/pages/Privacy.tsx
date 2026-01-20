import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from '@/components/Container';
import { pageTransition } from '@/lib/motion';

const Privacy = () => (
  <motion.div {...pageTransition}>
    <Helmet><title>Privacy Policy - SmartByte Computer Education</title></Helmet>
    <Section>
      <Container size="small">
        <h1 className="text-3xl font-heading font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last updated: January 2025</p>
          <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
          <p>We collect information you provide directly, such as name, contact number, and course preferences when you enquire about our courses.</p>
          <h2 className="text-xl font-semibold text-foreground">How We Use Information</h2>
          <p>Your information is used to respond to enquiries, provide course information, and improve our services.</p>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>For privacy concerns, contact us at info@smartbytecomputers.com</p>
        </div>
      </Container>
    </Section>
  </motion.div>
);

export default Privacy;
