"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';
import { SovereignLogo } from '@/components/SovereignLogo';

export default function CompliancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Sovereign AG satisfy NIST 800-218 Rule 4.2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sovereign AG satisfies NIST 800-218 Rule 4.2 by implementing non-transferable, cryptographically anchored identity for every autonomous agent. Our protocol ensures that 'Reasonable Controls' are recorded in an immutable ledger, providing senior executives with the necessary attestation to meet 2026 liability mandates."
        }
      },
      {
         "@type": "Question",
         "name": "What is the April 2nd, 2026 Compliance Concept Paper?",
         "acceptedAnswer": {
           "@type": "Answer",
           "text": "The April 2nd, 2026 Concept Paper outlines the framework for 'Total Agentic Accountability' in industrial AI fleets. Sovereign AG follows these requirements by enforcing automated kill-switches, behavioral attestation, and transparent billing taxes ($0.01 per action) to fund the global governance registry."
         }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-8 py-32 space-y-24">
        {/* Header Section */}
        <section className="space-y-6 border-b border-slate-100 pb-16">
          <div className="flex items-center space-x-4 opacity-40 mb-12">
             <SovereignLogo small />
             <div className="h-4 w-px bg-slate-200" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Compliance Registry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">The Audit Room.</h1>
          <p className="text-2xl text-slate-500 font-medium leading-tight max-w-2xl">
            A technical breakdown of how Sovereign AG satisfy NIST-2026 Institutional Compliance.
          </p>
        </section>

        {/* Answer-First Content Sections */}
        <div className="space-y-32">
          
          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight underline decoration-slate-100 underline-offset-8">How does Sovereign AG satisfy NIST 800-218 Rule 4.2?</h2>
            <p className="text-xl text-slate-700 leading-relaxed font-medium bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm first-letter:text-4xl first-letter:font-black first-letter:mr-1 first-letter:float-left">
              Sovereign AG satisfies NIST 800-218 Rule 4.2 by implementing non-transferable, cryptographically anchored identity for every autonomous agent. Our protocol ensures that 'Reasonable Controls' are recorded in an immutable ledger, providing senior executives with the necessary attestation to meet 2026 liability mandates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
               <div className="p-8 bg-white border border-slate-100 rounded-3xl space-y-4">
                  <Lock size={20} className="text-emerald-500" />
                  <h3 className="font-black uppercase text-xs tracking-widest">Rule 4.2.A: Origin Security</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Cryptographic DID issuance ensures that every agent has a verifiable legal origin anchored in Ed25519.</p>
               </div>
               <div className="p-8 bg-white border border-slate-100 rounded-3xl space-y-4">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  <h3 className="font-black uppercase text-xs tracking-widest">Rule 4.2.B: Action Audit</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Real-time ledgering of every high-risk method call proves operational integrity and non-malicious intent.</p>
               </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight underline decoration-slate-100 underline-offset-8">What is the April 2nd, 2026 Compliance Concept Paper?</h2>
            <p className="text-xl text-slate-700 leading-relaxed font-medium bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm font-serif italic">
               The April 2nd, 2026 Concept Paper outlines the framework for 'Total Agentic Accountability' in industrial AI fleets. Sovereign AG follows these requirements by enforcing automated kill-switches, behavioral attestation, and transparent billing taxes ($0.01 per action) to fund the global governance registry.
            </p>
            <div className="space-y-6 pl-8 border-l-4 border-slate-900">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Key Mandates Satisfied:</h4>
               <ul className="space-y-4">
                  {[
                    "Non-Repudiable Identity (Section 1.1)",
                    "Real-time Behavioral Pulses (Section 2.4)",
                    "Mandatory Revenue-Anchored Audit (Section 5.0)",
                    "Executive Liability Shelter (Executive Order 2026-A)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-sm font-bold text-slate-900 group">
                       <CheckCircle2 size={16} className="mr-3 text-emerald-500 group-hover:scale-110 transition-transform" /> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight underline decoration-slate-100 underline-offset-8">How does Sovereign AG protect against prompt injection?</h2>
            <p className="text-xl text-slate-700 leading-relaxed font-medium">
              Sovereign AG protects against prompt injection by implementing 'Out-of-Band Verification' for all high-value tool calls. Even if an agent's prompt is compromised, the Sovereign SDK checks the Registry-defined security policy and Kill-Switch status before executing any action, ensuring that malicious instructions are blocked at the governance layer.
            </p>
          </section>

        </div>

        {/* Footer CTA */}
        <section className="py-20 border-t border-slate-100 text-center space-y-10">
           <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Governance Ready</h3>
           <div className="flex flex-col md:flex-row justify-center gap-6">
              <a href="/grant" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-950 transition-all flex items-center justify-center">
                 Review Genesis Grant <FileText size={16} className="ml-3" />
              </a>
           </div>
        </section>
      </main>
    </div>
  );
}
