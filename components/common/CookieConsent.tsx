import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    return (
        <div
            className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-700 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#0B1215]/80 backdrop-blur-md"
                onClick={() => setIsVisible(false)}
            />

            <div className={`relative w-full max-w-2xl bg-[#0B1215] border border-white/10 p-12 flex flex-col items-center justify-center text-center gap-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-all duration-700 transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
                <div className="flex flex-col items-center gap-8 max-w-lg">
                    <div className="w-16 h-16 rounded-full bg-accent-gold/5 border border-accent-gold/20 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-accent-gold" />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white font-sans font-black text-3xl tracking-tighter uppercase">
                            Cookie <span className="italic text-accent-gold">Notice</span>
                        </h3>
                        <p className="text-white/40 text-[11px] font-black leading-relaxed tracking-[0.3em] uppercase max-w-sm mx-auto">
                            We use precision tracking to refine your discovery of Earth's rarest acquisitions.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-12 mt-4">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all underline underline-offset-8"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-16 py-6 bg-accent-gold text-primary font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white transition-all shadow-2xl"
                    >
                        Easy Shop and Customer Service
                    </button>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-8 right-8 p-2 text-white/20 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
