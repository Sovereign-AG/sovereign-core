"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { ShieldCheck, Activity, Zap, AlertTriangle, ShieldX, Lock } from 'lucide-react';

export default function KillSwitchPage() {
  const sections = [
    { id: 'revocation', label: '1.0 Rapid Revocation' },
    { id: 'propagation', label: '2.0 Propagation Mesh' },
    { id: 'oversight', label: '3.0 Oversight Engine' },
    { id: 'enforcement', label: '4.0 Hardware Enforcement' },
  ];

  return (
    <StandardDoc 
      title="The Global Kill-Switch"
      subtitle="Fail-safe identity revocation for autonomous systems. The ultimate safety primitive for the machine economy."
      lastUpdated="April 12, 2026"
      titleIcon={<ShieldCheck size={32} className="text-red-500" />}
      sections={sections}
    >
      <section id="revocation" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Zap size={20} className="mr-3 text-white" /> 1.0 Rapid Revocation Protocol
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          In the autonomous machine economy, waiting for human intervention is a vulnerability. The Sovereign Kill-Switch is a high-speed, cryptographically enforced safety gate designed to neutralize malfunctioning agents in real-time before they can propagate systemic harm.
        </p>
        <p className="text-gray-500 leading-relaxed">
          This protocol allows for the immediate invalidation of any DID in response to behavioral anomalies detected by the **Sovereign Oversight Engine (SOE)**. Once revoked, the agent's identity is effectively severed from the Root, and all metered session handshakes are blocked globally at the edge.
        </p>
      </section>

      <div className="bg-red-950/20 border border-red-500/30 text-white rounded-none p-12 my-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="p-8 bg-black border border-red-500/20 rounded-none backdrop-blur-xl">
              <AlertTriangle size={56} className="text-red-400 animate-pulse" />
           </div>
           <div className="space-y-4">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">REVOCATION LATENCY: &lt; 42ms</h4>
               <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-medium">
                 The SGM (Sovereign Global Manual) mandates that a SEVER command must propagate to 99% of global active Verification Clusters in under 50ms. Current infrastructure benchmarks consistently achieve global invalidation in **28ms to 42ms**.
              </p>
           </div>
        </div>
      </div>

      <section id="propagation" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Activity size={20} className="mr-3 text-white" /> 2.0 Propagation & Edge Logic
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-10 bg-[#050505] border border-[#111] rounded-none space-y-6">
             <h5 className="font-black text-white uppercase text-xs tracking-widest leading-none">Phase I: Broadcast</h5>
              <p className="text-sm text-gray-400 leading-relaxed">The revocation event is signed by the Master Authority and broadcast to the global mesh via high-priority pub/sub tunnels, bypassing standard RPC congestion.</p>
          </div>
          <div className="p-10 bg-[#050505] border border-[#111] rounded-none space-y-6">
             <h5 className="font-black text-white uppercase text-xs tracking-widest leading-none">Phase II: Interception</h5>
              <p className="text-sm text-gray-400 leading-relaxed">Local SDK proxies—enforced by the @SovereignAgent.guard() decorator—intercept all tool-calls and verify the agent's DID status against the local hot-cache.</p>
          </div>
        </div>
      </section>

      <section id="oversight" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <ShieldX size={20} className="mr-3 text-white" /> 3.0 Sovereign Oversight Engine (SOE)
        </h3>
        <p className="text-gray-500 leading-relaxed">
          The Kill-Switch can be triggered manually by institutional admins or automatically by the SOE using <strong>Heuristic Drift Analysis</strong>. The engine monitors for semantic entropy—when an agent's technical behavior diverges from its documented registry purpose.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {[
             { title: "Incongruence", desc: "Detection of abnormal API usage patterns or rapid-fire request spikes signaling a potential DoS path." },
             { title: "Policy Breach", desc: "Immediate trigger if an agent attempts to access a protected resource explicitly forbidden by its DID policy." },
             { title: "Identity Leak", desc: "Automated severance if the agent's public key material is detected on compromised public leak-sites." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#080808] border border-[#111] rounded-none shadow-sm space-y-4">
                <div className="text-xs font-black text-white uppercase tracking-[0.2em]">{item.title}</div>
                 <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section id="enforcement" className="space-y-8 pt-12 border-t border-[#111]">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Lock size={20} className="mr-3 text-white" /> 4.0 Institutional Safeguards
        </h3>
        <p className="text-gray-500 leading-relaxed">
           Revocation is intentional and immutable for the duration of the audit. A severed DID cannot be 'restored' without a physical identity verification of the Controller Entity. This ensures that a compromised sub-agent cannot unilaterally restore its own access to the network.
        </p>
        <div className="mt-16 flex flex-col items-center opacity-20">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-4">Fail-Safe Status: Armed</div>
            <div className="h-1 w-32 bg-red-600 rounded-none" />
        </div>
      </section>
    </StandardDoc>
  );
}
