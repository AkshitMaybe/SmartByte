import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { MobileDefer } from '@/components/MobileDefer';
import { pageTransition } from '@/lib/motion';
import { branches, getCities, getCityCounts, getBranchesByCity } from '@/data/branches';
import { lazy, Suspense } from 'react';

const LocationsGrid = lazy(() => import('@/sections/LocationsGrid'));

const Locations = () => {
  const cities = getCities();
  const cityCounts = getCityCounts();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const activeBranches = branches.filter(b => !b.isComingSoon);

  const displayedBranches = selectedCity 
    ? getBranchesByCity(selectedCity)
    : activeBranches;

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Our Branches - SmartByte Computer Education</title>
        <meta name="description" content="Find SmartByte branches in Kalyan, Dombivli, Thane, Diva, Panvel, Badlapur, Titwala, Bhiwandi." />
      </Helmet>

      <Section>
        <Container>
          <SectionHeading
            title="Our Branches"
            subtitle={`${activeBranches.length} locations across Mumbai Metropolitan Region`}
            gradient
          />

          {/* City filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant={selectedCity === null ? "default" : "outline"}
              onClick={() => setSelectedCity(null)}
              className="rounded-full"
            >
              All ({activeBranches.length})
            </Button>
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                onClick={() => setSelectedCity(city)}
                className="rounded-full"
              >
                {city} ({cityCounts[city]})
              </Button>
            ))}
          </motion.div>

          {/* Branch grid */}
          <MobileDefer minHeight={640}>
            <Suspense fallback={<div className="min-h-[640px]" />}>
              <LocationsGrid branches={displayedBranches} />
            </Suspense>
          </MobileDefer>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Locations;
