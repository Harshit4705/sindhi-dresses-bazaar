
import { useState, useEffect } from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { Search } from 'lucide-react';

// Updated product data focusing on Sarees and Indo-Western
const products: Product[] = Array.from({ length: 60 }, (_, i) => {
  // Determine if this is a Saree or Indo-Western product
  const isBlackSaree = i % 5 === 0; // Every 5th product is a black saree
  const isSaree = i % 2 === 0 || isBlackSaree; // Half are sarees + the black ones

  // Updated URLs for saree images with your uploaded images
  const sareeImageUrls = [
    "/lovable-uploads/c4b0b754-92a3-4e2b-bc9b-0e977b80eaa0.png", // Blue saree with gold embellishments
    "/lovable-uploads/261f8221-ab61-4a0f-82e8-bf57341600bb.png", // Purple saree with pearl detailing
    "/lovable-uploads/0ccc20b5-b769-4792-b840-eec73835b18e.png", // Red saree with pearl chains
    "/lovable-uploads/f2ea1415-0085-40b2-813b-1d1d4728d182.png", // Light blue saree with embroidery
    "/lovable-uploads/92159931-5143-4139-b42c-b971d54c4b7c.png", // Red saree with silver work
    "/lovable-uploads/17e6453c-01eb-47a2-9bb3-b971a1de0281.png", // Light mint green saree
    "/lovable-uploads/e0d8103a-4b97-4453-a139-17b7a812878f.png", // Navy blue saree with silver embellishments
    "/lovable-uploads/6f133e7e-a94c-4686-ad6d-06f6d958a81a.png"  // Silver gray saree with ruffles
  ];
  
  const blackSareeImageUrls = [
    "https://images.unsplash.com/photo-1614886137042-41137904df67?q=80&w=1000",
    "https://images.unsplash.com/photo-1671725501830-71388a0bbec6?q=80&w=1000"
  ];
  
  const indoWesternImageUrls = [
    "https://images.unsplash.com/photo-1610190209529-32de27f3b9c3?q=80&w=1000",
    "https://images.unsplash.com/photo-1611310424006-64e5ffe34e1a?q=80&w=1000",
    "https://images.unsplash.com/photo-1647891941746-fe1d53ddc7a6?q=80&w=1000"
  ];

  // Updated product names based on image content
  const sareeNames = [
    "Blue Pochuu Koty RTW Saree D.No.095",
    "Purple Heavy Necklace Puchoo RTW Saree D.No.092",
    "Maroon Pochuu Koty RTW Saree D.No.094",
    "Light Blue Ready To Wear Saree D.No.366",
    "Red Ready To Wear Saree D.No.359",
    "Mint Green Celebrity Article D.No.SD09",
    "Navy Blue Celebrity Article D.No.SD06",
    "Silver Gray Full Bazuu D.No.SD4"
  ];

  // Select an image URL and name based on product type
  let imageUrl;
  let productName;
  
  if (isBlackSaree) {
    imageUrl = blackSareeImageUrls[i % blackSareeImageUrls.length];
    productName = `Black Designer Saree - ${i + 1}`;
  } else if (isSaree) {
    const index = i % sareeImageUrls.length;
    imageUrl = sareeImageUrls[index];
    productName = sareeNames[index];
  } else {
    imageUrl = indoWesternImageUrls[i % indoWesternImageUrls.length];
    productName = `Indo-Western - ${i + 1}`;
  }

  // Define colors based on the image
  const getColorForImage = (imgUrl: string) => {
    if (imgUrl.includes("c4b0b754")) return { name: 'Blue', value: '#3b82f6' };
    if (imgUrl.includes("261f8221")) return { name: 'Purple', value: '#a855f7' };
    if (imgUrl.includes("0ccc20b5")) return { name: 'Maroon', value: '#9f1239' };
    if (imgUrl.includes("f2ea1415")) return { name: 'Light Blue', value: '#7dd3fc' };
    if (imgUrl.includes("92159931")) return { name: 'Red', value: '#ef4444' };
    if (imgUrl.includes("17e6453c")) return { name: 'Mint', value: '#a7f3d0' };
    if (imgUrl.includes("e0d8103a")) return { name: 'Navy', value: '#1e3a8a' };
    if (imgUrl.includes("6f133e7e")) return { name: 'Silver Gray', value: '#d1d5db' };
    
    // Default colors for other images
    return isBlackSaree 
      ? { name: 'Black', value: '#171717' } 
      : ['Red', 'Blue', 'Green', 'Purple', 'Black'][i % 5] === 'Red'
        ? { name: 'Red', value: '#ef4444' }
        : ['Red', 'Blue', 'Green', 'Purple', 'Black'][i % 5] === 'Blue'
          ? { name: 'Blue', value: '#3b82f6' }
          : ['Red', 'Blue', 'Green', 'Purple', 'Black'][i % 5] === 'Green'
            ? { name: 'Green', value: '#22c55e' }
            : ['Red', 'Blue', 'Green', 'Purple', 'Black'][i % 5] === 'Purple'
              ? { name: 'Purple', value: '#a855f7' }
              : { name: 'Black', value: '#171717' };
  };

  const color = getColorForImage(imageUrl);

  return {
    id: i + 1,
    name: productName,
    price: Math.floor(Math.random() * 2000) + 1500, // Increased price range for premium sarees
    image: imageUrl,
    colors: [color]
  };
});

// Updated categories to include RTW Sarees as a new category
const categories = ['All', 'Sarees', 'Black Sarees', 'Ready To Wear', 'Indo-Western'];

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
    } else if (selectedCategory === 'Ready To Wear') {
      result = result.filter(product => 
        product.name.toLowerCase().includes('ready to wear') ||
        product.name.toLowerCase().includes('rtw')
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
            Explore our premium collection of Designer Sarees and Indo-Western garments. Authentic Sindhi designs at competitive prices.
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
