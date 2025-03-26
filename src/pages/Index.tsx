
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Package, TrendingUp } from 'lucide-react';

const Index = () => {
  const refFeatures = useRef<HTMLDivElement>(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fadeIn');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));
    
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
            alt="Elegant clothes" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/90" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider bg-sindhi-100 text-sindhi-800 rounded-full animate-fade-in">
              Wholesale Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-sindhi-950 animate-slide-in">
              Elegance in Every Thread
            </h1>
            <p className="mt-6 text-lg text-sindhi-800 animate-slide-in" style={{ animationDelay: '0.1s' }}>
              Premium wholesale garments for female fashion retailers. Exclusive designs with exceptional quality.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/catalog" className="btn-primary">
                Explore Catalog
                <ChevronRight size={16} className="ml-1" />
              </Link>
              <a 
                href="tel:+919818344860"
                className="btn-secondary"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => refFeatures.current?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full p-2 bg-white/80 text-sindhi-800 shadow-sm hover:bg-white transition-colors"
            aria-label="Scroll down"
          >
            <ChevronRight size={20} className="rotate-90" />
          </button>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={refFeatures} className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto scroll-animate opacity-0">
            <h2 className="section-title text-sindhi-900">Why Choose Sindhi Dresses?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide premium wholesale options for retailers who demand the best in women's fashion.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShoppingBag />}
              title="Premium Quality"
              description="Our garments are crafted with the finest materials, ensuring durability and comfort for your customers."
              delay={0}
            />
            <FeatureCard 
              icon={<Package />}
              title="Wholesale Pricing"
              description="Competitive wholesale rates that help maximize your profit margins while offering quality products."
              delay={0.1}
            />
            <FeatureCard 
              icon={<TrendingUp />}
              title="Latest Designs"
              description="Stay ahead with our regularly updated collection featuring the latest styles and trends."
              delay={0.2}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-sindhi-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-sindhi-900">
                  Ready to Stock Your Store?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Browse our exclusive collection of women's garments and place your wholesale order today.
                </p>
                <div className="mt-8">
                  <Link to="/catalog" className="btn-primary">
                    View Catalog
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Elegant clothes" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
}) => (
  <div 
    className="bg-white p-8 rounded-xl border border-border scroll-animate opacity-0 product-card-hover"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-12 h-12 rounded-lg bg-sindhi-50 flex items-center justify-center text-sindhi-700 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-medium text-sindhi-900">{title}</h3>
    <p className="mt-3 text-muted-foreground">{description}</p>
  </div>
);

export default Index;
