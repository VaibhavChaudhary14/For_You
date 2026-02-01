import React from 'react';

const JharokhaFrame = ({ children, title }) => {
    return (
        <div className="relative group">
            {/* Archway Shape using SVG Clip path or just visual borders */}
            <div className="relative z-10 p-12 bg-royal-night/80 backdrop-blur-md border-y-4 border-antique-gold mithila-border shadow-glow-gold max-w-2xl mx-auto text-center transform hover:scale-[1.02] transition-transform duration-500">

                {/* Decorative Top Arch SVG */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-24 pointer-events-none">
                    <svg viewBox="0 0 200 80" fill="none" className="w-full h-full drop-shadow-lg">
                        <path d="M0 80 C20 80 40 40 100 0 C160 40 180 80 200 80 Z" fill="#C5A059" opacity="0.9" />
                        <path d="M10 80 C30 80 50 45 100 10 C150 45 170 80 190 80 Z" fill="#050A18" />
                    </svg>
                </div>

                {/* Corner Ornaments */}
                <div className="absolute top-2 left-2 text-antique-gold text-2xl">✥</div>
                <div className="absolute top-2 right-2 text-antique-gold text-2xl">✥</div>
                <div className="absolute bottom-2 left-2 text-antique-gold text-2xl">✥</div>
                <div className="absolute bottom-2 right-2 text-antique-gold text-2xl">✥</div>

                {title && (
                    <div className="mb-8">
                        <h2 className="text-3xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-antique-gold to-mithila-red tracking-widest uppercase font-bold text-shadow-sm">
                            {title}
                        </h2>
                        <div className="h-[2px] w-24 mx-auto bg-antique-gold mt-2 opacity-60"></div>
                    </div>
                )}

                <div className="text-parchment font-cormorant leading-relaxed text-lg">
                    {children}
                </div>

                {/* Decorative Bottom Arch SVG */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 h-24 pointer-events-none rotate-180 opacity-60">
                    <svg viewBox="0 0 200 80" fill="none" className="w-full h-full">
                        <path d="M0 80 C20 80 40 40 100 0 C160 40 180 80 200 80 Z" fill="#C5A059" opacity="0.9" />
                        <path d="M10 80 C30 80 50 45 100 10 C150 45 170 80 190 80 Z" fill="#050A18" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default JharokhaFrame;
