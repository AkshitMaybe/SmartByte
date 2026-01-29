import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams, Link } from 'react-router-dom';
import { Container, Section, SectionHeading } from '@/components/Container';
import { Marquee } from '@/components/Marquee';
import { pageTransition } from '@/lib/motion';
import { getBranchBySlug } from '@/data/branches';
import { ArrowLeft } from 'lucide-react';

const BranchGallery = () => {
  const { slug } = useParams();
  const branch = getBranchBySlug(slug || '');

  if (!branch || branch.isComingSoon) {
    return <Navigate to="/gallery" replace />;
  }

  const photos = Array.from({ length: 12 }, (_, index) => ({
    id: `${branch.slug}-${index + 1}`,
    src: "/placeholder.svg",
    alt: `${branch.displayName} photo ${index + 1}`,
    label: `Branch Photo ${index + 1}`,
  }));

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{branch.displayName} Photos - SmartByte Computer Education</title>
        <meta
          name="description"
          content={`View photos from the ${branch.displayName} branch of SmartByte Computer Education.`}
        />
      </Helmet>

      <Section className="pt-8">
        <Container>
          <Link to="/gallery" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
          </Link>
          <SectionHeading
            title={`${branch.displayName} Photos`}
            subtitle="A quick look inside the branch"
            gradient
          />
        </Container>

        <Marquee className="mb-12">
          {photos.slice(0, 6).map((photo) => (
            <div
              key={photo.id}
              className="relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl border border-card-border bg-card/60 shadow-md"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/40" />
            </div>
          ))}
        </Marquee>

        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="relative aspect-video glass-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/40" />
                <span className="absolute bottom-3 left-3 text-xs text-muted-foreground">
                  {photo.label}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default BranchGallery;
