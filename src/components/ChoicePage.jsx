import React, { useState } from 'react';
import JharokhaFrame from './JharokhaFrame';
import { emailService } from '../utils/emailService';
import confetti from 'canvas-confetti';

const ChoicePage = ({ onChoice }) => {

    const handleYes = () => {
        // Immediate Notification for "Yes"
        emailService.sendLetter({
            message: "✨ She clicked 'Haa, Humesha'! (Status Update - She said YES)",
            choice: 'yes'
        });

        // Trigger Fireworks
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FF0000', '#FFD700', '#C5A059'] }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#FF0000', '#FFD700', '#C5A059'] }));
        }, 250);

        onChoice('yes');
    };

    const handleNo = () => {
        onChoice('no');
    };

    return (
        <div className="damascus-pattern h-screen w-full flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-rajput-pattern opacity-30 pointer-events-none"></div>

            <JharokhaFrame title="The Verdict">

                <p className="text-xl md:text-2xl text-parchment italic mb-12">
                    "Will you walk with me into the eternal night, hand in hand, forever?"
                </p>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full px-4 relative z-[100]">
                    <button
                        onClick={() => handleChoice('yes')}
                        className="elegant-button min-w-[200px] px-8 py-4 border-2 border-antique-gold text-royal-night bg-antique-gold hover:bg-transparent hover:text-antique-gold font-playfair uppercase tracking-[0.15em] text-lg font-bold shadow-glow-gold rounded-sm transition-all pointer-events-auto cursor-pointer"
                    >
                        Haa, Humesha
                    </button>

                    <button
                        onClick={() => handleChoice('no')}
                        className="elegant-button min-w-[200px] px-8 py-4 border-2 border-mithila-red text-mithila-red hover:bg-mithila-red hover:text-white font-playfair uppercase tracking-[0.15em] text-lg font-bold shadow-sm rounded-sm transition-all pointer-events-auto cursor-pointer"
                    >
                        Abhi Nahi...
                    </button>
                </div>
            </JharokhaFrame>

        </div>
    );
};

export default ChoicePage;
