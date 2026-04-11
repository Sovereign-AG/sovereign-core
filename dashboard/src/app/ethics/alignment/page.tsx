"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Target, Shield, Zap } from 'lucide-react';

export default function AgenticAlignmentPage() {
  const sections = [
    { id: 'definition', label: '1.0 Defining Alignment' },
    { id: 'technical', label: '2.0 Technical Convergence' },
    { id: 'enforcement', label: '3.0 Active Enforcement' },
  ];

  return (
    <StandardDoc 
      title="Agentic Alignment Protocol"
      subtitle="The structural framework for ensuring autonomous output remains within institutional risk boundaries."
      lastUpdated="April 9, 2026"
      titleIcon={<Target size={32} className="text-emerald-600" />}
      sections={sections}
    >
      <section id="definition">
        <h3>1.0 Defining Alignment</h3>
        <p>
          At Sovereign AG, alignment is not a philosophical goal—it is a cryptographic state. We define agentic alignment as the mathematical convergence between an agent's predicted output and its controller's stated operational policy.
        </p>
        <p>
          To maintain alignment, every agent registered with the Sovereign Root must adhere to the <strong>Dynamic Compliance Ledger</strong>, which updates in real-time based on emerging global safety standards.
        </p>
      </section>

      <section id="technical">
        <h3>2.0 Technical Convergence</h3>
        <p>
          The Sovereign SDK implements "Guardrail Signatures." These are verified proofs that an LLM's output has passed through a local, air-gapped alignment filter before being signed and committed to the network.
        </p>
        <ul>
          <li><strong>Zero-Trust Prompting:</strong> All system instructions are hashed and verified by the Root to prevent prompt injection.</li>
          <li><strong>Output Verification Tax:</strong> High-risk tasks undergo a dual-verification check by an independent auditor node.</li>
        </ul>
      </section>

      <section id="enforcement">
        <h3>3.0 Active Enforcement</h3>
        <p>
          Unlike passive monitoring systems, the Sovereign Protocol features <strong>Active Mitigation</strong>. If an agent drifts more than 15% from its verified alignment baseline (detected via entropy analysis in the Pulse Telemetry), its execution privileges are automatically limited to "Read-Only" status until human override.
        </p>
      </section>
    </StandardDoc>
  );
}
