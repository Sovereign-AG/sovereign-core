"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Download } from 'lucide-react';

export const FleetDashboard = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/agent/list');
      const data = await res.json();
      setAgents(data.agents || []);
      setLoading(false);
    } catch (error) {
      console.error("Fleet Sync Failed", error);
    }
  };

  useEffect(() => {
    fetchAgents();
    const interval = setInterval(fetchAgents, 5000);
    return () => clearInterval(interval);
  }, []);

  const downloadAuditLog = () => {
    window.open('http://127.0.0.1:5001/api/logs/download', '_blank');
  };

  return (
    <section className="py-32 bg-[#000000] border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 text-left">
            <div className="text-[10px] font-mono text-lime-400 uppercase tracking-[0.4em]">Fleet Operations</div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Active DID Registry</h2>
            <p className="text-gray-500 font-medium text-xl max-w-2xl">Real-time attestation for all autonomous nodes cryptographically anchored to the Sovereign Root.</p>
          </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="text-[8px] font-mono text-[#333] uppercase">Security Standard: NIST-2026</span>
              <button 
                onClick={downloadAuditLog}
                className="flex items-center space-x-3 px-8 py-4 bg-[#050505] border border-[#1A1A1A] rounded text-[10px] font-black uppercase tracking-widest text-[#888] hover:text-white hover:border-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
              >
                <Download size={14} className="text-lime-500 group-hover:animate-bounce" />
                <span>Export NIST Audit Log</span>
              </button>
            </div>
        </div>

        <div className="bg-[#050505] border border-[#1A1A1A] rounded overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A1A1A] bg-[#0A0A0A]">
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Active DID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Trust Score</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Compliance Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Real-Time Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center font-mono text-gray-600 animate-pulse">Synchronizing Fleet Ledger...</td>
                </tr>
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center font-mono text-gray-600">No active agents detected in current cycle.</td>
                </tr>
              ) : agents.map((agent, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={agent.did} 
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-8 py-6 font-mono text-[13px] text-white/80 group-hover:text-white transition-colors">
                    {agent.did}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${agent.trust_score}%` }}
                          className="h-full bg-lime-500" 
                        />
                      </div>
                      <span className="font-mono text-[13px] text-lime-400">{agent.trust_score}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck size={14} className="text-lime-500" />
                      <span className="text-[11px] font-black text-white uppercase tracking-wider">{agent.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                      </span>
                      <span className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.2em]">Live Attestation Active</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
