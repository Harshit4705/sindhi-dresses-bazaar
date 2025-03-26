
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    selectedColor: {
      name: string;
      value: string;
    };
    quantity: number;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.selectedColor.value, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.selectedColor.value, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id, item.selectedColor.value);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-border animate-fade-in">
      {/* Image */}
      <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden mb-4 sm:mb-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Details */}
      <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row">
        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground">{item.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Color: <span className="text-foreground">{item.selectedColor.name}</span>
          </p>
          <p className="mt-1 text-sm font-medium text-sindhi-800">
            ₹{item.price.toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 sm:mt-0">
          {/* Quantity Controls */}
          <div className="flex items-center mr-6">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center border border-border rounded-l-md bg-muted text-foreground transition-colors hover:bg-muted/80"
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-10 h-8 flex items-center justify-center border-y border-border text-center text-foreground">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center border border-border rounded-r-md bg-muted text-foreground transition-colors hover:bg-muted/80"
            >
              <Plus size={14} />
            </button>
          </div>
          
          {/* Subtotal and Remove */}
          <div className="flex flex-col items-end">
            <span className="text-base font-medium text-foreground">
              ₹{(item.price * item.quantity).toLocaleString()}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="mt-2 text-sm flex items-center text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={14} className="mr-1" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
