"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Globe, Activity, Server, Shield, Network } from 'lucide-react';

export default function NetworkPage() {
  const sections = [
    { id: 'distribution', label: '1.0 Geographic mesh' },
    { id: 'latency', label: '2.0 Edge Attestation' },
    { id: 'consortium', label: '3.0 The Consortium' },
    { id: 'metrics', label: '4.0 Real-time Health' },
  ];

  const nodes = [
    { region: "US-EAST-1", city: "Ashburn, VA", status: "OPERATIONAL", latency: "4ms" },
    { region: "EU-WEST-1", city: "Dublin, IE", status: "OPERATIONAL", latency: "6ms" },
    { region: "AP-SOUTH-1", city: "Mumbai, IN", status: "OPERATIONAL", latency: "12ms" },
    { region: "AP-NORTHEAST-1", city: "Tokyo, JP", status: "OPERATIONAL", latency: "9ms" },
  ];

  return (
    <StandardDoc 
      title="Global Network Infrastructure"
      subtitle="Distributed attestation at the speed of thought. The Sovereign mesh maintains 100% availability for the machine economy."
      lastUpdated="April 12, 2026"
      titleIcon={<Network size={32} className="text-white" />}
      sections={sections}
    >
      <section id="distribution" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Globe size={20} className="mr-3 text-white" /> 1.0 Geographic Mesh Hierarchy
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          The Sovereign Network is a geographically distributed mesh of **Verification Clusters (VCs)** that ensure 100% availability for identity heartbeats. By processing attestations at the edge, we eliminate the bottlenecks associated with centralized consensus layers.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Every VC acts as a regional anchor for the Sovereign Root Ledger, maintaining a synchronized hot-cache of active DIDs and revocation states. This allows for sub-10ms verification cycles even during global traffic surges.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
         {nodes.map((node, i) => (
           <div key={i} className="p-8 bg-[#050505] border border-[#111] rounded-none relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                 <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{node.region}</span>
                    <Activity size={14} className="text-emerald-500 animate-pulse" />
                 </div>
                 <div className="space-y-1">
                    <div className="text-xl font-black text-white">{node.city}</div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{node.status}</div>
                 </div>
                 <div className="pt-4 border-t border-white/5">
                    <span className="text-sm font-mono text-white font-bold">{node.latency}</span>
                    <span className="text-xs text-slate-600 ml-2">Latency</span>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <section id="latency" className="space-y-10">
         <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Activity size={20} className="mr-3 text-white" /> 2.0 Edge Attestation Layer
        </h3>
        <p className="text-slate-600 leading-relaxed">
          To fulfill the **NIST-2026** performance mandates, Sovereign uses a "Pre-Verified Edge" strategy. When an agent requests a tool-call handshake, the closest Verification Cluster processes the cryptographic signature locally before committing the Action Tax event to the main ledger asynchronously.
        </p>
        <div className="p-10 bg-[#050505] border border-[#111] rounded-none flex flex-col md:flex-row items-center gap-10">
           <div className="p-8 bg-[#080808] border border-[#111] rounded-none space-y-4">
              <Server size={40} className="text-blue-500" />
           </div>
           <div className="space-y-3">
               <h5 className="font-black text-white uppercase text-xs tracking-widest leading-none text-center md:text-left">Throughput Benchmark: 1.2M TPS</h5>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">The network is architected to handle 100,000+ concurrent agents emitting continuous Pulse heartbeats at 10Hz without increasing global latency jitter.</p>
           </div>
        </div>
      </section>

      <section id="consortium" className="space-y-10">
         <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Shield size={20} className="mr-3 text-white" /> 3.0 The Consortium of Twelve
        </h3>
        <p className="text-slate-600 leading-relaxed">
          The network is governed by a decentralized consortium of institutional validators. Each validator operates a high-authority Root Node responsible for the final settlement of trust scores and identity initialization. Admission to the consortium requires a **Class 1 Security Audit** and adherence to the Sovereign Hardware Specification.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
           {[
             "Byzantine Fault Tolerant (BFT) Consensus",
             "Air-Gapped Root Key Storage",
             "FIPS 140-2 Level 3 Hardware Modules",
             "24/7 Redundant Power & Cooling"
           ].map((item, i) => (
              <li key={i} className="flex items-center p-4 bg-[#050505] border border-[#111] rounded-none">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-none mr-3" />
                 <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{item}</span>
              </li>
           ))}
        </ul>
      </section>

      <section id="metrics" className="space-y-8 pt-12 border-t border-slate-100">
         <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Activity size={20} className="mr-3 text-white" /> 4.0 Real-time Health Monitoring
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-2xl font-medium">
          Global network health is monitored via the **Heartbeat Protocol**. Any node exhibiting a trust-score degradation below 99.9% for more than 4 consecutive epochs is automatically rotated out of the active verification pool.
        </p>
        <div className="mt-20 flex flex-col items-center opacity-30">
           <Shield className="mb-4" size={24} />
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Sovereign Network Registry // v4.0.2</div>
        </div>
      </section>
    </StandardDoc>
  );
}
