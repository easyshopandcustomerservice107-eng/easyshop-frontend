import React from 'react';
import { Leaf, Cpu, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const About: React.FC = () => {
    return (
        <div className="bg-primary grain-texture min-h-screen">
            <SEO 
                title="Our Story" 
                description="Learn about the origins of Easy Shop and Customer Service. We provide premium dry fruits, authentic shilajit, and cutting-edge electronic accessories."
            />
            {/* Hero Section */}
            <section className="relative h-[65vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=2457&auto=format&fit=crop"
                    alt="Premium Products"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-[#0B1215]/60 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="text-center text-white px-6">
                        <div className="h-[1px] w-24 bg-accent-gold mx-auto mb-8"></div>
                        <h1 className="text-5xl md:text-8xl font-sans font-black mb-6 tracking-tighter uppercase">Our Story</h1>
                        <p className="text-xs md:text-sm font-black uppercase tracking-[0.6em] text-accent-gold">Easy Shop and Customer Service</p>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-32 px-6 bg-primary border-t border-white/10">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-6xl font-sans font-black text-white mb-12 tracking-tighter uppercase">
                        Premium Quality, <br />
                        <span className="text-accent-gold italic">Everyday Excellence</span>
                    </h2>
                    <p className="text-xl text-white/70 leading-relaxed font-medium">
                        Welcome to Easy Shop and Customer Service. We are dedicated to bringing you the finest selection of natural wellness products, including premium dry fruits and authentic shilajit, alongside cutting-edge electronic accessories designed to elevate your daily life.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 bg-primary border-y border-white/10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
                <div className="container mx-auto max-w-6xl relative z-10">
                    <h2 className="text-xs md:text-sm font-black text-accent-gold text-center mb-20 uppercase tracking-[0.5em]">
                        Our Core Pillars
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Leaf, title: "Natural Wellness", desc: "Sourcing the highest quality dry fruits and purest shilajit directly from nature." },
                            { icon: Cpu, title: "Modern Tech", desc: "Providing reliable and innovative electronic accessories for your modern needs." },
                            { icon: ShieldCheck, title: "Verified Quality", desc: "Every product is strictly inspected to ensure it meets our premium standards." },
                            { icon: Star, title: "Customer First", desc: "Exceptional service and support dedicated to your complete satisfaction." }
                        ].map((value, idx) => (
                            <div key={idx} className="group">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-accent-gold/20 group-hover:bg-accent-gold group-hover:text-primary transition-all duration-500 shadow-xl">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-sans font-black text-white mb-4 uppercase tracking-tight">{value.title}</h3>
                                <p className="text-white/40 text-[11px] font-black uppercase tracking-widest leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-32 px-6 bg-primary border-b border-white/10">
                <div className="container mx-auto max-w-4xl">
                    <div className="space-y-24">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-4xl font-sans font-black text-white mb-8 tracking-tighter">Our Journey</h2>
                                <p className="text-white/70 leading-relaxed mb-6 font-medium">
                                    Our vision began with a simple idea: to create a unified marketplace where customers could find both natural health boosters and modern technological conveniences under one roof without compromising on quality.
                                </p>
                                <p className="text-white/70 leading-relaxed font-medium">
                                    By building direct relationships with organic farmers for our dry fruits and shilajit, and partnering with top-tier tech manufacturers, Easy Shop and Customer Service was established.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                 <img src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=2696&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Premium Dry Fruits" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-4xl font-sans font-black text-white mb-8 tracking-tighter">Our Promise</h2>
                                <p className="text-white/70 leading-relaxed mb-6 font-medium">
                                    Today, we are proud to serve a community that values both well-being and connectivity. Whether you are looking for the nutritional richness of our authentic Shilajit or a reliable charger for your devices, we guarantee excellence.
                                </p>
                                <p className="text-white/70 leading-relaxed font-medium">
                                    Every purchase represents our commitment to fair pricing, transparent sourcing, and unmatched customer support. Choose Easy Shop and Customer Service for a seamless shopping experience.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                 <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Electronic Accessories" />
                            </div>
                        </div>

                        {/* Impact Stats */}
                        <div className="bg-white/[0.02] p-12 md:p-20 shadow-2xl overflow-hidden relative border border-white/5 rounded-sm">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.5em] mb-16 text-center">Our Impact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                                <div>
                                    <div className="text-5xl font-sans font-black text-white mb-4">100<span className="text-accent-gold">%</span></div>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Quality Assured</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-sans font-black text-white mb-4">24/7</div>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Customer Service</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-sans font-black text-white mb-4">Fast</div>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Secure Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-primary text-white grain-texture relative overflow-hidden">
                <div className="absolute inset-0 bg-white/[0.01] pointer-events-none"></div>
                <div className="container mx-auto max-w-3xl text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-sans mb-10 tracking-tighter uppercase font-black">
                        Explore <span className="text-accent-gold italic">Our Store</span>
                    </h1>
                    <p className="text-white/40 mb-12 text-[11px] font-black uppercase tracking-[0.4em] leading-relaxed">
                        Discover the best in natural wellness and modern technology.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-accent-gold text-primary px-12 py-5 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;

