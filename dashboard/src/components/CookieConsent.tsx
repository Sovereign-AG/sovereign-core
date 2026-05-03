"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Check, Lock, Info, ChevronRight } from 'lucide-react';

interface CookieCategory {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

const CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    title: 'Identity Integrity',
    description: 'Critical infrastructure for session security, DID resolution, and cryptographic key rotation.',
    required: true
  },
  {
    id: 'security',
    title: 'Protocol Safeguards',
    description: 'Enforces anti-tamper mechanisms and prevents unauthorized proxy-based identity hijacking.',
    required: true
  },
  {
    id: 'performance',
    title: 'Global Telemetry',
    description: 'Anonymous metrics to optimize cross-border handshake latency and registry availability.',
    required: false
  },
  {
    id: 'functional',
    title: 'System Preferences',
    description: 'Saves your regional node selection and dashboard orchestration settings.',
    required: false
  }
];

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    necessary: true,
    security: true,
    performance: true,
    functional: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('svtp_cookie_prefs');
    if (saved) {
      setPreferences(JSON.parse(saved));
    } else {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleTrigger = () => setIsOpen(true);
    window.addEventListener('openCookiePreferences', handleTrigger);
    return () => window.removeEventListener('openCookiePreferences', handleTrigger);
  }, []);

  const handleSave = () => {
    localStorage.setItem('svtp_cookie_prefs', JSON.stringify(preferences));
    setIsOpen(false);
  };

  const togglePreference = (id: string) => {
    if (CATEGORIES.find(c => c.id === id)?.required) return;
    setPreferences(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-2xl bg-[#050505] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] flex flex-col rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-10 py-10 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-transparent border border-white/15 rounded-2xl flex items-center justify-center shadow-inner">
                  <Shield size={28} className="text-white/90" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight leading-tight">Trust Preferences</h2>
                  <p className="text-xs font-medium text-white/40 uppercase tracking-[0.2em] mt-1">Institutional Governance Hub</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all text-white/30 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-10 py-8 space-y-8 max-h-[55vh] overflow-y-auto custom-scrollbar">
              <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl flex items-start space-x-5">
                 <Info size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                 <p className="text-sm leading-relaxed text-indigo-100/60 font-medium">
                   Sovereign AG operates a zero-advertising network. All telemetry is cryptographically isolated and strictly used for protocol integrity and network performance.
                 </p>
              </div>

              <div className="grid gap-2">
                {CATEGORIES.map((cat) => (
                  <div 
                    key={cat.id} 
                    className={`flex items-start justify-between p-6 rounded-2xl transition-all duration-300 ${cat.required ? 'bg-transparent' : 'hover:bg-white/[0.02] border border-transparent hover:border-white/5'}`}
                  >
                    <div className="flex-1 pr-10">
                       <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-base font-medium text-white/90 tracking-tight">{cat.title}</h3>
                          {cat.required && (
                            <span className="flex items-center text-[10px] font-semibold text-white/30 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                              <Lock size={10} className="mr-2" /> Mandatory
                            </span>
                          )}
                       </div>
                       <p className="text-sm text-white/40 leading-relaxed max-w-md">{cat.description}</p>
                    </div>
                    
                    <button 
                      disabled={cat.required}
                      onClick={() => togglePreference(cat.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none ${preferences[cat.id] ? 'bg-white' : 'bg-white/5'} ${cat.required ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full shadow-xl transition-all duration-300 ease-in-out ${preferences[cat.id] ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white/40'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-10 bg-[#020202] border-t border-white/5 flex items-center justify-between">
              <a 
                href="/legal/trust-framework" 
                className="text-xs font-semibold text-white/30 hover:text-white flex items-center transition-all group tracking-wide"
              >
                Detailed Privacy Framework 
                <ChevronRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              <div className="flex items-center space-x-4">
                 <button 
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 text-xs font-semibold text-white/40 hover:text-white transition-all tracking-wide"
                 >
                    Dismiss
                 </button>
                 <button 
                    onClick={handleSave}
                    className="px-8 py-4 bg-white text-black text-sm font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)]"
                 >
                    Confirm Preferences
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
