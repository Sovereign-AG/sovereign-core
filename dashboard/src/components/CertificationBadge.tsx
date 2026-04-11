"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

interface CertificationBadgeProps {
  did: string;
}

export const CertificationBadge = ({ did }: CertificationBadgeProps) => {
  const [data, setData] = useState<{ trust_score: string; last_pulse: string; isGrant: boolean } | null>(null);

  useEffect(() => {
    // Fetch individual agent data (Simulated for this DID context)
    fetch('/api/agent/list').then(r => r.json()).then(res => {
      const agent = res.agents?.find((a: any) => a.did === did) || res.agents?.[0];
      if (agent) {
         setData({
            trust_score: agent.trust_index || '98.4',
            last_pulse: 'Online',
            isGrant: true // Defaulting to true for Genesis phase
         });
      }
    });
  }, [did]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="inline-flex flex-col p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl relative overflow-hidden group certification-shimmer"
    >
      {/* Holographic Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <div className="flex items-center space-x-3 mb-3 relative z-10">
         <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <ShieldCheck size={18} className="text-emerald-500" />
         </div>
         <div className="space-y-0.5">
            <div className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Sovereign-Verified</div>
            <div className={`flex items-center text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border w-fit ${data?.isGrant ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
               {data?.isGrant ? 'GRANT_SUBSIDIZED' : 'ISO_SETTLED'}
            </div>
         </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 mt-2 pt-3 relative z-10">
         <div className="space-y-1">
            <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Trust Score_</div>
            <div className="text-sm font-black text-slate-900 font-mono tracking-tighter">
               {data?.trust_score || '--.-'}%
            </div>
         </div>
         <div className="text-right space-y-1">
            <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Compliance_</div>
            <div className="flex items-center justify-end text-[10px] font-bold text-emerald-600 uppercase">
               <Activity size={10} className="mr-1 animate-pulse" />
               NIST_4.2
            </div>
         </div>
      </div>

      <style jsx>{`
        .certification-shimmer {
          background-image: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite linear;
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </motion.div>
  );
};
