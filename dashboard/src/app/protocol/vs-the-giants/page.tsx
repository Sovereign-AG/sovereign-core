"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Shield, Zap, Globe, Layers, BarChart3, ArrowRight, CheckCircle2, TrendingDown, Target } from 'lucide-react';

export default function vsGiantsPage() {
  const sections = [
    { id: 'landscape', label: '1.0 The Institutional Landscape' },
    { id: 'comparison', label: '2.0 Technical Comparison' },
    { id: 'moats', label: '3.0 The Sovereign Moats' },
    { id: 'protocol', label: '4.0 Protocol Neutrality' },
  ];

  return (
    <StandardDoc 
      title="Sovereign AG vs. The Giants"
      subtitle="A Technical Audit of the Agent Identity Landscape: Why the open protocol wins against centralized financial rails."
      lastUpdated="April 2026 Audit"
      titleIcon={<Target size={24} className="text-slate-900" />}
      sections={sections}
    >
      <section id="landscape">
        <h3>1.0 The War for Agentic Identity</h3>
        <p>
          In early 2026, the legacy financial giants entered the agentic space. **Visa’s Trusted Agent Protocol (TAP)** and **Mastercard’s Agentic Tokens (AT)** attempt to bridge identity with payment settlement. However, their reliance on centralized, high-friction rails creates a critical bottleneck for the high-velocity autonomous economy.
        </p>
        <p>
          Sovereign AG was engineered NOT as a payment rail, but as a **Protocol-First Identity Root**. We are building the "TCP/IP" of agent trust, while others are building "AOL" style walled gardens.
        </p>
      </section>

      <section id="comparison">
        <h3>2.0 Technical Comparison</h3>
        <div className="my-10 overflow-hidden rounded-2xl border border-slate-200">
           <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Feature</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Visa / Mastercard</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-100/50">Sovereign AG</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                 <tr>
                    <td className="px-6 py-4 text-slate-900 font-black">Settlement Latency</td>
                    <td className="px-6 py-4 text-slate-400 italic">2.3 Seconds (Avg)</td>
                    <td className="px-6 py-4 text-emerald-600 font-black">Sub-100ms Handshake</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 text-slate-900 font-black">Transaction Friction</td>
                    <td className="px-6 py-4 text-slate-400 italic">$0.30 + variable %</td>
                    <td className="px-6 py-4 text-emerald-600 font-black">$0.01 Fixed Action Tax</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 text-slate-900 font-black">Ledger Access</td>
                    <td className="px-6 py-4 text-slate-400 italic">Private / Proprietary</td>
                    <td className="px-6 py-4 text-emerald-600 font-black">Registry: Public & Open</td>
                 </tr>
                 <tr>
                    <td className="px-6 py-4 text-slate-900 font-black">Network Model</td>
                    <td className="px-6 py-4 text-slate-400 italic">Centralized SaaS</td>
                    <td className="px-6 py-4 text-emerald-600 font-black">Federated Validator Root</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </section>

      <section id="moats">
        <h3>3.0 The Three Technical Moats</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
           <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
              <Globe className="text-slate-900" size={32} />
              <h4 className="text-lg font-black uppercase tracking-tight">Platform Neutrality</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Visa requires Visa. Sovereign works across AWS, Azure, Ethereum, Solana, and private air-gapped institutional clouds. We are the universal denominator.
              </p>
           </div>
           
           <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
              <TrendingDown className="text-emerald-500" size={32} />
              <h4 className="text-lg font-black uppercase tracking-tight">Tax Friction Moat</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Our **$0.01 Action Tax** is 99% cheaper than legacy rails. For an agentic swarm making 1M calls daily, legacy rails are financially impossible. Sovereign is the only viable path.
              </p>
           </div>

           <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
              <Layers className="text-blue-500" size={32} />
              <h4 className="text-lg font-black uppercase tracking-tight">Consortium Trust</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                By delegating trust to **Founding Validators**, we eliminate the "Single Point of Failure" inherent in corporate-owned agent protocols. 
              </p>
           </div>
        </div>
      </section>

      <section id="protocol">
        <h3>4.0 Why Protocol Beats Product</h3>
        <p>
          Products are sold; Protocols are adopted. Sovereign AG is designed to be the invisible infrastructure that others build their agentic businesses upon. By maintaining a fixed-cost, high-performance identity root, we ensure that as the agentic economy grows, the Sovereign Moat only deepens.
        </p>
        <div className="mt-12 p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Shield size={120} />
           </div>
           <h4 className="text-2xl font-black mb-6 uppercase tracking-tight">Institutional Migration Path</h4>
           <p className="text-slate-400 mb-8 max-w-lg font-bold leading-relaxed">
              Transition your legacy agentic systems to the Global Standard. Eliminate transaction friction and certify your compliance with NIST-2026 today.
           </p>
           <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-400 transition-all active:scale-95 flex items-center">
              Request Protocol Onboarding <ArrowRight size={16} className="ml-3" />
           </button>
        </div>
      </section>
    </StandardDoc>
  );
}
