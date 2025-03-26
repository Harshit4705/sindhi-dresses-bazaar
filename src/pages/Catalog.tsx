
import { useState, useEffect } from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { Search } from 'lucide-react';

// Fake product data
const products: Product[] = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `Women's ${['Dress', 'Suit', 'Saree', 'Kurti', 'Lehenga', 'Blouse'][i % 6]} - ${i + 1}`,
  price: Math.floor(Math.random() * 2000) + 500,
  image: `https://source.unsplash.com/random/300x400/?dress,women,clothing&sig=${i}`,
  colors: [
    { name: 'Red', value: '#ef4444' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Black', value: '#171717' },
  ].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 2)
}));

const categories = ['All', 'Dresses', 'Suits', 'Sarees', 'Kurtis', 'Lehengas', 'Blouses'];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => 
        product.name.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, -1))
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="section-title text-sindhi-900">Product Catalog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our premium collection of wholesale garments for women. Quality designs at competitive prices.
          </p>
        </div>
        
        {/* Filters */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="w-full md:w-auto overflow-x-auto horizontal-scroll pb-2">
            <div className="flex space-x-2 min-w-max">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-sindhi-100 text-sindhi-800'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Search */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sindhi-200 transition-all"
              />
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-secondary animate-pulse rounded-2xl overflow-hidden">
                  <div className="aspect-[3/4]"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-secondary-foreground/10 rounded-full w-3/4"></div>
                    <div className="h-6 bg-secondary-foreground/10 rounded-full w-1/2"></div>
                    <div className="h-10 bg-secondary-foreground/10 rounded-lg w-full mt-8"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium text-foreground">No products found</h3>
              <p className="mt-2 text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
