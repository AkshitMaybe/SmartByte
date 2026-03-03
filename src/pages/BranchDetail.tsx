import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Phone, Navigation, ArrowLeft } from 'lucide-react';
import { Container, Section } from '@/components/Container';
import { Marquee } from '@/components/Marquee';
import { Button } from '@/components/ui/button';
import { MobileDefer } from '@/components/MobileDefer';
import { lazy, Suspense, useState } from 'react';
import { pageTransition } from '@/lib/motion';
import { getBranchBySlug } from '@/data/branches';
import { getBranchPhotos } from '@/data/branchPhotos';
import { site } from '@/data/site';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { OptimizedImage } from '@/components/OptimizedImage';

const WhatsAppForm = lazy(() =>
  import('@/components/WhatsAppForm').then((module) => ({ default: module.WhatsAppForm }))
);

const BranchDetail = () => {
  const { slug } = useParams();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const branch = getBranchBySlug(slug || '');

  if (!branch || branch.isComingSoon) {
    return <Navigate to="/locations" replace />;
  }

  const handleWhatsApp = () => {
    const number = branch.whatsappNumber || site.whatsappHO;
    const message = encodeURIComponent(`Hi, I want to visit ${branch.displayName}. Please share details.`);
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const photos = getBranchPhotos(branch.slug, branch.displayName, 0);

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{branch.displayName} - SmartByte Computer Education</title>
        <meta name="description" content={`Visit SmartByte ${branch.displayName}. ${branch.address}`} />
      </Helmet>

      <Section>
        <Container>
          <Link to="/locations" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Locations
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              {branch.isHeadOffice && (
                <span className="inline-block px-3 py-1 text-sm font-medium bg-accent/20 text-accent rounded-full mb-4">
                  Head Office
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">{branch.displayName}</h1>

              <div className="glass-card p-6 space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{branch.timings}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{branch.contactNumber}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleWhatsApp} className="btn-shine bg-gradient-to-r from-green-500 to-green-600">
                  WhatsApp Us
                </Button>
                {branch.mapLink ? (
                  <Button variant="outline" onClick={() => window.open(branch.mapLink!, '_blank')}>
                    <Navigation className="w-4 h-4 mr-2" /> Open in Maps
                  </Button>
                ) : (
                  <Button variant="outline" disabled>Maps Coming Soon</Button>
                )}
              </div>

              <div className="mt-10">
                <h2 className="text-lg font-heading font-semibold mb-4">Branch Photos</h2>
                {photos.length > 1 && (
                  <MobileDefer minHeight={220}>
                    <Marquee
                      className="py-2"
                      pauseOnHover
                      durationSeconds={Math.max(74, Math.round(photos.length * 16))}
                    >
                      {photos.map((photo, index) => (
                        <button
                          type="button"
                          onClick={() => setActivePhotoIndex(index)}
                          aria-label={`Open ${photo.alt}`}
                          key={`${photo.src}-${index}`}
                          className="relative h-40 w-64 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/65 bg-card/60 shadow-md cursor-zoom-in outline-none transition-colors hover:border-primary/85 focus-visible:ring-2 focus-visible:ring-primary"
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
                        </button>
                      ))}
                    </Marquee>
                  </MobileDefer>
                )}

                {photos.length === 1 && (
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex(0)}
                      aria-label={`Open ${photos[0].alt}`}
                      className="relative h-40 w-64 overflow-hidden rounded-2xl border-2 border-primary/55 bg-card/60 shadow-md cursor-zoom-in outline-none transition-colors hover:border-primary/80 focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <OptimizedImage
                        photo={photos[0]}
                        className="h-full w-full object-cover opacity-80"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/40" />
                    </button>
                  </div>
                )}

                {photos.length === 0 && (
                  <p className="text-sm text-muted-foreground py-2">Photos coming soon!</p>
                )}

                <PhotoLightbox
                  photos={photos}
                  activeIndex={activePhotoIndex}
                  onActiveIndexChange={setActivePhotoIndex}
                />
              </div>
            </motion.div>

            <MobileDefer minHeight={480}>
              <Suspense fallback={<div className="h-[480px]" />}>
                <WhatsAppForm defaultBranch={branch.slug} />
              </Suspense>
            </MobileDefer>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default BranchDetail;
