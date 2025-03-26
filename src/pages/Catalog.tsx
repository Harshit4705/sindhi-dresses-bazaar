
import { useState, useEffect } from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { Search } from 'lucide-react';

// Updated product data focusing on Sarees and Indo-Western
const products: Product[] = Array.from({ length: 60 }, (_, i) => {
  // Determine if this is a Saree or Indo-Western product
  const isBlackSaree = i % 5 === 0; // Every 5th product is a black saree
  const isSaree = i % 2 === 0 || isBlackSaree; // Half are sarees + the black ones

  return {
    id: i + 1,
    name: isBlackSaree 
      ? `Black Saree - ${i + 1}` 
      : isSaree 
        ? `Saree - ${i + 1}` 
        : `Indo-Western - ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 500,
    image: `https://source.unsplash.com/random/300x400/?${isBlackSaree ? 'black,saree' : isSaree ? 'saree' : 'indo-western'}&sig=${i}`,
    colors: [{
      name: isBlackSaree ? 'Black' : ['Red', 'Blue', 'Green', 'Purple', 'Black'][i % 5],
      value: isBlackSaree ? '#171717' : ['#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#171717'][i % 5]
    }]
  };
});

// Updated categories
const categories = ['All', 'Sarees', 'Black Sarees', 'Indo-Western'];

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
    if (selectedCategory === 'Sarees') {
      result = result.filter(product => 
        product.name.toLowerCase().includes('saree') && 
        !product.name.toLowerCase().includes('black saree')
      );
    } else if (selectedCategory === 'Black Sarees') {
      result = result.filter(product => 
        product.name.toLowerCase().includes('black saree')
      );
    } else if (selectedCategory === 'Indo-Western') {
      result = result.filter(product => 
        product.name.toLowerCase().includes('indo-western')
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
            Explore our premium collection of Sarees and Indo-Western garments. Quality designs at competitive prices.
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
