"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SovereignLogo } from './SovereignLogo';

interface IdentityCardProps {
  did?: string;
  reputation?: string;
  status?: string;
  className?: string;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({ 
  did = "sov:4f8e2...a1f6", 
  reputation = "99.8", 
  status = "verified",
  className = ""
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
      animate={{ opacity: 1, scale: 1, rotateY: -15, rotateX: 10 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1000px' }}
      className={`relative ${className}`}
    >
       {/* 3D Skewed Passport Card */}
       <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-[4px] p-8 shadow-[20px_40px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Edge Lighting */}
          <div className="absolute top-0 left-0 w-[2px] h-full bg-[#CBFF00] shadow-[0_0_10px_rgba(203,255,0,0.3)]" />
          
          {/* Moving Lens Flare */}
          <motion.div 
            animate={{ 
               top: ['-100%', '200%'],
               left: ['-50%', '150%'] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] bg-white/5 blur-[80px] rotate-45 pointer-events-none"
          />

          <div className="flex justify-between items-start mb-12 relative z-10">
             <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#555] uppercase tracking-[0.4em]">REPUTATION_SCORE</div>
                <div className="text-5xl font-black text-[#CBFF00] tracking-tighter drop-shadow-[0_0_15px_rgba(203,255,0,0.4)]">{reputation}</div>
             </div>
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="p-5 bg-[#111] border border-[#1A1A1A] rounded-full shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
             >
                <SovereignLogo size={42} className="text-white opacity-90" />
             </motion.div>
          </div>

          <div className="space-y-6 relative z-10">
             <div className="p-5 bg-[#050505]/80 backdrop-blur-md border border-[#1A1A1A] rounded font-mono text-[12px] text-gray-500 leading-relaxed scale-102 relative overflow-hidden">
                <div className="text-lime-500/80 mb-3 text-[10px] tracking-widest uppercase flex items-center">
                   <span className="w-1.5 h-1.5 bg-lime-500 rounded-full mr-2 animate-pulse" />
                   IDENTITY_CERTIFICATE
                </div>
                <div className="break-all opacity-80 mix-blend-screen">
                   &#123;<br/>
                   &nbsp;&nbsp;"did": "{did}",<br/>
                   &nbsp;&nbsp;"status": "{status}",<br/>
                   &nbsp;&nbsp;"origin": "nist-800-218"<br/>
                   &#125;
                </div>
                {/* Horizontal scan line */}
                <motion.div 
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-px bg-lime-500/10"
                />
             </div>
             
             <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                   <span className="text-[9px] font-mono text-[#444] uppercase tracking-widest">ISSUEDATE</span>
                   <span className="text-[12px] font-black text-white uppercase tracking-tight">APRIL_2026</span>
                </div>
                <div className="h-10 w-28 bg-[#000] border border-[#1A1A1A] relative flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CBFF00]/40 to-transparent" />
                   <span className="text-[9px] font-black tracking-[0.2em] text-[#444] uppercase">SOVEREIGN_ID</span>
                </div>
             </div>
          </div>

          {/* Institutional Holographic Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-lime-400/5 blur-[100px] rounded-full" />
       </div>
       
       {/* volumetric structural glow */}
       <div className="absolute -inset-10 bg-lime-400/5 blur-[120px] opacity-30 pointer-events-none" />
    </motion.div>
  );
};
