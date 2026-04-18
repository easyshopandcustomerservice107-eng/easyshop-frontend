import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { Product } from '../../types';
import { productService } from '../../services/productService';

interface FlashSaleProps {
    cmsData?: {
        enabled: boolean;
        endTime?: string;
        title?: string;
        subtitle?: string;
        discount?: number;
        products?: Product[];
    };
}

const FlashSale: React.FC<FlashSaleProps> = ({ cmsData }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const fetchFlashSaleProducts = async () => {
            try {
                if (cmsData?.products && cmsData.products.length > 0) {
                    setProducts(cmsData.products.map(p => {
                        const individualDiscount = p.discount || 0;
                        const globalDiscount = cmsData.discount || 0;
                        const effectiveDiscount = individualDiscount > 0 ? individualDiscount : globalDiscount;

                        return {
                            ...p,
                            id: (p as any)._id || p.id,
                            image: (p as any).images?.[0]?.url || (p as any).image || '',
                            category: typeof p.category === 'string' ? p.category : (p as any).category?.name || 'All',
                            discount: effectiveDiscount
                        };
                    }));
                    return;
                }

                const data = await productService.getProducts({
                    limit: 4,
                    sort: '-discount',
                    'discount[gt]': 0
                });

                if (data.products) {
                    setProducts(data.products.map(p => ({
                        ...p,
                        id: (p as any)._id || p.id,
                        image: (p as any).images?.[0]?.url || (p as any).image || '',
                        category: typeof p.category === 'string' ? p.category : (p as any).category?.name || 'All',
                    })));
                }
            } catch (err) {
                console.error('Failed to fetch flash sale products', err);
            }
        };

        fetchFlashSaleProducts();

        const calculateTimeLeft = () => {
            if (!cmsData?.endTime) return;

            const target = new Date(cmsData.endTime).getTime();
            const now = new Date().getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60))),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [cmsData]);

    if (!cmsData?.enabled || products.length === 0) return null;

    const formatTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <section className="py-32 px-6 bg-vault text-background overflow-hidden relative border-y border-white/5">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-gold/3 rounded-full blur-[140px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-6 mb-8">
                            <span className="text-accent-gold text-xs uppercase tracking-[0.5em] font-black">
                                {cmsData.subtitle || 'Exclusive Flash Acquisition'}
                            </span>
                            <div className="flex items-center gap-2.5 px-4 py-1.5 bg-accent-gold rounded-full border border-accent-gold/20">
                                <Zap className="h-4 w-4 text-primary fill-primary" />
                                <span className="text-[10px] text-primary font-black uppercase tracking-widest">Live Terminal</span>
                            </div>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-sans font-black text-white mb-10 tracking-tighter leading-tight uppercase">
                            {cmsData.title || 'The Vault Opening'}
                        </h2>

                        <div className="flex gap-10">
                            {[
                                { label: 'Hr', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Sec', value: timeLeft.seconds }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-6xl md:text-7xl font-sans text-white">{formatTime(item.value)}</span>
                                        {idx < 2 && <span className="text-accent-gold/20 text-4xl font-sans">:</span>}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-accent-gold font-black">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link to="/products" className="hidden md:flex items-center gap-4 text-accent-gold/60 hover:text-accent-gold transition-all duration-500 group pb-4 border-b border-white/10 hover:border-accent-gold">
                        <span className="text-[11px] uppercase tracking-[0.4em] font-black">Access All Treasures</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-3" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {products.map((product) => (
                        <div key={product.id} className="relative group/card">
                            <div className="bg-primary/5 rounded-sm p-4 transition-all duration-500 hover:-translate-y-4">
                                <ProductCard product={product} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center md:hidden">
                    <Link to="/products" className="inline-flex items-center gap-4 bg-accent-gold text-primary px-10 py-4 rounded-sm font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all shadow-xl">
                        Explore Offers
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
