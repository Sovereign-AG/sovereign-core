"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Download, ExternalLink } from 'lucide-react';

export const DeveloperPortal = () => {
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const pipCommand = "pip install sovereign-sdk";
  const guardCode = `@SovereignAgent.guard()
def secure_trade(amount):
    # Interception Active
    pass`;

  return (
    <section className="py-32 bg-[#000000] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-10 lg:sticky lg:top-32">
            <div className="space-y-6">
               <div className="text-xs font-semibold text-yellow-500/80 tracking-widest uppercase">Developer Forge</div>
               <h2 className="text-5xl font-bold text-white tracking-tight leading-[1.1]">Integrate in <br/><span className="text-zinc-500">Seconds.</span></h2>
               <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-lg">The SDK acts as a high-performance transparent proxy. Activate non-repudiable identity and NIST compliance without changing a single line of your agent's core model.</p>
            </div>
 
             <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/api/support/sdk/download"
                  className="flex items-center justify-center space-x-3 px-8 py-3.5 bg-yellow-400 text-black text-sm font-semibold rounded-lg hover:bg-yellow-500 transition-all active:scale-[0.98]"
                >
                   <Download size={18} />
                   <span>Download SDK v0.1.0</span>
                </a>
                <Link 
                  href="/support/docs"
                  className="flex items-center justify-center space-x-3 px-8 py-3.5 border border-zinc-700 text-zinc-300 text-sm font-semibold rounded-lg hover:bg-zinc-800 hover:text-white transition-all active:scale-[0.98]"
                >
                   <ExternalLink size={18} />
                   <span>Technical Manual</span>
                </Link>
             </div>
          </div>
 
          <div className="space-y-8">
            {/* PIP INSTALL */}
            <div className="group bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-8 hover:border-yellow-500/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center space-x-3">
                    <Terminal size={16} className="text-yellow-500" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Initialization</span>
                 </div>
                 <button onClick={() => handleCopy(pipCommand, 'pip')} className="text-zinc-600 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800">
                    {copied === 'pip' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                 </button>
              </div>
              <div className="font-mono text-xl text-white tracking-tight flex items-center gap-3">
                 <span className="text-yellow-500 opacity-50">$</span> 
                 <code className="text-zinc-100">{pipCommand}</code>
              </div>
            </div>
 
            {/* WRAPPER SNIPPET */}
            <div className="group bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center space-x-3">
                    <Shield size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Hardened Wrapper</span>
                 </div>
                 <button onClick={() => handleCopy(guardCode, 'guard')} className="text-zinc-600 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800">
                    {copied === 'guard' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                 </button>
              </div>
              <pre className="font-mono text-sm leading-relaxed p-4 bg-black/40 rounded-xl border border-zinc-800/50">
                 <div className="text-zinc-600 mb-2 font-sans italic">// The 1-Line Sovereign Wrapper</div>
                 <div className="text-zinc-100 mb-2"><span className="text-yellow-500/70">from</span> sovereign_agent <span className="text-yellow-500/70">import</span> SovereignAgent</div>
                 <div className="text-emerald-400 mt-4">@SovereignAgent.guard()</div>
                 <div className="text-white"><span className="text-yellow-500/70">def</span> <span className="text-blue-400">execute_trade</span>(amount):</div>
                 <div className="pl-6 text-zinc-500">// Identity, Auth, and Audit active...</div>
                 <div className="pl-6 text-zinc-400 opacity-40">pass</div>
              </pre>
            </div>
 
            <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/20">
               <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                 <span className="text-yellow-500/80 font-bold uppercase tracking-wider mr-2">Note:</span>
                 The SDK automatically injects Ed25519-anchored DID headers into all outgoing HTTP requests, fulfilling NIST-800-218 requirements for non-repudiable provenance.
               </p>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
};

const Shield = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
