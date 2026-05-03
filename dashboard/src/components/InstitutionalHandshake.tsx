"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ExternalLink, Globe } from 'lucide-react';

interface HandshakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  isLoading?: boolean;
}

export default function InstitutionalHandshake({ isOpen, onClose, onConfirm, user, isLoading }: HandshakeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isLoading ? undefined : onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[560px] bg-[#1E1F20] border border-white/5 rounded-[24px] shadow-2xl overflow-hidden text-[#E3E3E3] font-sans"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-4 flex items-center justify-between">
            <h2 className="text-[22px] font-normal tracking-tight">Set up your Sovereign AG Billing account</h2>
            {!isLoading && (
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <div className="px-8 pb-8 space-y-6">
            <p className="text-[14px] leading-relaxed text-gray-400">
              Sovereign AG billing is managed with an institutional SVTP account. Once you set up billing, your agents will gain permanent registry clearance and higher forensic resolution limits.
            </p>

            {/* User Identity Card */}
            <div className="flex items-center space-x-4 p-1">
               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20 overflow-hidden">
                  {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : user.name[0]}
               </div>
               <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-white">{user.name}</span>
                  <span className="text-[12px] text-gray-500">{user.email}</span>
               </div>
            </div>

            {/* Country Selector (Google Style) */}
            <div className="space-y-2">
               <label className="text-[12px] font-medium text-gray-400 ml-1">Country</label>
               <div className="relative group">
                  <div className="w-full bg-[#1E1F20] border border-[#444746] rounded-lg px-4 py-3 flex items-center justify-between hover:border-gray-500 transition-all cursor-not-allowed opacity-50">
                     <span className="text-[14px]">India</span>
                     <ChevronDown size={18} className="text-gray-500" />
                  </div>
               </div>
            </div>

            {/* TOS Notice */}
            <div className="pt-2">
               <p className="text-[13px] leading-relaxed text-gray-400">
                 By continuing, you are setting up Sovereign Institutional Billing for this application and you agree to the <span className="text-[#8AB4F8] hover:underline cursor-pointer inline-flex items-center">Sovereign Protocol Platform <ExternalLink size={12} className="ml-1" /></span> and any <span className="text-[#8AB4F8] hover:underline cursor-pointer">applicable services and SVTP Terms of Service</span>.
               </p>
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-end">
               <button 
                onClick={onConfirm}
                disabled={isLoading}
                className="px-6 py-2.5 bg-[#8AB4F8] text-[#001D35] text-[14px] font-bold rounded-full hover:bg-[#A1C2FA] transition-all shadow-sm disabled:opacity-80 disabled:cursor-wait min-w-[160px] flex items-center justify-center"
               >
                 {isLoading ? (
                   <span className="flex items-center">
                     <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#001D35]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Provisioning...
                   </span>
                 ) : "Agree & continue"}
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
