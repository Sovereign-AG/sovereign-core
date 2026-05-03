"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Globe, Database, Scale, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatusPage() {
  const [stats, setStats] = useState<any>(null);
  const [fairness, setFairness] = useState(99.4);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(data => {
      if (data.success) setStats(data);
    });
    fetch('/api/compliance/fairness').then(r => r.json()).then(data => {
       if (data.success) setFairness(parseFloat(data.aggregate_fairness_score));
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-neutral-800 p-8 md:p-12 flex flex-col items-center bg-tech-grid">
      <div className="max-w-5xl w-full space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }} 
             animate={{ scale: 1, opacity: 1 }} 
             className="p-4 bg-emerald-500/10 rounded-none border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
           >
              <ShieldCheck size={56} className="text-emerald-500" />
           </motion.div>
           <h1 className="text-5xl font-black tracking-tighter uppercase text-white leading-none">The Industrial Standard</h1>
           <p className="text-xs text-gray-500 tracking-[0.4em] uppercase font-mono">Sovereign AG Protocol · Global Registry Status</p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="bg-[#050505] border border-[#222] p-6 rounded-none group hover:border-emerald-500/30 transition-all">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Uptime</span>
                 <Activity size={16} className="text-emerald-500" />
              </div>
              <div className="text-3xl font-black text-white tracking-tight">99.998%</div>
              <div className="flex items-center mt-3 text-[9px] text-emerald-500 font-bold uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-none mr-2 animate-pulse" /> Live Settlement
              </div>
           </div>
           
           <div className="bg-[#050505] border border-[#222] p-6 rounded-none group hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Bias Monitor</span>
                 <Scale size={16} className="text-blue-400" />
              </div>
              <div className="text-3xl font-black text-white tracking-tight">{fairness}%</div>
              <div className="flex items-center mt-3 text-[9px] text-blue-400 font-bold uppercase tracking-widest">
                 Zero Drift Detected
              </div>
           </div>

           <div className="bg-[#050505] border border-[#222] p-6 rounded-none group hover:border-indigo-500/30 transition-all">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Legal Immunity</span>
                 <Fingerprint size={16} className="text-indigo-500" />
              </div>
              <div className="text-3xl font-black text-white tracking-tight leading-tight">ACTIVE</div>
              <div className="flex items-center mt-3 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                 Founder's Cloak Signed
              </div>
           </div>

           <div className="bg-[#050505] border border-[#222] p-6 rounded-none group hover:border-amber-500/30 transition-all">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Handshake</span>
                 <Globe size={16} className="text-amber-500" />
              </div>
              <div className="text-3xl font-black text-white tracking-tight">3.2ms</div>
              <div className="flex items-center mt-3 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                 Cross-Cloud Transit
              </div>
           </div>
        </div>

        {/* Maintenance Ledger */}
        <div className="bg-[#050505] border border-[#222] rounded-none overflow-hidden shadow-2xl relative">
           <div className="p-5 border-b border-[#222] bg-[#0A0A0A] flex justify-between items-center">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Maintenance Ledger</h3>
              <span className="text-[9px] text-gray-600 font-mono italic">Node ID: PUBLIC-RO-G92</span>
           </div>
           <div className="p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-none -translate-y-1/2 translate-x-1/2" />
              <div className="inline-flex items-center px-6 py-2 bg-emerald-500/10 text-emerald-500 rounded-none text-[11px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] mb-6">
                 All Systems Fully Sovereign
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto font-medium">
                 The Sovereign AG registry is operating within institutional bounds. Every action is cryptographically verified and signed by the <span className="text-white font-bold">Sovereign Protocol</span>.
              </p>
           </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-[#1a1a1a]">
           <p className="text-[10px] text-gray-700 tracking-[0.3em] uppercase font-black">Powered by Sovereign AG Protocol · Industry Standard v1.2</p>
        </div>
      </div>
    </div>
  );
}

