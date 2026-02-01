import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const cursor = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            cursor.current = { x: e.clientX, y: e.clientY };
            // Add particles on move
            for (let i = 0; i < 3; i++) {
                particles.current.push(createParticle(e.clientX, e.clientY));
            }
        };

        const createParticle = (x, y) => ({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5 + 0.5, // Float down
            life: 1.0,
            color: Math.random() > 0.5 ? '#C5A059' : '#FFD700' // Antique Gold or Bright Gold
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];

                p.x += p.speedX;
                p.y += p.speedY; // Gravity/Float
                p.life -= 0.02;  // Fade out
                p.size *= 0.95;  // Shrink

                if (p.life > 0) {
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Remove dead particles
            particles.current = particles.current.filter(p => p.life > 0);

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
};

export default CursorTrail;
