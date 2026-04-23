
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contentService } from '../../services/contentService';
import { productService } from '../../services/productService';

const Footer: React.FC = () => {
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [content, cats] = await Promise.all([
          contentService.getContent('home_page'),
          productService.getCategories()
        ]);
        setCmsContent(content);
        setCategories(cats.map((c: any) => c.name).slice(0, 4));
      } catch (err) {
        console.error('Failed to load footer data');
      }
    };
    fetchData();
  }, []);

  const footer = cmsContent?.footer;
  const siteSettings = cmsContent?.siteSettings;

  return (
    <footer className="bg-primary text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-sans font-black tracking-tighter uppercase mb-6 block">
              Easy Shop <span className="text-accent-gold">and Customer Service</span>
            </Link>
            <p className="text-white/60 text-xs font-sans leading-relaxed max-w-xs uppercase tracking-widest">
              {footer?.description || 'Curating premium wellness products and modern accessories for the discerning shopper. Mindfully sourced, ethically verified.'}
            </p>
            <div className="flex space-x-6 pt-4">
              {footer?.socialLinks?.facebook && (
                <a href={footer.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-sand/60 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {footer?.socialLinks?.twitter && (
                <a href={footer.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-sand/60 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {footer?.socialLinks?.instagram && (
                <a href={footer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent-gold transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent-gold">Collections</h4>
            <ul className="space-y-6">
              <li><Link to="/products" className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">All Treasures</Link></li>
              {categories.map(cat => (
                <li key={cat}>
                  <Link to={`/products?category=${cat}`} className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-accent-gold">Concierge</h4>
            <ul className="space-y-6">
              <li><Link to="/shipping-returns" className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">Shipping & Returns</Link></li>
              <li><Link to="/track-order" className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">Track Order</Link></li>
              <li><Link to="/faq" className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">Help & FAQ</Link></li>
              <li><Link to="/contact" className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">Contact Us</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">About Us</Link></li>
              <li><Link to="/support" className="text-white/50 hover:text-accent-gold text-[11px] font-black uppercase tracking-widest transition-all">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">
          <p>{`© ${new Date().getFullYear()} Easy Shop and Customer Service. All Rights Reserved.`}</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-accent-gold transition-colors">Security Policy</Link>
            <Link to="/terms-of-service" className="hover:text-accent-gold transition-colors">Terms of Acquisition</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
