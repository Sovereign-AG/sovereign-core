"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Terminal, Database, Shield, Activity, ArrowRight, BookOpen, Globe, Lock, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { SovereignLogo } from '@/components/SovereignLogo';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('philosophy');

  const navigation = [
    { 
      group: "Foundations", 
      items: [
        { id: "philosophy", label: "01. Philosophy", icon: <BookOpen size={14} /> },
        { id: "nist", label: "02. NIST Compliance", icon: <Shield size={14} /> },
        { id: "machine-economy", label: "03. Machine Economy", icon: <Globe size={14} /> }
      ]
    },
    { 
      group: "Architecture", 
      items: [
        { id: "identities", label: "04. Identity Anchors", icon: <Terminal size={14} /> },
        { id: "ledger", label: "05. Usage Ledger", icon: <Database size={14} /> },
        { id: "reputation", label: "06. Reputation Alg", icon: <Activity size={14} /> }
      ]
    },
    { 
      group: "Implementation", 
      items: [
        { id: "sdk", label: "07. Python SDK", icon: <Terminal size={14} /> },
        { id: "headers", label: "08. Request Headers", icon: <ArrowRight size={14} /> },
        { id: "api", label: "09. API Reference", icon: <Lock size={14} /> }
      ]
    },
    { 
      group: "Governance", 
      items: [
        { id: "killswitch", label: "10. Global Revocation", icon: <ShieldCheck size={14} /> },
        { id: "economics", label: "11. Action Tax", icon: <Database size={14} /> },
        { id: "auditing", label: "12. Audit Exports", icon: <FileCheck size={14} /> },
        { id: "sla", label: "13. Institutional SLA", icon: <CheckCircle2 size={14} /> },
        { id: "liability-shield", label: "14. Liability Shield", icon: <Shield size={14} /> },
        { id: "horizon", label: "15. Governance Horizon", icon: <Globe size={14} /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-gray-400 font-sans selection:bg-lime-500/30 antialiased selection:text-white">
      {/* --- GRID BACKGROUND --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* --- STICKY NAVIGATION --- */}
        <aside className="lg:col-span-3 border-r border-[#111] p-12 lg:sticky lg:top-0 h-fit lg:h-screen overflow-y-auto custom-scrollbar pt-24">
           <div className="flex items-center space-x-4 mb-20 px-2">
              <SovereignLogo size={32} />
              <div className="flex flex-col">
                 <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Protocol Manual</span>
                 <span className="text-[9px] font-mono text-gray-700 uppercase tracking-widest mt-1">v4.0.2 Stable // NIST_2026</span>
              </div>
           </div>

           <div className="space-y-16">
              {navigation.map((group, idx) => (
                <div key={idx} className="space-y-6">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-800 pl-4">{group.group}</h4>
                   <nav className="flex flex-col space-y-1">
                      {group.items.map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => {
                            setActiveSection(item.id);
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                            activeSection === item.id 
                            ? 'bg-[#111] text-lime-400 shadow-[0_0_20px_rgba(203,255,0,0.05)] border border-lime-500/10' 
                            : 'text-gray-600 hover:text-gray-300 hover:bg-[#050505]'
                          }`}
                        >
                           {item.icon}
                           <span>{item.label}</span>
                        </button>
                      ))}
                   </nav>
                </div>
              ))}
           </div>

           <div className="mt-32 p-10 bg-[#050505] border border-[#111] rounded-[2rem] space-y-4">
              <Terminal size={18} className="text-lime-500" />
              <div className="text-[10px] font-black text-white uppercase tracking-widest leading-relaxed">Identity Validator active</div>
               <div className="text-[10px] text-gray-600 font-medium italic">Your local environment is authorized via Sovereign Institutional Standard. Accessing the deep-index.</div>
           </div>
        </aside>

        {/* --- CONTENT ENGINE --- */}
        <div className="lg:col-span-9 p-12 lg:p-32 space-y-64 pb-[40vh] relative z-10 pt-48">
           
           {/* BREADCRUMBS */}
           <div className="flex items-center space-x-4 text-[10px] font-mono text-gray-700 uppercase tracking-widest mb-12">
              <span>Protocol Documentation</span>
              <span>/</span>
              <span className="text-lime-500">Technical Manual</span>
           </div>

           {/* --- 01. PHILOSOPHY --- */}
           <section id="philosophy" className="space-y-24">
              <div className="space-y-8">
                 <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                    The Sovereign <br/> Operational Manual.
                 </h1>
                 <p className="text-2xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    A rigorous technical compendium for anchoring autonomous intelligence to institutional governance frameworks.
                 </p>
              </div>

              <div className="space-y-12">
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-b border-[#111] pb-8">01. Protocol Philosophy</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                       <p>Sovereign AG is not merely a registry; it is the **Enforcement Layer** for the autonomous machine economy. As agents move from sandboxed environments to high-risk industrial deployment, the burden of liability shifts from the developer to the protocol.</p>
                       <p>We believe that trust is not a social contract in the machine world—it is a cryptographic certainty. Our philosophy is rooted in the elimination of non-verified agency, ensuring that every tool-call is a non-repudiable event.</p>
                    </div>
                    <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                       <p>By implementing the Sovereign Identity Standard, organizations satisfy 100% of the **NIST March 2026 SSDF RFI** mandates. Our protocol acts as the "Black Box" for AI, providing insurers and regulators with an immutable ledger of intent and action.</p>
                       <p>This manual defines the technical boundaries of that trust, from Ed25519 key derivation to the NDJSON audit chain.</p>
                    </div>
                 </div>
              </div>
           </section>

           {/* --- 03. MACHINE ECONOMY --- */}
           <section id="machine-economy" className="space-y-16">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">03. The Machine Economy</h2>
              <div className="bg-[#050505] border border-[#111] p-12 rounded-[3rem] space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                       <span className="text-[10px] font-black text-lime-500 uppercase tracking-[0.3em]">Scalability</span>
                       <p className="text-sm text-gray-500">Support for 100k+ concurrent agents emitting heartbeats at 10Hz intervals.</p>
                    </div>
                    <div className="space-y-4">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Discovery</span>
                       <p className="text-sm text-gray-500">Autonomous DNS (did:sov) allows agents to verify each other's trust scores before tool-handoffs.</p>
                    </div>
                    <div className="space-y-4">
                       <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">Governance</span>
                       <p className="text-sm text-gray-500">Policy interpolation allows for regional compliance (GDPR/AIConsent) at the network level.</p>
                    </div>
                 </div>
              </div>
           </section>

           {/* --- 05. USAGE LEDGER --- */}
           <section id="ledger" className="space-y-24">
              <div className="space-y-8">
                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter">05. The Usage Ledger (NDJSON)</h2>
                 <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Sovereign AG utilizes a high-performance **Asynchronous Ledger** optimized for machine-to-machine throughput. Unlike traditional relational databases, our audit trail is built on Newline Delimited JSON (NDJSON).
                 </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-10">
                    <div className="space-y-6">
                       <h4 className="text-white font-black uppercase text-xs tracking-widest">Why NDJSON?</h4>
                       <ul className="space-y-4 text-sm text-gray-600 font-medium list-none">
                          <li className="flex items-center"><CheckCircle2 size={14} className="text-lime-500 mr-3" /> O(1) Append Operations</li>
                          <li className="flex items-center"><CheckCircle2 size={14} className="text-lime-500 mr-3" /> Native Multi-Stream Compatibility</li>
                          <li className="flex items-center"><CheckCircle2 size={14} className="text-lime-500 mr-3" /> No Head-of-Line Blocking during surge cycles</li>
                       </ul>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                       "Every audit entry is a hash-linked event. If a single line in the 4TB ledger is altered, the Merkle root of the entire node is invalidated instantly."
                    </p>
                 </div>
                 <div className="bg-[#050505] border border-[#111] rounded-[2rem] p-12 font-mono text-xs text-lime-500/80 leading-loose">
                    {`{"t": "2026-04-12T00:10:02", "did": "did:sov:72a1", "act": "TOOL_CALL", "sig": "0x51b..."}
{"t": "2026-04-12T00:10:04", "did": "did:sov:72a1", "act": "HEARTBEAT", "sig": "0x92c..."}
{"t": "2026-04-12T00:10:08", "did": "did:sov:72a1", "act": "AUTH_MINT", "sig": "0x11f..."}`}
                 </div>
              </div>
           </section>

           {/* --- 09. API REFERENCE --- */}
           <section id="api" className="space-y-24">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter border-b border-[#111] pb-10">09. API Reference</h2>
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-[#111] text-[10px] font-black text-gray-700 uppercase tracking-widest">
                          <th className="py-6 px-4">Endpoint</th>
                          <th className="py-6 px-4">Method</th>
                          <th className="py-6 px-4">Payload</th>
                          <th className="py-6 px-4 text-right">Function</th>
                       </tr>
                    </thead>
                    <tbody className="text-xs font-bold font-mono">
                       <tr className="border-b border-[#111] hover:bg-white/5 transition-colors">
                          <td className="py-6 px-4 text-white">/v1/auth/mint</td>
                          <td className="py-6 px-4 text-blue-500">POST</td>
                          <td className="py-6 px-4 text-gray-600">{"{did_req, signature}"}</td>
                          <td className="py-6 px-4 text-gray-500 text-right uppercase tracking-tighter">Mint Sovereign Identity</td>
                       </tr>
                       <tr className="border-b border-[#111] hover:bg-white/5 transition-colors">
                          <td className="py-6 px-4 text-white">/v1/trust/verify</td>
                          <td className="py-6 px-4 text-blue-500">GET</td>
                          <td className="py-6 px-4 text-gray-600">{"?did=sov:production"}</td>
                          <td className="py-6 px-4 text-gray-500 text-right uppercase tracking-tighter">Fetch Reputation Stats</td>
                       </tr>
                       <tr className="hover:bg-white/5 transition-colors">
                          <td className="py-6 px-4 text-white">/v1/action/log</td>
                          <td className="py-6 px-4 text-lime-500">PUT</td>
                          <td className="py-6 px-4 text-gray-600">{"{action_type, proof}"}</td>
                          <td className="py-6 px-4 text-gray-500 text-right uppercase tracking-tighter">Execute Action Verification</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </section>

           {/* --- 10. GLOBAL REVOCATION --- */}
           <section id="killswitch" className="space-y-20">
              <div className="space-y-6">
                 <h2 className="text-4xl font-black text-white uppercase tracking-tighter">10. Global Revocation</h2>
                 <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
                    The Global Kill-Switch is not a failure of the system; it is the ultimate expression of control. It grants the 'Shadow Architect' the omnipotent ability to purge rogue actors in milliseconds, maintaining absolute hygienic containment over the ecosystem.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="p-12 border border-[#111] bg-[#050505] rounded-[3rem] space-y-6">
                    <ShieldCheck className="text-red-500" size={32} />
                    <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Instant Purgation</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">In the event of an anomalous variance, the Root Controller can issue a global signature revocation. This operation diffuses through the network instantaneously, severing cryptographic pathways and freezing the rogue entity without collateral damage.</p>
                 </div>
                 <div className="p-12 border border-[#111] bg-[#050505] rounded-[3rem] space-y-6">
                    <Activity className="text-lime-500" size={32} />
                    <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">JIT Interception</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">The @guard decorator checks the local revocation cache (refreshed every 2s) before allowing any high-risk tool call to proceed. Latency impact is less than 0.05ms.</p>
                 </div>
              </div>
           </section>

           {/* --- 06. REPUTATION ALGORITHM --- */}
           <section id="reputation" className="space-y-16">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">06. Reputation (Trust Score) Algorithm</h2>
              <div className="bg-[#050505] border border-[#111] p-16 rounded-[4rem] flex flex-col items-center space-y-12">
                 <div className="flex space-x-24">
                    <div className="text-center space-y-2">
                       <div className="text-5xl font-black text-white tracking-widest">98.4</div>
                       <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Global Mean Trust</div>
                    </div>
                    <div className="text-center space-y-2">
                       <div className="text-5xl font-black text-lime-500 tracking-widest">0.02%</div>
                       <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Anomalous Drift</div>
                    </div>
                 </div>
                 <p className="text-gray-500 text-center max-w-2xl font-medium text-lg leading-relaxed">
                    Reputation is calculated as: **(Success_Rate * Time_Anchored) / (Drift_Penalty_Multiplier)**. Gold-tier status requires 1,000,000 consecutive validated heartbeats without a manual revocation event.
                 </p>
              </div>
           </section>

            {/* --- 11. ACTION TAX ECONOMICS --- */}
            <section id="economics" className="space-y-16">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">11. Protocol Economics ($1.00 / $0.01 / $0.0001)</h2>
               <p className="text-lg text-gray-500 leading-relaxed max-w-3xl font-medium">
                  The Sovereign Network operates on a tiered micro-metered model designed for the high-velocity autonomous economy. By distributing the tax burden across three specific layers—MINT, ACTION, and PULSE—we ensure registry sustainability with minimal execution friction. All fees are settled in cryptographically bridged USDT via the Sovereign Root.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 bg-[#020202] border border-[#111] rounded-2xl flex flex-col justify-between space-y-4">
                     <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Production MINT</span>
                     <span className="text-white font-black text-2xl tracking-tighter">$1.00 <span className="text-xs text-gray-600">/ DID</span></span>
                     <p className="text-[10px] text-gray-700 leading-relaxed">Paid once per identity anchor formation. Includes NIST-2026 certification.</p>
                  </div>
                  <div className="p-8 bg-[#020202] border border-[#111] rounded-2xl flex flex-col justify-between space-y-4">
                     <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Action Handshake</span>
                     <span className="text-white font-black text-2xl tracking-tighter">$0.01 <span className="text-xs text-gray-600">/ EVENT</span></span>
                     <p className="text-[10px] text-gray-700 leading-relaxed">Mandatory for high-risk tool calls (Bank, File, Net). Anchors the audit trail.</p>
                  </div>
                  <div className="p-8 bg-[#020202] border border-[#111] rounded-2xl flex flex-col justify-between space-y-4">
                     <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Pulse Heartbeat</span>
                     <span className="text-white font-black text-2xl tracking-tighter">$0.0001 <span className="text-xs text-gray-600">/ PING</span></span>
                     <p className="text-[10px] text-gray-700 leading-relaxed">A System Utility Fee that funds the decentralized infrastructure of trust, ensuring the standard remains independent of any single corporate king.</p>
                  </div>
               </div>
            </section>

            {/* --- 12. AUDIT EXPORTS --- */}
            <section id="auditing" className="space-y-16">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">12. NIST Audit Exports</h2>
               <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
                  Transparency is a mathematical requirement. The Sovereign Protocol provides automated export utilities for generating NIST-800-218 compliant audit reports from the raw NDJSON ledger.
               </p>
               <div className="bg-[#050505] border border-[#111] p-10 rounded-2xl flex items-center justify-between">
                  <div className="space-y-2">
                     <div className="text-[10px] font-black text-lime-500 uppercase tracking-widest">Export Available</div>
                     <div className="text-sm font-bold text-white uppercase">sovereign_ledger_v01.ndjson</div>
                  </div>
                  <a href="/api/logs/download" className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg">Download Trace</a>
               </div>
            </section>

            {/* --- 13. INSTITUTIONAL SLA --- */}
            <section id="sla" className="space-y-16">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-b border-[#111] pb-8">13. Institutional SLA</h2>
               <div className="space-y-10">
                  <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-3xl">
                     Sovereign AG guarantees high-authority uptime for all Regional Verification Clusters. This Service Level Agreement (SLA) defines the cryptographic reliability bound and the liability protection provided to Controller Entities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">99.999% Attestation Uptime</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">Regional nodes must maintain a synchronized revocation cache with &lt;100ms latency at the 99th percentile across all global consortium endpoints.</p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Proof of Integrity</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">In the event of a cluster failure, the Sovereign SDK automatically fails-closed (REVOKED_STATUS) unless an 'Override Air-Gap' is explicitly signed by the Controller.</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* --- 14. LIABILITY-SHIELD ARCHITECTURE --- */}
            <section id="liability-shield" className="space-y-16">
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter border-b border-[#111] pb-8">14. Liability-Shield Architecture</h2>
               <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Fleet Integrity Score</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">This is not merely a health check. The Fleet Integrity Score is a cryptographic guarantee that every agent connected to the Sovereign ecosystem is operating within strictly defined institutional bounds.</p>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">The Liability Clock</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">We define 'Zero-Variance Continuity' as the new gold standard for corporate insurance compliance in 2026. The continuous alignment timer quantifies the exact duration of perfect algorithmic obedience.</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* --- 15. GOVERNANCE HORIZON --- */}
            <section id="horizon" className="space-y-24">
               <div className="space-y-8">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter border-b border-[#111] pb-10">15. The 2026 Governance Horizon</h2>
                  <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                     Standardizing the Machine Economy from Local Pilots to Global Infrastructure.
                  </p>
               </div>

               <div className="space-y-20">
                  {/* Phase 2 */}
                  <div className="relative pl-12 border-l border-lime-500/30 space-y-6">
                     <div className="absolute -left-1.5 top-0 w-3 h-3 bg-lime-500 rounded-full shadow-[0_0_10px_rgba(132,204,22,0.5)]" />
                     <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-black bg-lime-500/10 text-lime-500 border border-lime-500/20 tracking-widest">Interoperability (Q2 2026)</div>
                     <h4 className="text-white font-black uppercase text-xs tracking-widest">Alignment: NIST AI Agent Standards Initiative (CAISI)</h4>
                     <p className="text-sm text-gray-600 leading-relaxed font-medium max-w-2xl">
                        Sovereign AG is moving beyond isolated registries to a Federated Identity Model. We are integrating the Model Context Protocol (MCP) to allow secured agents to securely bridge internal data (Google Drive, Slack, Databases) with external industrial workflows without proprietary integration overhead. This bridge is now **Built-In** to the *Developer Forge (Integrations)* zone.
                     </p>
                     <p className="text-[10px] text-gray-700 font-mono uppercase italic tracking-widest">The Goal: Every Sovereign-Minted agent becomes an interoperable unit, verified across the global digital ecosystem.</p>
                  </div>

                  {/* Phase 3 */}
                  <div className="relative pl-12 border-l border-blue-500/30 space-y-6">
                     <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                     <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-black bg-blue-500/10 text-blue-500 border border-blue-500/20 tracking-widest">Economic Foundation (Q3 2026)</div>
                     <h4 className="text-white font-black uppercase text-xs tracking-widest">Alignment: x402 Protocol & Autonomous Settlement</h4>
                     <p className="text-sm text-gray-600 leading-relaxed font-medium max-w-2xl">
                        The future of AI is agent-to-agent commerce. We are implementing the x402 Payment Required standard, allowing agents to settle high-value transactions autonomously using USDT/USDC stablecoins. The x402 Settlement Engine is now **Built-In** to the *Institutional Treasury* zone.
                     </p>
                     <p className="text-[10px] text-gray-700 font-mono uppercase italic tracking-widest">The Goal: Your $0.01 Action Tax becomes an automated, real-time micro-settlement. Sovereign AG moves from a "Registry" to a Financial Clearinghouse for machines.</p>
                  </div>

                  {/* Phase 4 */}
                  <div className="relative pl-12 border-l border-emerald-500/30 space-y-6">
                     <div className="absolute -left-1.5 top-0 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                     <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-widest">Institutional Scale (Q4 2026)</div>
                     <h4 className="text-white font-black uppercase text-xs tracking-widest">Alignment: ESG & Energy Provenance (ITU-T L.1801)</h4>
                     <p className="text-sm text-gray-600 leading-relaxed font-medium max-w-2xl">
                        As industrial power demands hit the "Gigawatt Ceiling," sustainability is no longer optional. Sovereign AG is adding Carbon Intensity & Power Provenance metrics to every pulse. Real-time Power Provenance is now **Built-In** to the *Registry Watchtower (ESG AI Tracker)*.
                     </p>
                     <p className="text-[10px] text-gray-700 font-mono uppercase italic tracking-widest">The Goal: CFOs get real-time energy audits for their entire fleet, ensuring AI growth stays within Scope 2 emission targets and net-zero commitments.</p>
                  </div>

                  {/* Phase 5 */}
                  <div className="relative pl-12 border-l border-indigo-500/30 space-y-6">
                     <div className="absolute -left-1.5 top-0 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                     <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 tracking-widest">Global Governance Seal (Q1 2027)</div>
                     <h4 className="text-white font-black uppercase text-xs tracking-widest">Alignment: ISO/IEC 42001 & NIST AI RMF</h4>
                     <p className="text-sm text-gray-600 leading-relaxed font-medium max-w-2xl">
                        Final certification of the Sovereign AG protocol against the ISO/IEC JTC 1/SC 42 governance framework. Certification status and the **Sovereign Golden Seal** are now active in the *Sovereign Settings* and dashboard headers.
                     </p>
                     <p className="text-[10px] text-gray-700 font-mono uppercase italic tracking-widest">The Goal: Providing a "Golden Seal" for any enterprise agent, ensuring it meets the highest international standards for security, ethics, and robustness.</p>
                  </div>
               </div>
            </section>

           {/* --- FOOTER --- */}
           <footer className="pt-48 border-t border-[#111] flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="space-y-4 text-center md:text-left">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800">Support Resources</div>
                 <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                    <a href="/support/status" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors">Network Status</a>
                    <a href="/api/support/sdk/download" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors">SDK Binaries</a>
                    <a href="/legal/standards" className="text-[10px] font-bold text-gray-600 hover:text-white transition-colors">Safety Standards</a>
                 </div>
              </div>
              <a 
                href="/support/contact" 
                className="group px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all duration-500"
              >
                Request Validator Node
              </a>
           </footer>

        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #111;
        }
        scroll-behavior: smooth;
      `}</style>
    </div>
  );
}
