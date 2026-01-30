import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Phone, Navigation, ArrowLeft } from 'lucide-react';
import { Container, Section } from '@/components/Container';
import { Marquee } from '@/components/Marquee';
import { Button } from '@/components/ui/button';
import { MobileDefer } from '@/components/MobileDefer';
import { useIsMobileLike } from '@/hooks/useIsMobileLike';
import { lazy, Suspense } from 'react';
import { pageTransition } from '@/lib/motion';
import { getBranchBySlug } from '@/data/branches';
import { site } from '@/data/site';

const WhatsAppForm = lazy(() => import('@/components/WhatsAppForm'));

const BranchDetail = () => {
  const { slug } = useParams();
  const isMobileLike = useIsMobileLike();
  const branch = getBranchBySlug(slug || '');

  if (!branch || branch.isComingSoon) {
    return <Navigate to="/locations" replace />;
  }

  const handleWhatsApp = () => {
    const number = branch.whatsappNumber || site.whatsappHO;
    const message = encodeURIComponent(`Hi, I want to visit ${branch.displayName}. Please share details.`);
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const photoPlaceholders = Array.from({ length: 6 }, (_, index) => ({
    src: "/placeholder.svg",
    alt: `Branch photo placeholder ${index + 1}`,
    label: `Branch Photo ${index + 1}`,
  }));

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
                <MobileDefer minHeight={220}>
                  <Marquee className="py-2" pauseOnHover>
                    {photoPlaceholders.map((photo) => (
                      <div
                        key={photo.alt}
                        className="relative h-40 w-64 shrink-0 overflow-hidden rounded-2xl border border-card-border bg-card/60 shadow-md"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="h-full w-full object-cover opacity-75"
                          loading={isMobileLike ? 'lazy' : 'eager'}
                          decoding="async"
                          fetchPriority={isMobileLike ? 'low' : 'auto'}
                          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 320px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/40" />
                        <span className="absolute bottom-3 left-3 text-xs text-muted-foreground">
                          {photo.label}
                        </span>
                      </div>
                    ))}
                  </Marquee>
                </MobileDefer>
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
