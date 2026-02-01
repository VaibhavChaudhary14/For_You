import React, { useEffect, useState } from 'react';

const PARTICLES = {
    rose: ['🌹', '✨', '🌸'],
    sparkle: ['✨', '💫', '🌟'],
    heart: ['❤️', '💖', '💘'],
    teddy: ['🧸', '☁️', '✨'],
    promise: ['🤞', '✨', '💍'],
    hug: ['🤗', '🍂', '✨'],
    kiss: ['💋', '💄', '💖']
};

const FloatingParticles = ({ theme = 'sparkle' }) => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const items = PARTICLES[theme] || PARTICLES.sparkle;

        const interval = setInterval(() => {
            const id = Math.random();
            const content = items[Math.floor(Math.random() * items.length)];
            const left = Math.random() * 100; // 0-100%
            const duration = 3 + Math.random() * 4; // 3-7s
            const size = 1 + Math.random() * 1.5; // 1-2.5rem

            setElements((prev) => [
                ...prev.slice(-15), // Keep max 15 particles
                { id, content, left, duration, size }
            ]);
        }, 800); // Add new particle every 800ms

        return () => clearInterval(interval);
    }, [theme]);

    // CSS for floating animation
    const styles = `
    @keyframes floatUp {
      0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
      10% { opacity: 0.8; }
      90% { opacity: 0.8; }
      100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
    }
  `;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <style>{styles}</style>
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute bottom-0 text-shadow-elegant opacity-0"
                    style={{
                        left: `${el.left}%`,
                        fontSize: `${el.size}rem`,
                        animation: `floatUp ${el.duration}s linear forwards`,
                        textShadow: '0 0 10px rgba(255,255,255,0.5)'
                    }}
                >
                    {el.content}
                </div>
            ))}
        </div>
    );
};

export default FloatingParticles;
