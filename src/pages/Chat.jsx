
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CHATS } from '../data/mockData';

export default function Chat() {
    const { id } = useParams();
    const navigate = useNavigate();
    const chat = MOCK_CHATS.find(c => c.id === parseInt(id)) || MOCK_CHATS[0];
    const [message, setMessage] = useState('');

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
                            style={{ backgroundImage: `url('${chat.avatar}')` }}
                        ></div>
                        {chat.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-[#321d27]"></div>}
                    </div>
                    <h1 className="text-sm font-bold text-gray-900 dark:text-white mt-1 leading-none">{chat.name}</h1>
                    <span className="text-[10px] text-gray-500 dark:text-[#c992ad] font-medium">CS '25 • Active now</span>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar relative">
                {/* Timestamp */}
                <div className="flex justify-center">
                    <span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 text-[11px] font-medium px-3 py-1 rounded-full">Today, 10:23 AM</span>
                </div>

                {chat.messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 items-end group ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                        {msg.sender !== 'me' && (
                            <div
                                className="h-8 w-8 rounded-full bg-gray-300 bg-cover bg-center shrink-0"
                                style={{ backgroundImage: `url('${chat.avatar}')` }}
                            ></div>
                        )}

                        <div className={`flex flex-col gap-1 ${msg.type === 'location' ? 'max-w-[85%]' : 'max-w-[75%]'}`}>
                            {msg.type === 'location' ? (
                                <div className="bg-primary/10 dark:bg-white/5 border border-primary/20 p-1 rounded-2xl overflow-hidden">
                                    {/* Map Preview Placeholder */}
                                    <div className="h-24 w-full bg-gray-700 rounded-xl relative overflow-hidden group-hover:opacity-90 transition-opacity cursor-pointer">
                                        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://via.placeholder.com/300x150')" }}></div>
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-primary text-white p-2 rounded-full shadow-lg animate-bounce">
                                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-primary dark:bg-primary rounded-xl mt-1 text-white">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-[18px]">meeting_room</span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{msg.label}</span>
                                        </div>
                                        <p className="text-base font-bold">{msg.location}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={`p-3.5 rounded-2xl shadow-sm dark:shadow-none ${msg.sender === 'me'
                                        ? 'bg-primary text-white rounded-br-sm shadow-glow'
                                        : 'bg-white dark:bg-[#482336] text-gray-800 dark:text-white rounded-bl-sm'
                                    }`}>
                                    <p className="text-[15px] font-medium leading-snug">{msg.text}</p>
                                </div>
                            )}
                            <span className={`text-[10px] text-gray-400 dark:text-white/40 ${msg.sender === 'me' ? 'mr-1 text-right' : 'ml-1'}`}>
                                {msg.time}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Bottom spacer */}
                <div className="h-16"></div>
            </main>

            {/* Footer / Input Area */}
            <footer className="bg-white dark:bg-[#221019] p-4 pb-8 border-t border-gray-200 dark:border-white/5 relative z-40">
                {/* Quick Actions Floating Bar (simplified for React) */}
                <div className="absolute -top-12 left-0 w-full px-4 overflow-x-auto no-scrollbar flex items-center gap-2 py-2 pointer-events-none">
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <button className="bg-white dark:bg-[#321d27] text-primary border border-primary/20 dark:border-primary/30 shadow-sm hover:bg-primary hover:text-white dark:hover:bg-primary transition-all rounded-full px-4 py-1.5 flex items-center gap-1.5 whitespace-nowrap group">
                            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">location_on</span>
                            <span className="text-sm font-semibold">Rock Plaza</span>
                        </button>
                        <button className="bg-white dark:bg-[#321d27] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 shadow-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-all rounded-full px-4 py-1.5 flex items-center gap-1.5 whitespace-nowrap">
                            <span className="material-symbols-outlined text-[18px]">restaurant</span>
                            <span className="text-sm font-semibold">Canteen</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-end gap-2">
                    <button className="p-3 text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5 shrink-0">
                        <span className="material-symbols-outlined text-[26px]">add_circle</span>
                    </button>
                    <div className="flex-1 bg-gray-100 dark:bg-[#321d27] rounded-[24px] flex items-center px-4 py-2 border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <input
                            className="bg-transparent border-none outline-none w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-[15px] p-0 focus:ring-0"
                            placeholder="Type a message..."
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="ml-2 text-gray-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                        </button>
                    </div>
                    <button className="p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
