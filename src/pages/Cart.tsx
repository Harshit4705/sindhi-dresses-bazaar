
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCheckingOut(true);
    
    // Create WhatsApp message
    const phoneNumber = "919818344860";
    const message = generateWhatsAppMessage();
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset checkout state after delay
    setTimeout(() => {
      setIsCheckingOut(false);
      toast({
        title: "Order prepared",
        description: "Your order details have been sent to WhatsApp.",
      });
    }, 1000);
  };
  
  const generateWhatsAppMessage = () => {
    const itemsList = cartItems.map(item => 
      `• Product: ${item.name}\n  Color: ${item.selectedColor.name}\n  Quantity: ${item.quantity}\n  Price: ₹${item.price.toLocaleString()} × ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n\n');
    
    return `Hello, I would like to place an order for the following items from Sindhi Dresses:\n\n${itemsList}\n\n*Total Amount: ₹${getTotalPrice().toLocaleString()}*\n\nPlease confirm availability and provide payment details.`;
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="section-title text-sindhi-900">Your Cart</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Review your selected items and proceed to checkout
          </p>
        </div>
        
        <div className="mt-10">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-border rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-medium flex items-center text-foreground">
                      <ShoppingBag size={20} className="mr-2" />
                      Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {cartItems.map(item => (
                      <div key={`${item.id}-${item.selectedColor.value}`} className="px-6">
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 border-t border-border flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        toast({
                          title: "Cart cleared",
                          description: "All items have been removed from your cart.",
                        });
                      }}
                      className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                    >
                      Clear Cart
                    </button>
                    <Link to="/catalog" className="text-sm text-sindhi-800 hover:text-sindhi-900 transition-colors">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-border rounded-xl overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-medium text-foreground">Order Summary</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center text-base text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground font-medium">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="flex justify-between items-center text-base mb-6">
                        <span className="text-foreground font-medium">Total</span>
                        <span className="text-lg text-sindhi-800 font-semibold">₹{getTotalPrice().toLocaleString()}</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleCheckout}
                        className={`w-full btn-primary ${isCheckingOut ? 'opacity-80' : ''}`}
                        disabled={isCheckingOut || cartItems.length === 0}
                      >
                        {isCheckingOut ? (
                          <span>Preparing Order...</span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Checkout via WhatsApp
                            <ArrowRight size={16} className="ml-1" />
                          </span>
                        )}
                      </button>
                      
                      <p className="mt-4 text-xs text-center text-muted-foreground">
                        Your order details will be sent via WhatsApp for confirmation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-sindhi-50 flex items-center justify-center text-sindhi-800 mb-6">
                <ShoppingCart size={24} />
              </div>
              <h3 className="text-xl font-medium text-foreground">Your cart is empty</h3>
              <p className="mt-2 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
              <div className="mt-8">
                <Link to="/catalog" className="btn-primary">
                  Browse Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
