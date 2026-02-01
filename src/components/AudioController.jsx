import React, { useState, useEffect, useRef } from 'react';

const AudioController = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Royalty-free Indian Fusion / Ambient track
    // Source: pixabay (placeholder URL - reliable CDN)
    const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_06d8338302.mp3?filename=indian-meditation-19798.mp3";

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    // Auto-play on first user interaction (browser policy)
    useEffect(() => {
        const handleFirstClick = () => {
            if (!isPlaying && audioRef.current) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
            }
            window.removeEventListener('click', handleFirstClick);
        };
        window.addEventListener('click', handleFirstClick);
        return () => window.removeEventListener('click', handleFirstClick);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} src={MUSIC_URL} loop />

            <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-antique-gold/20 backdrop-blur-md border border-antique-gold flex items-center justify-center text-antique-gold hover:bg-antique-gold hover:text-royal-night transition-all duration-300 shadow-glow-gold animate-pulse-slow"
                title={isPlaying ? "Mute Royal Ambience" : "Play Royal Ambience"}
            >
                {isPlaying ? (
                    <span className="text-xl">🔊</span>
                ) : (
                    <span className="text-xl">🔇</span>
                )}
            </button>
        </div>
    );
};

export default AudioController;
