
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!email.endsWith('@vitap.ac.in')) {
            setLoading(false);
            setMessage('Please use your @vitap.ac.in email address.');
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin,
                },
            });

            if (error) throw error;
            setMessage('Check your email for the login link!');
        } catch (error) {
            setMessage(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Dev bypass for testing without keys
    const handleDevBypass = () => {
        navigate('/discover');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col relative overflow-hidden">
            {/* Subtle Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-campus-pattern mix-blend-overlay"></div>

            {/* Gradient Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-full max-w-md mx-auto w-full relative z-10">
                {/* Hero Section */}
                <div className="flex-1 flex flex-col justify-center items-center px-6 pt-12 pb-6">
                    {/* University Logo Placeholder */}
                    <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
                        <div className="w-16 h-16 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-5xl text-primary">school</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full aspect-[4/3] mb-8 rounded-3xl overflow-hidden relative shadow-2xl border border-white/5 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
                        <div
                            className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALBRNqS9GuJOfS1fR5v8LfHh-EbnPIxpgEtGUgDUE2ctmFnj95a3iq4CfBpQK-ON1Exo7Ls8FQ1jVbwT_5fKNxOcXzKhNvIn-TczTN0OCaxzMApNlJ1byzStnqqDWSWDCeC5zwpSG8pk4aj3NtpT36gryMZgSw8Kda-6Xsq_juuYZ6f6SiZ5JW9BcVlYnfjdc0HNZ17fCBqYPYRkgu81gIQyRrbgGA3Qq_v_NisrNZ4xQSOtJJ_pbTjyBhcwoUHctJHrrQRreWtXo')" }}
                        ></div>

                        {/* Overlay Text */}
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                            <div className="inline-flex items-center gap-1 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full mb-2 border border-white/20">
                                <span className="material-symbols-outlined text-white text-[14px]">verified</span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Verified Students Only</span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                            VIT-AP <span className="text-primary">Connect</span>
                        </h1>
                        <h2 className="text-xl font-medium text-gray-300">Connect. Date. Network.</h2>
                        <p className="text-gray-400 text-sm max-w-[280px] mx-auto mt-2">
                            The exclusive community for VIT-AP students to find their study buddy or soulmate.
                        </p>
                    </div>
                </div>

                {/* Action Section */}
                <div className="px-6 pb-10 pt-4 w-full">
                    <div className="flex flex-col gap-4">
                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="your.name@vitap.ac.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                        />

                        {/* Sign In Button */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-primary text-white shadow-[0_0_20px_rgba(238,43,140,0.3)] transition-all active:scale-[0.98] hover:shadow-[0_0_30px_rgba(238,43,140,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0"></div>
                            <div className="relative flex items-center gap-3">
                                <span className="material-symbols-outlined">{loading ? 'progress_activity' : 'mail'}</span>
                                <span className="text-lg font-bold tracking-wide">{loading ? 'Sending Magic Link' : 'Sign in with Student Email'}</span>
                            </div>
                        </button>

                        {message && <p className="text-center text-sm font-medium text-white">{message}</p>}

                        {/* Dev Bypass (Temporary) */}
                        <button onClick={handleDevBypass} className="text-xs text-gray-600 hover:text-gray-400">
                            (Dev: Skip Login)
                        </button>

                        {/* Helper Text */}
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                            <span className="material-symbols-outlined text-gray-500 text-[14px]">lock</span>
                            <p className="text-gray-400 text-xs font-medium text-center">
                                Exclusively for <span className="text-white font-mono">@vitap.ac.in</span> addresses.
                            </p>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-6 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                                <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                                <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            </div>
                            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                                Made with <span className="text-red-500">❤️</span> by Student Council
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
