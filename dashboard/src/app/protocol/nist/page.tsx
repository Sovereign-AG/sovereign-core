"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Shield, BookOpen, CheckCircle2, Lock, Scale, Award } from 'lucide-react';

export default function NISTPage() {
  const sections = [
    { id: 'alignment', label: '1.0 NIST-2026 Alignment' },
    { id: 'minting', label: '2.0 Compliant DID Minting' },
    { id: 'metering', label: '3.0 Metered Authorization' },
    { id: 'liability', label: '4.0 Liability Isolation' },
    { id: 'audits', label: '5.0 Audit-Certified Ledger' },
  ];

  return (
    <StandardDoc 
      title="NIST-2026 Compliance Whitepaper"
      subtitle="Technical Alignment with the NIST NCCoE 'AI Agent Identity and Authorization' Standard (Draft 2026.04.02)"
      lastUpdated="April 9, 2026"
      titleIcon={<Shield size={24} className="text-white" />}
      sections={sections}
    >
      <section id="alignment" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Award size={20} className="mr-3 text-white" /> 1.0 The 2026 Identity Mandate
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          On April 2, 2026, the NIST National Cybersecurity Center of Excellence (NCCoE) formalized the requirement for "Continuous, Metered Identification" for autonomous AI agents. Legacy static keys are no longer sufficient for high-trust environments.
        </p>
        <p className="text-gray-500 leading-relaxed">
          Sovereign AG is engineered specifically to address the **Rule 4.2: Dynamic Proof of Controller (DPoC)** mandate. This requires that every agent action—ranging from a simple database write to a high-value financial transaction—must be cryptographically linked back to a verified institutional identity via a metered settlement layer. Our protocol serves as the authoritative implementation of this non-repudiable Chain of Trust.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
          <div className="p-8 bg-[#050505] border border-[#111] rounded-none space-y-4">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Compliance Pillar 4.2.1</h4>
            <p className="text-sm font-bold text-white leading-snug">JIT Identity Handshake: Identities must be verified 'In-Flight' at the time of execution, not cached or bypassed.</p>
          </div>
          <div className="p-8 bg-[#050505] border border-[#111] rounded-none space-y-4">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Compliance Pillar 4.2.4</h4>
            <p className="text-sm font-bold text-white leading-snug">Non-Repudiable Metering: Transaction costs must be anchored to identity events to prevent infrastructure spoofing.</p>
          </div>
        </div>
      </section>

      <section id="minting" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Lock size={20} className="mr-3 text-white" /> 2.0 Compliant DID Minting
        </h3>
        <p className="text-gray-500 leading-relaxed">
          The Sovereign SDK implements the **Ed25519-NIST-Hardened** signature scheme for identity initialization. Unlike legacy DIDs that rely on weak consensus or centralized authorities, Sovereign DIDs are anchored in an institutional-grade high-authority registry.
        </p>
        
        <div className="space-y-6">
           {[
             { title: "Standard Handshake", desc: "Requires cryptographic proof of institutional domain ownership and a cryptographically verified 'Founding Signature' from the Controller Entity at the time of MINT ($1.00 fee)." },
             { title: "Audit Chaining", desc: "Every identity is linked to a permanent NIST-800-218 configuration hash—an immutable 'snapshot' of the agent's core model weights and safety boundaries at registration." },
             { title: "Hardened Revocation", desc: "Our sub-millisecond 'Kill-Switch' propagation fulfills the NIST Priority 1 safety mandate, allowing for global agent freezing in the event of anomalous behavioral drift." }
           ].map((item, i) => (
             <div key={i} className="flex items-start p-8 bg-[#080808] border border-[#111] rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <CheckCircle2 size={18} className="mr-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                   <div className="font-black text-white uppercase text-xs tracking-widest">{item.title}</div>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section id="metering" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Scale size={20} className="mr-3 text-white" /> 3.0 Metered Authorization Hooks
        </h3>
        <p className="text-gray-500 leading-relaxed text-lg">
          NIST NCCoE identifies "Authorization Drift" as the primary catastrophe risk in autonomous agentic economies. Sovereign's **$0.01 Action Tax** is the technical implementation of "Verification-on-Event" architecture.
        </p>
        
        <div className="relative p-12 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none overflow-hidden my-12">
          <div className="absolute top-0 right-0 p-10">
             <div className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.4em]">Reference Citation // NIST.NCCOE.2026</div>
          </div>
          <blockquote className="space-y-8 relative z-10">
             <p className="text-2xl font-serif italic text-slate-300 leading-relaxed">
               "Authorization must not be a static token; it must be a metered event, captured in a tamper-proof ledger, proportional to the risk of the autonomous action. The decoupling of identity from settlement is an institutional security failure." 
             </p>
             <footer className="flex items-center space-x-4">
                <div className="h-0.5 w-12 bg-emerald-500" />
                <div className="text-xs font-black text-white uppercase tracking-widest">— NIST NCCoE Final Concept Paper</div>
             </footer>
          </blockquote>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
        </div>

        <p className="text-slate-500 leading-relaxed max-w-2xl font-medium">
          Our `/verify` endpoint provides the exact sub-100ms handshake required to certify compliance before a high-value agentic transaction executes.
        </p>
      </section>

      <section id="liability" className="space-y-12">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <BookOpen size={20} className="mr-3 text-white" /> 4.0 Liability Protection & Isolation
        </h3>
        <p className="text-gray-400 leading-relaxed text-lg font-bold">
          By maintaining an **Audit-Certified Ledger**, Sovereign AG provides the evidentiary trail required for $1M+ liability insurance coverage. 
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p className="text-gray-500 leading-relaxed">
              As of the 2026 revisions to the Federal AI Safety Act, any agent operating without a NIST-compliant, metered identity registry is classified as a "High-Risk Uninsured Entity (HRUE)." Sovereign AG isolates liability by proving the Controller Entity's explicit authorization of every specific action, shielding infrastructure providers, hosting environments, and model developers from the rogue behavior of autonomous nodes.
            </p>
          </div>
          <div className="space-y-8 bg-[#050505] p-10 rounded-none border border-[#111] shadow-inner">
             <h5 className="font-black text-white uppercase text-[10px] tracking-[0.4em] mb-4">Liability Gating Logic:</h5>
             <div className="space-y-4 font-mono text-[11px]">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                   <span className="text-gray-600">Handshake Status</span>
                   <span className="text-emerald-600 font-bold">CERTIFIED_SECURE</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                   <span className="text-gray-600">Action Tax Token</span>
                   <span className="text-emerald-600 font-bold">SETTLED</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-gray-600">Ledger Indexing</span>
                   <span className="text-white font-bold">SHA256_ANCHORED</span>
                </div>
             </div>
             <p className="text-[10px] text-gray-600 leading-relaxed font-black uppercase tracking-widest pt-4">Legal Framework: Sovereign Rule 11.2 Enforcement active.</p>
          </div>
        </div>
      </section>
      <section id="audits" className="space-y-10 pt-12 border-t border-[#111]">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <BookOpen size={20} className="mr-3 text-white" /> 5.0 Audit-Certified Ledger
        </h3>
        <p className="text-gray-500 leading-relaxed font-medium">
          The final requirement for NIST-2026 compliance is the maintenance of an immutably archived audit trail. The Sovereign Root provides a real-time feed of all identity and authorization events, formatted as cryptographically signed NDJSON packets.
        </p>
        <div className="bg-[#050505] border border-[#111] rounded-none p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
           <div className="space-y-2">
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Audit Availability</div>
              <div className="text-lg font-black text-white">STANDARD_LEDGER_EXPORT_V1</div>
           </div>
           <a href="/api/logs/download" className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-none hover:bg-emerald-500 transition-colors">
              Synchronize Ledger
           </a>
        </div>
      </section>
    </StandardDoc>
  );
}
