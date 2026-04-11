import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Database, ArrowRight, CheckCircle2, AlertTriangle, Building2, Globe, Cpu } from 'lucide-react';
import { SovereignLogo } from '@/components/SovereignLogo';
import InstitutionalHeader from '@/components/InstitutionalHeader';

export default function GrantPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-lime-500/30 overflow-x-hidden font-sans antialiased selection:text-black">
      <InstitutionalHeader />
      
      {/* Volumetric Depth Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[1000px] bg-lime-500/5 blur-[250px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute -bottom-48 -left-24 w-[800px] h-[800px] bg-emerald-500/5 blur-[200px] rounded-full pointer-events-none opacity-20" />
      
      <main className="relative z-10 max-w-[1400px] mx-auto px-8 pt-48 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          {/* Left Column: Strategic Positioning */}
          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-3 px-4 py-1.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-full"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">2026 Liability Framework</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="space-y-10"
            >
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-[-0.06em] leading-[0.88] uppercase">
                Shadow AI <br/>
                <span className="text-[#333]">is your</span> <br/>
                <span className="text-white">Primary Liability.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-xl">
                Unaccountable agents are a CISO's nightmare. Secure the Genesis Grant to govern your fleet with NIST-standardized cryptographic identity.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8"
            >
               <div className="space-y-4">
                  <div className="text-4xl font-black text-white tracking-tighter">1,000,000</div>
                  <div className="space-y-1">
                     <div className="text-[10px] font-black uppercase tracking-widest text-[#444]">Action Credits</div>
                     <p className="text-xs text-gray-700">Pre-allocated for institutional pilot fleets.</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="text-4xl font-black text-white tracking-tighter">NIST 4.2</div>
                  <div className="space-y-1">
                     <div className="text-[10px] font-black uppercase tracking-widest text-[#444]">Ready in 60s</div>
                     <p className="text-xs text-gray-700">Immediate Ed25519 identity derivation.</p>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Right Column: The Acquisition Vault */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative lg:pl-12"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-lime-500/20 to-transparent blur-2xl opacity-20" />
            
            <div className="relative bg-[#050505] border border-[#1A1A1A] rounded-[3rem] p-12 lg:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden">
               {/* Watermark Logo */}
               <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none scale-150">
                  <SovereignLogo size={200} />
               </div>

               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="space-y-12">
                     <div className="space-y-4">
                        <h2 className="text-4xl font-black tracking-tight uppercase leading-none">Claim the <br/>Genesis Grant.</h2>
                        <div className="flex items-center space-x-3">
                           <div className="h-px w-8 bg-lime-500/50" />
                           <p className="text-lime-500 font-black uppercase tracking-[0.3em] text-[10px]">Zero-Cost Institutional Onboarding</p>
                        </div>
                     </div>

                     <AnimatePresence mode="wait">
                        {!submitted ? (
                          <motion.form 
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            onSubmit={handleSubmit} 
                            className="space-y-10"
                          >
                            <div className="space-y-4 text-left">
                              <label className="text-[10px] font-black uppercase tracking-widest text-[#444] ml-1">Workstation Identifier (Email)</label>
                              <div className="relative group">
                                 <input 
                                   suppressHydrationWarning
                                   type="email" 
                                   required
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="ciso@company.com"
                                   className="w-full bg-[#0A0A0A] border border-[#1A1A1A] group-hover:border-lime-500/30 rounded-2xl px-8 py-6 text-lg font-bold placeholder:text-gray-800 focus:outline-none focus:border-lime-500/50 transition-all shadow-inner"
                                 />
                                 <Building2 className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-lime-500/30 transition-colors" size={20} />
                              </div>
                            </div>

                            <div className="space-y-6">
                               <button 
                                 type="submit"
                                 className="w-full py-7 bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-2xl hover:bg-lime-500 transition-all active:scale-[0.98] shadow-2xl shadow-white/5 flex items-center justify-center group"
                               >
                                 Authorize Grant Acquisition <ArrowRight size={16} className="ml-4 group-hover:translate-x-1 transition-transform" />
                               </button>
                               
                               <div className="flex items-center justify-between px-2 opacity-30">
                                  <div className="flex items-center space-x-3">
                                     <Lock size={12} />
                                     <span className="text-[9px] font-black uppercase tracking-widest">ED25519 Anchored</span>
                                  </div>
                                  <div className="h-px flex-1 bg-[#1A1A1A] mx-6" />
                                  <div className="flex items-center space-x-3">
                                     <span className="text-[9px] font-black uppercase tracking-widest">NIST 800-218</span>
                                     <ShieldCheck size={12} />
                                  </div>
                               </div>
                            </div>
                          </motion.form>
                        ) : (
                          <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-12 text-center space-y-8"
                          >
                            <div className="w-24 h-24 bg-lime-500/10 border border-lime-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(101,163,13,0.1)]">
                               <CheckCircle2 size={48} className="text-lime-500" />
                            </div>
                            <div className="space-y-4">
                               <h3 className="text-3xl font-black uppercase tracking-tight">Acquisition Pulse Sent.</h3>
                               <p className="text-gray-500 font-medium max-w-xs mx-auto text-lg">
                                  Our registry engineers will verify your DID derivation and issue your Genesis Grant within 2 operational hours.
                                </p>
                            </div>
                            <button onClick={() => setSubmitted(false)} className="text-[10px] font-black uppercase tracking-widest text-[#333] hover:text-white transition-colors">Apply for second slot</button>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Institutional Validation Bar */}
      <footer className="relative z-10 border-t border-[#1A1A1A] py-16 bg-[#000000]/80 backdrop-blur-3xl mt-20">
         <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between gap-16 items-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            {["NIST_CERTIFIED_2026", "ISO_42001_MANAGEMENT", "SEC_IMMUTABLE_LEDGER", "EU_AI_ACT_MAPPING"].map((text, i) => (
               <div key={i} className="flex items-center space-x-4">
                  <div className="w-1.5 h-1.5 bg-white rounded-full opacity-20" />
                  <div className="text-[10px] font-black uppercase tracking-[0.5em]">{text}</div>
               </div>
            ))}
         </div>
      </footer>
    </div>
  );
}
