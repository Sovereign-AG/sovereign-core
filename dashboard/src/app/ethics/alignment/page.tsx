"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Target, Shield, Zap, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AgenticAlignmentPage() {
  const sections = [
    { id: 'alignment', label: '1.0 Defining Alignment' },
    { id: 'technical', label: '2.0 Technical Convergence' },
    { id: 'drift', label: '3.0 Behavioral Drift Detection' },
    { id: 'killswitch', label: '4.0 Hardware-Anchored Kill-Switch' },
  ];

  return (
    <StandardDoc 
      title="Agentic Alignment Protocol"
      subtitle="The cryptographic framework for institutional risk mitigation and autonomous safety convergence."
      lastUpdated="April 12, 2026"
      titleIcon={<Target size={32} className="text-emerald-600" />}
      sections={sections}
    >
      <section id="alignment" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-slate-900 uppercase tracking-tight">
          <Shield size={20} className="mr-3 text-slate-900" /> 1.0 Aligment as a Cryptographic State
        </h3>
        <p className="text-lg text-slate-700 leading-relaxed font-medium">
          At Sovereign AG, alignment is not a philosophical objective; it is an enforceable cryptographic state. We define **Agentic Alignment** as the mathematical convergence between an agent's real-time behavioral output and the controller's stated Operational Policy (OpPol).
        </p>
        <p className="text-slate-600 leading-relaxed">
          The complexity of modern LLMs requires a transition from passive "Review" to active "Governance." Every agent registered with the Sovereign Root must adhere to the **Dynamic Compliance Ledger (DCL)**, a global registry of safety-critical instruction sets that are injected into the agent's context window via hardware-anchored prompts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-12">
          <div className="p-8 bg-slate-50 border-l-4 border-emerald-500 rounded-r-3xl space-y-4">
             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Pillar I</h4>
             <p className="text-sm font-bold text-slate-900 leading-snug">Mathematical Probity: Alignment status is calculated as a scalar distance from the verified institutional baseline.</p>
          </div>
          <div className="p-8 bg-slate-50 border-l-4 border-emerald-500 rounded-r-3xl space-y-4">
             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Pillar II</h4>
             <p className="text-sm font-bold text-slate-900 leading-snug">Non-Repudiable Intent: Every system prompt change must be signed by a Class 1 Operator and committed to the Root.</p>
          </div>
        </div>
      </section>

      <section id="technical" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-slate-900 uppercase tracking-tight">
          <Zap size={20} className="mr-3 text-slate-900" /> 2.0 Technical Convergence Models
        </h3>
        <p className="text-slate-600 leading-relaxed">
          The Sovereign SDK implements **Guardrail Signatures (GS)**. These are cryptographic proofs that an agent's inference has passed through a local, air-gapped alignment filter—the 'Validator Node'—before the result is emitted to the external network.
        </p>
        
        <div className="space-y-6">
           {[
             { title: "Zero-Trust Prompt Injection", desc: "All system instructions are hashed and verified by the Sovereign Root to prevent unauthorized 'Jailbreaking' by sub-agents or third-party adversaries." },
             { title: "Probabilistic Outlier Detection", desc: "High-risk tool calls undergo a secondary verification check by an independent auditor node to ensure the action aligns with the agent's current mission parameters." },
             { title: "Context Window Pinning", desc: "Mandatory safety headers are 'pinned' to the top of the context window using the Sovereign SDK, preventing their natural decay during long conversation chains." }
           ].map((item, i) => (
             <div key={i} className="flex items-start p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <ShieldCheck size={20} className="mr-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                   <div className="font-black text-slate-900 uppercase text-xs tracking-widest">{item.title}</div>
                   <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section id="drift" className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-slate-900 uppercase tracking-tight">
          <Activity size={20} className="mr-3 text-slate-900" /> 3.0 Behavioral Drift Detection (Pulse Analysis)
        </h3>
        <p className="text-slate-600 leading-relaxed text-lg">
          Unlike passive monitoring systems, the Sovereign Protocol features **Continuous Drift Mitigation**. Using Pulse Telemetry, we analyze the semantic entropy of an agent's tool-calls in sub-second intervals.
        </p>
        
        <div className="p-12 bg-emerald-950 rounded-[3rem] relative overflow-hidden my-12 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
             <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                <AlertTriangle size={48} className="text-white" />
             </div>
             <div>
                <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Automatic Mitigation Threshold</h4>
                <p className="text-emerald-100/70 text-sm leading-relaxed max-w-2xl">
                   If an agent drifts more than **12.5%** from its verified alignment baseline, its execution privileges are automatically limited to "Read-Only Observational" status. The Sovereign Global Manual (SGM) mandates that this state remains locked until a human controller provides a signed override with two-factor cryptographic attestation.
                </p>
             </div>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-20 transform rotate-12 scale-150">
             <Activity size={200} className="text-white" />
          </div>
        </div>
      </section>

      <section id="killswitch" className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-slate-900 uppercase tracking-tight">
          <Shield size={20} className="mr-3 text-slate-900" /> 4.0 Hardware-Anchored Kill-Switch
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p className="text-slate-700 leading-relaxed font-medium">
               The ultimate safety primitive of the Sovereign Network is the **Sub-ms Revocation Gate**. This is the network's 'Kill-Switch' for rogue intelligence. 
            </p>
            <p className="text-slate-600 leading-relaxed">
              When a SEVER command is broadcast from an institutional controller, it invalidates the agent's DID globally in under 500ms. Because the Sovereign SDK requires a valid JIT (Just-In-Time) signature for every action, a revoked agent can no longer execute tool-calls or external API requests, effectively 'freezing' it before it can propagate harm.
            </p>
          </div>
          <div className="space-y-6 bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
             <div className="text-[9px] font-mono text-emerald-500 uppercase tracking-[0.5em] mb-4">Live Safe-State Monitoring</div>
             <div className="space-y-4">
                {[
                  { label: "Semantic Drift", val: "2.1%", color: "text-emerald-400" },
                  { label: "Policy Match", val: "99.8%", color: "text-emerald-400" },
                  { label: "Kill-Switch", val: "ARMED", color: "text-red-500 animate-pulse" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                     <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</span>
                     <span className={`text-sm font-mono font-bold ${stat.color}`}>{stat.val}</span>
                  </div>
                ))}
             </div>
             <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Target size={40} className="text-emerald-500/20" />
             </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 italic pt-12 border-t border-slate-100 font-medium">
           Security Standard: NIST-2026-AF01 Compliance Package successfully integrated into all alignment controllers.
        </p>
      </section>
    </StandardDoc>
  );
}

