"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Database, Eye, ShieldCheck } from 'lucide-react';

export default function CookieLedgerPage() {
  const sections = [
    { id: 'telemetry', label: '1.0 Network Telemetry' },
    { id: 'preferences', label: '2.0 Consent Management' },
  ];

  return (
    <StandardDoc 
      title="Infrastructure Telemetry & Cookie Preferences"
      subtitle="How Sovereign AG utilizes local caching and network heartbeat monitoring."
      lastUpdated="April 9, 2026"
      titleIcon={<Database size={24} className="text-slate-900" />}
      sections={sections}
    >
      <section id="telemetry">
        <h3>1.0 Technical Metadata Caching</h3>
        <p>
          To maintain high-authority performance, the Sovereign portal utilizes essential technical tokens. These do not track personal behavior but are required for:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 font-medium">
          <li>Authentication persistence for the Control Tower.</li>
          <li>Load balancing metrics for regional Node health.</li>
          <li>Registry search throughput optimization.</li>
        </ul>
      </section>

      <div className="bg-slate-900 text-white rounded-xl p-8 my-10 flex items-center space-x-6 overflow-hidden relative">
         <div className="absolute inset-0 bg-blue-500/10 blur-3xl" />
         <div className="relative z-10 shrink-0 p-3 bg-white/10 border border-white/20 rounded-xl">
            <Eye size={24} className="text-blue-400" />
         </div>
         <div className="relative z-10">
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Non-Tracking Standard</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
               Sovereign AG does not utilize marketing cookies or third-party pixels. Our infrastructure is strictly technical.
            </p>
         </div>
      </div>

      <section id="preferences">
        <h3>2.0 User Consent Ledger</h3>
        <p>
          By interacting with the Sovereign Root, you acknowledge the use of these essential tokens. Since no PII is collected via our telemetry layer, "Opt-Out" is handled through clearing your browser's local storage which terminates the Control Tower handshake.
        </p>
      </section>
    </StandardDoc>
  );
}
