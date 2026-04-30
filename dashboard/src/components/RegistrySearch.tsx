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
          owner: "Sovereign Standard Foundation",
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
    <section className="py-32 bg-[#000000] border-t border-zinc-900">
      <div className="max-w-4xl mx-auto px-8 text-center space-y-12">
        <div className="space-y-4">
           <div className="text-xs font-medium text-yellow-500/80 tracking-wider">Public Registry Verification</div>
           <h2 className="text-4xl font-bold text-white tracking-tight">Global Registry Search</h2>
           <p className="text-zinc-400 font-medium text-lg max-w-2xl mx-auto">
             Verify the cryptographic status, liability attestation, and compliance standing of any Sovereign DID.
           </p>
        </div>
 
        <div className="relative group max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative z-10 flex items-center">
            <div className="absolute left-6 text-zinc-500">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter DID (did:sov:...) or Agent Alias"
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-5 pl-14 pr-32 text-sm font-medium text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/50 transition-all shadow-2xl"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-3 px-6 py-2.5 bg-yellow-400 text-black text-sm font-semibold rounded-xl hover:bg-yellow-500 transition-all disabled:bg-zinc-700 flex items-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Search</span>}
            </button>
          </form>
          {/* Subtle Glow */}
          <div className="absolute -inset-1 bg-yellow-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-8 border rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-left ${result.risk_level === 'NEGLIGIBLE' ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-red-500/[0.02] border-red-500/20'}`}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                   {result.risk_level === 'NEGLIGIBLE' ? <ShieldCheck size={20} className="text-emerald-500" /> : <AlertCircle size={20} className="text-red-500" />}
                   <span className={`text-xs font-semibold tracking-wide ${result.risk_level === 'NEGLIGIBLE' ? 'text-emerald-500' : 'text-red-500'}`}>
                     {result.status.replace(/_/g, ' ')}
                   </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">DID Address</div>
                  <div className="font-mono text-sm text-white break-all">{result.did}</div>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-4">
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Risk Assessment</div>
                  <div className={`text-3xl font-bold tracking-tight ${result.risk_level === 'NEGLIGIBLE' ? 'text-emerald-400' : 'text-red-400'}`}>{result.risk_level}</div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-300 uppercase tracking-widest rounded-lg hover:bg-zinc-800 hover:text-white transition-all"
                >
                  View Audit Case
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audit Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && result && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center p-6 sm:p-12 overflow-y-auto pt-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-[#050505] border border-[#1A1A1A] rounded-[2rem] p-8 sm:p-12 shadow-[0_0_100px_rgba(204,255,0,0.05)] my-auto"
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
