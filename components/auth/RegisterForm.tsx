import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Lock, Eye, EyeOff, CheckCircle, User } from 'lucide-react';

interface RegisterFormProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onSwitchToLogin }) => {
    const { register, loading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');
    const [success, setSuccess] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (password.length < 6) {
            setLocalError('Password must be at least 6 characters');
            return;
        }

        try {
            await register(name, email, password);
            setRegisteredEmail(email);
            setSuccess(true);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
            setLocalError(errorMessage);
        }
    };

    if (success) {
        return (
            <div className="fixed inset-0 bg-primary/60 backdrop-blur-md flex items-start justify-center z-50 p-4 pt-48 overflow-y-auto" onClick={onClose}>
                <div className="bg-primary border border-white/10 rounded-sm max-w-md w-full p-12 text-center shadow-2xl grain-texture" onClick={e => e.stopPropagation()}>
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                        <Mail size={40} className="text-accent-gold" />
                    </div>
                    <h2 className="text-3xl font-sans font-black text-white mb-4 tracking-tighter uppercase">Check Your <span className="text-accent-gold">Inbox</span></h2>
                    <p className="text-white/40 mb-2 text-sm uppercase font-black tracking-widest">
                        Verification details sent to
                    </p>
                    <p className="font-sans text-xl text-accent-gold mb-8 px-4 py-2 bg-white/5 inline-block">
                        {registeredEmail}
                    </p>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-10 leading-relaxed max-w-[280px] mx-auto">
                        Follow the verification link to verify your account. Expires in 24 hours.
                    </p>
                    <button
                        onClick={onSwitchToLogin}
                        className="w-full bg-accent-gold text-primary p-4 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white transition-all shadow-gold"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-primary/60 backdrop-blur-md flex items-start justify-center z-50 p-4 pt-48 overflow-y-auto" onClick={onClose}>
            <div className="bg-primary/95 border border-white/10 rounded-sm max-w-md w-full p-10 relative shadow-2xl grain-texture" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors p-1"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-sans font-black tracking-tighter text-white uppercase mb-2">Sign <span className="text-accent-gold italic">Up</span></h2>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">Create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {localError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-[10px] font-black uppercase tracking-widest text-center">
                            {localError}
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-white/40 mb-3 ml-1">Full Name</label>
                        <div className="relative">
                            <User size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-gold/50" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-14 pr-4 py-5 bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-accent-gold transition-all tracking-widest"
                                placeholder="YOUR FULL NAME"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-white/40 mb-3 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-gold/50" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-14 pr-4 py-5 bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-accent-gold transition-all tracking-widest"
                                placeholder="YOU@EXAMPLE.COM"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-white/40 mb-3 ml-1">Password</label>
                        <div className="relative">
                            <Lock size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-gold/50" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-14 pr-14 py-5 bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-accent-gold transition-all tracking-widest"
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>



                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent-gold text-primary p-5 font-black uppercase text-[11px] tracking-[0.5em] hover:bg-white transition-all shadow-lg active:scale-[0.98] mt-4"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-10 text-center border-t border-white/5 pt-10">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                        Already have an account?{' '}
                        <button onClick={onSwitchToLogin} className="text-accent-gold hover:text-white transition-colors">
                            Log In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
