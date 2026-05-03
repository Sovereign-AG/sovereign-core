"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { ShieldCheck, Cpu, Globe, Database, Network, Key, ArrowRight, CheckCircle2, Server, BarChart3 } from 'lucide-react';
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
      lastUpdated="April 12, 2026"
      titleIcon={<Network size={32} className="text-white" />}
      sections={sections}
    >
      <section id="mission" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Globe size={20} className="mr-3 text-white" /> 1.0 Securing the Sovereign Root
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          The Sovereign Protocol relies on a federated network of high-authority **Validator Nodes** to maintain the absolute integrity of the AI Agent Registry. Validators are responsible for the cryptographic anchoring of DIDs and the sub-ms settlement of action taxes.
        </p>
        <p className="text-gray-500 leading-relaxed">
          Unlike traditional proof-of-stake networks, Sovereign Validators are admitted based on institutional trust, NIST-800-218 alignment, and geographic scarcity. This ensures that the network is governed by entities with long-term accountability in the autonomous machine economy.
        </p>
      </section>

      <section id="founding" className="space-y-12">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <ShieldCheck size={20} className="mr-3 text-white" /> 2.0 Founding Validator Program
        </h3>
        <p className="text-gray-500 leading-relaxed">
          We are currently selecting the **First 12 Founding Validators** to serve as the inaugural council of the Sovereign Network. These entities directly govern the evolution of the open standard and earn participation fees from all three network events: **MINT, ACTION, and PULSE**.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
           {[
             { title: "Governance Peerage", desc: "Priority voting rights on protocol upgrades and tax-tier adjustments via the Root DAO." },
             { title: "Tax Participation", desc: "A proportional share of the $0.01 Action Tax pool, distributed in real-time." },
             { title: "Network Peerage", desc: "Direct 100Gbps cross-connects with regional clusters for sub-ms attestation." },
             { title: "NIST Certification", desc: "Priority path for NIST-800-218 'High-Authority' verified node status." }
           ].map((benefit, i) => (
             <div key={i} className="p-8 bg-[#050505] border border-[#111] rounded-none space-y-4 shadow-inner">
                <CheckCircle2 size={20} className="text-white" />
                <div className="space-y-2">
                   <h5 className="font-black text-white uppercase text-xs tracking-widest">{benefit.title}</h5>
                   <p className="text-xs text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                </div>
             </div>
           ))}
        </div>
        <div className="flex justify-center pt-8">
           <Link href="/support/contact" className="inline-flex items-center px-10 py-5 bg-white text-black rounded-none font-black uppercase tracking-[0.3em] text-[11px] hover:bg-emerald-500 transition-all group shadow-2xl shadow-white/5">
              Submit Validator Handshake <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </section>

      <section id="specs" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Cpu size={20} className="mr-3 text-white" /> 3.0 Node Infrastructure Requirements
        </h3>
        <p className="text-gray-500 leading-relaxed">
          Sovereign Nodes must maintain redundant infrastructure to ensure the 99.999% uptime required for universal agentic connectivity.
        </p>
        <div className="my-12 overflow-hidden rounded-none border border-[#111] bg-[#080808] shadow-sm">
           <table className="w-full text-left text-sm">
              <thead className="bg-[#0A0A0A] border-b border-[#1A1A1A]">
                 <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Infrastructure Layer</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Mandatory Specification</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-[#111] font-medium">
                 <tr>
                    <td className="px-8 py-6 text-white font-black uppercase text-xs tracking-tight">Compute Arch</td>
                    <td className="px-8 py-6 font-mono text-[11px] text-gray-600">128+ Core Institutional Grade (AMD EPYC™ 9004 or Intel® Xeon® Platinum)</td>
                 </tr>
                 <tr>
                    <td className="px-8 py-6 text-white font-black uppercase text-xs tracking-tight">Memory Fabric</td>
                    <td className="px-8 py-6 font-mono text-[11px] text-gray-600">1.5TB DDR5 ECC Registered RAM</td>
                 </tr>
                 <tr>
                    <td className="px-8 py-6 text-white font-black uppercase text-xs tracking-tight">Security Module</td>
                    <td className="px-8 py-6 font-mono text-[11px] text-gray-600">FIPS 140-2 Level 3 HSM (Required for Root Signing)</td>
                 </tr>
                 <tr>
                    <td className="px-8 py-6 text-white font-black uppercase text-xs tracking-tight">Network I/O</td>
                    <td className="px-8 py-6 font-mono text-[11px] text-gray-600">Symmetrical 40/100Gbps Fiber with BGP Peering</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <section id="economic" className="space-y-12 bg-[#050505] border border-[#111] text-white rounded-none p-16 my-24 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-16 opacity-5">
           <BarChart3 size={200} />
        </div>
        <div className="relative z-10 space-y-10">
           <h3 className="text-4xl font-black text-white uppercase tracking-tight m-0">4.0 Protocol Economics ($0.01 Pool)</h3>
           <p className="text-gray-500 text-lg leading-relaxed max-w-3xl font-medium">
             Validators are the primary beneficiaries of the Sovereign Revenue Engine. For every action tax collected ($0.01 per verify), a 10% protocol fee is distributed to the active validator pool. For a network scale of 1M agents emitting 10 verifying actions per day, the annual validator yield represents a significant institutional floor.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-black border border-white/10 rounded-none backdrop-blur-xl space-y-4 shadow-inner">
                 <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em]">Network Health Hook</div>
                 <div className="text-2xl font-black text-white">METERED SETTLEMENT ACTIVE</div>
                 <p className="text-sm text-gray-500 font-medium">All incentives are settled in cryptographically bridged USDT via the Sovereign Ledger.</p>
              </div>
              <div className="flex items-center justify-center p-10 bg-white text-black rounded-none shadow-2xl">
                 <Server size={64} className="text-black animate-pulse" />
              </div>
           </div>
        </div>
      </section>
      
      <div className="mt-24 pt-12 border-t border-[#111] flex flex-col items-center opacity-30">
        <Network size={20} className="text-slate-300 mb-4" />
        <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.6em] text-center">Founding Validator Program // PRODUCTION</div>
      </div>
    </StandardDoc>
  );
}

