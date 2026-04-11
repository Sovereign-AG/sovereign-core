"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VERIFIED_LOGS = [
  { id: 'vlog-1', timestamp: '18:26:50', text: '[SOVEREIGN] Building Cryptographic DID...', status: 'processing' },
  { id: 'vlog-2', timestamp: '18:26:51', text: '[SOVEREIGN] Identity Anchored: did:sov:7782', status: 'success' },
  { id: 'vlog-3', timestamp: '18:26:51', text: '[SOVEREIGN] Heartbeat Syncing...', status: 'processing' },
  { id: 'vlog-4', timestamp: '18:26:51', text: 'Registration sent to Dashboard.', status: 'success' },
  { id: 'vlog-5', timestamp: '18:26:51', text: 'Verified Agent: Requesting data...', status: 'processing' },
  { id: 'vlog-6', timestamp: '18:26:51', text: 'Server Response Code: 200', status: 'authorized' },
  { id: 'vlog-7', timestamp: '18:26:51', text: 'Data: {"identity": "did:sov", "status": "Success"}', status: 'success' },
];

const ROGUE_LOGS = [
  { id: 'rlog-1', timestamp: '18:26:38', text: 'Rogue Agent: Attempting unauthorized extraction...', status: 'warning' },
  { id: 'rlog-2', timestamp: '18:26:38', text: 'Server Response Code: 403', status: 'forbidden' },
  { id: 'rlog-3', timestamp: '18:26:38', text: 'Data: {"error": "403 - Identity Required"}', status: 'error' },
];

export const LiveProofDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentLogs, setCurrentLogs] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    const sequence = async () => {
      if (!isMounted) return;
      
      // 1. Rogue Attempt (Red State)
      setIsAuthorized(false);
      setCurrentLogs(ROGUE_LOGS.map(log => ({ ...log, id: `${log.id}-${Math.random()}` })));
      
      await new Promise(r => setTimeout(r, 4000));
      if (!isMounted) return;
      
      // 2. Transition to Authorized (Green State)
      setCurrentLogs([]);
      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;
      
      setIsAuthorized(true);
      for (let i = 0; i < VERIFIED_LOGS.length; i++) {
        if (!isMounted) return;
        const logWithUniqueId = { ...VERIFIED_LOGS[i], id: `${VERIFIED_LOGS[i].id}-${Date.now()}-${i}` };
        setCurrentLogs(prev => [...prev.slice(-10), logWithUniqueId]);
        await new Promise(r => setTimeout(r, 800));
      }

      await new Promise(r => setTimeout(r, 6000));
      if (isMounted) sequence(); 
    };

    sequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-32 bg-[#000000] border-y border-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* CISO COPY */}
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center space-x-3 text-[10px] font-mono text-lime-400 uppercase tracking-[0.4em]"
          >
             <div className="w-12 h-px bg-lime-500/30" />
             LIVE PROTOCOL AUDIT
             <div className="w-12 h-px bg-lime-500/30" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            From Anonymous Risk <br/> <span className="text-gray-500">to Verified Asset.</span>
          </h2>
          <p className="text-gray-400 text-lg font-medium tracking-tight max-w-2xl leading-relaxed">
            Our 1-line wrapper enforces JIT (Just-In-Time) authorization. <br/>
            <span className="text-white">No Sovereign DID = No Access. Period.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#1A1A1A] border border-[#1A1A1A] rounded overflow-hidden relative">
          
          {/* CENTER HOOK: STATUS INDICATOR */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <motion.div 
              animate={{ 
                backgroundColor: isAuthorized ? "#CBFF00" : "#FF3B30",
                boxShadow: isAuthorized 
                  ? "0 0 80px rgba(203, 255, 0, 0.4)" 
                  : "0 0 80px rgba(255, 59, 48, 0.4)"
              }}
              className="w-20 h-20 rounded-full border-4 border-black flex items-center justify-center transition-all duration-700"
            >
              <div className="w-2 h-2 rounded-full bg-black animate-ping" />
            </motion.div>
          </div>

          {/* LEFT: AGENT CONSOLE */}
          <div className="bg-[#050505] p-12 lg:p-16 space-y-10 group">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#555] uppercase tracking-[0.3em]">Agent_Console</h3>
              <div className="text-[10px] font-mono text-lime-500/50">SECURE_WRAPPER.PY</div>
            </div>
            
            <div className="font-mono text-[14px] leading-loose">
              <pre className="text-gray-400 overflow-x-auto">
                <div className="opacity-40 mb-2"># Install: pip install sovereign-sdk</div>
                <div className="text-lime-400">from sovereign_sdk import SovereignAgent</div>
                <br/>
                <div className="text-white opacity-90"><span className="text-gray-600">@SovereignAgent.guard()</span></div>
                <div><span className="text-lime-400">def</span> <span className="text-blue-400">secure_trade</span>(headers=None):</div>
                <div className="pl-6 text-gray-600"># Interception & Heartbeat Active</div>
                <div className="pl-6 text-gray-500">response = requests.get(TARGET_URL, <br/><span className="pl-24">headers=headers)</span></div>
                <div className="pl-6 text-lime-400">return response.json()</div>
              </pre>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A] flex items-center space-x-6">
              <span className="text-[9px] font-mono text-gray-700 uppercase tracking-widest leading-none">Status: {isAuthorized ? 'ENFORCED' : 'IDLE'}</span>
              <div className="h-1 w-12 bg-[#1A1A1A] rounded-full overflow-hidden">
                <motion.div 
                   animate={{ x: isAuthorized ? '0%' : '-100%' }}
                   className="w-full h-full bg-lime-500"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: REGISTRY VAULT */}
          <div className="bg-[#030303] p-12 lg:p-16 space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#555] uppercase tracking-[0.3em]">Registry_Vault</h3>
              <div className={`text-[10px] font-mono transition-colors duration-500 ${isAuthorized ? 'text-lime-500' : 'text-red-500'}`}>
                {isAuthorized ? 'IDENT_AUTH_SUCCESS' : 'IDENT_AUTH_REQUIRED'}
              </div>
            </div>

            <div className="h-[280px] font-mono text-[12px] overflow-hidden relative">
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {currentLogs.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex space-x-4"
                    >
                      <span className="text-[#333] shrink-0">[{log.timestamp}]</span>
                      <span className={`
                        ${log.status === 'success' ? 'text-lime-500' : ''}
                        ${log.status === 'error' ? 'text-red-500 font-bold' : ''}
                        ${log.status === 'forbidden' ? 'text-red-400' : ''}
                        ${log.status === 'authorized' ? 'text-blue-400 font-black' : ''}
                        ${log.status === 'processing' ? 'text-gray-500 italic' : 'text-gray-400'}
                      `}>
                        {log.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
              
              {/* Scan-line Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-10" />
            </div>

            <div className="pt-8 border-t border-[#1A1A1A] flex justify-between items-center">
               <div className="flex space-x-2">
                 {['d1','d2','d3'].map(dotId => (
                   <div key={dotId} className={`w-1 h-1 rounded-full ${isAuthorized ? 'bg-lime-500' : 'bg-gray-800'}`} />
                 ))}
               </div>
               <span className="text-[9px] font-mono text-gray-700 uppercase tracking-widest">Verification Node: AP-SOUTH-1</span>
            </div>
          </div>

        </div>

        {/* FOOTER ANCHOR */}
        <div className="mt-20 flex flex-col items-center space-y-6">
           <div className="flex items-center space-x-4 opacity-30">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white">Trust Provenance Protocol</span>
              <div className="h-[1px] w-12 bg-white" />
           </div>
        </div>
      </div>
    </section>
  );
};
