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
    const saved = localStorage.getItem('sov_cookie_prefs');
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
    localStorage.setItem('sov_cookie_prefs', JSON.stringify(preferences));
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
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <Shield size={24} className="text-slate-900" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">Trust Preferences</h2>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Sovereign Governance Center</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close preferences"
                className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="bg-emerald-50/50 border border-emerald-100/50 p-4 rounded-2xl flex items-start space-x-3">
                 <Info size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                 <p className="text-xs leading-relaxed text-emerald-800 font-medium">
                   Sovereign AG does not use third-party marketing or advertising cookies. Our telemetry is 100% focused on Network Integrity.
                 </p>
              </div>

              <div className="space-y-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="flex items-start justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                    <div className="flex-1 mr-8">
                       <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-bold text-slate-900">{cat.title}</h3>
                          {cat.required && (
                            <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-1.5 py-0.5 rounded">
                              <Lock size={10} className="mr-1" /> Mandatory
                            </div>
                          )}
                       </div>
                       <p className="text-xs text-slate-500 leading-relaxed font-medium">{cat.description}</p>
                    </div>
                    
                    <button 
                      disabled={cat.required}
                      onClick={() => togglePreference(cat.id)}
                      aria-label={`Toggle ${cat.title}`}
                      role="switch"
                      aria-checked={preferences[cat.id] ? "true" : "false"}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${preferences[cat.id] ? 'bg-slate-900' : 'bg-slate-200'} ${cat.required ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${preferences[cat.id] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <a 
                href="/legal/cookies" 
                className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] flex items-center transition-colors px-2"
              >
                Detailed Framework <ChevronRight size={14} className="ml-1" />
              </a>
              <div className="flex space-x-3">
                 <button 
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest"
                 >
                    Dismiss
                 </button>
                 <button 
                    onClick={handleSave}
                    className="px-8 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95 uppercase tracking-widest flex items-center"
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
