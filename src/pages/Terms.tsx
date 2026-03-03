import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section } from '@/components/Container';
import { pageTransition } from '@/lib/motion';

const Terms = () => (
  <motion.div {...pageTransition}>
    <Helmet>
      <title>Terms of Service - SmartByte Computer Education</title>
    </Helmet>
    <Section>
      <Container size="small">
        <h1 className="text-3xl font-heading font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>Last Updated: March 2026</p>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern enrollment, participation, and use of services
            provided by SmartByte Computer Education (&quot;Institute&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>
          <p>
            By enrolling in any course or using our website, you agree to these Terms.
          </p>

          <h2 className="text-xl font-semibold text-foreground">1. About the Institute</h2>
          <p>SmartByte Computer Education operates computer training institutes across Maharashtra, India.</p>
          <p>
            Registered Address:
            <br />
            101/Blue Pearl CHS
            <br />
            Rambaug 2
            <br />
            Near Manish Wines
            <br />
            Kalyan West - 421301
            <br />
            Maharashtra, India
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Enrollment &amp; Admission</h2>
          <ul>
            <li>Course enrollment is confirmed only upon payment of applicable fees.</li>
            <li>Fees are non-transferable to another individual.</li>
            <li>Students may request batch changes, subject to seat availability.</li>
            <li>Guardian/parent consent is required for students under 18 years of age.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">3. Course Modifications</h2>
          <p>The Institute reserves the right to:</p>
          <ul>
            <li>Change batch timings</li>
            <li>Change trainers/instructors</li>
            <li>Merge batches where necessary</li>
          </ul>
          <p>Courses will not be cancelled due to low enrollment.</p>

          <h2 className="text-xl font-semibold text-foreground">4. Fee Refund Policy</h2>
          <p>Refunds are governed strictly as follows:</p>
          <ul>
            <li>Full refund will be provided if SmartByte fails to start the course due to reasons such as faculty unavailability.</li>
            <li>If a student relocates or cancels before classes begin, 70% of fees will be refunded after deducting non-refundable charges.</li>
            <li>If a student withdraws after the course has begun, refund will be pro-rata based on syllabus covered.</li>
            <li>No refund will be granted after 25% of the course has been completed.</li>
            <li>Admission fees, registration fees, and study material costs are non-refundable under any circumstances.</li>
            <li>Refunds are not granted for batch changes; however, branch transfer may be allowed subject to seat availability.</li>
            <li>Refund requests must be submitted in writing with valid proof (if applicable).</li>
            <li>Approved refunds will be processed within 30 working days via the original payment method.</li>
            <li>Instead of refund, fee adjustment toward another course may be permitted subject to Institute approval.</li>
            <li>Students removed due to misconduct or disciplinary reasons are not eligible for any refund.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">5. Attendance &amp; Rejoining Policy</h2>
          <ul>
            <li>There is no strict minimum attendance requirement.</li>
            <li>Students who remain absent for an extended period without communication may be considered inactive.</li>
            <li>If such students later wish to rejoin, they may be required to pay a rejoining fee as determined by the Institute.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">6. Certification Policy</h2>
          <p>Certificates are issued only when:</p>
          <ul>
            <li>The student has successfully passed the required examination or assessment.</li>
            <li>All course fees have been fully paid.</li>
          </ul>
          <p>Additional certificate conditions:</p>
          <ul>
            <li>Students must appear for the final exam within 10 days of syllabus completion or as per schedule.</li>
            <li>Certificates must be collected within 3 months of issuance.</li>
            <li>After 3 months, the Institute is not responsible for maintaining or reissuing certificates.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">7. Discipline &amp; Conduct</h2>
          <ul>
            <li>Students are expected to maintain professional behavior inside the Institute.</li>
            <li>Any use of abusive language, misconduct, or violation of discipline may result in immediate dismissal.</li>
            <li>No fee refund will be provided in case of disciplinary dismissal.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">8. Intellectual Property</h2>
          <p>
            All course materials, content, curriculum, study materials, branding, and website content are the
            intellectual property of SmartByte Computer Education.
          </p>
          <p>Students may not:</p>
          <ul>
            <li>Copy, reproduce, or distribute study material</li>
            <li>Share course content publicly</li>
            <li>Use Institute branding without permission</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">9. Limitation of Liability</h2>
          <p>SmartByte Computer Education:</p>
          <ul>
            <li>Does not guarantee job placement unless explicitly stated in writing.</li>
            <li>Is not responsible for decisions made by external certification bodies.</li>
            <li>Is not liable for personal belongings lost at the Institute premises.</li>
            <li>Is not responsible for indirect, incidental, or consequential damages arising from course participation.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">10. Force Majeure</h2>
          <p>
            The Institute shall not be liable for delays or disruptions caused by circumstances beyond its reasonable control,
            including but not limited to natural disasters, government restrictions, public health emergencies, or technical failures.
          </p>

          <h2 className="text-xl font-semibold text-foreground">11. Media &amp; Promotional Use</h2>
          <p>
            The Institute may use photographs or videos taken during classes, events, and seminars for promotional purposes.
            Parents or guardians of minors may request removal of specific images.
          </p>

          <h2 className="text-xl font-semibold text-foreground">12. Governing Law &amp; Jurisdiction</h2>
          <p>These Terms shall be governed by the laws of India.</p>
          <p>
            Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of courts located in Maharashtra.
          </p>

          <h2 className="text-xl font-semibold text-foreground">13. Amendments</h2>
          <p>
            The Institute reserves the right to update or modify these Terms at any time.
            Changes will be reflected by updating the &quot;Last Updated&quot; date.
          </p>

          <h2 className="text-xl font-semibold text-foreground">14. Contact Information</h2>
          <p>
            SmartByte Computer Education
            <br />
            101/Blue Pearl CHS
            <br />
            Rambaug 2
            <br />
            Near Manish Wines
            <br />
            Kalyan West - 421301
            <br />
            Maharashtra, India
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

export default Terms;
