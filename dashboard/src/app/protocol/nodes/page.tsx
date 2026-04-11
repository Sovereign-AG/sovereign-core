"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { ShieldCheck, Cpu, Globe, Database, Network, Key, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function NodesPage() {
  const sections = [
    { id: 'mission', label: '1.0 The Validator Mission' },
    { id: 'founding', label: '2.0 Founding Validator Program' },
    { id: 'specs', label: '3.0 Node Infrastructure Specs' },
    { id: 'economic', label: '4.0 Economic Incentives' },
  ];

  return (
    <StandardDoc 
      title="Founding Validator Infrastructure"
      subtitle="Securing the global root of agent identity. Join the decentralized consortium of high-authority nodes."
      lastUpdated="April 2026 Revision"
      titleIcon={<Network size={24} className="text-slate-900" />}
      sections={sections}
    >
      <section id="mission">
        <h3 className="flex items-center"><Globe size={20} className="mr-3 text-slate-400" /> 1.0 Securing the Sovereign Root</h3>
        <p>
          The Sovereign Protocol relies on a federated network of high-authority Validator Nodes to maintain the absolute integrity of the AI Agent Registry. Validators are responsible for the cryptographic anchoring of DIDs and the real-time settlement of action taxes.
        </p>
        <p>
          Unlike traditional proof-of-stake networks, Sovereign Validators are admitted based on institutional trust, NIST-800-218 alignment, and geographic distribution.
        </p>
      </section>

      <section id="founding">
        <h3 className="flex items-center"><ShieldCheck size={20} className="mr-3 text-slate-400" /> 2.0 Founding Validator Program</h3>
        <p>
          We are currently selecting the **First 12 Founding Validators** to serve as the inaugural council of the Sovereign network. These entities will directly govern the evolution of the open standard and earn participation fees from all network events (MINT, ACTION, PULSE).
        </p>
        <div className="my-10 p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
           <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Program Benefits</h4>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Priority Governance Voting Rights",
                "0.1% Share of Global Protocol Fees",
                "Direct API Peerage with Root Auth",
                "NIST Compliance Certification Priority"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-tight">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3" /> {benefit}
                </li>
              ))}
           </ul>
        </div>
        <Link href="/support/contact" className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-colors group">
           Submit Validator Handshake <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <section id="specs">
        <h3 className="flex items-center"><Cpu size={20} className="mr-3 text-slate-400" /> 3.0 Node Infrastructure Specs</h3>
        <p>
          Sovereign Nodes must maintain 99.999% uptime to ensure the sub-100ms latency required for real-time agentic interactions.
        </p>
        <div className="my-8 overflow-hidden rounded-2xl border border-slate-200">
           <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Requirement</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Specification</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 italic font-medium">
                 <tr>
                    <td className="px-6 py-4 text-slate-900">Architecture</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">Hardened Linux (Kernel 6.x+)</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 text-slate-900">CPU Compute</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">16-Core Institutional Grade (Zen 4 / Sapphire Rapids)</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 text-slate-900">Storage Layer</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">4TB NVMe SSD (Local RAID-10)</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 text-slate-900">Network I/O</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">Dedicated 10Gbps Symmetrical Up/Down</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 text-slate-900">Security Module</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">FIPS 140-2 Level 3 HSM required</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <section id="economic">
        <h3 className="flex items-center"><Key size={20} className="mr-3 text-slate-400" /> 4.0 Economic Incentives</h3>
        <p>
          Validators facilitate the Sovereign Revenue Engine. For every action tax collected ($0.01 per verify), a distribution is made to the active validator pool. This ensures a sustainable, self-funded protocol that remains independent of central corporate interest.
        </p>
        <div className="flex items-center p-6 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
           <div className="p-3 bg-emerald-500 rounded-lg text-white mr-5">
              <Database size={24} />
           </div>
           <div>
              <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Protocol Staking Status</div>
              <div className="text-xl font-black text-slate-900 leading-tight">METERED SETTLEMENT ACTIVE</div>
              <div className="text-[10px] font-mono text-emerald-600 uppercase tracking-tight font-bold">Incentives Distributed in USDT via Registry Chain</div>
           </div>
        </div>
      </section>
    </StandardDoc>
  );
}
