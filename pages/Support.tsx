import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import SEO from '../components/common/SEO';

const Support: React.FC = () => {
    return (
        <div className="bg-primary grain-texture min-h-screen">
            <SEO 
                title="Support" 
                description="Contact Northern Treasures for assistance with your gemstone and rare mineral inquiries."
            />
            {/* Hero Section */}
            <section className="relative h-[45vh] overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1215] flex items-center justify-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
                    <div className="text-center text-white px-6 relative z-10">
                        <div className="h-[1px] w-24 bg-accent-gold mx-auto mb-8"></div>
                        <h1 className="text-5xl md:text-7xl font-sans font-black mb-6 tracking-tighter uppercase">Support</h1>
                        <p className="text-xs md:text-sm font-black uppercase tracking-[0.6em] text-accent-gold">We are here to help</p>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-24 px-6 bg-primary border-t border-white/10 text-white relative overflow-hidden">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <h2 className="text-xs md:text-sm font-black text-accent-gold text-center mb-20 uppercase tracking-[0.5em]">
                        Get In Touch
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                        <div className="bg-white/5 p-10 border border-white/10 hover:border-accent-gold/50 transition-all group flex flex-col items-center text-center shadow-xl">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-accent-gold/20 group-hover:bg-accent-gold group-hover:text-primary transition-all duration-500">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-sans font-black text-white mb-2 uppercase tracking-tight">Phone</h3>
                            <p className="text-white/70 text-sm font-medium">
                                +1 (555) 123-4567
                            </p>
                            <p className="text-white/40 text-[10px] mt-4 uppercase tracking-widest">Mon-Fri 9am-6pm</p>
                        </div>

                        <div className="bg-white/5 p-10 border border-white/10 hover:border-accent-gold/50 transition-all group flex flex-col items-center text-center shadow-xl">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-accent-gold/20 group-hover:bg-accent-gold group-hover:text-primary transition-all duration-500">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-sans font-black text-white mb-2 uppercase tracking-tight">WhatsApp</h3>
                            <p className="text-white/70 text-sm font-medium">
                                +1 (555) 123-4567
                            </p>
                            <p className="text-white/40 text-[10px] mt-4 uppercase tracking-widest">Quick Replies</p>
                        </div>

                        <div className="bg-white/5 p-10 border border-white/10 hover:border-accent-gold/50 transition-all group flex flex-col items-center text-center shadow-xl">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-accent-gold/20 group-hover:bg-accent-gold group-hover:text-primary transition-all duration-500">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-sans font-black text-white mb-2 uppercase tracking-tight">Email</h3>
                            <p className="text-white/70 text-sm font-medium">
                                support@northerntreasures.com
                            </p>
                            <p className="text-white/40 text-[10px] mt-4 uppercase tracking-widest">24/7 Support</p>
                        </div>

                        <div className="bg-white/5 p-10 border border-white/10 hover:border-accent-gold/50 transition-all group flex flex-col items-center text-center shadow-xl">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-accent-gold/20 group-hover:bg-accent-gold group-hover:text-primary transition-all duration-500">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-sans font-black text-white mb-2 uppercase tracking-tight">Location</h3>
                            <p className="text-white/70 text-sm font-medium leading-relaxed">
                                123 Gemstone Avenue<br />
                                Suite 400<br />
                                New York, NY 10001
                            </p>
                            <p className="text-white/40 text-[10px] mt-4 uppercase tracking-widest">Headquarters</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Support;
