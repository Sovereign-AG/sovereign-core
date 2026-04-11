"use client";
import React, { useState } from 'react';
import StandardDoc from '@/components/StandardDoc';
import { ShieldCheck, Send, Loader2, Check, Lock, Building2, Users, FileCheck } from 'lucide-react';

export default function NodeAccessRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate rigorous backend validation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2500);
  };

  return (
    <StandardDoc 
      title="Node Access Request"
      subtitle="Institutional application for Root Node authorization and Sovereign Network integration."
      lastUpdated="April 9, 2026"
      titleIcon={<Lock size={24} className="text-slate-900" />}
    >
      <div className="max-w-2xl mx-auto py-10">
        {!submitted ? (
          <div className="space-y-12">
            <div className="bg-slate-900 text-white rounded-xl p-8 flex items-start space-x-6">
               <div className="shrink-0 p-3 bg-white/10 rounded-lg">
                  <ShieldCheck size={28} className="text-emerald-400" />
               </div>
               <div>
                  <h3 className="text-lg font-bold tracking-tight m-0 mb-2 text-white">Application Requirements</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    Authorization is strictly limited to legal entities with verified NIST or ISO-aligned infrastructure. All submissions undergo a 72-hour cryptographic and legal audit.
                  </p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 pl-1 text-slate-400">
                   <Building2 size={12} />
                   <label htmlFor="org-name" className="text-[10px] font-bold uppercase tracking-widest">Organization Name</label>
                </div>
                <input id="org-name" required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-950 transition-all shadow-sm placeholder:font-medium placeholder:text-slate-300" placeholder="e.g. Global Nexus Core" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 pl-1 text-slate-400">
                     <Users size={12} />
                     <label htmlFor="fleet-size" className="text-[10px] font-bold uppercase tracking-widest">Estimated Agent Fleet Size</label>
                  </div>
                  <select id="fleet-size" required title="Estimated Agent Fleet Size" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-950 transition-all shadow-sm appearance-none">
                     <option value="">Select Range</option>
                     <option value="100-1000">100 - 1,000 Agents</option>
                     <option value="1000-10000">1,000 - 10,000 Agents</option>
                     <option value="10000+">10,000+ Agents (Institutional)</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 pl-1 text-slate-400">
                     <FileCheck size={12} />
                     <label htmlFor="nist-level" className="text-[10px] font-bold uppercase tracking-widest">NIST Compliance Level</label>
                  </div>
                  <select id="nist-level" required title="NIST Compliance Level" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-950 transition-all shadow-sm appearance-none">
                     <option value="">Select Status</option>
                     <option value="aligned">NIST SP 800-218 Aligned</option>
                     <option value="certified">Tier 1 Certified Auditor</option>
                     <option value="other">Institutional Equivalent (ISO/SOC2)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 pl-1 text-slate-400">
                   <Lock size={12} />
                   <label htmlFor="requirement-scope" className="text-[10px] font-bold uppercase tracking-widest">Architectural requirement</label>
                </div>
                <textarea id="requirement-scope" required rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-950 transition-all shadow-sm placeholder:font-medium placeholder:text-slate-300" placeholder="Specify the integration scope and required root-node permissions..." />
              </div>

              <div className="p-6 border border-slate-100 rounded-xl bg-slate-50 flex items-center space-x-4">
                 <input id="compliance-attestation" type="checkbox" required className="w-4 h-4 rounded border-slate-300 accent-slate-900" title="Compliance Attestation" />
                 <label htmlFor="compliance-attestation" className="text-[11px] font-bold text-slate-500 leading-tight">
                    I attest that the organization listed above adheres to the Sovereign Protocol's 'Kill-Switch' standard and NIST 800-218 safety guidelines.
                 </label>
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full py-5 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-slate-900/10 hover:bg-slate-950 transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-3" />
                    <span>Verifying Compliance...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Integration Application</span>
                    <Send size={14} className="ml-3 opacity-40" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-20 border border-slate-200 rounded-xl bg-white flex flex-col items-center text-center px-12 shadow-sm">
             <div className="w-20 h-20 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center shadow-xl mb-8">
                <ShieldCheck size={40} />
             </div>
             <h3 className="text-2xl font-black text-slate-900 tracking-tight m-0 mb-3">Application Logged</h3>
             <p className="text-sm text-slate-500 font-medium mb-10 leading-relaxed max-w-sm">
               Your organization's data has been hashed and queued for institutional audit. A Sovereign Node operator will establish a secure handshake via your registered DID within 72 hours.
             </p>
             <button onClick={() => setSubmitted(false)} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors border-b-2 border-slate-200 hover:border-slate-900 pb-1">
                New Application Node
             </button>
          </div>
        )}

        <div className="mt-20 pt-12 border-t border-slate-200 flex flex-col items-center space-y-4 opacity-50">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Sovereign Network Registry</div>
           <div className="text-[9px] font-mono text-slate-500">AUTH_GATE_V4.0 // COMPLIANT_ONLY</div>
        </div>
      </div>
    </StandardDoc>
  );
}
