
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PROFILES } from '../data/mockData';

export default function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();
    // Handle "me" profile separate logic or just mock it as id 1
    const profileId = id === 'me' ? 1 : parseInt(id);
    const profile = MOCK_PROFILES.find(p => p.id === profileId) || MOCK_PROFILES[0]; // fallback

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white overflow-x-hidden antialiased selection:bg-primary selection:text-white">
            <div className="relative min-h-screen w-full max-w-md mx-auto flex flex-col pb-24">
                {/* Hero Image Section */}
                <div className="relative h-[55vh] w-full shrink-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${profile.image}')` }}
                    ></div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background-dark"></div>

                    {/* Top Navigation Bar */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-12 z-20">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                            <span className="material-symbols-outlined text-[24px]">more_vert</span>
                        </button>
                    </div>

                    {/* Content Overlap Area */}
                    <div className="absolute bottom-0 w-full px-5 pb-8 flex flex-col justify-end z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">{profile.name}, {profile.age}</h1>
                            {profile.verified && (
                                <span className="material-symbols-outlined text-blue-400 bg-white rounded-full text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            )}
                        </div>
                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-white/80 text-sm font-medium">Recently Active</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Body */}
                <div className="flex-1 px-5 -mt-6 relative z-10 flex flex-col gap-6">
                    {/* Academic Info Chips */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-surface-dark/80 backdrop-blur-sm border border-white/5 px-4 py-2 rounded-full">
                            <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                            <span className="text-sm font-semibold text-white">{profile.major}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-surface-dark/80 backdrop-blur-sm border border-white/5 px-4 py-2 rounded-full">
                            <span className="material-symbols-outlined text-primary text-[20px]">apartment</span>
                            <span className="text-sm font-semibold text-white">{profile.hostel}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-surface-dark/80 backdrop-blur-sm border border-white/5 px-4 py-2 rounded-full">
                            <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                            <span className="text-sm font-semibold text-white">{profile.year}</span>
                        </div>
                    </div>

                    {/* Bio Section */}
                    {profile.bio && (
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">About Me</h3>
                            <p className="text-gray-300 leading-relaxed text-[15px]">
                                {profile.bio}
                            </p>
                        </div>
                    )}

                    {/* Looking For Section */}
                    {profile.lookingFor && (
                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">Looking For</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {profile.lookingFor.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl bg-surface-dark border border-primary/20 hover:border-primary/50 transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                                            <span className="material-symbols-outlined text-primary text-[24px]">{item.icon}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-white">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Top Interests */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3 flex justify-between items-center">
                            Top Interests
                            <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">Common: {profile.interests.length}</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest, idx) => (
                                <div key={idx} className="px-5 py-2.5 rounded-full bg-surface-dark border border-primary text-white font-medium text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">{interest.icon}</span>
                                    {interest.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Campus Life / Gallery */}
                    {profile.gallery && profile.gallery.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">Campus Life</h3>
                            <div className="grid grid-cols-3 gap-2 h-32">
                                <div className="rounded-lg overflow-hidden h-full col-span-2 relative">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${profile.gallery[0]}')` }}></div>
                                </div>
                                {profile.gallery[1] && (
                                    <div className="rounded-lg overflow-hidden h-full relative">
                                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${profile.gallery[1]}')` }}></div>
                                        {/* +More placeholder if strictly checking length, but simple for now */}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Report Link */}
                    <div className="py-4 text-center">
                        <button className="text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider">
                            Report or Block Profile
                        </button>
                    </div>
                </div>

                {/* Sticky Floating Action Bar */}
                <div className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 glass px-6 py-4 flex items-center justify-between gap-4 z-50 rounded-t-xl">
                    <button className="w-12 h-12 rounded-full bg-surface-dark border border-white/10 text-red-400 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                    <button className="flex-1 h-12 rounded-full bg-primary text-white font-bold text-base shadow-[0_4px_14px_rgba(238,43,140,0.4)] hover:shadow-[0_6px_20px_rgba(238,43,140,0.6)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                        Message
                    </button>
                    <button className="w-12 h-12 rounded-full bg-surface-dark border border-white/10 text-primary flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
