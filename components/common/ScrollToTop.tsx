import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            setIsVisible(winScroll > 300);

            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (height > 0) {
                setProgress(winScroll / height);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - progress * circumference;

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 z-[150] flex items-center justify-center w-14 h-14 bg-primary border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] focus:outline-none group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            {/* Progress Circle Wrapper */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[1.5px]">
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-white/5"
                />
                <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="text-accent-gold transition-all duration-100 ease-linear"
                    strokeLinecap="round"
                />
            </svg>

            <ChevronUp className="h-5 w-5 text-white/40 group-hover:text-accent-gold transition-colors" />
        </button>
    );
};

export default ScrollToTop;
