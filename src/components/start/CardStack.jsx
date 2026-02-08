
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function CardStack() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Animation values for the top card
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            // 1. Get current user ID
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // For dev/demo only: fetch all profiles if not logged in
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .limit(10);
                if (error) throw error;
                setProfiles(data || []);
                return;
            }

            // 2. Fetch profiles that haven't been swiped yet
            // This requires a complex query or logic. Simplest is fetching all and filtering client side for now, 
            // or using a "not.in" query with a subquery if Supabase supports it easily in JS client, 
            // effectively: select * from profiles where id not in (select target_id from swipes where swiper_id = me)

            const { data: swipes } = await supabase
                .from('swipes')
                .select('target_id')
                .eq('swiper_id', user.id);

            const swipedIds = swipes?.map(s => s.target_id) || [];
            swipedIds.push(user.id); // Don't show myself

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .not('id', 'in', `(${swipedIds.join(',')})`)
                .limit(10);

            if (error) throw error;
            setProfiles(data || []);

        } catch (error) {
            console.error('Error fetching profiles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = async (event, info) => {
        if (info.offset.x > 100) {
            await swipe(profiles[0].id, 'like');
        } else if (info.offset.x < -100) {
            await swipe(profiles[0].id, 'pass');
        }
    };

    const swipe = async (targetId, action) => {
        // Optimistic UI update
        const swipedProfile = profiles[0];
        setProfiles((current) => current.slice(1));

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return; // Demo mode, just local state update

            // 1. Record Swipe
            const { error } = await supabase
                .from('swipes')
                .insert({ swiper_id: user.id, target_id: targetId, action });

            if (error) throw error;

            // 2. Check Match (Server side trigger is better, but client side for now)
            if (action === 'like') {
                const { data: mutualLike } = await supabase
                    .from('swipes')
                    .select('*')
                    .eq('swiper_id', targetId)
                    .eq('target_id', user.id)
                    .eq('action', 'like')
                    .single();

                if (mutualLike) {
                    // It's a match!
                    await supabase.from('matches').insert({ user1_id: user.id, user2_id: targetId });
                    alert(`It's a match with ${swipedProfile.full_name}!`);
                }
            }

        } catch (error) {
            console.error('Error recording swipe:', error);
            // Revert UI if needed, but usually fine to ignore
        }
    };

    const removeCard = (id, direction) => {
        // Trigger swipe logic programmatically
        swipe(id, direction === 'right' ? 'like' : 'pass');
    };

    const handleInfoClick = (id) => {
        navigate(`/profile/${id}`);
    };

    if (loading) {
        return <div className="flex h-full w-full items-center justify-center text-slate-500">Loading profiles...</div>;
    }

    if (profiles.length === 0) {
        return (
            <div className="flex h-full w-full items-center justify-center flex-col text-center p-8">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-gray-600 mb-4">sentiment_content</span>
                <h3 className="text-xl font-bold text-slate-700 dark:text-gray-300">No more profiles</h3>
                <p className="text-slate-500 dark:text-gray-500 mt-2">Check back later for more students!</p>
                <button onClick={fetchProfiles} className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full font-bold">Refresh</button>
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
                        // Adapt DB profile to UI format if needed
                        const uiProfile = {
                            ...profile,
                            name: profile.full_name?.split(' ')[0] || 'Student',
                            image: profile.avatar_url || 'https://via.placeholder.com/400x600',
                            interests: profile.interests || []
                        };

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
                                <ProfileCard profile={uiProfile} onInfoClick={handleInfoClick} />
                            </motion.div>
                        );
                    }
                    return null;
                })}
            </AnimatePresence>

            {/* Floating Action Buttons */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center items-center gap-6 px-6 z-30 pointer-events-none">
                <button
                    onClick={() => removeCard(profiles[0].id, 'left')}
                    className="pointer-events-auto group flex items-center justify-center h-16 w-16 rounded-full bg-white dark:bg-[#331926] text-rose-500 shadow-lg border border-rose-500/10 hover:scale-110 transition-transform duration-200"
                >
                    <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform" style={{ fontSize: '32px', fontWeight: 600 }}>close</span>
                </button>
                <button className="pointer-events-auto group flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-[#331926] text-amber-400 shadow-lg border border-amber-400/10 hover:scale-110 transition-transform duration-200 mt-4">
                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform filled" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>star</span>
                </button>
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
