"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';

export default function EthicsIndex() {
  return (
    <StandardDoc 
      title="The Ethics of Agency"
      subtitle="Ensuring that autonomous execution remains aligned with human oversight."
    >
      <section className="space-y-12 py-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">How does Sovereign AG ensure AI agents remain ethical?</h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Sovereign AG ensures AI agents remain ethical by enforcing non-repudiable accountability through the Sovereign SDK. Every agentic decision is mapped to a verified legal controller, and a mandatory kill-switch is embedded at the kernel level, allowing human oversight to intervene instantly if behavioral drift is detected.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest text-slate-900 border-b pb-4">Core Principles of Agency</h3>
          <ul className="space-y-6">
            <li className="space-y-1">
               <strong className="text-slate-900 font-black uppercase text-xs tracking-widest">1. Transparency</strong>
               <p className="text-slate-500 font-medium">Every agent must declare its origin and purpose via its `did:sov` identity header.</p>
            </li>
            <li className="space-y-1">
               <strong className="text-slate-900 font-black uppercase text-xs tracking-widest">2. Revocability</strong>
               <p className="text-slate-500 font-medium">Autonomous execution is a privilege; it can be revoked by the controller in real-time via the Registry.</p>
            </li>
            <li className="space-y-1">
               <strong className="text-slate-900 font-black uppercase text-xs tracking-widest">3. Liability</strong>
               <p className="text-slate-500 font-medium">Audit logs are immutable, ensuring that agentic actions can be legally attributed to a human entity.</p>
            </li>
          </ul>
        </div>

        <p className="pt-10 text-sm text-slate-400 font-medium italic">
           Explore the <a href="/ethics/kill-switch" className="text-slate-900 underline font-black">Kill-Switch Charter</a> for a technical breakdown of our Revocation Principle.
        </p>
      </section>
    </StandardDoc>
  );
}

