import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams, Link } from 'react-router-dom';
import { Container, Section, SectionHeading } from '@/components/Container';
import { Marquee } from '@/components/Marquee';
import { pageTransition } from '@/lib/motion';
import { useIsMobileLike } from '@/hooks/useIsMobileLike';
import { MobileDefer } from '@/components/MobileDefer';
import { getBranchBySlug } from '@/data/branches';
import { getBranchPhotos } from '@/data/branchPhotos';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ArrowLeft } from 'lucide-react';

const BranchGallery = () => {
  const { slug } = useParams();
  const branchSlug = slug || '';
  const isMobileLike = useIsMobileLike();
  const [visibleCount, setVisibleCount] = useState(12);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const branch = getBranchBySlug(branchSlug);

  const batchSize = isMobileLike ? 6 : 12;
  const photos = useMemo(
    () => (branch && !branch.isComingSoon ? getBranchPhotos(branch.slug, branch.displayName, 0) : []),
    [branch]
  );
  const marqueePhotos = photos.slice(0, 6);
  const shouldRenderMarquee = marqueePhotos.length > 1;
  const visiblePhotos = photos.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(batchSize);
    setActivePhotoIndex(null);
  }, [batchSize, branchSlug]);

  useEffect(() => {
    if (activePhotoIndex !== null && activePhotoIndex >= photos.length) {
      setActivePhotoIndex(null);
    }
  }, [activePhotoIndex, photos.length]);

  if (!branch || branch.isComingSoon) {
    return <Navigate to="/gallery" replace />;
  }

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

        {shouldRenderMarquee && (
          <MobileDefer minHeight={260}>
            <Marquee className="mb-12" durationSeconds={Math.max(74, Math.round(marqueePhotos.length * 18))}>
              {marqueePhotos.map((photo, index) => (
                <div
                  key={`${photo.src}-marquee-${index}`}
                  className="relative h-44 w-72 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/65 bg-card/60 shadow-md"
                >
                  <OptimizedImage
                    photo={photo}
                    className="h-full w-full object-cover opacity-80"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/40" />
                </div>
              ))}
            </Marquee>
          </MobileDefer>
        )}

        <Container>
          {photos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Photos coming soon!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePhotos.map((photo, index) => (
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Open ${photo.alt}`}
                  key={`${photo.src}-grid-${index}`}
                  className="relative aspect-video glass-card overflow-hidden border-2 border-primary/65 cursor-zoom-in outline-none transition-colors hover:border-primary/85 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <OptimizedImage
                    photo={photo}
                    className="h-full w-full object-cover opacity-80"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/40" />
                </button>
              ))}
            </div>
          )}

          {photos.length > visibleCount && (
            <div className="mt-6 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setVisibleCount((count) => count + batchSize)}
              >
                Load More Photos
              </Button>
            </div>
          )}

          <PhotoLightbox
            photos={photos}
            activeIndex={activePhotoIndex}
            onActiveIndexChange={setActivePhotoIndex}
          />
        </Container>
      </Section>
    </motion.div>
  );
};

export default BranchGallery;
