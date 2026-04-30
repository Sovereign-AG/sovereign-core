"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export const LiabilityClock = () => {
  const [heartbeats, setHeartbeats] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [lastSync, setLastSync] = useState(0);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/stats');
      const data = await res.json();
      setHeartbeats(data.usageLedgerCount + (data.totalVerifications || 0));
      setRevenue(data.totalRevenue || 0);
      setLastSync(0); 
    } catch (error) {
      console.error("Clock Sync Failed");
    }
  };

  useEffect(() => {
    fetchStats();
    const fetchInterval = setInterval(fetchStats, 10000);
    const timerInterval = setInterval(() => {
      setLastSync(prev => prev + 1);
    }, 1000);
    
    return () => {
      clearInterval(fetchInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="flex items-center space-x-6 bg-[#050505]/50 backdrop-blur-md border border-[#1A1A1A] px-6 py-3 rounded shadow-2xl">
      <div className="flex flex-col items-start translate-y-[2px]">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[9px] font-black text-[#555] uppercase tracking-[0.3em] leading-none">Total Compliance Heartbeats</span>
          <span className="text-[9px] font-mono text-lime-500/50 uppercase tracking-widest leading-none">Last Check: {lastSync}s ago</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock size={12} className="text-lime-500 animate-pulse" />
          <span className="font-mono text-xl font-black text-white tabular-nums tracking-tighter">
            {heartbeats.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="h-8 w-px bg-[#1A1A1A]" />
      <div className="flex flex-col items-start translate-y-[2px]">
        <span className="text-[9px] font-black text-[#555] uppercase tracking-[0.3em] leading-none mb-1">Protocol Revenue (Certified)</span>
        <span className="font-mono text-xl font-black text-lime-400 tabular-nums tracking-tighter">
          ${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
        </span>
      </div>
    </div>
  );
};
