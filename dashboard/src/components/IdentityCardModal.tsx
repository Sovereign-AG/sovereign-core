"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Fingerprint, Lock, CheckCircle2, Building2 } from 'lucide-react';
import { SVTPLogo } from './SVTPLogo';

interface IdentityCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  didData: {
    did: string;
    controller: string;
    trust_index: string;
    liability_limit: string;
    latency: string;
    status: string;
  } | null;
}

const IdentityCardModal: React.FC<IdentityCardModalProps> = ({ isOpen, onClose, didData }) => {
  if (!didData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 overflow-y-auto pt-10 sm:pt-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[450px] aspect-[1/1.4] bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden my-auto shrink-0"
          >
            {/* Glossy Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
            
            <button 
              onClick={onClose}
              aria-label="Close Identity Card"
              title="Close Identity Card"
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100/50 hover:bg-slate-200 transition-colors z-20"
            >
              <X size={20} className="text-slate-600" />
            </button>

            <div className="p-10 h-full flex flex-col justify-between relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <SVTPLogo size={48} className="text-slate-900 mb-3" />
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Class 1 Identity</div>
                </div>
                <div className="text-right space-y-1">
                   <div className="flex items-center justify-end space-x-2">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Verified Node</span>
                   </div>
                   <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-tighter">
                     Pulse: {didData.latency} Latency
                   </div>
                </div>
              </div>

              {/* Main Identity Zone */}
              <div className="space-y-8">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Decentralized Identifier</div>
                  <div className="font-mono text-base text-slate-900 font-bold bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl tracking-tight">
                    {didData.did}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                    <Building2 size={12} className="mr-2" /> Controller Entity
                  </div>
                  <div className="text-xl font-black text-slate-950 tracking-tight leading-none">
                    {didData.controller}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NIST Trust Index</div>
                    <div className="text-2xl font-black text-emerald-600 tracking-tighter">
                      {didData.trust_index}
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Liability Limit</div>
                    <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                      {didData.liability_limit}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
                    <Fingerprint size={12} className="mr-2" /> Cryptographic Fingerprint
                  </div>
                  <div className="flex space-x-1.5">
                    {Array.from({length: 12}).map((_, i) => (
                      <div key={i} className="h-6 flex-1 bg-slate-100 rounded-[3px] overflow-hidden">
                        <motion.div 
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                          className="w-full h-full bg-slate-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Ticker */}
              <div className="border-t border-slate-100 pt-8 flex items-end justify-between">
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
                  Registry Anchored<br/>
                  <span className="text-slate-900 font-bold">SHA-256 Verified</span>
                </div>
                <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center shadow-xl">
                   <ShieldCheck size={28} className="text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Industrial Bottom Stripe */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IdentityCardModal;

