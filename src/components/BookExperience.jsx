import React, { useState, useEffect } from 'react';
import FloatingParticles from './FloatingParticles';

const CHAPTERS = [
    {
        day: "Rose Day",
        emoji: "🌹",
        theme: "rose", // Particles
        message: "Like a crimson rose blooming in the midnight garden of a palace, my love for you is both deep and vibrant. You are the fragrance that fills the empty halls of my heart."
    },
    {
        day: "Propose Day",
        emoji: "💍",
        theme: "sparkle",
        message: "Beneath the vast canopy of stars, I kneel not as a servant, but as a devotee. Will you grant me the honor of walking beside you, ruling this life together?"
    },
    {
        day: "Chocolate Day",
        emoji: "🍫",
        theme: "heart",
        message: "Dark and rich, like the finest cocoa from distant lands. Your presence brings a sweetness that lingers on the soul, a luxury I never wish to be without."
    },
    {
        day: "Teddy Day",
        emoji: "🧸",
        theme: "teddy",
        message: "In a world of stone walls and iron gates, you are my softest refuge. A comfort more precious than silk, a warmth that defies the coldest winter night."
    },
    {
        day: "Promise Day",
        emoji: "🤝",
        theme: "promise",
        message: "My word is my bond, etched in stone. I vow to stand as your fortress, shielding you from every storm, honoring you with every breath until the stars go dark."
    },
    {
        day: "Hug Day",
        emoji: "🤗",
        theme: "hug",
        message: "When I hold you, time stands still. Two souls merging like rivers in the moonlight. In your embrace, I find the peace that a thousand kingdoms could not buy."
    },
    {
        day: "Kiss Day",
        emoji: "💋",
        theme: "kiss",
        message: "A seal upon our hearts. A silent pact that binds us across lifetimes. With this kiss, I surrender my soul to yours, forever and always."
    }
];

const BookExperience = ({ onComplete }) => {
    const [currentChapter, setCurrentChapter] = useState(0);
    const [showCover, setShowCover] = useState(true);
    const [isOpening, setIsOpening] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);

    // Open book interaction
    const handleOpenBook = () => {
        if (isOpening) return;
        setIsOpening(true);
        // Wait for animation
        setTimeout(() => {
            setShowCover(false);
        }, 1500);
    };

    const handleNext = () => {
        if (isFlipping || showCover) return;

        if (currentChapter < CHAPTERS.length - 1) {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentChapter(prev => prev + 1);
                setIsFlipping(false);
            }, 600);
        } else {
            setTimeout(() => {
                onComplete();
            }, 800);
        }
    };

    const handlePrev = () => {
        if (isFlipping || showCover) return;

        if (currentChapter > 0) {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentChapter(prev => prev - 1);
                setIsFlipping(false);
            }, 600);
        }
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showCover) {
                if (e.key === 'ArrowRight') handleNext();
                if (e.key === 'ArrowLeft') handlePrev();
            } else if (e.key === 'Enter' || e.key === ' ') {
                handleOpenBook();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentChapter, showCover, isFlipping, isOpening]);

    const content = CHAPTERS[currentChapter];

    return (
        <div className="h-screen w-full flex items-center justify-center bg-royal-night overflow-hidden relative fade-in">

            {/* Dark Background Texture */}
            <div className="absolute inset-0 bg-rajput-pattern opacity-40"></div>

            {/* Particles */}
            {!showCover && <FloatingParticles theme={content.theme} />}

            {showCover ? (
                // Royal Book Cover
                <div
                    className={`relative cursor-pointer group perspective-1000 z-10 ${isOpening ? 'book-cover-open' : 'animate-scale-up'}`}
                    onClick={handleOpenBook}
                >
                    <div className="w-[85vw] h-[70vh] md:w-[500px] md:h-[650px] bg-gradient-to-br from-[#2a0a10] to-[#1a0505] flex items-center justify-center p-6 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-l-8 border-[#1a0505] relative transition-transform duration-500 group-hover:-translate-y-2">

                        {/* Mithila Gold Border */}
                        <div className="w-full h-full border-4 border-yellow-500/50 mithila-art-bg flex flex-col items-center justify-center p-8 relative outline outline-2 outline-offset-4 outline-yellow-500/30">

                            <div className="text-6xl text-yellow-500 mb-10 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] animate-pulse">⚜️</div>

                            <h1 className="text-5xl md:text-7xl text-center font-playfair tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 mb-6 drop-shadow-md font-bold uppercase">
                                Prem<br />Granth
                            </h1>

                            <p className="text-red-400 tracking-[0.4em] font-cormorant mt-8 text-sm uppercase font-bold drop-shadow-sm">Vol. I — The Decree</p>

                            <div className="mt-16 text-yellow-100 text-sm font-cormorant italic animate-bounce font-medium tracking-wide">
                                [ Touch to Open ]
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Parchment Pages
                <div className={`w-full max-w-2xl mx-auto p-1 rounded-sm relative transition-all duration-500 z-10 ${isFlipping ? 'page-flip-exit' : 'page-flip-enter'}`}>

                    {/* Parchment Container */}
                    <div className="bg-parchment p-8 md:p-14 shadow-[0_0_40px_rgba(197,160,89,0.2)] border-2 border-antique-gold/50 relative">

                        {/* Corner Patterns */}
                        <div className="absolute top-2 left-2 text-mithila-red text-xl">✥</div>
                        <div className="absolute top-2 right-2 text-mithila-red text-xl">✥</div>
                        <div className="absolute bottom-2 left-2 text-mithila-red text-xl">✥</div>
                        <div className="absolute bottom-2 right-2 text-mithila-red text-xl">✥</div>

                        <div className="text-center">
                            <div className="text-7xl mb-8 filter drop-shadow-md text-royal-night">
                                {content.emoji}
                            </div>

                            <h2 className="text-3xl md:text-4xl text-royal-night mb-8 font-playfair font-bold uppercase tracking-wide border-b-2 border-mithila-red/30 inline-block pb-2">
                                {content.day}
                            </h2>

                            <p className="text-xl md:text-2xl font-cormorant leading-loose text-royal-night/90 max-w-lg mx-auto font-medium italic">
                                "{content.message}"
                            </p>

                            {/* Visible Navigation Buttons */}
                            <div className="flex justify-between items-center mt-12 px-2 md:px-8">
                                <div className="w-1/3 text-left">
                                    {currentChapter > 0 && (
                                        <button
                                            onClick={handlePrev}
                                            className="flex items-center gap-2 text-royal-night/60 hover:text-mithila-red font-playfair font-bold uppercase tracking-widest transition-colors group"
                                        >
                                            <span className="text-xl group-hover:-translate-x-1 transition-transform">❮</span> Back
                                        </button>
                                    )}
                                </div>

                                <div className="text-royal-night/40 text-xs tracking-[0.3em] font-cormorant font-bold uppercase w-1/3 text-center">
                                    Page {currentChapter + 1} / {CHAPTERS.length}
                                </div>

                                <div className="w-1/3 text-right">
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 text-royal-night hover:text-royal-night font-playfair font-bold uppercase tracking-widest transition-colors ml-auto group"
                                    >
                                        {currentChapter === CHAPTERS.length - 1 ? 'Continue' : 'Next'}
                                        <span className="text-xl group-hover:translate-x-1 transition-transform inline-block">❯</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default BookExperience;
