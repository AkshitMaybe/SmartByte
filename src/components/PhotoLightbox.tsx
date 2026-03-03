import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/OptimizedImage';

interface LightboxPhoto {
  src: string;
  alt: string;
  avifSrc?: string;
  webpSrc?: string;
}

interface PhotoLightboxProps {
  photos: LightboxPhoto[];
  activeIndex: number | null;
  onActiveIndexChange: (index: number | null) => void;
}

export const PhotoLightbox = ({ photos, activeIndex, onActiveIndexChange }: PhotoLightboxProps) => {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < photos.length;
  const currentIndex = isOpen ? activeIndex : 0;
  const currentPhoto = photos[currentIndex];

  const goPrevious = () => {
    if (!isOpen || photos.length <= 1) return;
    const nextIndex = (currentIndex - 1 + photos.length) % photos.length;
    onActiveIndexChange(nextIndex);
  };

  const goNext = () => {
    if (!isOpen || photos.length <= 1) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    onActiveIndexChange(nextIndex);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (photos.length <= 1) return;
        const nextIndex = (currentIndex - 1 + photos.length) % photos.length;
        onActiveIndexChange(nextIndex);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (photos.length <= 1) return;
        const nextIndex = (currentIndex + 1) % photos.length;
        onActiveIndexChange(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onActiveIndexChange]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onActiveIndexChange(null)}>
      <DialogContent className="max-w-[96vw] lg:max-w-6xl border-0 bg-transparent p-0 shadow-none">
        {isOpen && currentPhoto && (
          <div className="relative w-full">
            <div className="rounded-2xl border-2 border-primary/70 bg-background/95 p-2 shadow-2xl">
              <OptimizedImage
                photo={currentPhoto}
                className="max-h-[82vh] w-full rounded-xl object-contain"
                loading="eager"
                decoding="async"
              />
            </div>

            {photos.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90"
                  onClick={goPrevious}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90"
                  onClick={goNext}
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
