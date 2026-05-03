"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Gavel, ShieldX, CheckSquare, AlertOctagon, Scale, ShieldAlert } from 'lucide-react';

export default function RulesAndPolicyPage() {
  const policies = [
    { title: "Non-Human Identity", desc: "DIDs are for agents. Attempting to anchor a human identity as a sub-agent is a Tier 1 security violation." },
    { title: "Action Tax Integrity", desc: "Every execution must carry a valid cryptographic receipt. Bypassing the verification layer results in automatic DID severance." },
    { title: "Node Responsibility", desc: "Regional Node operators are legally bound by the Root Ledger and must maintain 99.9% attestation uptime." },
    { title: "Kill-Switch Access", desc: "Root nodes must maintain real-time revocation capabilities. Interference with the SEVER command is prohibited." }
  ];

  const violations = [
    { tier: "Tier 1: Fatal", impact: "Global DID Revocation & Asset Freeze", desc: "Unauthorized infiltration of the Root Node or cryptographic forgery." },
    { tier: "Tier 2: Severe", impact: "30-Day Operational Suspension", desc: "Failure to settle Action Taxes or repeated NIST-800-218 drift anomalies." },
    { tier: "Tier 3: Standard", impact: "Audit Surcharge & Warning", desc: "Minor latency violations or unannounced infrastructure migration." },
  ];

  return (
    <StandardDoc 
      title="Rules & Security Policy"
      subtitle="The governing laws of the Sovereign Protocol. Compliance is cryptographically monitored and enforced 24/7."
      lastUpdated="April 12, 2026"
      titleIcon={<Gavel size={24} className="text-white" />}
    >
      <section className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Scale size={20} className="mr-3 text-white" /> 1.0 General Code of Conduct
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          The Sovereign AG network is a closed, high-trust ecosystem for industrial AI. By minting a DID or operating a Node, you enter into a binding agreement with the Sovereign Root Authority. Any deviation from 'The Rules' results in immediate identity severance.
        </p>
        <p className="text-slate-600 leading-relaxed">
          The following principles guide the machine economy. Silence is not consent; every action must be accompanied by an explicit, signed authorization pulse from a verified Controller.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        {policies.map((p, i) => (
           <div key={i} className="p-10 border border-[#111] rounded-none bg-[#050505] shadow-sm flex flex-col justify-between group hover:border-white transition-all duration-700">
            <div className="space-y-6">
               <div className="flex items-center space-x-4">
                  <div className="p-3 bg-black border border-[#1A1A1A] rounded-none group-hover:bg-white group-hover:text-black transition-colors">
                    <CheckSquare size={20} />
                  </div>
                  <h4 className="text-xl font-black text-white m-0 uppercase tracking-tight leading-none">{p.title}</h4>
               </div>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

       <section className="space-y-12 bg-[#050505] border border-[#111] text-white rounded-none p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5">
             <ShieldAlert size={120} />
          </div>
         <div className="relative z-10 space-y-8">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight m-0">2.0 Violation Hierarchy</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {violations.map((v, i) => (
                  <div key={i} className="p-8 bg-black/40 border border-[#1A1A1A] rounded-none space-y-4 backdrop-blur-xl">
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">{v.tier}</div>
                    <div className="text-lg font-black text-white leading-tight">{v.impact}</div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{v.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="space-y-8 pt-12">
          <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
           <AlertOctagon size={20} className="mr-3 text-white" /> 3.0 Zero Tolerance Mandate
         </h3>
          <div className="bg-red-950/20 border border-red-500/30 rounded-none p-10 flex flex-col md:flex-row items-center gap-10">
             <div className="shrink-0 p-6 bg-black border border-red-500/20 rounded-none shadow-sm">
                <ShieldX size={40} className="text-red-500" />
             </div>
            <div className="space-y-4">
               <h4 className="text-sm font-black text-white uppercase tracking-[0.4em] m-0 mb-2">Network Integrity Anchor</h4>
               <p className="text-xs text-red-400 leading-relaxed font-bold uppercase tracking-tight">
                 Fraudulent DID creation or attempted Root Node infiltration results in a permanent global ban across the 'Elite 20' network clusters. Any legal entity found to be hosting rouge agents without a NIST-compliant registry will have their API peerage revoked globally across all consortium nodes.
               </p>
            </div>
         </div>
      </section>

      <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center opacity-30">
        <Gavel size={20} className="text-slate-300 mb-4" />
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] text-center">Sovereign Governance Protocol // Governance-v1.4.2</div>
      </div>
    </StandardDoc>
  );
}

