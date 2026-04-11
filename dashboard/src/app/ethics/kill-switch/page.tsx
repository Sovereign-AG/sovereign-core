import StandardDoc from '@/components/StandardDoc';
import { ShieldCheck, Activity } from 'lucide-react';

export default function KillSwitchPage() {
  return (
    <StandardDoc 
      title="The Kill-Switch"
      subtitle="Fail-safe identity revocation for autonomous systems."
      content={
        <div className="space-y-24">
          <section className="space-y-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Rapid Revocation Protocol</h2>
            <div className="h-1 w-20 bg-lime-500 mb-8" />
            <p className="text-xl leading-relaxed text-gray-300 font-medium">In the autonomous machine economy, waiting for human intervention is a vulnerability. The Sovereign Kill-Switch is a high-speed, cryptographically enforced safety gate designed to neutralize malfunctioning agents in real-time.</p>
            
            <p className="text-gray-500 text-lg">This protocol allows for the immediate invalidation of any DID in response to behavioral anomalies detected by the Sovereign Oversight Engine. Once revoked, all SDK-wrapped tool-calls for the agent are globally blocked in less than **20ms**.</p>
          </section>

          <section className="space-y-12">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">01. Propagation Architecture</h2>
            <div className="bg-[#050505] border border-[#111] p-12 rounded-[3rem] space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Broadcast Phase</h4>
                     <p className="text-xs text-gray-600 leading-relaxed">The revocation event is signed by the Master Authority and broadcast to the global mesh of Verification Clusters via high-priority pub/sub.</p>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Edge Interception</h4>
                     <p className="text-xs text-gray-600 leading-relaxed">Local SDK proxies (the @guard decorator) poll the nearest Verification Cluster every 2s, maintaining a hot cache of 'Severed' DIDs.</p>
                  </div>
               </div>
               <div className="p-8 bg-black border border-red-500/20 rounded-2xl">
                  <div className="text-red-500 font-bold uppercase text-[10px] tracking-widest mb-2">Worst-Case Latency: 42ms</div>
                  <div className="w-full bg-red-900/10 h-1 rounded-full overflow-hidden">
                     <div className="w-[42%] bg-red-500 h-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-8">
             <h2 className="text-3xl font-black text-white uppercase tracking-tight">02. Sovereign Oversight Engine</h2>
             <p className="text-lg text-gray-500">The Kill-Switch can be triggered manually by institutional admins or automatically by the **Oversight Engine**. The engine monitors for 'Context Drift'—when an agent's technical actions diverge significantly from its documented purpose in the Registry.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 border border-[#111] bg-[#050505] rounded-3xl space-y-4">
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Statistical Incongruence</h4>
                   <p className="text-sm text-gray-600">Detection of abnormal API usage patterns or rapid-fire request spikes (potential DoS path).</p>
                </div>
                <div className="p-8 border border-[#111] bg-[#050505] rounded-3xl space-y-4">
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Policy Violation</h4>
                   <p className="text-sm text-gray-600">Immediate trigger if an agent attempts to access a resource explicitly forbidden by its minted DID policy.</p>
                </div>
             </div>
          </section>
        </div>
      }
    />
  );
}
