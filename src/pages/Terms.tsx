import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from '@/components/Container';
import { pageTransition } from '@/lib/motion';

const Terms = () => (
  <motion.div {...pageTransition}>
    <Helmet><title>Terms of Service - SmartByte Computer Education</title></Helmet>
    <Section>
      <Container size="small">
        <h1 className="text-3xl font-heading font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last updated: January 2025</p>
          <h2 className="text-xl font-semibold text-foreground">Enrollment</h2>
          <p>Course enrollment is confirmed upon payment of fees. Course schedules may vary by branch.</p>
          <h2 className="text-xl font-semibold text-foreground">Refund Policy</h2>
          <p>Refunds are processed as per institute policy. Contact your branch for details.</p>
          <h2 className="text-xl font-semibold text-foreground">Certification</h2>
          <p>Certificates are issued upon successful completion of courses and required assessments.</p>
        </div>
      </Container>
    </Section>
  </motion.div>
);

export default Terms;
