"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Database, Eye, ShieldCheck, Activity, Lock, Globe } from 'lucide-react';

export default function CookieLedgerPage() {
  const sections = [
    { id: 'telemetry', label: '1.0 Network Telemetry' },
    { id: 'tokens', label: '2.0 Technical Tokens' },
    { id: 'preferences', label: '3.0 Consent Management' },
  ];

  return (
    <StandardDoc 
      title="Infrastructure Telemetry & Preferences"
      subtitle="How Sovereign AG utilizes local caching and network heartbeat monitoring to maintain high-authority performance."
      lastUpdated="April 12, 2026"
      titleIcon={<Database size={24} className="text-white" />}
      sections={sections}
    >
      <section id="telemetry" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Activity size={20} className="mr-3 text-white" /> 1.0 Network Telemetry Protocol
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          To maintain 99.999% network availability, Sovereign AG utilizes essential technical telemetry. These do not track personal behavior or human identity, but are strictly required for regional Node health and load balancing.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Our telemetry layer monitors the "Pulse" of the machine economy. This includes the synchronization state of DIDs across global clusters and the verification throughput of Action Tax events. Any data captured is ephemeral and purged after every successful consensus epoch (approx. 10 minutes).
        </p>
      </section>

      <div className="bg-[#050505] border border-[#111] text-white rounded-none p-12 my-16 relative overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-blue-500/5 blur-[120px]" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0 p-8 bg-white/5 border border-white/10 rounded-none shadow-inner backdrop-blur-xl">
               <Eye size={48} className="text-blue-400" />
            </div>
            <div className="space-y-4">
               <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-1">Zero-Tracking Commitment</h4>
               <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-2xl">
                  Sovereign AG does not utilize marketing cookies, third-party pixels, or behavioral cross-site tracking. Our infrastructure is strictly utilitarian, designed to serve machines that do not have "preferences" or "history"—only cryptographic state.
               </p>
            </div>
         </div>
      </div>

      <section id="tokens" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Lock size={20} className="mr-3 text-white" /> 2.0 Technical Token Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
           <div className="p-8 border border-[#111] bg-[#050505] rounded-none shadow-sm space-y-4">
              <ShieldCheck className="text-emerald-500" size={24} />
              <h5 className="font-black text-white uppercase text-xs tracking-widest leading-none">AUTH_SESSION</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Maintains the 30-day secure handshake between the Operator and the Control Tower. Essential for DID management.</p>
           </div>
           <div className="p-8 border border-[#111] bg-[#050505] rounded-none shadow-sm space-y-4">
              <Globe className="text-blue-500" size={24} />
              <h5 className="font-black text-white uppercase text-xs tracking-widest leading-none">NODE_PEERAGE</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Routes API requests to the geographically local Verification Cluster to ensure sub-10ms tool-call handshakes.</p>
           </div>
        </div>
      </section>

      <section id="preferences" className="space-y-10 pt-12 border-t border-[#111]">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Database size={20} className="mr-3 text-white" /> 3.0 Institutional Consent Ledger
        </h3>
        <div className="bg-[#050505] border border-[#111] rounded-none p-10 space-y-6">
           <p className="text-slate-400 leading-relaxed font-medium">
             By interacting with the Sovereign Root, you acknowledge the use of these essential technical tokens. Since no personally identifiable information (PII) is collected via our telemetry layer, "Opt-Out" is handled through the termination of the root handshake (clearing local storage), which immediately revokes your portal access tokens.
           </p>
           <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">
             Note: Institutional Node Operators may have additional logging requirements mandated by the SGM 11.4 Annex.
           </p>
        </div>
      </section>

      <div className="mt-24 flex flex-col items-center opacity-30">
        <ShieldCheck size={20} className="text-slate-300 mb-4" />
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] text-center">Protocol Telemetry Status: COMPLIANT</div>
      </div>
    </StandardDoc>
  );
}
