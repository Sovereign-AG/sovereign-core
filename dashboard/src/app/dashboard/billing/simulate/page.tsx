"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, Landmark, CreditCard, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettlementSimulation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const amount = searchParams.get('amount') || "0.00";
  const type = searchParams.get('type') || "SETTLEMENT";

  const handleSimulateCompletion = () => {
    setIsProcessing(true);
    // Simulate cryptographic verification delay
    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        router.push('/dashboard/billing?status=success&simulated=true');
      }, 2000);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E3E3E3] font-sans flex items-center justify-center p-6">
      <div className="max-w-[480px] w-full space-y-8">
        
        {/* Institutional Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
           <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
              <Landmark size={32} />
           </div>
           <div className="space-y-1">
              <h1 className="text-[24px] font-normal tracking-tight text-white">Sovereign Settlement Gateway</h1>
              <p className="text-[14px] text-gray-500 uppercase tracking-widest font-bold">Institutional Simulation Rail</p>
           </div>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-[#000000] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
           <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                 <span className="text-[13px] text-gray-400">Transaction Type</span>
                 <span className="text-[13px] font-bold text-white uppercase tracking-wider">{type.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[13px] text-gray-400">Settlement Amount</span>
                 <span className="text-[24px] font-normal text-white tracking-tighter">${parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-start space-x-3 text-[12px] text-gray-500 bg-white/[0.02] p-4 rounded-xl">
                 <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                 <p>This is a simulated transaction. No real funds will be moved. This rail is used to verify SVTP handshake protocols before production deployment.</p>
              </div>
           </div>

           <div className="p-6 bg-white/[0.02] border-t border-white/5">
              <button 
                onClick={handleSimulateCompletion}
                disabled={isProcessing}
                className={cn(
                  "w-full py-4 rounded-xl text-[15px] font-bold transition-all flex items-center justify-center space-x-3",
                  step === 1 ? "bg-blue-500 text-white hover:bg-blue-400" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                )}
              >
                {isProcessing ? (
                   step === 1 ? (
                     <>
                       <Activity size={18} className="animate-pulse" />
                       <span>Verifying Handshake...</span>
                     </>
                   ) : (
                     <>
                       <ShieldCheck size={18} />
                       <span>Settlement Confirmed</span>
                     </>
                   )
                ) : (
                  <>
                    <span>Authorize Simulation</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
           </div>
        </div>

        {/* Security Footnote */}
        <div className="flex items-center justify-center space-x-6 text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">
           <div className="flex items-center"><Lock size={12} className="mr-2" /> AES-256</div>
           <div className="flex items-center text-blue-500/50"><Activity size={12} className="mr-2" /> SVTP v1.0</div>
        </div>

      </div>
    </div>
  );
}
