
import React from 'react';
import TopBar from '../components/start/TopBar';
import CardStack from '../components/start/CardStack';
import BottomNav from '../components/start/BottomNav';

export default function Discovery() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Mobile Container */}
            <main className="relative flex h-full w-full max-w-md flex-col bg-background-light dark:bg-background-dark overflow-hidden shadow-2xl h-screen">
                <TopBar />

                {/* Main Content Area: Card Stack */}
                <div className="flex-1 relative w-full px-4 pb-24 pt-2">
                    <CardStack />
                </div>

                <BottomNav />
            </main>
        </div>
    );
}
