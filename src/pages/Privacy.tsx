import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from '@/components/Container';
import { pageTransition } from '@/lib/motion';

const Privacy = () => (
  <motion.div {...pageTransition}>
    <Helmet>
      <title>Privacy Policy - SmartByte Computer Education</title>
    </Helmet>
    <Section>
      <Container size="small">
        <h1 className="text-3xl font-heading font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            Last Updated: March 2026
          </p>
          <p>
            SmartByte Computer Education (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values
            your privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard information
            when you visit our website or communicate with us.
          </p>
          <p>
            By accessing or using our website, you agree to the terms outlined in this Privacy Policy.
          </p>

          <h2 className="text-xl font-semibold text-foreground">1. About Us</h2>
          <p>
            SmartByte Computer Education operates computer training institutes across Maharashtra, India.
            Our website provides information about our courses, branches, seminars, events, and certifications.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
          <p>
            Our website is static and does not collect, store, or process personal information directly
            through online forms or databases.
          </p>
          <p>
            We may receive personal information only when you voluntarily:
          </p>
          <ul>
            <li>Contact us via WhatsApp</li>
            <li>Call our branch phone numbers</li>
            <li>Visit our branches and provide information offline</li>
          </ul>
          <p>
            The information you may provide includes:
          </p>
          <ul>
            <li>Name</li>
            <li>Phone number</li>
            <li>Course preferences</li>
            <li>Preferred branch</li>
            <li>Any additional details you choose to share</li>
          </ul>
          <p>
            We do not collect sensitive personal information through this website.
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. How We Collect Information</h2>
          <p>
            Information is collected only when you voluntarily initiate communication with us through:
          </p>
          <ul>
            <li>WhatsApp messaging</li>
            <li>Telephone calls</li>
            <li>In-person enquiries at our branches</li>
          </ul>
          <p>
            The website itself does not use data collection forms or account systems.
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. How We Use Your Information</h2>
          <p>
            We use the information you provide solely to:
          </p>
          <ul>
            <li>Respond to your enquiries</li>
            <li>Provide details about courses and programs</li>
            <li>Contact you regarding admissions</li>
            <li>Provide branch-related information</li>
          </ul>
          <p>
            We do not send unsolicited promotional communications.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Sharing of Information</h2>
          <p>
            We do not:
          </p>
          <ul>
            <li>Sell personal information</li>
            <li>Rent or trade contact details</li>
            <li>Share personal information with third parties for marketing purposes</li>
          </ul>
          <p>
            Information may be disclosed only if required by applicable law or legal process.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Cookies and Tracking Technologies</h2>
          <p>
            Our website does not use analytics tools, advertising pixels, or behavioral tracking systems.
          </p>
          <p>
            Basic technical information, such as browser type or IP address, may be automatically processed
            by your internet service provider or hosting provider for standard website functionality.
            We do not use this information for profiling or marketing purposes.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Student Media and Photographs</h2>
          <p>
            Our website may display photographs and media from:
          </p>
          <ul>
            <li>Branch activities</li>
            <li>Events and seminars</li>
            <li>Certificate ceremonies</li>
          </ul>
          <p>
            These images are used for informational and promotional purposes.
          </p>
          <p>
            For students under 18 years of age:
          </p>
          <ul>
            <li>Participation in institute activities may involve photography.</li>
            <li>Parents or guardians may request removal of specific images by contacting us.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">8. Data Storage and Security</h2>
          <p>
            As our website is static:
          </p>
          <ul>
            <li>No personal data is stored on the website server.</li>
            <li>Information shared via WhatsApp remains within our official communication channels.</li>
            <li>Offline admission records are maintained securely at respective branches.</li>
          </ul>
          <p>
            We take reasonable administrative and organizational measures to protect information shared with us.
          </p>

          <h2 className="text-xl font-semibold text-foreground">9. Children&apos;s Privacy</h2>
          <p>
            We provide educational services to both adults and minors.
          </p>
          <p>
            We do not knowingly collect personal information from children through the website itself.
            Any information shared is voluntarily provided through parents, guardians, or direct communication.
          </p>
          <p>
            Parents or guardians may contact us regarding privacy-related concerns.
          </p>

          <h2 className="text-xl font-semibold text-foreground">10. Your Rights</h2>
          <p>
            You may:
          </p>
          <ul>
            <li>Request correction of your information</li>
            <li>Request deletion of your contact details</li>
            <li>Request removal of photographs (if applicable)</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the details provided below.
          </p>

          <h2 className="text-xl font-semibold text-foreground">11. Jurisdiction</h2>
          <p>
            This Privacy Policy is governed by the laws of India. Any disputes arising under this policy
            shall be subject to the jurisdiction of the courts located in Maharashtra.
          </p>

          <h2 className="text-xl font-semibold text-foreground">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be reflected by revising
            the &quot;Last Updated&quot; date at the top of this page.
          </p>

          <h2 className="text-xl font-semibold text-foreground">13. Contact Us</h2>
          <p>
            For any questions regarding this Privacy Policy, please contact:
          </p>
          <p>
            SmartByte Computer Education
            <br />
            Email: contact@smartbytecomputers.com
            <br />
            Phone: +91 7304006693
          </p>
        </div>
      </Container>
    </Section>
  </motion.div>
);

export default Privacy;
