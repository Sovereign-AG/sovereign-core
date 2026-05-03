"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Activity } from 'lucide-react';
import { SVTPLogo } from './SVTPLogo';

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
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[420px] aspect-[1.1] bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-10 shadow-2xl overflow-hidden cursor-pointer"
      >
        <div className="h-full flex flex-col justify-between relative z-10 [transform:translateZ(40px)]">
          
          <div className="flex justify-between items-start">
            <div className="space-y-6">
              <SVTPLogo size={42} className="text-white opacity-90" />
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Protocol Identity</div>
                <div className="flex items-center space-x-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                   <span className="text-xs font-semibold text-zinc-200 tracking-tight">SVTP v1.0 Root Anchor</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl shadow-sm">
               <ShieldCheck size={28} className="text-yellow-500" />
            </div>
          </div>
 
          <div className="space-y-8">
            <div className="bg-black/40 p-5 border border-zinc-800/50 rounded-xl relative overflow-hidden group/code">
              <div className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest mb-3">SVTP Attestation</div>
              <div className="font-mono text-[13px] text-zinc-400 font-medium break-all leading-tight tracking-tight">
                &#123; "did": "did:svtp:4f8e2...a1f6", "status": "active" &#125;
              </div>
            </div>
 
            <div className="flex items-center justify-between pt-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">SVTP Trust Index</span>
                  <span className="text-4xl font-bold text-white tracking-tight">99.8</span>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Standard v1.0</span>
                  <span className="text-sm font-semibold text-zinc-300 tracking-tight">May 2026</span>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

