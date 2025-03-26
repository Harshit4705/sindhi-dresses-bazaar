
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: { name: string; value: string }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate a slight delay for animation
    setTimeout(() => {
      addToCart({
        ...product,
        selectedColor,
        quantity
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} (${selectedColor.name}) × ${quantity}`,
      });
      
      setIsAdding(false);
    }, 300);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-border product-card-hover">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <h3 className="font-medium text-base text-foreground line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-lg font-semibold text-sindhi-800">₹{product.price.toLocaleString()}</p>
        
        <div className="mt-4 space-y-4">
          {/* Color Selection */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full relative flex items-center justify-center transition-all ${
                    selectedColor.value === color.value
                      ? 'ring-2 ring-primary ring-offset-2'
                      : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select color ${color.name}`}
                >
                  {selectedColor.value === color.value && (
                    <span className="text-white">
                      <Check size={14} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity Input */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Quantity</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-8 h-8 flex items-center justify-center border border-border rounded-l-md bg-muted text-foreground"
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="quantity-input w-14 h-8 border-y border-border text-center text-foreground"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border border-border rounded-r-md bg-muted text-foreground"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full mt-4 btn-primary ${isAdding ? 'bg-primary/90' : ''}`}
            disabled={isAdding}
          >
            {isAdding ? (
              <span className="flex items-center">
                <Check size={16} className="mr-1" /> Added
              </span>
            ) : (
              <span className="flex items-center">
                <Plus size={16} className="mr-1" /> Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
