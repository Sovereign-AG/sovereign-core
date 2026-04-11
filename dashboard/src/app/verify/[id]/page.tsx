import React from 'react';
import { readDB } from '@/lib/db';
import { ShieldCheck, ShieldAlert, Cpu, Fingerprint, Activity, Clock, CircleCheck as CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function VerifyPage(props: { params: Promise<{ id: string }> | { id: string } }) {
  const params = await Promise.resolve(props.params);
  const decodedId = decodeURIComponent(params.id);
  const db = readDB();
  const agent = db.agents.find((a: any) => a.did === decodedId || a.id === decodedId);

  if (!agent) {
    return notFound();
  }

  const isCompliant = agent.nist === 'Verified' && agent.status === 'Active';

  return (
    <div className="min-h-screen bg-[#000000] text-gray-200 font-sans flex flex-col items-center justify-center p-6 border-t-4 border-[#1a1a1a]">
      <div className="max-w-2xl w-full">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <ShieldCheck size={28} className="text-white mr-3" />
            <h1 className="text-xl font-bold tracking-tight text-white">Sovereign AG</h1>
          </div>
          <div className="text-xs uppercase tracking-widest font-mono text-gray-500 border border-[#222] px-3 py-1 rounded bg-[#0a0a0a]">
            Public Verification Portal
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-[#050505] border border-[#222] rounded-2xl shadow-2xl overflow-hidden">
          <div className={`p-8 border-b ${isCompliant ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">Certificate of Authenticity</h2>
            <p className="text-sm text-gray-400">NIST SP 800-218 Cryptographic Identity Verification.</p>
            
            <div className="mt-8 flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Agent Identity</div>
                <div className="text-2xl font-medium text-white">{agent.alias}</div>
                <div className="text-sm font-mono text-gray-400 mt-2 flex items-center"><Fingerprint size={14} className="mr-2"/> {agent.did || agent.id}</div>
              </div>
              <div className={`flex items-center px-4 py-2 rounded-full border ${isCompliant ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                {isCompliant ? <CheckCircle2 size={16} className="mr-2" /> : <ShieldAlert size={16} className="mr-2" />}
                <span className="text-sm font-bold tracking-wide">{isCompliant ? 'VERIFIED ACTIVE' : 'TERMINATED / RISKY'}</span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div>
                  <div className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-1">Owner Organization</div>
                  <div className="text-sm text-gray-200 font-medium">{agent.owner || 'Unknown'}</div>
               </div>
               <div>
                  <div className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-1">Operational Purpose</div>
                  <div className="text-sm text-gray-200 font-medium">{agent.purpose || 'General AI Operations'}</div>
               </div>
               <div>
                  <div className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-1">Compute Access</div>
                  <div className="text-sm text-gray-200 font-medium flex items-center"><Cpu size={14} className="mr-2 text-gray-500"/> {agent.cpu || '0% Allocated'}</div>
               </div>
               <div>
                  <div className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-1">Trust Tier</div>
                  <div className="text-sm text-gray-200 font-medium flex items-center"><Activity size={14} className="mr-2 text-gray-500"/> {agent.tier || 'Standard'}</div>
               </div>
            </div>

            <div className="pt-6 border-t border-[#1a1a1a]">
               <div className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-1">Immutable Audit Hash</div>
               <div className="text-xs text-gray-400 font-mono break-all bg-[#0a0a0a] p-3 rounded border border-[#1a1a1a]">
                 {agent.auditHash || '0x0000000000000000000000000000000000000000'}
               </div>
            </div>
          </div>
          
          <div className="bg-[#0A0A0A] p-6 border-t border-[#222] flex justify-between items-center text-xs text-gray-500 font-mono">
             <div className="flex items-center"><Clock size={12} className="mr-2"/> Live Blockchain State Parsed</div>
             <Link href="/landing" className="hover:text-white transition-colors underline decoration-[#333] underline-offset-4">Learn about Sovereign AG</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
