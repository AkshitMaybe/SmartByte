import { cn } from '@/lib/utils';
import type { GallerySection } from '@/data/galleryItems';

interface GalleryTabOption {
  value: GallerySection;
  label: string;
}

interface GalleryTabsProps {
  tabs: GalleryTabOption[];
  activeTab: GallerySection;
  onTabChange: (tab: GallerySection) => void;
}

export const GalleryTabs = ({ tabs, activeTab, onTabChange }: GalleryTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'rounded-full border px-5 py-2 text-sm font-medium transition-colors',
            activeTab === tab.value
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-primary/35 bg-black/65 text-muted-foreground hover:border-primary/70 hover:text-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
