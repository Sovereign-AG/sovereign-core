"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Cpu, Server, Activity } from 'lucide-react';

export default function WhatWeDoPage() {
  const sections = [
    { id: 'registry', label: '1.0 The Registry' },
    { id: 'tax', label: '2.0 The Tax Mandate' },
    { id: 'governance', label: '3.0 Active Governance' },
  ];

  return (
    <StandardDoc 
      title="The Sovereign Mission"
      subtitle="Building the permanent cryptographic tissue for the autonomous agentic economy."
      lastUpdated="April 9, 2026"
      titleIcon={<Cpu size={32} className="text-slate-900" />}
      sections={sections}
    >
      <section id="registry">
        <h3>1.0 The Universal Registry</h3>
        <p>
          We provide a cryptographically permanent registry for autonomous agents. By assigning every AI node a verified DID, we eliminate "Shadow AI" and replace anonymous execution with institutional accountability.
        </p>
      </section>

      <section id="tax">
        <h3>2.0 The Action Tax Mandate</h3>
        <p>
          Our network operates on a frictionless revenue model that scales with autonomous activity. The $0.01 Action Tax ensures that the registry remains self-sustaining, high-performance, and verifiable across billions of daily agent calls.
        </p>
      </section>

      <section id="governance">
        <h3>3.0 Active Governance Hooks</h3>
        <p>
          We go beyond tracking. Sovereign AG provides the active "Kill-Switch" hooks required by insurance providers and security committees to stop malfunctioning agents in mid-execution across shared cloud environments.
        </p>
      </section>
      
      <section id="validators">
        <h3>4.0 Founding Validators</h3>
        <p>
          Sovereign AG is governed by a decentralized consortium of high-authority Validator Nodes. This federation ensures that the Root of Trust for all AI Agents is never controlled by a central entity, but by a global collective of the world's most trusted engineering and legal organizations.
        </p>
      </section>
    </StandardDoc>
  );
}

