import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { useIsMobileLike } from "@/hooks/useIsMobileLike";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const buildWhatsappUrl = () => {
  const message = encodeURIComponent("Hi SmartByte, I want details about your courses.");
  return `https://wa.me/${site.whatsappHO.replace(/[^0-9]/g, "")}?text=${message}`;
};

export const MobileStickyCta = () => {
  const isMobileLike = useIsMobileLike();
  const reducedMotion = useReducedMotion();

  if (!isMobileLike) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/35 bg-background/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={`tel:${site.whatsappHO}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/35 bg-black/60 px-2 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/70"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={buildWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/35 bg-black/60 px-2 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/70"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          to="/locations"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/35 bg-black/60 px-2 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/70"
          onClick={() => {
            if (reducedMotion) return;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <MapPin className="h-4 w-4" />
          Branches
        </Link>
      </div>
    </div>
  );
};

