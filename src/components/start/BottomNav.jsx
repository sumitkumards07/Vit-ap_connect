
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="absolute bottom-0 w-full bg-white dark:bg-background-dark border-t border-slate-200 dark:border-white/5 pb-6 pt-3 px-6 flex justify-between items-center z-40">
            <button
                onClick={() => navigate('/discover')}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/discover') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
            >
                <span className={`material-symbols-outlined ${isActive('/discover') ? 'filled' : ''}`} style={{ fontSize: '28px', fontVariationSettings: isActive('/discover') ? "'FILL' 1" : "'FILL' 0" }}>style</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <div className="relative">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>grid_view</span>
                    {/* Notification dot example */}
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-primary rounded-full border border-white dark:border-background-dark"></span>
                </div>
            </button>

            <button
                onClick={() => navigate('/chat')}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/chat') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
            >
                <span className={`material-symbols-outlined ${isActive('/chat') ? 'filled' : ''}`} style={{ fontSize: '28px', fontVariationSettings: isActive('/chat') ? "'FILL' 1" : "'FILL' 0" }}>chat_bubble</span>
            </button>

            <button
                onClick={() => navigate('/profile/me')}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile/me') ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
            >
                <span className={`material-symbols-outlined ${isActive('/profile/me') ? 'filled' : ''}`} style={{ fontSize: '28px', fontVariationSettings: isActive('/profile/me') ? "'FILL' 1" : "'FILL' 0" }}>person</span>
            </button>
        </nav>
    );
}
