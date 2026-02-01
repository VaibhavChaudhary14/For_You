import React, { useState } from 'react';
import { mockApi } from '../utils/mockApi';
import { emailService } from '../utils/emailService';

const MessageBox = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null); // 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        if (message.trim().length < 5) return;

        setIsSending(true);
        setSendStatus(null); // Clear previous status
        setErrorMessage('');

        try {
            // 1. Download "Sealed Letter" (Visual Keepsake)
            await mockApi.downloadResponse('yes', message);

            // 2. Send Real Notification (EmailJS)
            const emailResult = await emailService.sendLetter({
                message,
                choice: 'yes'
            });

            if (emailResult.success) {
                setSendStatus('success');
                setTimeout(onSend, 2000); // Wait a bit to show success message
            } else {
                setSendStatus('error');
                // Extract useful text from typical EmailJS error objects
                setErrorMessage(emailResult.error?.text || emailResult.error?.message || JSON.stringify(emailResult.error));
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSendStatus('error');
            setErrorMessage(error.message || "Unexpected error");
        } finally {
            setIsSending(false); // ALWAYS enable button again
        }
    };

    const handleWhatsApp = () => {
        const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ''; // Fallback if not set
        const text = encodeURIComponent(`My Answer: Yes, Always.\n\n"${message}"`);
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        onSend();
    };

    return (
        <div className="damascus-pattern h-screen w-full flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-hidden">

            <div className="w-full max-w-xl bg-parchment p-10 md:p-14 shadow-[0_0_50px_rgba(197,160,89,0.3)] border-4 border-double border-royal-night relative transform transition-all hover:scale-[1.01] duration-500">

                {/* Mithila Border Detail */}
                <div className="absolute inset-2 border-2 border-dashed border-mithila-red opacity-40 pointer-events-none"></div>

                <h2 className="text-3xl md:text-4xl text-royal-night mb-2 text-center font-playfair font-bold uppercase tracking-widest">
                    The Royal Seal
                </h2>
                <div className="h-[2px] w-1/3 bg-antique-gold mx-auto mb-6"></div>

                <p className="text-center text-royal-night/80 italic mb-8 font-cormorant text-lg font-medium">
                    "Inscribe your vows upon this scroll..."
                </p>

                <div className="relative mb-10 group">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write here..."
                        className="w-full h-48 bg-royal-night/5 border-2 border-royal-night/20 p-6 font-cormorant text-xl text-royal-night transition-all duration-300 resize-none placeholder-royal-night/40 italic focus:outline-none focus:border-antique-gold focus:ring-1 focus:ring-antique-gold/50"
                    />
                    <div className="absolute bottom-6 right-6 text-royal-night opacity-40 text-2xl">✒️</div>
                </div>

                {/* Status Message */}
                {sendStatus === 'success' && (
                    <div className="text-green-700 text-center font-cormorant text-lg mb-4 animate-pulse">
                        ✨ The royal messenger has departed! (Email Sent)
                    </div>
                )}
                {sendStatus === 'error' && (
                    <div className="text-red-700 text-center font-cormorant text-lg mb-4 bg-red-100/50 p-2 rounded border border-red-200">
                        <p className="font-bold">The messenger was delayed.</p>
                        <p className="text-sm opacity-80 mt-1 font-mono">{errorMessage || "Unknown error occurred"}</p>
                        <p className="text-xs mt-2">Please try the WhatsApp Seal below.</p>
                    </div>
                )}

                <div className="flex flex-col items-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={message.trim().length < 5 || isSending}
                        className={`w-full md:w-auto px-12 py-4 border-2 border-royal-night bg-royal-night text-antique-gold hover:bg-transparent hover:text-royal-night font-playfair uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-sm ${(message.trim().length < 5 || isSending) ? 'opacity-50 cursor-not-allowed' : 'opacity-100 shadow-md hover:shadow-lg'
                            }`}
                    >
                        {isSending ? 'Sealing...' : 'Seal & Deliver (Email)'}
                    </button>

                    {/* WhatsApp Fallback */}
                    <button
                        onClick={handleWhatsApp}
                        className="flex items-center gap-2 text-green-800 hover:text-green-600 font-playfair font-bold border-b border-green-800 hover:border-green-600 transition-all uppercase tracking-wider text-sm"
                    >
                        <span>💬</span> Send via Royal WhatsApp (Recommended)
                    </button>

                    <button
                        onClick={onSend}
                        className="text-royal-night/60 text-lg italic font-cormorant hover:text-mithila-red transition-colors opacity-80 hover:opacity-100 font-medium mt-4"
                    >
                        Pass quietly into the night... (Skip)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
