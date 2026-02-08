
import React from 'react';
import { motion } from 'framer-motion';

export default function ProfileCard({ profile, style, onInfoClick }) {
    return (
        <motion.div
            className="relative h-full w-full bg-slate-200 dark:bg-card-dark rounded-2xl overflow-hidden shadow-xl flex flex-col select-none"
            style={style}
        >
            {/* Profile Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url('${profile.image}')` }}
                ></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>

            {/* Card Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-3">
                {/* Basic Info */}
                <div>
                    <div className="flex items-end gap-2 mb-1">
                        <h2 className="text-3xl font-extrabold text-white leading-none">{profile.name}, {profile.age}</h2>
                        {profile.verified && (
                            <span className="material-symbols-outlined text-blue-400 filled" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>verified</span>
                        )}
                    </div>
                    <p className="text-white/90 text-lg font-medium">{profile.major} • {profile.year}</p>

                    {/* Location */}
                    <div className="flex items-center gap-1 mt-1 text-white/70 text-sm">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                        <span>{profile.hostel} • {profile.distance}</span>
                    </div>
                </div>

                {/* Interest Badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {profile.interests.map((interest, index) => (
                        <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-sm font-medium">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{interest.icon}</span>
                            {interest.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Info Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onInfoClick(profile.id); }}
                className="absolute top-4 right-4 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-black/30 transition-colors"
            >
                <span className="material-symbols-outlined">info</span>
            </button>
        </motion.div>
    );
}
