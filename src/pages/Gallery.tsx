import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { pageTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';

const tabs = ['Branches', 'Classes', 'Events', 'Certificates'];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('Branches');

  // Placeholder images
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    category: tabs[i % 4],
    placeholder: true,
  }));

  const filteredImages = images.filter(img => img.category === activeTab);

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Gallery - SmartByte Computer Education</title>
        <meta name="description" content="View photos of SmartByte branches, classes, events, and student achievements." />
      </Helmet>

      <Section>
        <Container>
          <SectionHeading
            title="Our Gallery"
            subtitle="A glimpse into life at SmartByte"
            gradient
          />

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-medium transition-all',
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  className="aspect-video glass-card overflow-hidden flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-muted-foreground text-sm">
                    {activeTab} Photo {index + 1}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredImages.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Photos coming soon!
            </p>
          )}
        </Container>
      </Section>
    </motion.div>
  );
};

export default Gallery;
