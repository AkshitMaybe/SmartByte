import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight, Navigation } from 'lucide-react';
import { Branch } from '@/data/branches';
import { Button } from '@/components/ui/button';
import { cardHover } from '@/lib/motion';
import { site } from '@/data/site';

interface BranchCardProps {
  branch: Branch;
  index?: number;
}

export const BranchCard = ({ branch, index = 0 }: BranchCardProps) => {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const number = branch.whatsappNumber || site.whatsappHO;
    const message = encodeURIComponent(`Hi SmartByte, I want to visit the ${branch.displayName} branch. Please share details.`);
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleMapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (branch.mapLink) {
      window.open(branch.mapLink, '_blank');
    }
  };

  if (branch.isComingSoon) {
    return (
      <motion.div
        className="glass-card p-6 opacity-70"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.05 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <MapPin className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-muted-foreground">
              {branch.displayName}
            </h3>
            <p className="text-sm text-muted-foreground">{branch.cityGroup}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground italic">
          Opening Soon! Stay tuned for updates.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={cardHover}
    >
      <Link to={`/branches/${branch.slug}`}>
        <motion.div
          className="glass-card p-6 h-full group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {branch.displayName}
                </h3>
                {branch.isHeadOffice && (
                  <span className="text-xs font-medium text-accent">Head Office</span>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {branch.address}
          </p>

          {/* Meta */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{branch.timings}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <span>{branch.contactNumber}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={handleWhatsAppClick}
              className="flex-1"
            >
              WhatsApp
            </Button>
            {branch.mapLink ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleMapClick}
              >
                <Navigation className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                disabled
                className="opacity-50"
              >
                <span className="text-xs">Maps Soon</span>
              </Button>
            )}
          </div>

          {/* View details */}
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-border text-primary text-sm font-medium group/cta">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover/cta:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};
