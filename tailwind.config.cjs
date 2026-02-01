/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'royal-night': '#050A18', // Deepest Indigo/Black
                'night-blue': '#0A1A3F', // Lighter night shade
                'antique-gold': '#C5A059', // Tarnished gold
                'mithila-red': '#D62828', // Earthy red
                'parchment': '#E3D5C0', // Old paper
                'sandstone': '#C2B280', // Fort stone
                'rani-pink': '#E0115F', // Kept for accents
                'marigold': '#FFA500', // Kept for glow
            },
            fontFamily: {
                'playfair': ['"Playfair Display"', 'serif'],
                'cormorant': ['"Cormorant Garamond"', 'serif'],
                'pinyon': ['"Pinyon Script"', 'cursive'],
            },
            backgroundImage: {
                'rajput-pattern': 'repeating-linear-gradient(45deg, rgba(197, 160, 89, 0.05) 0px, rgba(197, 160, 89, 0.05) 2px, transparent 2px, transparent 12px), radial-gradient(circle at 50% 50%, #0A1A3F 0%, #050A18 100%)',
            },
            boxShadow: {
                'glow-gold': '0 0 20px rgba(197, 160, 89, 0.3)',
            },
            keyframes: {
                fade: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scale: {
                    '0%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
            animation: {
                'fade-in': 'fade 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
                'scale-up': 'scale 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
            },
        },
    },
    plugins: [],
}
