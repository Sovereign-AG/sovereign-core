"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export const RegistrySearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    // Simulation of Registry Lookup
    setTimeout(() => {
      setLoading(false);
      if (query.startsWith('did:sov:')) {
        setResult({
          did: query,
          status: "CERTIFIED_HARDENED",
          risk_level: "NEGLIGIBLE",
          last_audit: "2026-04-11T12:00:00Z",
          owner: "Sovereign Genesis Foundation",
          compliance: "NIST-800-218 (High)"
        });
      } else {
        setResult({
          did: query,
          status: "UNREGISTERED_RISK",
          risk_level: "HIGH",
          last_audit: "N/A",
          owner: "Unknown Entity",
          compliance: "Non-Compliant"
        });
      }
    }, 1500);
  };

  return (
    <section className="py-32 bg-[#000000] border-t border-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-8 text-center space-y-16">
        <div className="space-y-4">
           <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Public Verification</div>
           <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Global Registry Search</h2>
           <p className="text-gray-500 font-medium text-lg">Input any Sovereign DID to verify Its cryptographic status and liability attestation.</p>
        </div>

        <div className="relative group max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative z-10 flex items-center">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter DID (did:sov:...) or Agent Alias"
              className="w-full bg-[#050505] border border-[#1A1A1A] rounded p-6 text-sm font-bold text-white placeholder:text-gray-800 focus:outline-none focus:border-white/20 transition-all"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-4 p-4 bg-white text-black rounded hover:bg-gray-200 transition-all disabled:bg-gray-700"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            </button>
          </form>
          {/* Input Glow */}
          <div className="absolute -inset-1 bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-10 border rounded-[1rem] flex flex-col md:flex-row items-center justify-between gap-8 text-left ${result.risk_level === 'NEGLIGIBLE' ? 'bg-lime-500/[0.03] border-lime-500/20' : 'bg-red-500/[0.03] border-red-500/20'}`}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                   {result.risk_level === 'NEGLIGIBLE' ? <ShieldCheck className="text-lime-500" /> : <AlertCircle className="text-red-500" />}
                   <span className={`text-[11px] font-black uppercase tracking-widest ${result.risk_level === 'NEGLIGIBLE' ? 'text-lime-500' : 'text-red-500'}`}>
                     {result.status}
                   </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">DID Address</div>
                  <div className="font-mono text-sm text-white break-all">{result.did}</div>
                </div>
              </div>
              <div className="shrink-0 space-y-6 text-right">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest leading-none mb-1">Risk Assessment</div>
                  <div className={`text-2xl font-black tracking-tighter ${result.risk_level === 'NEGLIGIBLE' ? 'text-lime-400' : 'text-red-400'}`}>{result.risk_level}</div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-[#000] border border-[#1A1A1A] text-[9px] font-black text-white uppercase tracking-widest rounded hover:border-white transition-colors"
                >
                  View Full Audit Case
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audit Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && result && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-[#1A1A1A] rounded-[2rem] p-12 overflow-hidden shadow-[0_0_100px_rgba(204,255,0,0.05)]"
            >
               <div className="absolute top-0 right-0 p-8">
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
                    [ Close ]
                  </button>
               </div>

               <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-lime-500 uppercase tracking-[0.4em]">Audit Record // 2026-AF01</div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Cryptographic Provenance</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    {[
                      { label: "Entity Status", value: result.status },
                      { label: "Chain Authority", value: "Sovereign Root Validator" },
                      { label: "NIST Compliance", value: result.compliance },
                      { label: "Last Attestation", value: result.last_audit }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">{item.label}</div>
                        <div className="text-sm font-bold text-gray-200">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 p-8 bg-[#000] border border-[#1A1A1A] rounded-xl relative overflow-hidden group">
                     <div className="text-[9px] font-mono text-lime-500/50 uppercase tracking-widest mb-4">Live Signature Payload</div>
                     <pre className="text-[11px] font-mono text-gray-400 break-all leading-relaxed whitespace-pre-wrap">
                        {`{
  "did": "${result.did}",
  "proof": {
    "type": "Ed25519Signature2026",
    "created": "2026-04-11T19:30:00Z",
    "verificationMethod": "did:sov:root#key-1",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsYjY0Il19..."
  }
}`}
                     </pre>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                     <div className="h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
                     <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Non-Repudiation Verified via Sovereign Sub-Ledger</span>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
