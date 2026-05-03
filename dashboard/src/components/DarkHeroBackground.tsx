'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DarkHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.dx = (Math.random() - 0.5) * 0.2;
        this.dy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.2;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity * 0.3})`;
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => p.update());

      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            const opacity = (1 - distance / 150) * 0.1;
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#000000] overflow-hidden pointer-events-none">
       {/* 50px Industrial Grid */}
       <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:50px_50px]" />
       
       {/* Quantum Aurora 1 */}
       <motion.div 
         animate={{ 
           opacity: [0.05, 0.1, 0.05],
           scale: [1, 1.2, 1],
         }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
         className="absolute -top-1/4 -right-1/4 w-[1200px] h-[1200px] bg-lime-500/10 blur-[200px] rounded-full"
       />

       {/* Quantum Aurora 2 */}
       <motion.div 
         animate={{ 
           opacity: [0.03, 0.08, 0.03],
           x: [0, 50, 0],
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
         className="absolute -bottom-1/4 -left-1/4 w-[1000px] h-[1000px] bg-blue-500/10 blur-[180px] rounded-full"
       />

       {/* Digital Noise / Static Overlay */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] mix-blend-overlay" />

       <canvas 
         ref={canvasRef}
         className="absolute inset-0 w-full h-full opacity-40"
       />
       
       {/* Edge Lighting */}
       <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime-500/10 to-transparent shadow-[0_0_20px_rgba(101,163,13,0.1)]" />
    </div>
  );
}

