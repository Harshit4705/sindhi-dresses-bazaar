
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glassmorphism py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-display font-semibold tracking-tight text-sindhi-800 transition-transform duration-300 hover:scale-[1.02]"
          >
            Sindhi Dresses
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" currentPath={location.pathname} />
            <NavLink to="/catalog" label="Catalog" currentPath={location.pathname} />
            <Link 
              to="/cart" 
              className="relative inline-flex items-center justify-center p-2 rounded-full bg-sindhi-50 text-sindhi-800 transition-all hover:bg-sindhi-100"
            >
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link 
              to="/cart" 
              className="relative p-2 rounded-full bg-sindhi-50 text-sindhi-800"
            >
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-sindhi-50 text-sindhi-800"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glassmorphism animate-fade-in">
          <div className="py-4 px-6 flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" currentPath={location.pathname} />
            <MobileNavLink to="/catalog" label="Catalog" currentPath={location.pathname} />
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label, currentPath }: { to: string; label: string; currentPath: string }) => {
  const isActive = (
    to === '/' ? currentPath === '/' : currentPath.startsWith(to)
  );
  
  return (
    <Link 
      to={to}
      className={`relative text-sm font-medium transition-colors hover:text-sindhi-700 ${
        isActive ? 'text-sindhi-800' : 'text-sindhi-600'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sindhi-700 rounded-full animate-fade-in" />
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, label, currentPath }: { to: string; label: string; currentPath: string }) => {
  const isActive = (
    to === '/' ? currentPath === '/' : currentPath.startsWith(to)
  );
  
  return (
    <Link 
      to={to}
      className={`text-base font-medium ${
        isActive ? 'text-sindhi-800' : 'text-sindhi-600'
      }`}
    >
      {label}
    </Link>
  );
};

export default Header;
