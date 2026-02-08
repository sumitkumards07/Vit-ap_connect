
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Chat() {
    const { id } = useParams(); // This is MATCH ID, not user ID
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [otherUser, setOtherUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const initChat = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setCurrentUser(user);

            // Fetch match details to get other user info
            const { data: matchData, error } = await supabase
                .from('matches')
                .select(`
                user1:profiles!user1_id(id, full_name, avatar_url),
                user2:profiles!user2_id(id, full_name, avatar_url)
            `)
                .eq('id', id)
                .single();

            if (matchData) {
                const other = matchData.user1.id === user.id ? matchData.user2 : matchData.user1;
                setOtherUser({
                    name: other.full_name,
                    avatar: other.avatar_url || 'https://via.placeholder.com/150',
                    online: false // Need presence for real online status
                });
            }

            // Fetch existing messages
            const { data: msgs } = await supabase
                .from('messages')
                .select('*')
                .eq('match_id', id)
                .order('created_at', { ascending: true });

            if (msgs) setMessages(msgs);

            // Subscribe to new messages
            const channel = supabase
                .channel(`match:${id}`)
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${id}`
                }, (payload) => {
                    setMessages((prev) => [...prev, payload.new]);
                })
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        };

        initChat();
    }, [id]);

    useEffect(() => {
        // Auto scroll to bottom
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !currentUser) return;

        const text = newMessage;
        setNewMessage(''); // Optimistic clear

        const { error } = await supabase
            .from('messages')
            .insert({
                match_id: id,
                sender_id: currentUser.id,
                content: text
            });

        if (error) {
            console.error("Error sending message:", error);
            setNewMessage(text); // Revert on error
        }
    };

    if (!otherUser) return <div className="p-10 text-center text-white">Loading chat...</div>;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased h-screen w-full overflow-hidden flex flex-col max-w-md mx-auto relative shadow-2xl">
            {/* Header */}
            <header className="flex items-center justify-between p-4 pt-12 pb-4 bg-white/80 dark:bg-[#321d27]/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-white/5">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div
                            className="h-10 w-10 rounded-full bg-gray-300 bg-cover bg-center border-2 border-white dark:border-primary"
                            style={{ backgroundImage: `url('${otherUser.avatar}')` }}
                        ></div>
                        {otherUser.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-[#321d27]"></div>}
                    </div>
                    <h1 className="text-sm font-bold text-gray-900 dark:text-white mt-1 leading-none">{otherUser.name}</h1>
                    <span className="text-[10px] text-gray-500 dark:text-[#c992ad] font-medium">CS '25 • Active now</span>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </header>

            {/* Chat Area */}
            <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar relative">
                {/* Timestamp */}
                <div className="flex justify-center">
                    <span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-[11px] font-medium px-3 py-1 rounded-full">Today</span>
                </div>

                {messages.map((msg) => {
                    const isMe = msg.sender_id === currentUser?.id;
                    return (
                        <div key={msg.id} className={`flex gap-3 items-end group ${isMe ? 'justify-end' : ''}`}>
                            {!isMe && (
                                <div
                                    className="h-8 w-8 rounded-full bg-gray-300 bg-cover bg-center shrink-0"
                                    style={{ backgroundImage: `url('${otherUser.avatar}')` }}
                                ></div>
                            )}

                            <div className={`flex flex-col gap-1 max-w-[75%]`}>
                                <div className={`p-3.5 rounded-2xl shadow-sm dark:shadow-none ${isMe
                                        ? 'bg-primary text-white rounded-br-sm shadow-glow'
                                        : 'bg-white dark:bg-[#482336] text-gray-800 dark:text-white rounded-bl-sm'
                                    }`}>
                                    <p className="text-[15px] font-medium leading-snug">{msg.content}</p>
                                </div>

                                <span className={`text-[10px] text-gray-400 dark:text-white/40 ${isMe ? 'mr-1 text-right' : 'ml-1'}`}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Bottom spacer */}
                <div className="h-16"></div>
            </main>

            {/* Footer / Input Area */}
            <footer className="bg-white dark:bg-[#221019] p-4 pb-8 border-t border-gray-200 dark:border-white/5 relative z-40">
                <div className="flex items-end gap-2">
                    <button className="p-3 text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5 shrink-0">
                        <span className="material-symbols-outlined text-[26px]">add_circle</span>
                    </button>
                    <div className="flex-1 bg-gray-100 dark:bg-[#321d27] rounded-[24px] flex items-center px-4 py-2 border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <input
                            className="bg-transparent border-none outline-none w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-[15px] p-0 focus:ring-0"
                            placeholder="Type a message..."
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="ml-2 text-gray-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                        </button>
                    </div>
                    <button
                        onClick={handleSendMessage}
                        className="p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
