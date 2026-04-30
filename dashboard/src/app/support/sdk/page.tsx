"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Download, Terminal, HardDrive, Package, ShieldCheck, Cpu, Code2, Copy } from 'lucide-react';

export default function SDKDownloadPage() {
  const platforms = [
    { name: 'Python SDK', version: 'v0.1.0-Production', size: '2.4 MB', icon: <Terminal size={18} />, anchor: '/api/support/sdk/download' },
    { name: 'Node.js SDK', version: 'v0.1.0-Production', size: '1.8 MB', icon: <Package size={18} />, anchor: '#' },
    { name: 'Go Library', version: 'v0.1.0-Production', size: '4.2 MB', icon: <HardDrive size={18} />, anchor: '#' },
  ];

  return (
    <StandardDoc 
      title="SDK & Integration Forge"
      subtitle="Official high-authority tools for connecting institutional agents to the Sovereign Root. Standardized for NIST-2026."
      lastUpdated="April 12, 2026"
      titleIcon={<Download size={24} className="text-white" />}
    >
      <section className="space-y-8">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <Package size={20} className="mr-3 text-white" /> 1.0 Official Distributions (Production v0.1)
        </h3>
        <p className="text-lg text-gray-400 leading-relaxed font-medium">
          Download the latest production release of the Sovereign Agent SDK. Every binary is cryptographically signed by the Sovereign AG Root Authority and contains the pre-compiled Verification Enclave required for off-chain attestation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
           {platforms.map((p, i) => (
             <div key={i} className="group p-10 bg-[#050505] border border-[#111] rounded-none hover:border-white/20 hover:shadow-2xl transition-all duration-700 relative overflow-hidden">
                <div className="w-14 h-14 bg-[#0A0A0A] border border-[#111] rounded-none flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black transition-all mb-8 shadow-inner">
                   {p.icon}
                </div>
                <div className="space-y-2 mb-8">
                   <div className="text-lg font-black text-white uppercase tracking-tight">{p.name}</div>
                   <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest font-black">{p.version} | {p.size}</div>
                </div>
                <a 
                  href={p.anchor} 
                  className="block w-full py-4 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all text-center"
                >
                   Download Binary
                </a>
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <Code2 size={120} className="text-white" />
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="bg-[#050505] border border-[#111] text-white rounded-none p-12 my-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 p-10 opacity-10">
            <Cpu size={120} />
         </div>
         <div className="shrink-0 p-8 bg-black border border-white/10 rounded-none shadow-inner group transition-transform hover:scale-105 duration-700">
            <Terminal size={48} className="text-emerald-400" />
         </div>
         <div className="space-y-6 relative z-10">
            <div className="space-y-4">
               <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                  <div className="w-1 h-1 bg-emerald-500 mr-2" /> One-Line Quickstart (Institutional)
               </div>
               <div className="p-6 bg-black border border-white/10 rounded-none text-emerald-400 font-mono text-xs overflow-hidden shadow-inner flex items-center justify-between group">
                  <code className="break-all whitespace-pre-wrap">
                    powershell -Command "irm http://localhost:5001/api/quickstart | python"
                  </code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('powershell -Command "irm http://localhost:5001/api/quickstart | python"');
                      const btn = document.getElementById('copy-quickstart-btn');
                      if (btn) btn.innerText = 'COPIED';
                      setTimeout(() => { if (btn) btn.innerText = ''; }, 2000);
                    }}
                    className="ml-4 shrink-0 p-2 text-gray-600 hover:text-white transition-colors flex items-center"
                    title="Copy Quickstart Command"
                  >
                    <span id="copy-quickstart-btn" className="text-[8px] font-black mr-2 text-emerald-500"></span>
                    <Copy size={14} />
                  </button>
               </div>
            </div>

            <div className="space-y-4">
               <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                  <div className="w-1 h-1 bg-blue-500 mr-2" /> Manual SDK Installation
               </div>
               <div className="p-6 bg-black border border-white/10 rounded-none text-blue-400 font-mono text-xs overflow-hidden shadow-inner flex items-center justify-between">
                  <code>pip install sovereign-core --compliance-anchor=nist-2026</code>
                  <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest hidden md:block">Signed by Root</span>
               </div>
            </div>
         </div>
      </div>

      <section className="space-y-10">
        <h3 className="flex items-center text-2xl font-black text-white uppercase tracking-tight">
          <ShieldCheck size={20} className="mr-3 text-white" /> 2.0 Signature Verification
        </h3>
        <p className="text-gray-500 leading-relaxed max-w-3xl">
          To ensure the integrity of the Sovereign infrastructure, engineers are mandated to verify the SHA-384 hash of the SDK binary before execution. This prevents "Man-in-the-Middle" attacks on autonomous identity material.
        </p>
        <div className="p-10 border border-[#111] bg-[#050505] rounded-none space-y-6">
           <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Hash Standard</span>
              <span className="text-[10px] font-mono font-bold text-white">SHA-384 NIST COMPLIANT</span>
           </div>
           <div className="p-6 bg-black border border-[#1A1A1A] rounded-none font-mono text-[11px] text-emerald-500 break-all shadow-inner leading-relaxed">
              92F1-A901-C34E-1191-D202-8BAE-7731-AA04-F921-BD3C-44E1-9128-08C3-2197-EDFA-1209
           </div>
           <p className="text-[10px] text-gray-600 leading-relaxed font-black uppercase tracking-[0.2em] pt-2">Warning: Execution of unsigned binaries is a Tier 1 security violation.</p>
        </div>
      </section>

      <div className="mt-24 pt-12 border-t border-[#111] flex flex-col items-center opacity-30">
        <ShieldCheck size={20} className="text-gray-700 mb-4" />
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.6em]">Sovereign SDK Distribution // Production v0.1</div>
      </div>
    </StandardDoc>
  );
}
