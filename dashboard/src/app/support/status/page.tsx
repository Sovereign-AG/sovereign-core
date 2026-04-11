"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Activity, Globe, Server, CheckCircle2 } from 'lucide-react';

export default function NetworkStatusPage() {
  const regions = [
    { name: 'AP-SOUTH-1 (India)', status: 'Operational', latency: '14ms', uptime: '99.99%' },
    { name: 'US-EAST-1 (N. Virginia)', status: 'Operational', latency: '22ms', uptime: '99.99%' },
    { name: 'EU-CENTRAL-1 (Frankfurt)', status: 'Operational', latency: '11ms', uptime: '99.99%' },
  ];

  return (
    <StandardDoc 
      title="Global Network Health Node"
      subtitle="Real-time status of the Sovereign Root and decentralized consortium nodes."
      lastUpdated="Live Feed // NIST-Aligned"
      titleIcon={<Activity size={24} className="text-emerald-500" />}
    >
      <div className="mb-12 flex items-center justify-between bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
         <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter m-0 uppercase">System: Operational</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">All Root Handshakes Active</p>
         </div>
         <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
            <CheckCircle2 size={32} className="text-emerald-500" />
         </div>
      </div>

      <section>
        <h3>1.0 Regional Status Matrix</h3>
        <div className="space-y-4 my-8">
           {regions.map((region, i) => (
             <div key={i} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center space-x-6">
                   <div className="p-3 bg-white border border-slate-100 rounded-xl">
                      <Globe size={18} className="text-slate-400" />
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-900 uppercase tracking-tight">{region.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{region.uptime} SLG Uptime</div>
                   </div>
                </div>
                <div className="text-right flex items-center space-x-8">
                   <div className="space-y-1">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Latency</div>
                      <div className="text-xs font-mono font-bold text-slate-900">{region.latency}</div>
                   </div>
                   <div className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {region.status}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="mt-16 bg-slate-900 text-white rounded-[2rem] p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8">
            <Server size={64} className="text-white/5" />
         </div>
         <div className="relative z-10 space-y-6">
            <h3 className="text-white m-0">Consortium Node Verification</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
               Network health is cross-verified by 20 independent institutional nodes. In the event of a Root failure, the ledger is automatically pinned to the nearest consensus-locked region.
            </p>
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-400/30 px-3 py-1.5 rounded-lg bg-emerald-400/5">
               <Activity size={12} />
               <span>CONSENSUS_SYNC: ACTIVE (99.9992%)</span>
            </div>
         </div>
      </div>
    </StandardDoc>
  );
}
