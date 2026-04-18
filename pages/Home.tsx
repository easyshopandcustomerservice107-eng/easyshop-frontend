
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
        description="Welcome to Easy Shop and Customer Service. Discover the world's most exquisite gemstones and rare minerals, ethically sourced from the heart of the North."
        keywords="gemstones, mining, emeralds, sapphires, rubies, rare minerals, ethical sourcing"
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
              <span className="text-accent text-[10px] uppercase tracking-[0.6em] font-black">The Archives</span>
              <div className="h-[1px] w-16 bg-accent/30"></div>
            </div>
            <h2 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-white mb-10 leading-none">
              Geological <span className="italic text-accent-gold">Curations</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto font-sans text-sm md:text-base leading-relaxed tracking-wide">
              Every treasure in our vault is a piece of earth's history. Explore our collections, ethically unearthered from global sources.
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
                Access All Vaults <div className="h-[1px] w-12 bg-accent/20 group-hover:w-24 transition-all duration-500"></div>
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
              <h2 className="text-5xl md:text-6xl font-sans font-black tracking-tighter text-primary">Our Signature Gems</h2>
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

      {/* 5. Our Impact / Story - Professional Editorial Redesign */}
      <section className="py-40 px-6 bg-[#FAF9F6] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">

          {/* Static Editorial Image Composition */}
          <div className="relative order-2 md:order-1">
            <div className="relative aspect-[4/5] z-10">
              {/* Main Image - Large & Stable */}
              <div className="w-full h-full rounded-sm overflow-hidden shadow-2xl">
                <img
                  src={impact.image || "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000"}
                  alt="Sustainable Cotton"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-12 -right-12 w-3/5 aspect-square bg-[#FAF9F6] p-3 shadow-2xl z-20 hidden md:block">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src="https://media.istockphoto.com/id/1137526672/photo/young-woman-with-fabric-samples-for-curtains-at-table-multiple-color-fabric-texture-samples.jpg?s=612x612&w=0&k=20&c=kfgV-pvqjYouJ0tfX_B691UKumlA1yTB4JEzXU-qQN0="
                    alt="Fabric Detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-primary/5 pointer-events-none" />
            </div>
          </div>

          {/* Sophisticated Content Reveal */}
          <div className="order-1 md:order-2">
            <div>
              <div className="flex items-center gap-4 text-accent-gold mb-8">
                <span className="w-12 h-[1px] bg-accent-gold/40"></span>
                <span className="text-[11px] uppercase tracking-[0.4em] font-black">Our Heritage</span>
              </div>

              <h2 className="text-6xl md:text-7xl font-sans font-light mb-10 leading-[1.1] text-primary">
                {impact.title || "Unearth the Rare"} <br />
                <span className="italic text-primary/60 font-sans block mt-3 indent-8 md:indent-16">
                  {impact.highlight || "Gems of the North"}
                </span>
              </h2>

              <p className="text-primary/60 font-sans leading-[1.8] text-lg mb-12 max-w-lg">
                {impact.description || "We believe that true beauty is forged in nature. Easy Shop and Customer Service is committed to ethical excavation and transparent sourcing. We work directly with master miners to ensure every stone is a testament to geological perfection."}
              </p>

              {/* Minimalist Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-t border-primary/5 pt-12">
                {[
                  { label: "Natural Quality", value: "100%" },
                  { label: "Conflict Free", value: "0%" },
                  { label: "Expert Cut", value: "Pure" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-sans text-3xl text-primary">{stat.value}</h4>
                    <p className="text-[10px] text-primary/40 uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black text-primary hover:text-accent-gold transition-all"
                >
                  <span className="border-b-2 border-primary/5 group-hover:border-accent-gold pb-3 transition-all">Discover the History</span>
                  <div className="w-14 h-14 border border-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all shadow-xl">
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 text-primary group-hover:text-accent-gold" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="bg-white">
        <Testimonials />
      </div>

      {/* 6. Newsletter / CTA Callout */}
      <section className="py-32 px-6 text-center bg-[#12181B] overflow-hidden">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-sans font-black text-white mb-6 uppercase tracking-tighter">Join the <span className="text-accent-gold">Discovery</span></h2>
          <p className="text-white/40 mb-10 text-xs uppercase tracking-[0.3em] font-black">Secure early access to the latest vault additions.</p>
          <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/10 rounded-sm">
            <input 
              type="email" 
              placeholder="YOUR VAULT EMAIL" 
              className="flex-1 bg-transparent px-6 py-4 text-[10px] font-black text-white tracking-widest outline-none" 
            />
            <button className="bg-accent-gold text-primary px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white transition-colors">Join</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;