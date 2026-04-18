import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Heart, Share2, ChevronRight, Camera, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Product, Review as ProductReview } from '../types';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { wishlistService } from '../services/wishlistService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';

const normalizeProduct = (product: Product): Product => ({
  ...product,
  id: product._id,
  image: product.images?.[0]?.url || product.image || '',
  secondaryImage: product.images?.[1]?.url || product.secondaryImage || '',
  reviewsCount: product.numOfReviews || 0,
  rating: product.rating || (product as any).ratings || 0,
  category: typeof product.category === 'string' ? product.category : product.category?.name || 'All',
  specifications: product.specifications || []
});

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isLoggedIn, user, refreshUser } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const productData = await productService.getProduct(id);
        const reviewsData = await reviewService.getProductReviews(productData._id);

        setProduct(normalizeProduct(productData));
        setReviews(reviewsData);

        // Check if user has already reviewed
        if (user) {
          const userReview = reviewsData.find((r: any) =>
            (typeof r.user === 'string' ? r.user === user._id : r.user._id === user._id)
          );
          if (userReview) setHasReviewed(true);

          // Check wishlist
          if (user.wishlist) {
            const wishIds = (user.wishlist as any[]).map(item => typeof item === 'string' ? item : item._id);
            setIsWishlisted(wishIds.includes(productData._id));
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <Loader fullPage color="#4A5D4E" />;

  if (error || !product) return (
    <div className="min-h-screen bg-[#eff0f5] py-4 font-sans text-[#212121]">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h2>
      <Link to="/products" className="text-accent-gold font-bold hover:underline">Back to Products</Link>
    </div>
  );


  return (
    <div className="min-h-screen bg-white text-black py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEO 
          title={product.name} 
          description={product.description}
          keywords={`${product.name}, ${product.category}, gemstone, easy shop and customer service`}
        />
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-black/40 mb-8">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-black transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black font-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square rounded-sm overflow-hidden bg-black/5 border border-black/5">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-sm overflow-hidden border border-black/5 cursor-pointer hover:border-accent-gold transition-all">
                    <img src={img.url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="aspect-square rounded-sm overflow-hidden border border-black/5 bg-black/5 flex items-center justify-center text-black/20 text-[10px] font-black uppercase tracking-widest">
                  No Gallery
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block bg-accent-gold/10 text-accent-gold text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-sm mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-black text-black tracking-tighter uppercase mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="flex text-accent-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm font-black text-black">{product.rating}</span>
                </div>
                <span className="h-1 w-1 rounded-full bg-black/10" />
                <button className="text-sm font-black text-black/40 hover:text-accent-gold uppercase tracking-widest transition-colors">
                  {product.reviewsCount} verified reviews
                </button>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              {product.discount && product.discount > 0 ? (
                <div className="flex items-center gap-4">
                  <p className="text-4xl font-black text-black tracking-tighter">PKR {(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                  <div className="flex flex-col">
                    <p className="text-lg font-black text-black/20 line-through">PKR {product.price.toFixed(2)}</p>
                    <span className="text-[10px] font-black text-accent-gold uppercase tracking-[0.2em]">{product.discount}% DISCOUNT</span>
                  </div>
                </div>
              ) : (
                <p className="text-4xl font-black text-black tracking-tighter">PKR {product.price.toFixed(2)}</p>
              )}
            </div>

            {/* Stock Availability Indicator */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 10 ? 'text-green-600' : 'text-amber-600'}`}>
                    {product.stock > 10 ? 'In Stock' : `Limited Stock: ${product.stock} Units Remaining`}
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Out of Stock</p>
                </div>
              )}
            </div>

            <p className="text-black/60 leading-relaxed mb-10 text-lg font-medium">
              {product.description}
            </p>

            <div className="space-y-8 pb-10 border-b border-black/5">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-black/10 rounded-sm px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="text-black/40 hover:text-black p-2 font-black disabled:opacity-20 transition-colors"
                  >-</button>
                  <span className="w-12 text-center font-black text-black">{product.stock === 0 ? 0 : quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={product.stock === 0 || quantity >= product.stock}
                    className="text-black/40 hover:text-black p-2 font-black disabled:opacity-20 transition-colors"
                  >+</button>
                </div>
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock === 0}
                  className="flex-1 bg-accent-gold text-primary py-5 rounded-sm font-black flex items-center justify-center space-x-3 hover:bg-black hover:text-white transition-all uppercase text-xs tracking-[0.3em] disabled:bg-black/5 disabled:text-black/20"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={async () => {
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
                  className={`flex-1 flex items-center justify-center space-x-2 border py-4 rounded-sm font-black transition-all uppercase text-[10px] tracking-widest ${isWishlisted ? 'bg-accent-gold border-accent-gold text-primary' : 'border-black/10 text-black/60 hover:border-black hover:text-black'}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button className="p-4 border border-black/10 rounded-sm text-black/40 hover:text-black hover:border-black transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-black/5 mt-16 pt-10">
          <div className="flex flex-wrap gap-8 mb-10 border-b border-black/5 pb-2">
            {['Description', 'Specifications', 'Reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === tab.toLowerCase() ? 'text-accent-gold' : 'text-black/40 hover:text-black'}`}
              >
                {tab}
                {activeTab === tab.toLowerCase() && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl leading-relaxed text-black/60 text-lg mb-20">
            {activeTab === 'description' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {product.specifications && product.specifications.length > 0 ? (
                  product.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between py-4 border-b border-black/5">
                      <span className="font-black text-black uppercase text-[10px] tracking-widest">{spec.key}</span>
                      <span className="text-sm font-medium">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-black/20 italic text-sm">No specifications available.</p>
                )}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Review Submission Form */}
                {isLoggedIn && !hasReviewed && (
                  <div className="bg-black/5 p-10 rounded-sm">
                    {!showReviewForm ? (
                      <div className="text-center">
                        <p className="text-black/40 mb-6 font-black uppercase text-[10px] tracking-[0.2em]">Shared your experience yet?</p>
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="bg-black text-white px-10 py-4 rounded-sm font-black text-[10px] uppercase tracking-[0.4em] hover:bg-accent-gold hover:text-primary transition-all shadow-xl"
                        >
                          Write a Review
                        </button>
                      </div>
                    ) : (
                      <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="text-xl font-black text-black uppercase tracking-widest">Submit Review</h3>
                          <button onClick={() => setShowReviewForm(false)} className="text-black/40 hover:text-black">
                            <X className="h-6 w-6" />
                          </button>
                        </div>

                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          if (!product?._id) return;
                          try {
                            setSubmittingReview(true);
                            const formData = new FormData();
                            formData.append('product', product._id);
                            formData.append('rating', rating.toString());
                            formData.append('comment', comment);
                            images.forEach(img => formData.append('images', img));

                            await reviewService.createReview(formData);
                            toast.success('Review published');

                            const updatedReviews = await reviewService.getProductReviews(product._id);
                            setReviews(updatedReviews);
                            setHasReviewed(true);
                            setShowReviewForm(false);

                            if (product) {
                              const newCount = updatedReviews.length;
                              const newRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / newCount;
                              setProduct({ ...product, rating: newRating, reviewsCount: newCount });
                            }
                          } catch (err: any) {
                            toast.error(err.message || 'Submission failed');
                          } finally {
                            setSubmittingReview(false);
                          }
                        }} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-3">Rating</label>
                              <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                  >
                                    <Star className={`h-6 w-6 ${star <= rating ? 'text-accent-gold fill-current' : 'text-black/10'}`} />
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-3">Photos (Max 3)</label>
                              <div className="flex gap-4">
                                {imagePreviews.map((preview, i) => (
                                  <div key={i} className="relative w-14 h-14 rounded-sm overflow-hidden group border border-black/5">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newImages = [...images];
                                        const newPreviews = [...imagePreviews];
                                        newImages.splice(i, 1);
                                        newPreviews.splice(i, 1);
                                        setImages(newImages);
                                        setImagePreviews(newPreviews);
                                      }}
                                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-4 w-4 text-white" />
                                    </button>
                                  </div>
                                ))}
                                {images.length < 3 && (
                                  <label className="w-14 h-14 rounded-sm border-2 border-dashed border-black/10 flex items-center justify-center cursor-pointer hover:border-accent-gold hover:bg-accent-gold/5 transition-all text-black/20 hover:text-accent-gold">
                                    <Camera className="h-5 w-5" />
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      className="hidden"
                                      onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        if (files.length + images.length > 3) {
                                          toast.error('Limit 3 images');
                                          return;
                                        }
                                        setImages([...images, ...files]);
                                        const newPreviews = files.map(file => URL.createObjectURL(file as Blob));
                                        setImagePreviews([...imagePreviews, ...newPreviews]);
                                      }}
                                    />
                                  </label>
                                )}
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-black/40 mb-3">Your Perspective</label>
                            <textarea
                              required
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Describe your experience with this treasure..."
                              className="w-full bg-white border border-black/10 rounded-sm p-6 text-sm font-medium focus:border-accent-gold outline-none min-h-[150px] transition-all"
                            />
                          </div>

                          <div className="flex gap-4">
                            <button
                              type="button"
                              onClick={() => setShowReviewForm(false)}
                              className="flex-1 px-8 py-4 border border-black/10 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all underline decoration-1 underline-offset-4"
                            >
                              Discard
                            </button>
                            <button
                              type="submit"
                              disabled={submittingReview}
                              className="flex-[2] bg-accent-gold text-primary py-4 rounded-sm font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all disabled:opacity-50 shadow-xl"
                            >
                              {submittingReview ? 'Submitting...' : 'Publish Review'}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}

                {!isLoggedIn && (
                  <div className="bg-black/5 p-12 rounded-sm text-center border border-black/5">
                    <p className="text-black font-black uppercase text-[10px] tracking-widest mb-6">Shared your thoughts with the collection?</p>
                    <Link to="/login" className="inline-block bg-black text-white px-10 py-4 rounded-sm font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent-gold hover:text-primary transition-all shadow-xl">
                      Sign in to Review
                    </Link>
                  </div>
                )}

                {hasReviewed && (
                  <div className="bg-green-500/5 p-8 rounded-sm border border-green-500/10 flex items-center space-x-6">
                    <div className="bg-green-500 rounded-full p-2 text-white">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <p className="text-green-800 font-black uppercase text-[10px] tracking-widest">Contributor Status Verified: Thank you for your perspective.</p>
                  </div>
                )}

                <div className="space-y-12">
                  {reviews.length === 0 ? (
                    <p className="text-black/20 italic text-sm">Be the first to share a perspective on this treasure.</p>
                  ) : (
                    reviews.map(review => (
                      <div key={review._id} className="border-b border-black/5 pb-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center font-black text-accent-gold overflow-hidden">
                              {review.user.avatar ? (
                                <img src={review.user.avatar} alt={review.user.name} className="w-full h-full object-cover" />
                              ) : (
                                review.user.name.slice(0, 2).toUpperCase()
                              )}
                            </div>
                            <div>
                              <h6 className="font-black text-black text-[11px] uppercase tracking-widest">{review.user.name}</h6>
                              <span className="text-[9px] text-black/40 font-black uppercase tracking-widest">Verified Owner • {new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex text-accent-gold space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-black/10'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-black/60 leading-relaxed font-medium pl-16 italic">"{review.comment}"</p>
                        {review.images && review.images.length > 0 && (
                          <div className="mt-8 flex flex-wrap gap-4 pl-16">
                            {review.images.map((img, i) => (
                              <img key={i} src={img.url} alt="Review" className="w-28 h-28 object-cover rounded-sm border border-black/5" />
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
;

export default ProductDetail;
