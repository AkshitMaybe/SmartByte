import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Container, Section, SectionHeading } from '@/components/Container';
import { BranchCard } from '@/components/BranchCard';
import { Button } from '@/components/ui/button';
import { pageTransition } from '@/lib/motion';
import { branches, getCities, getCityCounts, getBranchesByCity } from '@/data/branches';
import { cn } from '@/lib/utils';

const Locations = () => {
  const cities = getCities();
  const cityCounts = getCityCounts();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const displayedBranches = selectedCity 
    ? getBranchesByCity(selectedCity)
    : branches.filter(b => !b.isComingSoon);

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
            subtitle="20 locations across Mumbai Metropolitan Region"
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
              All ({branches.filter(b => !b.isComingSoon).length})
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBranches.map((branch, index) => (
              <BranchCard key={branch.slug} branch={branch} index={index} />
            ))}
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default Locations;
