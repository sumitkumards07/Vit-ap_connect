
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROFILES } from '../../data/mockData';

export default function CardStack() {
    const [profiles, setProfiles] = useState(MOCK_PROFILES);
    const navigate = useNavigate();

    // Animation values for the top card
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacityLikeness = useTransform(x, [-200, -100, 0, 100, 200], [1, 0.5, 0, 0.5, 1]); // Optional visual feedback

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            removeCard(profiles[0].id, 'right'); // Like
        } else if (info.offset.x < -100) {
            removeCard(profiles[0].id, 'left'); // Nope
        }
    };

    const removeCard = (id, direction) => {
        setProfiles((current) => current.filter((p) => p.id !== id));
        console.log(`Swiped ${direction} on profile ${id}`);
    };

    const handleInfoClick = (id) => {
        navigate(`/profile/${id}`);
    };

    if (profiles.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center flex-col text-center p-8">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-gray-600 mb-4">sentiment_content</span>
                <h3 className="text-xl font-bold text-slate-700 dark:text-gray-300">No more profiles</h3>
                <p className="text-slate-500 dark:text-gray-500 mt-2">Check back later for more students!</p>
                <button onClick={() => setProfiles(MOCK_PROFILES)} className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full font-bold">Refresh Demo</button>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full">
            {/* Background Cards (Stack effect) */}
            {profiles.length > 1 && (
                <>
                    <div className="absolute top-6 left-6 right-6 bottom-28 bg-card-dark rounded-2xl opacity-40 scale-95 origin-bottom transform translate-y-4"></div>
                    <div className="absolute top-4 left-5 right-5 bottom-26 bg-card-dark rounded-2xl opacity-70 scale-[0.98] origin-bottom transform translate-y-2"></div>
                </>
            )}

            {/* Top Card (Draggable) */}
            <AnimatePresence>
                {profiles.map((profile, index) => {
                    if (index === 0) {
                        return (
                            <motion.div
                                key={profile.id}
                                className="absolute inset-0 cursor-grab active:cursor-grabbing z-50"
                                style={{ x, rotate }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.6}
                                onDragEnd={handleDragEnd}
                                exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
                            >
                                <ProfileCard profile={profile} onInfoClick={handleInfoClick} />

                                {/* Visual Indicators for Like/Nope (Optional) */}
                            </motion.div>
                        );
                    }
                    return null; // Only render the top card for gesture interaction, background visuals are handled above
                })}
            </AnimatePresence>

            {/* Floating Action Buttons */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center items-center gap-6 px-6 z-30 pointer-events-none">
                {/* Pointer events none wrapper so clicks go through handling, but buttons need pointer-events-auto */}

                {/* Skip Button */}
                <button
                    onClick={() => removeCard(profiles[0].id, 'left')}
                    className="pointer-events-auto group flex items-center justify-center h-16 w-16 rounded-full bg-white dark:bg-[#331926] text-rose-500 shadow-lg border border-rose-500/10 hover:scale-110 transition-transform duration-200"
                >
                    <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform" style={{ fontSize: '32px', fontWeight: 600 }}>close</span>
                </button>

                {/* Super Like Button */}
                <button className="pointer-events-auto group flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-[#331926] text-amber-400 shadow-lg border border-amber-400/10 hover:scale-110 transition-transform duration-200 mt-4">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform filled" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>star</span>
                </button>

                {/* Connect/Like Button */}
                <button
                    onClick={() => removeCard(profiles[0].id, 'right')}
                    className="pointer-events-auto group flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white shadow-lg shadow-primary/40 hover:scale-110 transition-transform duration-200"
                >
                    <span className="material-symbols-outlined filled group-hover:scale-110 transition-transform" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
            </div>
        </div>
    );
}
