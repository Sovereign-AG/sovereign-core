"use client";
import React, { useState } from 'react';
import { Terminal, KeyRound, ShieldCheck, Zap } from 'lucide-react';

export default function Playground() {
  const [did, setDid] = useState('');
  const [signature, setSignature] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [log, setLog] = useState<string[]>([]);

  const runHandshake = () => {
    setStatus('PENDING');
    setLog(["[CORE]: Initializing Ed25519 handshake...", "[REGISTRY]: Checking DID signature..."]);
    
    setTimeout(() => {
      if (did.startsWith('did:sov:') && signature.length > 32) {
        setStatus('SUCCESS');
        setLog(p => [...p, "[AUTH]: Signature validated against Registry Entry.", "[SETTLEMENT]: Sovereign status established."]);
      } else {
        setStatus('FAILED');
        setLog(p => [...p, "[ERROR]: Cryptographic mismatch. Unauthorized signature.", "[DENIAL]: Access to Sovereign ledger blocked."]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex items-center space-x-4 border-b border-[#222] pb-6">
           <Terminal size={32} className="text-gray-500" />
           <div>
              <h1 className="text-2xl font-bold text-white uppercase tracking-tighter">API Sandbox</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Simulate Institutional Ed25519 Handshakes</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Input Section */}
           <div className="space-y-6">
              <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-2xl relative">
                 <div className="absolute -top-3 left-4 px-2 bg-black text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-[#222] rounded">Request Payload</div>
                 <div className="space-y-4 pt-2">
                    <div>
                       <label className="block text-[10px] font-black text-gray-600 uppercase mb-2">Agent DID</label>
                       <input 
                         type="text" 
                         value={did} 
                         onChange={(e) => setDid(e.target.value)}
                         placeholder="did:sov:8f9a..."
                         className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2 font-mono text-xs text-emerald-500 focus:outline-none focus:border-emerald-500/50"
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-gray-600 uppercase mb-2">Cryptographic Signature</label>
                       <textarea 
                         value={signature} 
                         onChange={(e) => setSignature(e.target.value)}
                         placeholder="sha256:..."
                         rows={4}
                         className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2 font-mono text-xs text-gray-400 focus:outline-none focus:border-white/10"
                       />
                    </div>
                    <button 
                      onClick={runHandshake}
                      disabled={status === 'PENDING'}
                      className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center"
                    >
                       {status === 'PENDING' ? <RefreshCcw className="animate-spin mr-2" size={14}/> : <Zap size={14} className="mr-2" />}
                       Initiate Handshake
                    </button>
                 </div>
              </div>
           </div>

           {/* Console Section */}
           <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden flex flex-col font-mono text-[11px]">
              <div className="p-3 bg-[#111] border-b border-[#222] flex justify-between items-center">
                 <span className="text-gray-500 uppercase tracking-widest">Live Registry Console</span>
                 {status === 'SUCCESS' && <ShieldCheck size={14} className="text-emerald-500" />}
              </div>
              <div className="flex-1 p-4 space-y-2 max-h-[400px] overflow-auto">
                 {log.map((line, i) => (
                    <div key={i} className={line.startsWith('[ERROR]') ? 'text-red-500' : (line.startsWith('[AUTH]') ? 'text-emerald-500' : 'text-gray-400')}>
                       {line}
                    </div>
                 ))}
                 {status === 'IDLE' && <div className="text-gray-700 italic">Waiting for input...</div>}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const RefreshCcw = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
);

