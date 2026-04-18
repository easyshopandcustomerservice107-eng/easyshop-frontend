import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { X, Mail, Lock, Eye, EyeOff, AlertTriangle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface LoginFormProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitchToRegister }) => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');
    const [emailNotVerified, setEmailNotVerified] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        setEmailNotVerified(false);

        try {
            await login(email, password);
            onClose();
        } catch (err: any) {
            // Check if the error response has emailNotVerified flag
            const responseData = err.response?.data?.data;
            if (responseData?.emailNotVerified) {
                setEmailNotVerified(true);
            } else {
                const errorMessage = err.response?.data?.message || err.message || 'Login failed';
                setLocalError(errorMessage);
            }
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error('Please enter your email above first');
            return;
        }
        setResendLoading(true);
        try {
            await authService.resendVerification(email);
            toast.success('Verification email sent! Check your inbox.');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to resend. Try again.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-md flex items-start justify-center z-50 p-4 pt-48 overflow-y-auto" onClick={onClose}>
            <div className="bg-primary border border-white/10 rounded-sm max-w-md w-full p-12 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-1"
                >
                    <X size={18} />
                </button>

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-sans font-black tracking-tighter text-white uppercase mb-3">Log <span className="text-accent-gold">In</span></h2>
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Welcome back to the collection</p>
                </div>

                {emailNotVerified && (
                    <div className="bg-accent-gold/5 border border-accent-gold/20 rounded-sm p-5 mb-8 flex items-start gap-4">
                        <AlertTriangle size={18} className="text-accent-gold flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-accent-gold font-bold text-[10px] uppercase tracking-widest">Verification Required</p>
                            <p className="text-white/60 text-xs mt-1">Please check your inbox for the verification link.</p>
                            <button
                                onClick={handleResend}
                                disabled={resendLoading}
                                className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-gold hover:text-white transition-colors transition-all"
                            >
                                <RefreshCw size={12} className={resendLoading ? 'animate-spin' : ''} />
                                {resendLoading ? 'Sending...' : 'Resend Link'}
                            </button>
                        </div>
                    </div>
                )}

                {localError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-[10px] font-black uppercase tracking-widest text-center mb-8">
                        {localError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
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
                        <div className="flex items-center justify-between mb-3 ml-1">
                            <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-white/40">Password</label>
                            <Link
                                to="/forgot-password"
                                onClick={onClose}
                                className="text-[10px] uppercase font-black tracking-widest text-accent-gold/40 hover:text-accent-gold transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>
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
                        className="w-full bg-accent-gold text-primary py-5 font-black uppercase text-[11px] tracking-[0.5em] hover:bg-white transition-all shadow-lg active:scale-[0.98] mt-4"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="mt-12 text-center border-t border-white/5 pt-10">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                        New user?{' '}
                        <button onClick={onSwitchToRegister} className="text-accent-gold hover:text-white transition-colors">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
