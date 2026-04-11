"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Shield, BookOpen, CheckCircle2, Lock, Scale, Zap } from 'lucide-react';

export default function NISTPage() {
  const sections = [
    { id: 'alignment', label: '1.0 NIST-2026 Alignment' },
    { id: 'minting', label: '2.0 Compliant DID Minting' },
    { id: 'metering', label: '3.0 Metered Authorization' },
    { id: 'liability', label: '4.0 Liability Isolation' },
  ];

  return (
    <StandardDoc 
      title="NIST-2026 Compliance Whitepaper"
      subtitle="Technical Alignment with the NIST NCCoE 'AI Agent Identity and Authorization' Standard (Draft 2026.04.02)"
      lastUpdated="April 9, 2026"
      titleIcon={<Shield size={24} className="text-slate-900" />}
      sections={sections}
    >
      <section id="alignment">
        <h3 className="flex items-center"><Zap size={20} className="mr-3 text-slate-400" /> 1.0 The 2026 Identity Mandate</h3>
        <p>
          On April 2, 2026, the NIST National Cybersecurity Center of Excellence (NCCoE) formalized the requirement for "Continuous, Metered Identification" for autonomous AI agents. Legacy static keys are no longer sufficient for high-trust environments.
        </p>
        <p>
          Sovereign AG is built specifically to address the **Rule 4.2: Dynamic Proof of Controller (DPoC)** mandate, which requires every agent action to be linked back to a verified institutional identity via a metered settlement layer.
        </p>
      </section>

      <section id="minting">
        <h3 className="flex items-center"><Lock size={20} className="mr-3 text-slate-400" /> 2.0 Compliant DID Minting</h3>
        <p>
          The Sovereign SDK implements the **Ed25519-NIST-Hardened** signature scheme for identity genesis. Unlike legacy DIDs, Sovereign DIDs are anchored in a high-authority registry that requires:
        </p>
        <ul className="space-y-4 my-6">
           {[
             "Genesis Handshake: Cryptographic proof of institutional ownership at the time of MINT.",
             "Audit Chaining: Every identity is linked to a permanent NIST-800-218 configuration hash.",
             "Hardened Revocation: Sub-ms 'Kill-Switch' propagation as required by NIST Priority 1."
           ].map((item, i) => (
             <li key={i} className="flex items-start">
                <CheckCircle2 size={18} className="mr-3 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
             </li>
           ))}
        </ul>
      </section>

      <section id="metering">
        <h3 className="flex items-center"><Scale size={20} className="mr-3 text-slate-400" /> 3.0 Metered Authorization Hooks</h3>
        <p>
          NIST NCCoE identifies "Authorization Drift" as the primary risk in agentic economies. Sovereign's **$0.01 Action Tax** is the technical implementation of "Verification-on-Event" architecture.
        </p>
        <blockquote className="p-6 bg-slate-50 border-l-4 border-slate-900 my-8">
           "Authorization must not be a static token; it must be a metered event, captured in a tamper-proof ledger, proportional to the risk of the autonomous action." 
           <footer className="mt-2 text-xs font-black text-slate-400">— NIST NCCoE Concept Paper (2026)</footer>
        </blockquote>
        <p>
          Our `/verify` endpoint provides the exact sub-100ms handshake required to certify compliance before a high-value agentic transaction executes.
        </p>
      </section>

      <section id="liability">
        <h3 className="flex items-center"><BookOpen size={20} className="mr-3 text-slate-400" /> 4.0 Liability Protection & Insurance</h3>
        <p>
          By maintaining an **Audit-Certified Ledger**, Sovereign AG provides the evidentiary trail required for $1M+ liability insurance coverage. As of the 2026 standards, an agent operating without a NIST-compliant identity registry is classified as a "High-Risk Uninsured Entity."
        </p>
        <p>
          Sovereign AG isolates liability by proving the Controller Entity's authorization of every specific action, shielding infrastructure providers from the rogue behavior of autonomous nodes.
        </p>
      </section>
    </StandardDoc>
  );
}
