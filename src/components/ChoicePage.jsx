import React from 'react';
import JharokhaFrame from './JharokhaFrame';
import { emailService } from '../utils/emailService';

const ChoicePage = ({ onChoice }) => {

    const handleChoice = (choice) => {
        // Immediate Notification for "Yes"
        if (choice === 'yes') {
            emailService.sendLetter({
                message: "✨ She clicked 'Haa, Humesha'! (Status Update - She said YES)",
                choice: 'yes'
            });
        }
        // Proceed to next screen
        onChoice(choice);
    };

    return (
        <div className="damascus-pattern h-screen w-full flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-rajput-pattern opacity-30 pointer-events-none"></div>

            <JharokhaFrame title="The Verdict">

                <p className="text-xl md:text-2xl text-parchment italic mb-12">
                    "Will you walk with me into the eternal night, hand in hand, forever?"
                </p>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full px-4">
                    <button
                        onClick={() => handleChoice('yes')}
                        className="elegant-button min-w-[200px] px-8 py-4 border-2 border-antique-gold text-royal-night bg-antique-gold hover:bg-transparent hover:text-antique-gold font-playfair uppercase tracking-[0.15em] text-lg font-bold shadow-glow-gold rounded-sm transition-all"
                    >
                        Haa, Humesha
                    </button>

                    <button
                        onClick={() => handleChoice('no')}
                        className="elegant-button min-w-[200px] px-8 py-4 border-2 border-mithila-red text-mithila-red hover:bg-mithila-red hover:text-white font-playfair uppercase tracking-[0.15em] text-lg font-bold shadow-sm rounded-sm transition-all"
                    >
                        Abhi Nahi...
                    </button>
                </div>
            </JharokhaFrame>

        </div>
    );
};

export default ChoicePage;
