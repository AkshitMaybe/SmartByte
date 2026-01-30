import { Container, Section, SectionHeading } from '@/components/Container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

interface CourseDetailFaqProps {
  faq: FaqItem[];
}

const CourseDetailFaq = ({ faq }: CourseDetailFaqProps) => {
  return (
    <Section>
      <Container size="small">
        <SectionHeading title="Frequently Asked Questions" />
        <Accordion type="single" collapsible className="space-y-4">
          {faq.map((item, i) => (
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
  );
};

export default CourseDetailFaq;
