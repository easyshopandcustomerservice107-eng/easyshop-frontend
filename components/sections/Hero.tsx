import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Instagram, Twitter, Pin } from 'lucide-react';

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    highlight: string;
    description: string;
    image: string;
    link: string;
    buttonText: string;
    isExternal?: boolean;
}

const defaultSlides: Slide[] = [
    {
        id: 1,
        title: "The Heart of the Earth",
        highlight: "Exquisite Emeralds",
        subtitle: "The Imperial Collection",
        description: "Explore our legendary selection of ethically sourced, museum-grade emeralds from the fabled mines of the North.",
        image: "https://images.unsplash.com/photo-1596756627581-64531853a479?q=80&w=2670&auto=format&fit=crop",
        link: "/products?category=Emeralds",
        buttonText: "Explore Collection"
    },
    {
        id: 2,
        title: "Purity & Perfection",
        highlight: "Rare Sapphires",
        subtitle: "The Deep Azure Series",
        description: "Deep, celestial blues and incomparable clarity. Discover sapphires that transcend time and tradition.",
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2671&auto=format&fit=crop",
        link: "/products?category=Sapphires",
        buttonText: "View Gallery"
    },
    {
        id: 3,
        title: "Untamed Beauty",
        highlight: "Raw Minerals",
        subtitle: "The Geological Vault",
        description: "From crystalline structures to rare mineral specimens, own a fragment of geological history.",
        image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2574&auto=format&fit=crop",
        link: "/products?category=Minerals",
        buttonText: "Direct from Source"
    }
];

const Hero: React.FC<{ cmsData?: any }> = ({ cmsData }) => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const slides: Slide[] = React.useMemo(() => {
        let sList: Slide[] = [...defaultSlides];
        if (cmsData?.heroSlides && cmsData.heroSlides.length > 0) {
            sList = cmsData.heroSlides.map((s: any, i: number) => ({
                id: i,
                title: s.title || "Untitled",
                highlight: s.highlight || "",
                subtitle: s.subtitle || "",
                description: s.description || "",
                image: s.image || defaultSlides[0].image,
                link: s.link || "/",
                buttonText: s.buttonText || "Learn More"
            }));
        }
        return sList;
    }, [cmsData]);

    useEffect(() => {
        if (!isPaused && slides.length > 1) {
            const timer = setInterval(() => {
                setCurrent((prev) => (prev + 1) % slides.length);
            }, 6000); // Slower, more elegant transitions
            return () => clearInterval(timer);
        }
    }, [isPaused, slides.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section
            className="relative h-[90vh] w-full overflow-hidden bg-primary"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'
                        }`}
                >
                    {/* Background Image with Zoom Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className={`w-full h-full object-cover transition-none ${index === current ? 'scale-100' : 'scale-100'}`}
                        />
                        {/* Strong Solid Overlay for Legibility */}
                        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-r from-primary/80 via-primary/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center px-6 md:px-20 lg:px-32 max-w-7xl mx-auto">
                        {/* HERO CONTENT */}
                        <div className={`max-w-3xl transition-opacity duration-500 ${index === current ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="h-[1px] w-12 bg-accent shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
                                <span className="text-accent text-xs md:text-sm uppercase tracking-[0.8em] font-black">
                                    {slide.subtitle}
                                </span>
                            </div>
                            
                            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-sans font-black mb-10 leading-[0.85] tracking-tighter">
                                {slide.title} <br />
                                <span className="text-accent-gold italic font-medium inline-block h-auto">
                                    {slide.highlight}
                                </span>
                            </h1>

                            <p className="text-white/80 text-base md:text-xl font-medium mb-12 max-w-xl leading-relaxed tracking-wide">
                                {slide.description}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                                <Link
                                    to={slide.link}
                                    className="px-12 py-5 bg-accent-gold text-primary font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white transition-all shadow-xl relative overflow-hidden group/btn"
                                >
                                    <span className="relative z-10">{slide.buttonText}</span>
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-10 py-5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-primary transition-all"
                                >
                                    Our Story
                                </Link>
                            </div>
                        </div>

                        {/* SOCIAL MEDIA VERTICAL BAR (Left Side to avoid pagination clash) */}
                        <div className="hidden lg:flex social-bar-vertical !left-12 !right-auto">
                            <span className="social-label-vertical">Follow The Discovery</span>
                            <div className="h-16 w-[1px] bg-accent/20 mb-4 shadow-[0_0_10px_rgba(197,160,89,0.2)]"></div>
                            
                            <a href="#" className="social-icon-wrapper group/icon">
                                <Instagram className="w-4 h-4 transition-transform group-hover/icon:scale-110" />
                            </a>
                            <a href="#" className="social-icon-wrapper group/icon">
                                <Twitter className="w-4 h-4 transition-transform group-hover/icon:scale-110" />
                            </a>
                            <a href="#" className="social-icon-wrapper group/icon">
                                <Pin className="w-4 h-4 transition-transform group-hover/icon:scale-110" />
                            </a>
                            
                            <div className="h-16 w-[1px] bg-accent/20 mt-4 shadow-[0_0_10px_rgba(197,160,89,0.2)]"></div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows - Minimalist */}
            <div className="absolute bottom-20 left-6 md:left-20 z-30 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-500 rounded-full"
                    aria-label="Previous"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-500 rounded-full"
                    aria-label="Next"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* Pagination Indicators - Vertical Line Design */}
            <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-8">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className="flex items-center gap-4 group"
                        aria-label={`Slide ${index + 1}`}
                    >
                        <span className={`text-[10px] font-black transition-all ${current === index ? 'text-accent-gold opacity-100' : 'text-white opacity-0 group-hover:opacity-50'}`}>
                            0{index + 1}
                        </span>
                        <div className={`h-12 w-[2px] transition-all duration-500 ${current === index ? 'bg-accent-gold' : 'bg-white/20 group-hover:bg-white/40'}`} />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Hero;
