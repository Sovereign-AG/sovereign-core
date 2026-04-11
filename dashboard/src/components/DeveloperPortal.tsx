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
    <section className="py-32 bg-[#000000] border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-10 lg:sticky lg:top-32">
            <div className="space-y-4">
               <div className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.4em]">Developer Forge</div>
               <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">Integrate in <br/><span className="text-gray-500">Seconds.</span></h2>
               <p className="text-gray-400 text-xl font-medium leading-relaxed">The SDK acts as a high-performance transparent proxy. Activate non-repudiable identity and NIST compliance without changing a single line of your agent's core model.</p>
            </div>

             <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="/api/support/sdk/download"
                  download
                  className="flex items-center justify-center space-x-3 px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                   <Download size={14} />
                   <span>Download SDK v1.2</span>
                </a>
                <Link 
                  href="/support/docs"
                  className="flex items-center justify-center space-x-3 px-10 py-5 border border-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest hover:border-white transition-all"
                >
                   <ExternalLink size={14} />
                   <span>Technical Manual</span>
                </Link>
             </div>
          </div>

          <div className="space-y-10">
            {/* PIP INSTALL */}
            <div className="group bg-[#050505] border border-[#1A1A1A] rounded p-10 hover:border-blue-500/30 transition-all">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center space-x-3">
                    <Terminal size={14} className="text-blue-500" />
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Initialization</span>
                 </div>
                 <button onClick={() => handleCopy(pipCommand, 'pip')} className="text-[#333] hover:text-white transition-colors">
                    {copied === 'pip' ? <Check size={14} className="text-lime-500" /> : <Copy size={14} />}
                 </button>
              </div>
              <div className="font-mono text-xl text-white tracking-tight">
                 <span className="text-blue-500">$</span> {pipCommand}
              </div>
            </div>

            {/* WRAPPER SNIPPET */}
            <div className="group bg-[#050505] border border-[#1A1A1A] rounded p-10 hover:border-lime-500/30 transition-all">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center space-x-3">
                    <Shield size={14} className="text-lime-500" />
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Hardened Wrapper</span>
                 </div>
                 <button onClick={() => handleCopy(guardCode, 'guard')} className="text-[#333] hover:text-white transition-colors">
                    {copied === 'guard' ? <Check size={14} className="text-lime-500" /> : <Copy size={14} />}
                 </button>
              </div>
              <pre className="font-mono text-sm leading-loose">
                 <div className="text-gray-600 mb-2"># Single-Line Identity Guard</div>
                 <div className="text-lime-400">@SovereignAgent.guard()</div>
                 <div className="text-white"><span className="text-blue-500">def</span> <span className="text-blue-400">secure_trade</span>(amount):</div>
                 <div className="pl-6 text-gray-500"># Interception & Audit Active</div>
                 <div className="pl-6 text-white opacity-40">pass</div>
              </pre>
            </div>

            <div className="p-8 border border-[#1A1A1A] rounded-[1rem] bg-gradient-to-br from-blue-500/5 to-transparent">
               <p className="text-[11px] font-mono text-gray-600 uppercase tracking-[0.2em] leading-relaxed">
                  NOTE: The SDK automatically injects Ed25519-anchored DID headers into all outgoing HTTP requests, fulfilling NIST-800-218 requirements for non-repudiable provenance.
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
