import React from 'react';
import { Gem, Heart, Users, Award, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const About: React.FC = () => {
    return (
        <div className="bg-primary grain-texture min-h-screen">
            <SEO 
                title="Our Story" 
                description="Learn about the origins of Easy Shop and Customer Service. From the heart of the earth to your collection, we specialize in ethically sourced gemstones."
            />
            {/* Hero Section */}
            <section className="relative h-[65vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1515555233972-7bc928c60a11?q=80&w=2457&auto=format&fit=crop"
                    alt="Gemstone Mining"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-[#0B1215]/50 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="text-center text-white px-6">
                        <div className="h-[1px] w-24 bg-accent-gold mx-auto mb-8"></div>
                        <h1 className="text-6xl md:text-8xl font-sans font-black mb-6 tracking-tighter uppercase">Our Legacy</h1>
                        <p className="text-xs md:text-sm font-black uppercase tracking-[0.6em] text-accent-gold">Excellence in Mining Since 1995</p>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-32 px-6 bg-primary border-t border-white/10">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-5xl md:text-7xl font-sans font-black text-white mb-12 tracking-tighter uppercase">
                        Forged in Earth, <br />
                        <span className="text-accent-gold italic">Perfected for You</span>
                    </h2>
                    <p className="text-xl text-white/70 leading-relaxed font-medium">
                        We believe that every gemstone tells a story. Founded in 1995,
                        Easy Shop and Customer Service was born from a passion for geological wonders and
                        a commitment to ethical excavation. What started as a small exploration team
                        has grown into a premier source for rare minerals and high-quality gems.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6 bg-primary border-y border-white/10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
                <div className="container mx-auto max-w-6xl relative z-10">
                    <h2 className="text-xs md:text-sm font-black text-accent-gold text-center mb-20 uppercase tracking-[0.5em]">
                        The Foundations of the Discovery
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Mountain, title: "Responsible Mining", desc: "100% reclamation of mining sites, zero toxic run-off, and low-impact extraction" },
                            { icon: Heart, title: "Curated Excellence", desc: "Every stone is hand-inspected by our master gemologists for unparalleled clarity" },
                            { icon: Users, title: "Direct Lineage", desc: "Verified conflict-free sourcing with full transparency of the stone's journey" },
                            { icon: Award, title: "Legacy Standard", desc: "Inheritance-grade specimens designed to transcend generations and traditions" }
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
                                <h2 className="text-4xl font-sans font-black text-white mb-8 tracking-tighter">Our Origins</h2>
                                <p className="text-white/70 leading-relaxed mb-6 font-medium">
                                    Our founder, inspired by a childhood exploration of local markets, recognized that
                                    the gemstone industry needed a more transparent and ethical approach. Rare minerals
                                    were often sourced from conflict zones or through methods that devastated the environment.
                                </p>
                                <p className="text-white/70 leading-relaxed font-medium">
                                    After decades of establishing direct relationships with verified mines and developing
                                    proprietary sorting technologies, Easy Shop and Customer Service was established.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                 <img src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Rare Specimen" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-4xl font-sans font-black text-white mb-8 tracking-tighter">Our Promise</h2>
                                <p className="text-white/70 leading-relaxed mb-6 font-medium">
                                    Today, we are proud to be a global leader in ethical gemstone sourcing. We continuously invest 
                                    in gemological research, support local mining communities, and push for international
                                    conflict-free standards.
                                </p>
                                <p className="text-white/70 leading-relaxed font-medium">
                                    Every acquisition supports responsible excavation, environmental restoration, and 
                                    fair labor practices. When you choose Easy Shop and Customer Service, you're not just
                                    acquiring a gem—you're preserving a piece of history.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                 <img src="https://images.unsplash.com/photo-1596756627581-64531853a479?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Expert Sorting" />
                            </div>
                        </div>

                        {/* Impact Stats */}
                        <div className="bg-white/[0.02] p-12 md:p-20 shadow-2xl overflow-hidden relative border border-white/5 rounded-sm">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.5em] mb-16 text-center">Our Heritage</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                                <div>
                                    <div className="text-5xl font-sans font-black text-white mb-4">25<span className="text-accent-gold">+</span></div>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Years Expertise</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-sans font-black text-white mb-4">1,000<span className="text-accent-gold">+</span></div>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Verified Stones</p>
                                </div>
                                <div>
                                    <div className="text-5xl font-sans font-black text-white mb-4">Global</div>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Direct Sourcing</p>
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
                        Discover <span className="text-accent-gold italic">The Vault</span>
                    </h1>
                    <p className="text-white/40 mb-12 text-[11px] font-black uppercase tracking-[0.4em] leading-relaxed">
                        Begin your journey into the world of rare gemstones and minerals.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-accent-gold text-primary px-12 py-5 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl"
                    >
                        Access Collection
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
