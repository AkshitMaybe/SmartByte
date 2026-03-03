import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/OptimizedImage';
import type { GalleryItem } from '@/data/galleryItems';

interface LightboxModalProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onActiveIndexChange: (index: number | null) => void;
}

export const LightboxModal = ({ items, activeIndex, onActiveIndexChange }: LightboxModalProps) => {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const currentIndex = isOpen ? activeIndex : 0;
  const currentItem = items[currentIndex];

  const goPrevious = () => {
    if (!isOpen || items.length <= 1) return;
    const nextIndex = (currentIndex - 1 + items.length) % items.length;
    onActiveIndexChange(nextIndex);
  };

  const goNext = () => {
    if (!isOpen || items.length <= 1) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onActiveIndexChange(nextIndex);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (items.length <= 1) return;
        const nextIndex = (currentIndex - 1 + items.length) % items.length;
        onActiveIndexChange(nextIndex);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (items.length <= 1) return;
        const nextIndex = (currentIndex + 1) % items.length;
        onActiveIndexChange(nextIndex);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, currentIndex, items.length, onActiveIndexChange]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onActiveIndexChange(null)}>
      <DialogContent className="max-w-[96vw] border-0 bg-transparent p-0 shadow-none lg:max-w-6xl">
        {isOpen && currentItem && (
          <div className="relative w-full">
            <div className="rounded-2xl border-2 border-primary/70 bg-background/95 p-2 shadow-2xl">
              {currentItem.mediaType === 'video' ? (
                <video
                  src={currentItem.src}
                  poster={currentItem.thumbnail}
                  controls
                  autoPlay
                  className="max-h-[82vh] w-full rounded-xl object-contain"
                />
              ) : (
                <OptimizedImage
                  photo={currentItem}
                  className="max-h-[82vh] w-full rounded-xl object-contain"
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>

            {items.length > 1 && (
              <>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90"
                  onClick={goPrevious}
                  aria-label="Previous media"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90"
                  onClick={goNext}
                  aria-label="Next media"
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
