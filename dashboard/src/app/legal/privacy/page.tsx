"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { EyeOff, Fingerprint, Lock, ShieldCheck, Database, Globe } from 'lucide-react';

export default function PrivacyNoticePage() {
  const sections = [
    { id: 'non-pii', label: '1.0 Non-PII Protocol' },
    { id: 'encryption', label: '2.0 Cryptographic Anonymity' },
    { id: 'retention', label: '3.0 Data Retention (The Hiding Rule)' },
    { id: 'sovereignty', label: '4.0 IP Sovereignty' },
  ];

  return (
    <StandardDoc 
      title="Institutional Privacy Notice"
      subtitle="How Sovereign AG handles cryptographic metadata, identity persistence, and autonomous data sovereignty."
      lastUpdated="April 12, 2026"
      titleIcon={<EyeOff size={24} className="text-white" />}
      sections={sections}
    >
      <section id="non-pii" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Database size={20} className="mr-3 text-white" /> 1.0 Non-PII Protocol
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          Sovereign AG is engineered from the ground up for non-human entities. Our protocol is designed to eliminate the risks associated with Personally Identifiable Information (PII) by operating strictly on cryptographic primitives.
        </p>
        <p className="text-gray-500 leading-relaxed">
          We do not collect names, emails, or personal contact details of the human operators behind an agent fleet by default. Our registry tracks Decentralized Identifiers (DIDs), public keys (Ed25519), and Action Tax receipts. Any institutional metadata required for billing or compliance is hashed at the point of entry and stored in a multi-sig vault that requires dual-witness authorization to decrypt.
        </p>
      </section>

      <div className="bg-[#050505] border border-[#111] text-white rounded-none p-12 my-16 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')] opacity-[0.03]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
           <div className="p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none shadow-inner">
              <Fingerprint size={56} className="text-emerald-400" />
           </div>
           <div className="space-y-4">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">Cryptographic Anonymity</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                 While identity within the registry is immutable and non-repudiable, the link between a DID and a real-world legal entity is protected via encrypted consortium handshakes. This ensures that an agent's technical behavior can be audited without exposing the underlying institutional hierarchy to public scrapers.
              </p>
           </div>
        </div>
      </div>

      <section id="encryption" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Lock size={20} className="mr-3 text-white" /> 2.0 Identity Isolation & Encryption
        </h3>
        <p className="text-gray-500 leading-relaxed">
          The Sovereign protocol utilizes a tiered encryption model to ensure that metadata leakage is mathematically impossible. This isolation extends from the Edge Node to the Core Ledger.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
           <div className="p-8 bg-[#050505] border border-[#111] rounded-none space-y-4">
              <ShieldCheck className="text-emerald-600" size={24} />
              <h5 className="font-black text-white uppercase text-xs tracking-widest leading-none">Pillar 1: Key Residence</h5>
              <p className="text-sm text-gray-500 leading-relaxed">Private keys never leave the Controller's enclave. Sovereign never requests, stores, or transmits the private material used to sign identity headers.</p>
           </div>
           <div className="p-8 bg-[#050505] border border-[#111] rounded-none space-y-4">
              <Globe className="text-blue-600" size={24} />
              <h5 className="font-black text-white uppercase text-xs tracking-widest leading-none">Pillar 2: Zero-Log Handshakes</h5>
              <p className="text-sm text-gray-500 leading-relaxed">API handshakes are ephemeral. We verify the cryptographic proof of the action and discard the session metadata within 300ms of settlement.</p>
           </div>
        </div>
      </section>

      <section id="retention" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Database size={20} className="mr-3 text-white" /> 3.0 Data Retention (The Hiding Rule)
        </h3>
        <p className="text-gray-500 leading-relaxed">
          To ensure network integrity and non-repudiation, DID initialization logs and Action Tax receipts are stored permanently in the Sovereign Ledger. However, we strictly enforce **The Hiding Rule**:
        </p>
        <div className="p-10 bg-[#050505] border-l-8 border-white rounded-none space-y-6">
           <p className="text-xl font-bold text-white leading-relaxed">
             "The Registry verifies the identity of the actor and the existence of the authorization, but never the content of the payload."
           </p>
           <p className="text-sm text-slate-500 leading-relaxed">
             This means that while we can prove that **did:sov:z92k** performed an action at 12:00 UTC, we cannot see what data was transmitted. Your proprietary IP, trade secrets, and agentic workflows remain entirely within your secure perimeter.
           </p>
        </div>
      </section>

      <section id="sovereignty" className="space-y-8 pt-12 border-t border-[#111]">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <ShieldCheck size={20} className="mr-3 text-white" /> 4.0 IP Sovereignty & GDPR
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Sovereign AG is compliant with Global Data Sovereignty standards, including GDPR for institutional metadata and the upcoming **2026 Machine Economy Privacy Act (MEPA)**. Controllers have the 'Right to Obfuscate' fleet metadata that is not required for NIST compliance.
        </p>
        <div className="mt-20 flex flex-col items-center space-y-6 opacity-30">
           <Lock size={20} className="text-slate-300" />
           <div className="flex flex-col items-center">
              <div className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em]">Secure Ledger Protocol v4.0.2</div>
              <div className="text-[8px] font-mono text-gray-800 mt-2 tracking-widest uppercase">SHA256 ANCHOR: 92F1-A901-C34E-1191</div>
           </div>
        </div>
      </section>
    </StandardDoc>
  );
}

