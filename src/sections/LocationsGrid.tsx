import { BranchCard } from '@/components/BranchCard';
import { Branch } from '@/data/branches';

interface LocationsGridProps {
  branches: Branch[];
}

const LocationsGrid = ({ branches }: LocationsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {branches.map((branch, index) => (
        <BranchCard key={branch.slug} branch={branch} index={index} />
      ))}
    </div>
  );
};

export default LocationsGrid;
