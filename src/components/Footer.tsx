import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { site } from '@/data/site';
import { courses } from '@/data/courses';
import { fadeUp, staggerChildren, staggerItem } from '@/lib/motion';

export const Footer = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi SmartByte, I want to learn more about your courses.");
    window.open(`https://wa.me/${site.whatsappHO.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <footer className="relative bg-card/50 border-t border-border mt-20">
      <Container className="py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div variants={staggerItem}>
            <Link to="/" className="flex items-center mb-6">
              <img
                src={`${baseUrl}brand/Logo Rounded Corner.png`}
                alt={site.name}
                className="h-10 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {site.tagline}. Quality computer education since 2005.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors group"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a 
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a 
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors group"
              >
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </motion.div>

          {/* Courses Column */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Courses</h3>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link 
                    to={`/courses/${course.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {course.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Branches
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Head Office: Kalyan West, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <button 
                  onClick={handleWhatsAppClick}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp: {site.whatsappHO}
                </button>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@smartbytecomputers.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@smartbytecomputers.com
                </a>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              <div className="trust-badge">
                <span className="text-xs">{site.trust.govtAuthorized}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
          {...fadeUp}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartByte Computer Education. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            {site.trust.since} • {site.trust.students} {site.trust.studentsLabel}
          </p>
        </motion.div>
      </Container>
    </footer>
  );
};
