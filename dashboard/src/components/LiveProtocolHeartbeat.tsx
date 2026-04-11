"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'SYNC' | 'VALIDATION' | 'AUTH' | 'LEDGER';
  content: string;
  status: 'SUCCESS' | 'PENDING' | 'ACTIVE';
}

const MOCK_DATA = [
  { type: 'SYNC', content: 'SYNC_REQUEST: did:sov:alpha_9...', status: 'ACTIVE' },
  { type: 'VALIDATION', content: 'NIST_800-218_VALIDATED: Success', status: 'SUCCESS' },
  { type: 'AUTH', content: 'AGENT_EXECUTION_AUTHORIZED: Node_48', status: 'SUCCESS' },
  { type: 'LEDGER', content: 'LEDGER_COMMIT: HASH_384_SHA', status: 'SUCCESS' },
  { type: 'SYNC', content: 'SYNC_REQUEST: did:sov:beta_2...', status: 'ACTIVE' },
  { type: 'VALIDATION', content: 'JIT_AUTHORIZATION_TOKEN: Issued', status: 'SUCCESS' },
];

export const LiveProtocolHeartbeat = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addLog = () => {
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const template = MOCK_DATA[Math.floor(Math.random() * MOCK_DATA.length)];
      
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp,
        ...template
      } as LogEntry;

      setLogs(prev => [...prev.slice(-12), newEntry]);
    };

    const interval = setInterval(addLog, 1800);
    addLog(); // Initial log
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section className="bg-[#000] py-32 border-b border-[#1A1A1A] relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* LEFT: TERMINAL WINDOW (60%) */}
          <div className="w-full lg:w-[60%] relative group">
            {/* Terminal Frame */}
            <div className="relative bg-[#050505] border border-[#1A1A1A] rounded-lg overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
              {/* Header */}
              <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                </div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center">
                   <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse mr-2" />
                   SOVEREIGN_HUB://LIVE_HEARTBEAT
                </div>
                <div className="text-[10px] font-mono text-gray-700">60.0 FPS</div>
              </div>

              {/* Terminal Feed */}
              <div 
                ref={scrollRef}
                className="h-[400px] overflow-y-auto p-8 font-mono text-[13px] leading-relaxed relative"
              >
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {logs.map((log) => (
                      <motion.div 
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="flex font-mono"
                      >
                        <span className="text-[#555] mr-4 select-none">[{log.timestamp}]</span>
                        <span className="text-[#CBFF00] mr-4 whitespace-nowrap">
                          {log.content.split(':')[0]}:
                        </span>
                        <span className="text-white opacity-80 break-all">
                          {log.content.split(':')[1]}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Scan-line Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[size:100%_4px,3px_100%] opacity-20" />
              </div>

              {/* Terminal Footer */}
              <div className="bg-[#0A0A0A] border-t border-[#1A1A1A] px-8 py-3 flex justify-between items-center">
                <div className="text-[9px] font-mono text-[#444] uppercase tracking-widest">
                   NIST-800-218 COMPLIANT_VAL_NODE://048
                </div>
                <div className="flex space-x-4">
                  <span className="text-[9px] font-mono text-lime-500 uppercase tracking-widest">ENCRYPTED</span>
                  <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest">ANCHORED</span>
                </div>
              </div>
            </div>

            {/* Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/5 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>

          {/* RIGHT: TYPOGRAPHIC EXPLANATION (40%) */}
          <div className="w-full lg:w-[40%] space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-lime-500" />
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                Non-Repudiable <br/> Auditing.
              </h2>
            </div>
            
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Every action is cryptographically anchored to the Sovereign Root before execution. Our high-frequency heartbeat prevents lateral movement and unauthorized state changes in real-time.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-6">
              {[
                "100% Cryptographic Provenance",
                "Instant Behavioral Attestation",
                "NIST-Certified Transaction Logs"
              ].map((item) => (
                <div key={item} className="flex items-center space-x-4 group">
                  <div className="w-5 h-5 border border-[#1A1A1A] flex items-center justify-center group-hover:border-lime-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-lime-500 scale-0 group-hover:scale-100 transition-transform" />
                  </div>
                  <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
