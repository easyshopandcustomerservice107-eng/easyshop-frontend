
import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { wishlistService } from '../../services/wishlistService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { isLoggedIn, user, refreshUser } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    if (user?.wishlist) {
      const wishIds = (user.wishlist as any[]).map(item => typeof item === 'string' ? item : item._id);
      return wishIds.includes(product._id);
    }
    return false;
  });

  const hasDiscount = product.discount && product.discount > 0;
  const salePrice = hasDiscount ? product.price * (1 - product.discount! / 100) : product.price;

  return (
    <div
      className="group flex flex-col h-full relative bg-primary grain-texture overflow-hidden shadow-2xl transition-all duration-500 border border-white/10 hover:border-accent-gold/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <Link to={`/products/${product.slug || product.id}`} rel="noopener noreferrer" className="relative aspect-[4/5] overflow-hidden bg-primary/5 block">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'}`}
        />
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Badges - Simple & Professional */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.stock === 0 && (
            <div className="bg-rose-500 px-3 py-1.5 rounded-sm">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Sold Out</span>
            </div>
          )}
          {hasDiscount && (
            <div className="bg-accent-gold px-3 py-1.5 rounded-sm shadow-lg">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">-{product.discount}% Discount</span>
            </div>
          )}
        </div>

        {/* Wishlist Marker */}
        <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isLoggedIn) {
              toast.error('Please login to use wishlist');
              return;
            }
            try {
              await wishlistService.toggleWishlist(product._id);
              setIsWishlisted(!isWishlisted);
              await refreshUser();
              toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
            } catch (err) {
              toast.error('Failed to update wishlist');
            }
          }}
          className={`absolute top-4 right-4 p-3 rounded-full ${isWishlisted ? 'bg-accent-gold border-accent-gold text-primary' : 'bg-primary/95 border border-white/10 text-white/40 hover:text-white'} shadow-2xl transition-all duration-500 transform hover:scale-110`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Button - Clean Slide Up */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ease-out z-20 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (product.stock > 0) addToCart(product);
            }}
            disabled={product.stock === 0}
            className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl border ${product.stock > 0
              ? 'bg-accent-gold text-primary border-accent-gold hover:bg-white hover:border-white'
              : 'bg-white/5 text-white/20 border-white/10 cursor-not-allowed'
              }`}
          >
            <span className="relative z-10">{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
        
        <div className={`absolute inset-0 bg-primary/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </Link>

        <div className="flex flex-col flex-grow text-center p-8 space-y-4">
        <div className="space-y-2">
          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="text-[11px] font-black text-white hover:text-accent-gold transition-all duration-300 line-clamp-2 min-h-[44px] tracking-[0.25em] uppercase leading-relaxed">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-center space-x-3">
            <div className="h-[1px] w-6 bg-accent-gold/20"></div>
            <p className="text-[9px] text-accent-gold font-black uppercase tracking-[0.3em]">{product.category}</p>
            <div className="h-[1px] w-6 bg-accent-gold/20"></div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {hasDiscount ? (
            <div className="flex items-center gap-4">
              <span className="text-lg font-sans font-black text-white">
                PKR {salePrice.toLocaleString()}
              </span>
              <span className="text-[10px] font-black text-white/40 line-through tracking-widest">
                PKR {product.price.toLocaleString()}
              </span>
            </div>
          ) : (
            <p className="text-lg font-sans font-black text-white tracking-tighter">
              PKR {product.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
