import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would send to a backend endpoint
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="bg-background min-h-screen grain-texture">
            <SEO 
                title="Contact the Vault" 
                description="Contact Easy Shop and Customer Service for inquiries about rare gemstones, mineral specimens, or wholesale opportunities. Our gemologists are here to help."
            />
            {/* Hero Section */}
            <section className="bg-[#0B1215] py-32 px-6 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-[120px]" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h1 className="text-6xl md:text-8xl font-sans font-black text-white mb-8 tracking-tighter uppercase">
                        Inquire at <br />
                        <span className="text-accent-gold italic">The Vault</span>
                    </h1>
                    <p className="text-xs md:text-sm font-black uppercase tracking-[0.6em] text-accent-gold">
                        Official Discovery Terminal
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-16 border border-primary/5 shadow-2xl">
                            <h2 className="text-3xl font-sans font-black text-primary mb-10 tracking-tight uppercase">Secure inquiry</h2>
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                                            Signature
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-8 py-5 bg-primary/5 border border-transparent focus:border-accent-gold/30 outline-none transition-all font-bold text-xs uppercase tracking-widest"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                                            Digital Signal
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-8 py-5 bg-primary/5 border border-transparent focus:border-accent-gold/30 outline-none transition-all font-bold text-xs uppercase tracking-widest"
                                            placeholder="email@vault.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                                        Subject of discovery
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-8 py-5 bg-primary/5 border border-transparent focus:border-accent-gold/30 outline-none transition-all font-bold text-xs uppercase tracking-widest"
                                        placeholder="How can we assist?"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-8 py-6 bg-primary/5 border border-transparent focus:border-accent-gold/30 outline-none transition-all font-bold text-xs uppercase tracking-widest resize-none"
                                        placeholder="Detailed description..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white px-10 py-6 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-accent-gold hover:text-primary transition-all shadow-xl flex items-center justify-center gap-4"
                                >
                                    <Send className="w-4 h-4" />
                                    Transmit Signal
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-12 py-10">
                            <div>
                                <h2 className="text-4xl font-sans font-black text-primary mb-10 tracking-tight">Channels of Discovery</h2>
                                <p className="text-primary/70 leading-relaxed max-w-md font-medium">
                                    Whether you are a seasoned collector or beginning your discovery, our dedicated gemologists are available for private consultations and technical inquiries.
                                </p>
                            </div>

                            <div className="space-y-10">
                                {[
                                    { icon: Mail, title: "Official Signal", info: "support@easyshop.com", sub: "Response within 24 standard hours" },
                                    { icon: Phone, title: "Audio Transmission", info: "+1 (800) GEMS-NOR", sub: "Mon-Fri, 9am-5pm MST" },
                                    { icon: MapPin, title: "Vault Headquarters", info: "Yellowknife, NT X1A 2P7 Canada", sub: "452 Mineral Range Road" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-8 group">
                                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0 border border-transparent group-hover:border-accent-gold/20 transition-all duration-500">
                                            <item.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-[10px] uppercase tracking-[0.5em] text-primary/40 font-black mb-2">{item.title}</h3>
                                            <p className="text-xl font-sans font-black text-primary mb-1 uppercase tracking-tight">{item.info}</p>
                                            <p className="text-[10px] font-black text-accent-gold uppercase tracking-[0.2em]">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Business Hours */}
                            <div className="bg-primary/5 p-10 border border-primary/5 shadow-xl">
                                <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-8">Vault Operating Hours</h3>
                                <div className="space-y-6">
                                    {[
                                        { days: "Monday - Friday", hours: "09:00 - 18:00 MST" },
                                        { days: "Saturday", hours: "10:00 - 16:00 MST" },
                                        { days: "Sunday / Holidays", hours: "Reserved for Discovery" }
                                    ].map((slot, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] border-b border-primary/5 pb-5 last:border-0 last:pb-0">
                                            <span className="text-primary/40">{slot.days}</span>
                                            <span className="text-primary">{slot.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
