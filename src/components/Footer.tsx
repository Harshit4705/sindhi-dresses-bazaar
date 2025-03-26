
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-2xl font-display font-semibold text-sindhi-800">
              Sindhi Dresses
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Providing premium wholesale women's clothing with elegance and style for retailers across India.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sindhi-800">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/catalog" label="Catalog" />
              <FooterLink to="/cart" label="Cart" />
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sindhi-800">
              Contact Us
            </h3>
            <div className="flex flex-col space-y-3">
              <a href="tel:+919818344860" className="flex items-center text-muted-foreground hover:text-sindhi-700 transition-colors">
                <Phone size={16} className="mr-2" />
                +91 9818344860
              </a>
              <a href="mailto:info@sindhidresses.com" className="flex items-center text-muted-foreground hover:text-sindhi-700 transition-colors">
                <Mail size={16} className="mr-2" />
                info@sindhidresses.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Sindhi Dresses. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-full bg-sindhi-50 flex items-center justify-center text-sindhi-700 transition-colors hover:bg-sindhi-100"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="text-muted-foreground hover:text-sindhi-700 transition-colors">
    {label}
  </Link>
);

export default Footer;
