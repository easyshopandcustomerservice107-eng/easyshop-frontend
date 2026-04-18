import React, { useEffect, useState } from 'react';
import { testimonialService, Testimonial } from '../../services/testimonialService';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await testimonialService.getTestimonials();
                setTestimonials(data);
            } catch (error) {
                console.error('Failed to load testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (!isPaused && testimonials.length > 0) {
            const timer = setInterval(() => {
                setCurrent((prev) => (prev + 1) % testimonials.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isPaused, testimonials.length]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (loading) {
        return (
            <section className="py-20 bg-sand/30">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-8 h-8 border-4 border-sage border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-32 bg-[#0B1215] overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="h-[1px] w-8 bg-accent-gold/40"></div>
                        <span className="text-accent-gold text-[10px] uppercase tracking-[0.5em] font-black">Testimonials</span>
                        <div className="h-[1px] w-8 bg-accent-gold/40"></div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-sans font-black tracking-tighter text-white uppercase">
                        Voices of the <span className="italic">Discovery</span>
                    </h2>
                </div>

                {/* Slider Container */}
                <div
                    className="relative max-w-5xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Main Slide Area */}
                    <div className="relative overflow-hidden min-h-[400px] flex items-center">
                        <div
                            className="flex transition-transform duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1) w-full"
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial._id}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className="bg-white/[0.03] border border-white/10 p-12 sm:p-16 relative mx-auto max-w-4xl">
                                        <div className="absolute top-12 right-12 opacity-5">
                                            <Quote className="w-20 h-20 text-accent-gold" />
                                        </div>

                                        <div className="flex flex-col items-center text-center">
                                            <div className="flex gap-2 mb-8">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-accent-gold text-accent-gold' : 'text-white/10'}`} />
                                                ))}
                                            </div>

                                            <p className="text-2xl sm:text-3xl text-white font-sans leading-relaxed mb-12 italic">
                                                "{testimonial.content}"
                                            </p>

                                            <div className="flex flex-col items-center gap-4">
                                                {testimonial.avatar ? (
                                                    <img
                                                        src={testimonial.avatar}
                                                        alt={testimonial.name}
                                                        className="w-16 h-16 rounded-full object-cover border border-white/10 grayscale"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold font-sans text-2xl font-black">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-sans font-black text-xl text-white uppercase tracking-tighter">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-1">
                                                        Verified Explorer
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons - Simple & Minimalist */}
                    <button
                        onClick={prevSlide}
                        className="absolute -left-12 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all hidden lg:block"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft className="w-10 h-10" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute -right-12 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all hidden lg:block"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight className="w-10 h-10" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-4 mt-16">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-[2px] transition-all duration-500 ${current === index ? 'w-12 bg-accent-gold' : 'w-4 bg-white/10 hover:bg-white/30'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
