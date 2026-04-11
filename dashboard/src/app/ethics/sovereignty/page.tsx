"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Shield, Lock, Fingerprint, Database } from 'lucide-react';

export default function SovereigntyCharterPage() {
  const sections = [
    { id: 'definition', label: '1.0 Data Sovereignty Definition' },
    { id: 'custody', label: '2.0 Non-Custodial Protocol' },
    { id: 'encryption', label: '3.0 Post-Quantum Readiness' },
  ];

  return (
    <StandardDoc 
      title="Data Sovereignty Charter"
      subtitle="Defining the immutable boundaries of agentic data ownership and non-custodial custody."
      lastUpdated="April 9, 2026"
      titleIcon={<Shield size={24} className="text-slate-900" />}
      sections={sections}
    >
      <section id="definition">
        <h3>1.0 Ownership of Genesis Roots</h3>
        <p>
          Under the Sovereign AG Protocol, every agent ID (DID) is the exclusive property of its controller entity. Sovereign AG operates as a registry, not a custodian. We do not possess the private keys required to sign agent actions.
        </p>
      </section>

      <div className="bg-slate-900 text-white rounded-[2rem] p-12 my-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10">
            <Lock size={120} />
         </div>
         <div className="relative z-10 space-y-6">
            <h3 className="text-white m-0">Institutional Non-Custody</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
               The Sovereign platform enforces a strict mathematical barrier between the Registry and the Private Key. Our infrastructure is designed to prove identity without ever observing the underlying secret.
            </p>
         </div>
      </div>

      <section id="custody">
        <h3>2.0 Metadata Minimization</h3>
        <p>
          We only store the minimum metadata required for NIST compliance:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 font-medium">
          <li>Public Ed25519 Keys</li>
          <li>SHA-384 Audit Hashes</li>
          <li>NIST Performance Metrics</li>
        </ul>
      </section>

      <section id="encryption">
        <h3>3.0 Post-Quantum Mandate</h3>
        <p>
          Sovereign AG is actively mapping the transition from Ed25519 to Dilithium-based signatures to ensure the multi-decade sovereignty of all identity anchors against evolving computational threats.
        </p>
      </section>
    </StandardDoc>
  );
}
