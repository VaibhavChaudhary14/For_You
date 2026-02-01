import React, { useState, useEffect } from 'react';
import FloatingParticles from './FloatingParticles';

// Imports for Medieval Assets
import roseImg from '../assets/stickers/rose.png';
import ringImg from '../assets/stickers/ring.png';
import chocolateImg from '../assets/stickers/chocolate.png';
import teddyImg from '../assets/stickers/teddy.png';
import promiseImg from '../assets/stickers/promise.png';
import hugImg from '../assets/stickers/hug.png';
import kissImg from '../assets/stickers/kiss.png';
import parchmentTexture from '../assets/textures/parchment.png';

const CHAPTERS = [
    {
        day: "Rose Day",
        image: roseImg,
        theme: "rose",
        message: "Like a crimson rose blooming in the midnight garden of a palace, my love for you is both deep and vibrant. You are the fragrance that fills the empty halls of my heart."
    },
    {
        day: "Propose Day",
        image: ringImg,
        theme: "sparkle",
        message: "Beneath the vast canopy of stars, I kneel not as a servant, but as a devotee. Will you grant me the honor of walking beside you, ruling this life together?"
    },
    {
        day: "Chocolate Day",
        image: chocolateImg,
        theme: "heart",
        message: "Dark and rich, like the finest cocoa from distant lands. Your presence brings a sweetness that lingers on the soul, a luxury I never wish to be without."
    },
    {
        day: "Teddy Day",
        image: teddyImg,
        theme: "teddy",
        message: "In a world of stone walls and iron gates, you are my softest refuge. A comfort more precious than silk, a warmth that defies the coldest winter night."
    },
    {
        day: "Promise Day",
        image: promiseImg,
        theme: "promise",
        message: "My word is my bond, etched in stone. I vow to stand as your fortress, shielding you from every storm, honoring you with every breath until the stars go dark."
    },
    {
        day: "Hug Day",
        image: hugImg,
        theme: "hug",
        message: "When I hold you, time stands still. Two souls merging like rivers in the moonlight. In your embrace, I find the peace that a thousand kingdoms could not buy."
    },
    {
        day: "Kiss Day",
        image: kissImg,
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

    // Typewriter Effect Logic
    const [displayedMessage, setDisplayedMessage] = useState('');

    useEffect(() => {
        setDisplayedMessage(''); // Reset on chapter change
        let index = 0;
        const speed = 30; // ms per char

        const timer = setInterval(() => {
            if (index < content.message.length) {
                setDisplayedMessage((prev) => prev + content.message.charAt(index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [currentChapter, content.message]);

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
                <div className={`w-full max-w-2xl mx-auto p-2 rounded-sm relative transition-all duration-500 z-10 ${isFlipping ? 'page-flip-exit' : 'page-flip-enter'}`}>

                    {/* Parchment Container */}
                    <div className="bg-parchment p-8 md:p-14 shadow-[0_0_50px_rgba(197,160,89,0.3)] border-2 border-antique-gold/60 relative overflow-hidden h-[700px] flex flex-col justify-between">

                        {/* 📜 TEXTURE OVERLAY: Adds realistic paper grain */}
                        <div
                            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply z-0"
                            style={{ backgroundImage: `url(${parchmentTexture})`, backgroundSize: 'cover' }}
                        ></div>

                        {/* Corner Patterns */}
                        <div className="absolute top-3 left-3 text-mithila-red text-2xl opacity-80 z-10">✥</div>
                        <div className="absolute top-3 right-3 text-mithila-red text-2xl opacity-80 z-10">✥</div>
                        <div className="absolute bottom-3 left-3 text-mithila-red text-2xl opacity-80 z-10">✥</div>
                        <div className="absolute bottom-3 right-3 text-mithila-red text-2xl opacity-80 z-10">✥</div>

                        <div className="text-center relative z-10 flex flex-col h-full">

                            {/* Medieval Sticker Image */}
                            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 flex items-center justify-center shrink-0">
                                <img
                                    src={content.image}
                                    alt={content.day}
                                    className="max-w-full max-h-full object-contain filter drop-shadow-lg opacity-90 transition-transform duration-700 hover:sepia-[.3] mix-blend-multiply placeholder-bg-transparent"
                                />
                            </div>

                            <h2 className="text-3xl md:text-4xl text-[#2a0a10] mb-6 font-playfair font-bold uppercase tracking-widest border-b-2 border-mithila-red/40 inline-block pb-3 shadow-sm shrink-0">
                                {content.day}
                            </h2>

                            {/* IMPROVED READABILITY: Typewriter Effect */}
                            <div className="grow flex items-center justify-center">
                                <p className="text-xl md:text-2xl font-cormorant leading-loose text-[#1a0505] max-w-lg mx-auto font-semibold italic antialiased drop-shadow-sm min-h-[150px]">
                                    "{displayedMessage}"<span className="animate-pulse text-mithila-red">|</span>
                                </p>
                            </div>

                            {/* Visible Navigation Buttons */}
                            <div className="flex justify-between items-center mt-auto px-2 md:px-8 shrink-0 pb-4 relative z-[50] pointer-events-auto">
                                <div className="w-1/3 text-left">
                                    {currentChapter > 0 && (
                                        <button
                                            onClick={handlePrev}
                                            className="flex items-center gap-2 text-[#2a0a10]/70 hover:text-mithila-red font-playfair font-bold uppercase tracking-widest transition-colors group"
                                        >
                                            <span className="text-xl group-hover:-translate-x-1 transition-transform">❮</span> Back
                                        </button>
                                    )}
                                </div>

                                <div className="text-[#2a0a10]/50 text-xs tracking-[0.3em] font-cormorant font-bold uppercase w-1/3 text-center">
                                    Page {currentChapter + 1} / {CHAPTERS.length}
                                </div>

                                <div className="w-1/3 text-right">
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 text-[#2a0a10] hover:text-mithila-red font-playfair font-bold uppercase tracking-widest transition-colors ml-auto group pointer-events-auto cursor-pointer"
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
