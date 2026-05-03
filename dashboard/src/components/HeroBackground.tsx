'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroBackground() {
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

    // Interactive mouse positioning
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 180 
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
      baseColor: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        // Very slow, elegant network drift
        this.dx = (Math.random() - 0.5) * 0.3; 
        this.dy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5; 
        
        // Institutional matrix colors: Emeralds, stark whites, and slates
        const colors = ['#10b981', '#ffffff', '#334155', '#3b82f6'];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
        
        // Add subtle glow to individual particles
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.baseColor;
      }

      update() {
        if (!canvas) return;
        
        // Gentle bounce off screen edges
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
        
        // Mouse interaction: Draw cryptographic trust lines to the cursor
        const dxMouse = mouse.x - this.x;
        const dyMouse = mouse.y - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < mouse.radius) {
           if (ctx) {
             ctx.beginPath();
             // The closer the node is to the mouse, the brighter the line
             const opacity = 1 - distMouse / mouse.radius;
             ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.5})`; // Emerald connections
             ctx.lineWidth = 0.5;
             ctx.moveTo(this.x, this.y);
             ctx.lineTo(mouse.x, mouse.y);
             ctx.stroke();
           }
        }

        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      // Calibrate density so it's not too cluttered
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0; // Reset shadow so connection lines don't get messy glow

      particlesArray.forEach((p) => p.update());

      // Draw node-to-node network connections spanning the background
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            const opacity = 0.15 - distance / 100;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-slate-50 overflow-hidden pointer-events-none">
       {/* High-Fidelity Infrastructure Grid */}
       <div 
         className="absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"
       />
       
       {/* Strategic Volumetric Aurora Layer 1 (The 'Heartbeat') */}
       <motion.div 
         animate={{ 
           scale: [1, 1.2, 1],
           opacity: [0.15, 0.25, 0.15],
           rotate: [0, 45, 0]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-emerald-500/20 blur-[160px] rounded-full"
       />

       {/* Strategic Volumetric Aurora Layer 2 (The 'Shadow') */}
       <motion.div 
         animate={{ 
           scale: [1, 1.1, 1],
           opacity: [0.1, 0.2, 0.1],
           x: [0, 100, 0]
         }}
         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         className="absolute -bottom-1/4 -left-1/4 w-[1200px] h-[1200px] bg-blue-500/10 blur-[180px] rounded-full"
       />

       {/* Specular Highlight (The 'Light Edge') */}
       <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

       <canvas 
         ref={canvasRef}
         className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply"
       />
       
       {/* Subtle Vignette to maintain readibility */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.4)_100%)] pointer-events-none" />
       
       {/* Content Protective Fade */}
       <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </div>
  );
}

