"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, Activity, ArrowRight, AlertTriangle, FileText } from 'lucide-react';

interface InstitutionalNoteProps {
  onAccept: () => void;
}

export const InstitutionalNote = ({ onAccept }: InstitutionalNoteProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Shield size={40} className="text-white" />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Institutional Note</h2>
        <p className="text-gray-500 font-medium text-lg leading-relaxed">
          Before initializing your cryptographic anchor, you must acknowledge the operational mandates of the SVTP v1.0 Protocol.
        </p>
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] mb-4 flex items-center">
          <Scale size={14} className="mr-3" /> Agent Responsibilities
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-[#050505] border border-[#111] rounded-2xl space-y-2">
            <div className="text-xs font-black text-white uppercase tracking-widest">Non-Repudiation</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">Every tool-call executed under this identity is cryptographically signed and immutable. You are legally responsible for all autonomous output.</p>
          </div>
          <div className="p-6 bg-[#050505] border border-[#111] rounded-2xl space-y-2">
            <div className="text-xs font-black text-white uppercase tracking-widest">Compliance Drift</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">Malfunctioning agents must be neutralized immediately. Failure to manage drift results in global identity revocation.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] mb-4 flex items-center">
          <FileText size={14} className="mr-3" /> Institutional Standards
        </h3>
        <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <ul className="space-y-3 text-[11px] text-gray-400 font-medium">
               <li className="flex items-center"><Activity size={10} className="mr-3 text-blue-500" /> NIST-800-218 Secure Software Development Alignment</li>
               <li className="flex items-center"><Activity size={10} className="mr-3 text-blue-500" /> Ed25519 High-Authority Identity Primitives</li>
               <li className="flex items-center"><Activity size={10} className="mr-3 text-blue-500" /> Real-time Metered Action-Tax Attestation</li>
            </ul>
        </div>
      </div>

      <motion.button 
        onClick={onAccept}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:bg-lime-500 transition-all flex items-center justify-center group"
      >
        ACKNOWLEDGE & INITIALIZE <ArrowRight size={16} className="ml-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <div className="flex items-center justify-center space-x-2 text-[8px] font-black text-gray-800 uppercase tracking-widest opacity-50">
        <AlertTriangle size={10} />
        <span>Violation of protocol standards results in immediate identity severance.</span>
      </div>
    </div>
  );
};

