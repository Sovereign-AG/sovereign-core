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
    const link = document.createElement('a');
    link.href = '/api/logs/download';
    link.setAttribute('download', 'svtp_nist_audit_log.ndjson');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section className="py-32 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 text-left">
            <div className="text-xs font-semibold text-yellow-500/80 tracking-widest uppercase">Fleet Operations</div>
            <h2 className="text-5xl font-bold text-white tracking-tight">Active SVTP-DID Registry</h2>
            <p className="text-zinc-500 font-medium text-lg max-w-2xl leading-relaxed">Real-time attestation for all autonomous nodes cryptographically anchored to the SVTP Root.</p>
          </div>
            <div className="flex flex-col items-end space-y-4">
              <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">Identity Standard: SVTP v1.0</span>
              <button 
                onClick={downloadAuditLog}
                className="flex items-center space-x-3 px-8 py-3 bg-yellow-400 text-black text-sm font-semibold rounded-lg hover:bg-yellow-500 transition-all active:scale-[0.98]"
              >
                <Download size={16} />
                <span>Export NIST Audit Log</span>
              </button>
            </div>
        </div>

        <div className="bg-zinc-900/20 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/40">
                <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Agent Identifier (DID)</th>
                <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">SVTP Trust Index</th>
                <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">SVTP Status</th>
                <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Synchronization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                       <Activity size={24} className="text-yellow-500 animate-pulse" />
                       <span className="text-zinc-500 font-medium italic">Synchronizing SVTP Fleet Ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center text-zinc-600 font-medium italic">
                    No active agents detected in current cycle.
                  </td>
                </tr>
              ) : agents.slice(0, 100).map((agent, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 1) }}
                  key={agent.did || `agent-${i}`} 
                  className="hover:bg-zinc-900/50 transition-colors group"
                >
                  <td className="px-8 py-6 font-mono text-[13px] text-zinc-300 group-hover:text-white transition-colors">
                    {agent.did}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${agent.trust_score}%` }}
                          className="h-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]" 
                        />
                      </div>
                      <span className="text-sm font-bold text-yellow-500">{agent.trust_score}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2.5">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span className="text-xs font-bold text-zinc-200">{agent.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active</span>
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

