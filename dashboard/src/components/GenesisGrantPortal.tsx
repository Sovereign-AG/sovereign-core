"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle2, Building2, Globe, Cpu } from 'lucide-react';

export const GenesisGrantPortal = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="genesis-grant" className="py-44 bg-[#000000] relative overflow-hidden border-t border-[#111]">
      {/* Background Ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-lime-500/5 blur-[200px] rounded-full pointer-events-none opacity-40" />
      
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="text-[10px] font-mono text-lime-400 uppercase tracking-[0.5em] mb-4">Strategic Acquisition</div>
              <h2 className="text-6xl font-black text-white tracking-[-0.05em] uppercase leading-[0.9]">Genesis <br/><span className="text-gray-500">Grant slots.</span></h2>
              <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-md">Secure your institution's role in the Sovereign network. Limited to 20 founding validators for the 2026 deployment.</p>
            </div>

            <div className="space-y-8">
               {[
                 { icon: Building2, text: "Institutional Identity Anchoring", desc: "Non-repudiable origin certificates." },
                 { icon: Globe, text: "Global Node Validator Rights", desc: "Participate in the Resident Root mesh." },
                 { icon: Cpu, text: "Priority Audit Bandwidth", desc: "Sub-10ms verification prioritization." }
               ].map((item, i) => (
                 <div key={i} className="flex items-start space-x-6 group">
                    <div className="p-4 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-gray-700 group-hover:text-lime-500 group-hover:border-lime-500/50 transition-all shadow-xl">
                       <item.icon size={24} />
                    </div>
                    <div className="space-y-1">
                       <span className="text-xs font-black text-white uppercase tracking-widest block">{item.text}</span>
                       <span className="text-[10px] font-medium text-gray-600 uppercase tracking-widest">{item.desc}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-lime-500/5 blur-3xl rounded-[3rem] opacity-50" />
            <div className="relative bg-[#050505] border border-[#1A1A1A] rounded-[3rem] p-12 lg:p-16 shadow-[0_80px_160px_-40px_rgba(0,0,0,1)]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    key={step}
                    className="space-y-10"
                  >
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.4em]">Slot Verification // 0{step}</span>
                       <div className="flex space-x-2">
                          {[1, 2].map(i => (
                            <div key={i} className={`h-1 w-12 rounded-full transition-all duration-700 ${step >= i ? 'bg-lime-500 shadow-[0_0_10px_rgba(163,230,53,0.5)]' : 'bg-[#1A1A1A]'}`} />
                          ))}
                       </div>
                    </div>

                    {step === 1 ? (
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Institutional Entity</label>
                          <input suppressHydrationWarning type="text" placeholder="Corp Name..." className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 text-sm font-bold text-white focus:outline-none focus:border-lime-500/50 transition-all shadow-inner placeholder:text-gray-800" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Principal Directives (Email)</label>
                          <input suppressHydrationWarning type="email" placeholder="principal@entity.ai" className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 text-sm font-bold text-white focus:outline-none focus:border-lime-500/50 transition-all shadow-inner placeholder:text-gray-800" />
                        </div>
                        <button 
                          onClick={nextStep}
                          className="w-full py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-4 hover:bg-gray-200 transition-all active:scale-[0.98]"
                        >
                          <span>Initialize Sequence</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label id="fleet-size-label" className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Projected Fleet Scale</label>
                          <div className="relative">
                             <select 
                               aria-labelledby="fleet-size-label"
                               className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 text-sm font-bold text-white focus:outline-none focus:border-lime-500/50 transition-all appearance-none cursor-pointer"
                             >
                                <option>100 - 1,000 Nodes</option>
                                <option>1,000 - 10,000 Autonomous Units</option>
                                <option>10,000+ Institutional Core</option>
                             </select>
                             <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                                <ArrowRight size={16} className="rotate-90" />
                             </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Acquisition Grant Code</label>
                          <input suppressHydrationWarning type="text" placeholder="SOVEREIGN_GENESIS" className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 text-sm font-black text-lime-400 focus:outline-none focus:border-lime-500/50 transition-all placeholder:text-gray-900 tracking-widest bg-emerald-500/5" />
                        </div>
                        <button 
                          onClick={handleSubmit}
                          className="w-full py-6 bg-lime-500 text-black text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-4 hover:bg-lime-400 transition-all active:scale-[0.98] shadow-[0_20px_40px_-10px_rgba(132,204,22,0.3)]"
                        >
                          <span>Authorize Acquisition</span>
                          <Shield size={14} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center space-y-10 py-16"
                  >
                    <div className="w-24 h-24 bg-lime-500/10 border border-lime-500/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(132,204,22,0.1)] mb-4">
                       <CheckCircle2 size={48} className="text-lime-500" />
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-3xl font-black text-white uppercase tracking-tight">Access Provisioned.</h3>
                       <p className="text-gray-500 font-medium text-lg max-w-xs mx-auto">Your submission is being anchored to the Sovereign Registry. Identification verified.</p>
                    </div>
                    <div className="h-px w-20 bg-[#1A1A1A]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
