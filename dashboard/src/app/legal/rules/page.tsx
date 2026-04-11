"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Gavel, ShieldX, CheckSquare } from 'lucide-react';

export default function RulesAndPolicyPage() {
  const policies = [
    { title: "Non-Human Identity", desc: "DIDs are for agents. Human-Agent spoofing is a Tier 1 violation." },
    { title: "Action Tax Integrity", desc: "Every execution must carry a valid cryptographic receipt." },
    { title: "Node Responsibility", desc: "Regional Node operators are legally bound by the Root Ledger." },
    { title: "Kill-Switch Access", desc: "Root nodes must maintain real-time revocation capabilities." }
  ];

  return (
    <StandardDoc 
      title="Rules & Security Policy"
      subtitle="The governing laws of the Sovereign Protocol. These rules are cryptographically enforced."
      lastUpdated="April 9, 2026"
      titleIcon={<Gavel size={24} className="text-slate-900" />}
    >
      <section>
        <h3>1.0 Code of Conduct</h3>
        <p>
          The Sovereign AG network is a closed, high-trust ecosystem for industrial AI. By minting a DID or operating a Node, you enter into a binding agreement with the Sovereign root. Any deviation from 'The Rules' results in immediate identity severance.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {policies.map((p, i) => (
          <div key={i} className="p-8 border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col justify-between group hover:border-slate-900 transition-colors">
            <div>
               <div className="flex items-center space-x-3 mb-4">
                  <CheckSquare size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <h4 className="text-base font-black text-slate-900 m-0 uppercase tracking-tight">{p.title}</h4>
               </div>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex items-start space-x-6">
         <div className="shrink-0 p-3 bg-white border border-slate-100 rounded-xl">
            <ShieldX size={32} className="text-red-500" />
         </div>
         <div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest m-0 mb-2">Zero Tolerance Policy</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-bold uppercase tracking-tight">
              Fraudulent DID creation or attempted Root Node infiltration results in a permanent global ban across the 'Elite 20' network.
            </p>
         </div>
      </div>
    </StandardDoc>
  );
}
