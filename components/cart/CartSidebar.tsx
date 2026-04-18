import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <div 
        className={`fixed inset-0 z-[200] transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B1215]/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-[#0B1215] shadow-2xl z-10 flex flex-col transform transition-transform duration-700 ease-out border-l border-white/5 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-[#0B1215]">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-sans font-black text-white tracking-tighter uppercase">My Cart</h2>
            <p className="text-[10px] font-black text-accent-gold uppercase tracking-[0.3em]">{totalItems} Items Selected</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group">
            <X className="h-5 w-5 text-white/40 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide space-y-10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <ShoppingBag className="h-8 w-8 text-white/20" />
              </div>
              <div className="space-y-4">
                <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">Your Cart is empty</p>
                <Link to="/products" onClick={onClose} className="inline-block text-accent-gold text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all underline underline-offset-8">
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {cart.map((item) => {
                if (!item.product) return null;
                const itemId = item._id || item.product._id || (item.product as any).id;
                const productName = item.product.name;
                const basePrice = item.product.price || item.price;
                const discount = item.product.discount || 0;
                const activePrice = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;
                const productImage = item.product.images?.[0]?.url || item.product.image;

                return (
                  <div key={itemId} className="flex gap-8 group/item">
                    <div className="w-24 h-32 bg-white/5 rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                      <img src={productImage} alt={productName} className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-white text-sm uppercase tracking-tight line-clamp-2 leading-relaxed">{productName}</h4>
                        <div className="flex items-center gap-4">
                          <p className={`text-xs font-black tracking-widest ${discount > 0 ? 'text-accent-gold' : 'text-white/60'}`}>
                            PKR {activePrice.toFixed(2)}
                          </p>
                          {discount > 0 && (
                            <p className="text-[10px] text-white/20 line-through tracking-widest">
                              PKR {basePrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-sm">
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity - 1)}
                            className="px-4 py-2 hover:bg-white/5 text-white/40 hover:text-white transition-all text-xs"
                          >-</button>
                          <span className="px-4 text-[10px] font-black text-white tracking-widest">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                            className="px-4 py-2 hover:bg-white/5 text-white/40 hover:text-white transition-all text-xs"
                          >+</button>
                        </div>
                        <button onClick={() => removeFromCart(itemId)} className="p-2 text-white/20 hover:text-rose-500 transition-all">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-10 bg-white/5 border-t border-white/5 space-y-8">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Subtotal</span>
                <p className="text-[10px] text-accent-gold uppercase tracking-[0.2em]">Shipping calculated at checkout</p>
              </div>
              <span className="text-3xl font-sans font-black text-white tracking-tighter">PKR {subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full bg-accent-gold text-primary py-6 font-black flex items-center justify-center gap-4 hover:bg-white transition-all shadow-2xl uppercase text-[10px] tracking-[0.5em]"
            >
              <span>Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
