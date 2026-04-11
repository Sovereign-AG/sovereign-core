"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Activity } from 'lucide-react';
import { SovereignLogo } from './SovereignLogo';

export const ReactiveIdentityCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group">
      {/* Background Glow Animation (Cyber-Lime Spark) */}
      <div className="absolute -inset-20 bg-lime-400/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[420px] aspect-[1.1] bg-[#0A0A0A]/90 backdrop-blur-3xl border border-[#1A1A1A] rounded-[4px] p-10 shadow-[0_45px_100px_-25px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer"
      >
        {/* Edge Lighting */}
        <div className="absolute top-0 left-0 w-[2px] h-full bg-[#CBFF00] shadow-[0_0_15px_rgba(203,255,0,0.3)]" />

        <div className="h-full flex flex-col justify-between relative z-10 [transform:translateZ(60px)]">
          
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <SovereignLogo size={42} className="text-white opacity-90" />
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#555] uppercase tracking-[0.4em]">IDENTITY_STATUS</div>
                <div className="flex items-center space-x-2">
                   <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime-500"></span>
                   </span>
                   <span className="text-[11px] font-black text-lime-400 uppercase tracking-widest">Verified_Protocol_Anchor</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#111] border border-[#1A1A1A] rounded-full shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
               <ShieldCheck size={28} className="text-[#CBFF00]" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#050505] p-5 border border-[#1A1A1A] rounded relative overflow-hidden group/code">
              <div className="text-[9px] font-mono text-lime-500/50 uppercase tracking-widest mb-3">// LIVE_ATTESTATION</div>
              <div className="font-mono text-[13px] text-gray-400 font-bold break-all leading-tight tracking-tighter mix-blend-screen opacity-80">
                &#123; "did": "sov:4f8e2...a1f6", "status": "active" &#125;
              </div>
              {/* Scan Line Animation */}
              <motion.div 
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-px bg-lime-500/10"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
               <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-[#444] uppercase tracking-widest leading-none mb-1.5">Reputation_Score</span>
                  <span className="text-3xl font-black text-[#CBFF00] tracking-tighter drop-shadow-[0_0_10px_rgba(203,255,0,0.3)]">99.8</span>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[9px] font-mono text-[#444] uppercase tracking-widest leading-none mb-1.5">Issue_Date</span>
                  <span className="text-[12px] font-black text-white uppercase tracking-tight">APRIL_2026</span>
               </div>
            </div>
          </div>
        </div>

        {/* Dynamic Holographic Shine (Vantablack Optimized) */}
        <motion.div 
          style={{
            background: "radial-gradient(circle at center, rgba(203, 255, 0, 0.08) 0%, transparent 70%)",
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />
        
        {/* Institutional Pattern Layer */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </motion.div>
    </div>
  );
};
