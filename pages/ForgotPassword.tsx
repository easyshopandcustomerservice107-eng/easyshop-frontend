import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await authService.forgotPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] flex items-start justify-center p-4 pt-48 overflow-y-auto">
            <div className="bg-[#111111] border border-white/10 rounded-sm max-w-md w-full p-12 relative shadow-2xl">
                {success ? (
                    <>
                        <div className="w-20 h-20 bg-accent-gold/5 border border-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle size={40} className="text-accent-gold" />
                        </div>
                        <h1 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">Check Your <span className="text-accent-gold">Inbox</span></h1>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                            A reset link has been dispatched to
                        </p>
                        <p className="font-sans text-lg text-accent-gold mb-8 px-4 py-2 bg-white/5 inline-block tracking-wider">
                            {email}
                        </p>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-10 leading-relaxed">
                            The secure access link expires in 1 hour.
                        </p>
                        <Link
                            to="/"
                            className="inline-block w-full bg-accent-gold text-primary py-4 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white transition-all shadow-lg active:scale-[0.98]"
                        >
                            Return Home
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Mail size={36} className="text-accent-gold/50" />
                        </div>
                        <h1 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">Secure <span className="text-accent-gold">Recovery</span></h1>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
                            Enter your email to receive a recovery link
                        </p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 text-[10px] font-black uppercase tracking-widest text-center mb-8">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="text-left space-y-8">
                            <div>
                                <label className="block text-[10px] uppercase font-black tracking-[0.2em] text-white/40 mb-3 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-gold/50" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="YOU@EXAMPLE.COM"
                                        className="w-full pl-14 pr-4 py-5 bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-accent-gold transition-all tracking-widest"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent-gold text-primary py-5 font-black uppercase text-[11px] tracking-[0.5em] hover:bg-white transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? 'Sending Recovery Link...' : 'Send Recovery Link'}
                            </button>
                        </form>

                        <div className="mt-12 text-center border-t border-white/5 pt-10">
                            <Link to="/login" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
                                <ArrowLeft size={14} /> Back to Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
