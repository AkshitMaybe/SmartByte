import { OptimizedImage } from '@/components/OptimizedImage';
import { usePerformanceProfile } from '@/hooks/usePerformanceProfile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { GalleryItem } from '@/data/galleryItems';
import { motion } from 'framer-motion';

interface MediaGridProps {
  items: GalleryItem[];
  onOpenItem: (index: number) => void;
}

export const MediaGrid = ({ items, onOpenItem }: MediaGridProps) => {
  const reducedMotion = useReducedMotion();
  const { lowPerformance } = usePerformanceProfile();
  const shouldAnimateItems = !reducedMotion && !lowPerformance && items.length <= 24;

  if (items.length === 0) {
    return <p className="py-12 text-center text-muted-foreground">No media found for this filter.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        shouldAnimateItems ? (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onOpenItem(index)}
            aria-label={`Open ${item.title || item.branch}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: Math.min(index * 0.02, 0.16) }}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-primary/65 bg-card/55 text-left shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-primary/90 focus-visible:ring-2 focus-visible:ring-primary"
          >
            {item.mediaType === 'video' ? (
              <video
                src={item.src}
                poster={item.thumbnail}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <OptimizedImage
                photo={item}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index < 2 ? 'high' : 'low'}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent opacity-70" />
          </motion.button>
        ) : (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenItem(index)}
            aria-label={`Open ${item.title || item.branch}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-primary/65 bg-card/55 text-left shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:border-primary/90 focus-visible:ring-2 focus-visible:ring-primary"
          >
            {item.mediaType === 'video' ? (
              <video
                src={item.src}
                poster={item.thumbnail}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <OptimizedImage
                photo={item}
                className="h-full w-full object-cover"
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index < 2 ? 'high' : 'low'}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent opacity-70" />
          </button>
        )
      ))}
    </div>
  );
};
