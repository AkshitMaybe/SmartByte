import { cn } from '@/lib/utils';

export interface FilterPillOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterPillsProps {
  options: FilterPillOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const FilterPills = ({ options, selectedValue, onChange }: FilterPillsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-full border-2 px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200',
            selectedValue === option.value
              ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(59,130,246,0.45)]'
              : 'border-primary/35 bg-black/65 text-muted-foreground hover:border-primary/70 hover:text-foreground'
          )}
        >
          {option.label}
          {typeof option.count === 'number' ? ` (${option.count})` : ''}
        </button>
      ))}
    </div>
  );
};
