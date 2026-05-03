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
    title: 'Strictly Necessary',
    description: 'Essential for Registry operation, Kill-Switch access, and session security.',
    required: true
  },
  {
    id: 'security',
    title: 'Security & Anti-Tamper',
    description: 'Prevents DID session hijacking and validates client-side protocol integrity.',
    required: true
  },
  {
    id: 'performance',
    title: 'Performance & Telemetry',
    description: 'Infrastructure monitoring for handshake latency and ledger sync accuracy.',
    required: false
  },
  {
    id: 'functional',
    title: 'Functional Preferences',
    description: 'Remembers regional node routing and authority theme selections.',
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
      // Show on first visit
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom trigger from footer
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-xl bg-black border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col rounded-2xl overflow-hidden mt-20 mb-10"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black relative z-10">
              <div className="flex items-center space-x-5">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Trust Preferences</h2>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-2 font-mono">Sovereign Governance Center</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close preferences"
                className="p-2 hover:bg-white/5 transition-colors text-gray-500 hover:text-white rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="p-8 space-y-6 max-h-[50vh] overflow-y-auto custom-scrollbar bg-black relative">
              <div className="bg-indigo-500/5 border-l-2 border-indigo-500 p-5 rounded-lg flex items-start space-x-4 mb-4">
                 <Info size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                 <p className="text-[10px] leading-relaxed text-gray-400 font-bold font-mono uppercase tracking-widest">
                   Sovereign AG does not use third-party marketing or advertising cookies. Our telemetry is 100% focused on Network Integrity.
                 </p>
              </div>

              <div className="space-y-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="flex items-start justify-between p-6 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5">
                    <div className="flex-1 mr-8">
                       <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-sm font-black text-white uppercase tracking-tight">{cat.title}</h3>
                          {cat.required && (
                            <div className="flex items-center text-[8px] font-black text-white/40 uppercase tracking-[0.2em] bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                              <Lock size={10} className="mr-2" /> Mandatory
                            </div>
                          )}
                       </div>
                       <p className="text-[11px] text-gray-500 leading-relaxed font-medium font-mono uppercase tracking-tighter">{cat.description}</p>
                    </div>
                    
                    <button 
                      disabled={cat.required}
                      onClick={() => togglePreference(cat.id)}
                      aria-label={`Toggle ${cat.title}`}
                      role="switch"
                      aria-checked={preferences[cat.id] ? "true" : "false"}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${preferences[cat.id] ? 'bg-indigo-600' : 'bg-[#111]'} ${cat.required ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${preferences[cat.id] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-10 bg-[#020202] border-t border-white/5 flex items-center justify-between relative z-10">
              <a 
                href="/legal/cookies" 
                className="text-[10px] font-black text-gray-600 hover:text-indigo-400 uppercase tracking-[0.4em] flex items-center transition-colors px-2 font-mono"
              >
                Detailed Framework <ChevronRight size={14} className="ml-1" />
              </a>
              <div className="flex space-x-6">
                 <button 
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 text-[10px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
                 >
                    Dismiss
                 </button>
                 <button 
                    onClick={handleSave}
                    className="px-8 py-4 bg-white text-black text-[10px] font-black border border-white rounded-xl transition-all active:scale-95 uppercase tracking-[0.3em] flex items-center hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                 >
                    Confirm Preferences <Check size={14} className="ml-2" />
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

