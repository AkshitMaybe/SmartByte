import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, Section, SectionHeading } from '@/components/Container';
import { cardHover, pageTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { useIsMobileLike } from '@/hooks/useIsMobileLike';
import { branches, getBranchesByCity, getCities, getCityCounts } from '@/data/branches';

const tabs = ['Branches', 'Classes', 'Events', 'Certificates'];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('Branches');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const isMobileLike = useIsMobileLike();
  const cities = getCities();
  const cityCounts = getCityCounts();
  const branchOptions = selectedCity
    ? getBranchesByCity(selectedCity)
    : branches.filter(branch => !branch.isComingSoon);

  useEffect(() => {
    if (activeTab === 'Branches') return;
    setSelectedCity(null);
  }, [activeTab]);

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

          {/* Tabs / Branch Filters */}
          <div className="mb-10 sm:mb-12 space-y-4 sm:space-y-5">
            <motion.div
              className="flex sm:justify-center gap-2 overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background/80 text-muted-foreground hover:text-foreground border border-border'
                  )}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {activeTab === 'Branches' && (
              <motion.div
                className="flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCity(null)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                    selectedCity === null
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background/80 text-muted-foreground hover:text-foreground border border-border'
                  )}
                >
                  All ({branches.filter(branch => !branch.isComingSoon).length})
                </button>
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                      selectedCity === city
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background/80 text-muted-foreground hover:text-foreground border border-border'
                    )}
                  >
                    {city} ({cityCounts[city]})
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Gallery Grid */}
          {activeTab === 'Branches' ? (
            <div className="space-y-8">
              <div className="text-center text-sm text-muted-foreground">
                Select a branch to view photos
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {branchOptions.map((branch, index) => {
                  return (
                    <Link
                      key={branch.slug}
                      to={`/gallery/branches/${branch.slug}`}
                      className="block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                        variants={cardHover}
                        whileHover="hover"
                        whileTap="tap"
                        className={cn(
                          "group text-left rounded-2xl border border-card-border bg-card/60 p-4 transition-all",
                          "hover:border-primary/50 hover:bg-primary/5"
                        )}
                      >
                        <div className="relative h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-xl border border-card-border bg-card/40">
                          <img
                            src="/placeholder.svg"
                            alt={`${branch.displayName} thumbnail`}
                            className="h-full w-full object-cover opacity-70"
                            loading={isMobileLike ? 'lazy' : 'eager'}
                            decoding="async"
                            fetchPriority={isMobileLike ? 'low' : 'auto'}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="mt-4 text-center px-2">
                          <span className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-gradient-primary leading-tight">
                            {branch.displayName}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              <div className="text-center text-muted-foreground py-10">
                Choose a branch to see its photos.
              </div>
            </div>
          ) : (
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
          )}

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
