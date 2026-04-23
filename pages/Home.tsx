
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Leaf, Award, Recycle } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { Product } from '../types';
import { productService } from '../services/productService';
import { contentService } from '../services/contentService';
import Testimonials from '../components/sections/Testimonials';
import Hero from '../components/sections/Hero';
import FlashSale from '../components/sections/FlashSale';
// import { motion } from 'framer-motion';
import Loader from '../components/common/Loader';
import SEO from '../components/common/SEO';

const normalizeProduct = (product: any): Product => ({
  ...product,
  id: product._id || product.id,
  image: product.images?.[0]?.url || product.image || '',
  secondaryImage: product.images?.[1]?.url || product.secondaryImage || '',
  reviewsCount: product.numOfReviews || product.reviewsCount || 0,
  category: typeof product.category === 'string' ? product.category : product.category?.name || 'All',
});

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Step 1: Fetch CMS content first to get the dynamic limit
        const contentData = await contentService.getContent('home_page');
        const limit = contentData?.latestAdditions?.count || 8;

        // Step 2: Fetch products and categories
        const [productsData, categoriesData] = await Promise.all([
          productService.getProducts({ limit }),
          productService.getCategories()
        ]);

        // Handle Products
        let prods = [];
        if (productsData.products) prods = productsData.products;
        else if (Array.isArray(productsData)) prods = productsData;

        // Handle Categories
        let cats = [];
        if (Array.isArray(categoriesData)) {
          cats = categoriesData;
        } else if ((categoriesData as any)?.categories && Array.isArray((categoriesData as any).categories)) {
          cats = (categoriesData as any).categories;
        }

        setProducts(prods.map(normalizeProduct));
        setCategories(cats);
        setCmsContent(contentData);
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader fullPage color="#4A5D4E" />;

  const hero = cmsContent?.hero || {};
  const impact = cmsContent?.impact || {};
  const usps = cmsContent?.usps || [
    { icon: 'gem', text: 'Certified Natural & Ethical' },
    { icon: 'mountain', text: 'Direct from Our Suppliers' },
    { icon: 'star', text: 'Masterfully Cut & Polished' }
  ];

  return (
    <div className="bg-background text-primary overflow-x-hidden w-full relative">
      <SEO 
        title="Home" 
        description="Welcome to Easy Shop and Customer Service. Discover our premium selection of wellness products and modern accessories."
        keywords="wellness, mobile accessories, shilajit, dry fruits, easy shop"
      />
      {/* 1. USP Bar (Top of Home) */}
      <div className="bg-primary text-white py-3 border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 text-[10px] font-black uppercase tracking-[0.3em]">
          {usps.map((usp: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-accent-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
              <span className="opacity-80">{usp.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Hero Section */}
      <Hero cmsData={cmsContent} />

      {/* 2.5 Flash Sale Section */}

      {/* 3. Zenith Category Exploration */}
      <section className="py-40 px-6 bg-vault relative overflow-hidden">
        {/* Background Atmospheric Blur */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="h-[1px] w-16 bg-accent/30"></div>
              <span className="text-accent text-[10px] uppercase tracking-[0.6em] font-black">Digital Catalog</span>
              <div className="h-[1px] w-16 bg-accent/30"></div>
            </div>
            <h2 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-white mb-10 leading-none">
              Tech <span className="italic text-accent-gold">Showcase</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto font-sans text-sm md:text-base leading-relaxed tracking-wide">
              Explore our premium selection of mobile phones, accessories, and cutting-edge electronics. Engineered for performance and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.filter(c => c.name !== 'All').slice(0, 6).map((cat, idx) => (
              <div key={cat._id || idx} className="opacity-100 transform-none">
                <Link to={`/products?category=${cat.name || cat}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 hover:border-accent/40 transition-all duration-500">
                  <div className="absolute inset-0">
                    <img
                      src={cat.image?.url || cat.image || `https://images.unsplash.com/photo-1522771753035-0a15395037be?q=80&w=1000&auto=format&fit=crop`}
                      alt={cat.name}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vault via-vault/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="overflow-hidden mb-4">
                      <div className="h-[1px] w-12 bg-accent shadow-lg transition-all duration-500 group-hover:w-full"></div>
                    </div>
                    <h3 className="text-3xl font-sans font-black text-white mb-2 group-hover:text-accent-gold transition-colors duration-300">
                      {cat.name || cat}
                    </h3>
                    <div className="flex items-center gap-4 text-white/40 text-[9px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span>View Collection</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <Link to="/products" className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-accent/60 hover:text-accent transition-all group">
                View Full Catalog <div className="h-[1px] w-12 bg-accent/20 group-hover:w-24 transition-all duration-500"></div>
             </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <div className="h-[2px] w-8 bg-accent-gold"></div>
                <span className="text-accent-gold text-[10px] uppercase tracking-[0.4em] font-black">Highly Coveted</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-sans font-black tracking-tighter text-primary">Our Products</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-primary/40 hover:text-primary transition-all pb-2 border-b border-primary/5 hover:border-accent-gold">
              Explore All <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>


      <FlashSale cmsData={cmsContent?.flashSale} />



      {/* Testimonials Section */}
      <div className="bg-white">
        <Testimonials />
      </div>


    </div>
  );
};

export default Home;