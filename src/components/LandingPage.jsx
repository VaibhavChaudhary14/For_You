import React, { useState } from 'react';
import JharokhaFrame from './JharokhaFrame';

const LandingPage = ({ onStart }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleStart = () => {
        setIsExiting(true);
        setTimeout(onStart, 800);
    };

    return (
        <div className={`damascus-pattern h-screen w-full flex flex-col items-center justify-center relative p-6 overflow-hidden transition-all duration-1000 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

            {/* Background Starscape Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <JharokhaFrame>

                {/* Centerpiece Icon */}
                <div className="flex justify-center mb-8">
                    <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-glow-gold animate-pulse">
                        <path d="M50 10 L60 35 L85 35 L65 50 L75 75 L50 60 L25 75 L35 50 L15 35 L40 35 Z" fill="#C5A059" opacity="0.8" />
                        <circle cx="50" cy="50" r="10" fill="#D62828" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-6xl text-antique-gold mb-6 tracking-widest font-playfair font-bold uppercase drop-shadow-md">
                    Royal Decree
                </h1>

                <p className="text-xl md:text-2xl text-parchment italic font-cormorant mb-12 leading-relaxed opacity-90">
                    "In the silence of the night, amongst the whispers of the fort, an eternal promise awaits."
                </p>

                <button
                    onClick={handleStart}
                    className="relative px-12 py-3 border-2 border-antique-gold text-royal-night bg-antique-gold hover:bg-transparent hover:text-antique-gold uppercase tracking-[0.25em] font-playfair text-lg shadow-glow-gold transition-all duration-500 rounded-sm font-bold"
                >
                    Unveil the Story
                </button>

            </JharokhaFrame>
        </div>
    );
};

export default LandingPage;
