"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Download, Terminal, HardDrive, Package } from 'lucide-react';

export default function SDKDownloadPage() {
  const platforms = [
    { name: 'Python SDK', version: 'v1.0.4', size: '2.4 MB', icon: <Terminal size={18} /> },
    { name: 'Node.js SDK', version: 'v1.1.2', size: '1.8 MB', icon: <Package size={18} /> },
    { name: 'Go Library', version: 'v0.9.8', size: '4.2 MB', icon: <HardDrive size={18} /> },
  ];

  return (
    <StandardDoc 
      title="SDK & Integration Libraries"
      subtitle="Official high-authority tools for connecting institutional agents to the Sovereign Root."
      lastUpdated="April 9, 2026"
      titleIcon={<Download size={24} className="text-slate-900" />}
    >
      <section>
        <h3>1.0 Official Distributions</h3>
        <p>
          Download the latest production release of the Sovereign Agent SDK. All binaries are cryptographically signed by the Sovereign AG Foundation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
           {platforms.map((p, i) => (
             <div key={i} className="group p-8 bg-white border border-slate-200 rounded-3xl hover:border-slate-950 hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-emerald-400 transition-all mb-6">
                   {p.icon}
                </div>
                <div className="space-y-1 mb-6">
                   <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{p.name}</div>
                   <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{p.version} | {p.size}</div>
                </div>
                <button className="w-full py-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all">
                   Download Binary
                </button>
             </div>
           ))}
        </div>
      </section>

      <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8">
         <div className="p-4 bg-white rounded-2xl shadow-sm">
            <Terminal size={32} className="text-emerald-500" />
         </div>
         <div className="space-y-2">
            <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">Installation Handshake</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
               For rapid deployment, use our package managers. Every installation automatically pings the regional Root Node for initial NIST-compliance certification.
            </p>
            <div className="p-4 bg-slate-900 rounded-xl text-emerald-400 font-mono text-xs overflow-hidden">
               npm install @sovereign/core --trust-anchor=primary
            </div>
         </div>
      </div>
    </StandardDoc>
  );
}
