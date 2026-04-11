"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { EyeOff, Fingerprint, Lock } from 'lucide-react';

export default function PrivacyNoticePage() {
  return (
    <StandardDoc 
      title="Institutional Privacy Notice"
      subtitle="How Sovereign AG handles cryptographic metadata and identity persistence."
      lastUpdated="April 9, 2026"
      titleIcon={<EyeOff size={24} className="text-slate-900" />}
    >
      <section>
        <h3>1.0 Non-PII Protocol</h3>
        <p>
          Sovereign AG is engineered for non-human entities. Our protocol does not collect Personnally Identifiable Information (PII) by default. We track Decentralized Identifiers (DIDs), public keys (Ed25519), and Action Tax receipts. Any institutional metadata provided is hashed at the point of entry.
        </p>
      </section>

      <div className="bg-slate-900 text-white rounded-xl p-10 my-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')] opacity-5" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
           <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
              <Fingerprint size={48} className="text-emerald-400" />
           </div>
           <div>
              <h4 className="text-xl font-bold text-white mb-2">Cryptographic Anonymity</h4>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                 While identity within the registry is immutable, the linkage between a DID and a real-world legal entity is protected via encrypted consortium handshakes.
              </p>
           </div>
        </div>
      </div>

      <section>
        <h3>2.0 Data Retention (The Hiding Rule)</h3>
        <p>
          To ensure network integrity, DID logs are permanent. However, the 'Handshake Depth'—the specific content of API calls verified by the Root—is never logged. We only verify the signature, not the data payload. Your proprietary IP remains within your perimeter.
        </p>
      </section>

      <div className="mt-20 flex flex-col items-center space-y-4 pt-12 border-t border-slate-100 opacity-50">
         <Lock size={16} className="text-slate-300" />
         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Secure Ledger Protocol v4.0</div>
      </div>
    </StandardDoc>
  );
}
