
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/start/BottomNav';
import { supabase } from '../supabaseClient';

export default function ChatList() {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return; // Demo mode empty

            // Fetch matches where user is user1 or user2
            const { data: matchesData, error } = await supabase
                .from('matches')
                .select(`
                id,
                created_at,
                user1:profiles!user1_id(id, full_name, avatar_url),
                user2:profiles!user2_id(id, full_name, avatar_url),
                last_message:messages(content, created_at, sender_id)
            `)
                .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Flatten data for UI
            const formattedMatches = matchesData.map(match => {
                const otherUser = match.user1.id === user.id ? match.user2 : match.user1;
                // Sorting messages usually needs limit in query, but simplified here assuming strict relation
                // Actually fetching last message via subquery or filtered relation in Supabase is tricky sometimes. 
                // For now, let's assume we handle messages separately or just show "New Match!" if no messages.
                const lastMsg = match.last_message?.[0]; // If relation returns array

                return {
                    id: match.id,
                    name: otherUser.full_name,
                    avatar: otherUser.avatar_url || 'https://via.placeholder.com/150',
                    lastMessage: lastMsg?.content || "New Match!",
                    time: lastMsg ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now',
                    unread: 0,
                    online: false
                };
            });

            setMatches(formattedMatches);

        } catch (error) {
            console.error("Error fetching matches:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <main className="relative flex h-full w-full max-w-md flex-col bg-background-light dark:bg-background-dark overflow-hidden shadow-2xl h-screen">
                {/* Header */}
                <header className="px-6 pt-12 pb-4 bg-white/80 dark:bg-[#221019]/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-white/5">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
                    <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar pb-2">
                        {/* New Matches Row */}
                        <div className="flex flex-col items-center gap-1 shrink-0">
                            <div className="w-16 h-16 rounded-full border-2 border-primary border-dashed flex items-center justify-center bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-2xl">favorite</span>
                            </div>
                            <span className="text-xs font-medium text-slate-500">Likes</span>
                        </div>
                        {/* Can map generic recent matches here */}
                    </div>
                </header>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2">
                    <h2 className="text-sm font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wider px-2">Recent</h2>
                    {loading ? <div className="text-center p-4">Loading...</div> : matches.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => navigate(`/chat/${chat.id}`)}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${chat.avatar}')` }}></div>
                                {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background-dark rounded-full"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{chat.name}</h3>
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{chat.time}</span>
                                </div>
                                <p className={`text-sm truncate ${chat.unread > 0 ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-500 dark:text-gray-400'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                    {!loading && matches.length === 0 && (
                        <div className="text-center p-10 text-slate-500">No matches yet. Go swipe!</div>
                    )}
                </div>

                <BottomNav />
            </main>
        </div>
    );
}
