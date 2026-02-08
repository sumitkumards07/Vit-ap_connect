
import React from 'react';

export default function TopBar({ title = "VIT-AP Connect", showFilter = true }) {
    return (
        <header className="flex items-center justify-between px-6 pt-12 pb-4 z-20 w-full max-w-md mx-auto relative">
            {/* User Avatar */}
            <button className="relative group">
                <div
                    className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/30"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0OIZ1X0RyDR9jL8jju4eDNd6U5KxatsMFfi_J-2AChvqYCSz2YOxjE4P3dabTeSfw8xkOPHmZAa59IOcsuo32EpywvP6rYs0kUUwSI2naLqZ2f8aRQMnV3OGw0REys0ZFjJR9T8RtFtzpRcxQci-hlZACBnImh7KSD5UQebaWZauSPpZMZql_trggSnqrjRXs5-HdmI57vIM6d4wxu5nIkUpdYCAqZ7OuHPimMfVujHGBavFblKFXJvKtrEoCE-5biefUAxpGHqU')" }}
                ></div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-primary rounded-full border-2 border-background-dark"></div>
            </button>

            {/* App Logo/Title */}
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    <span className="text-primary">VIT-AP</span> Connect
                </h1>
            </div>

            {/* Filter Button */}
            {showFilter ? (
                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-slate-600 dark:text-white/80">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>tune</span>
                </button>
            ) : <div className="w-10"></div>}
        </header>
    );
}
