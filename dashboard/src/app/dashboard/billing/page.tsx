"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Receipt, TrendingUp, ShieldCheck, 
  ArrowUpRight, Download, Activity, Landmark, History, DollarSign, Wallet,
  Lock, Globe, Shield, LayoutDashboard, Search, Filter, MoreHorizontal, Settings,
  BarChart3, AlertCircle, ChevronRight, Info, ExternalLink, Calendar, ChevronDown
} from 'lucide-react';
import { useSession } from "next-auth/react";
import { cn } from '@/lib/utils';
import InstitutionalHandshake from '@/components/InstitutionalHandshake';

export default function SovereignBilling() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isHandshakeOpen, setIsHandshakeOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [stats, setStats] = useState({
    balance: 499.94,
    unbilled: 0.00,
    totalSettled: 11.00,
    threshold: 1000.00,
    freeSlots: 5,
    provisionedCount: 12,
    insurability: 98.4,
    transactions: [
      { id: 'TX-4921', date: '2026-05-03 14:22', type: 'Action Resolution', amount: -0.0100, status: 'SETTLED', hash: '0x8f2a...c3e1' },
      { id: 'TX-4920', date: '2026-05-03 14:15', type: 'Agent Pulse Tax', amount: -0.0001, status: 'SETTLED', hash: '0x1d4b...a9f2' },
      { id: 'TX-4919', date: '2026-05-03 14:02', type: 'Forensic Audit', amount: -0.0100, status: 'SETTLED', hash: '0x9e5c...d0b4' },
      { id: 'TX-PROT-001', date: '2026-05-01 09:00', type: 'Protocol Initializer', amount: 500.00, status: 'CONFIRMED', hash: 'GENESIS' },
    ]
  });

  const handleCheckout = async (amount: number, type: string) => {
    try {
      setIsProcessing(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, type })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Institutional handshake failed. Please verify API key propagation.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-normal text-white tracking-tight">Overview</h2>
          <div className="flex items-center text-[12px] text-gray-500">
            Account ID: <span className="font-mono text-gray-400 ml-2 uppercase">SVTP-MAIN-ORG</span>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-[160px]">
            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Credit Balance</span>
                <Wallet size={14} className="text-gray-600" />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="text-[42px] font-normal text-white tracking-tighter">${stats.balance.toFixed(2)}</div>
                <div className="flex items-center mt-2 text-[11px] text-emerald-400 font-bold uppercase tracking-widest">
                  <ShieldCheck size={12} className="mr-2" /> AG-Secured
                </div>
            </div>
          </div>

          <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-[160px]">
            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Unbilled Accrual</span>
                <Activity size={14} className="text-gray-600" />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="text-[42px] font-normal text-white tracking-tighter">${stats.unbilled.toFixed(2)}</div>
                <div className="flex items-center mt-2 text-[11px] text-gray-500 font-medium">
                  Next Settle: <span className="text-gray-300 ml-2">Sunday 23:59 IST</span>
                </div>
            </div>
          </div>

          <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden flex flex-col min-h-[160px]">
            <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Auto-Deduction</span>
                <TrendingUp size={14} className="text-gray-600" />
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[12px] text-gray-400">Threshold</span>
                  <span className="text-[14px] font-mono text-white">${stats.threshold.toLocaleString()}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${(stats.unbilled / stats.threshold) * 100}%` }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <div className="text-[10px] text-gray-600 uppercase tracking-widest text-center">
                  {(stats.unbilled / stats.threshold * 100).toFixed(1)}% to handshake
                </div>
            </div>
          </div>
      </div>

      <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <h3 className="text-[15px] font-medium text-white">Recent Transactions</h3>
            <div className="flex items-center space-x-2">
                <button className="p-1.5 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-all"><Filter size={14} /></button>
                <button className="p-1.5 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-all"><Download size={14} /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                      <th className="px-6 py-3 font-medium">Event ID</th>
                      <th className="px-6 py-3 font-medium">Type</th>
                      <th className="px-6 py-3 font-medium text-center">Status</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {stats.transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4 font-mono text-gray-400 text-[12px]">{tx.id}</td>
                        <td className="px-6 py-4">
                            <div className="text-white font-medium">{tx.type}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter border",
                              tx.status === 'SETTLED' ? "bg-white/5 border-white/10 text-gray-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            )}>
                              {tx.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{tx.date}</td>
                        <td className={cn(
                            "px-6 py-4 text-right font-mono",
                            tx.amount > 0 ? "text-emerald-400" : "text-white"
                        )}>
                            {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(4)}
                        </td>
                      </tr>
                  ))}
                </tbody>
            </table>
          </div>
      </div>
    </div>
  );

  const renderUsage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-normal text-white tracking-tight">Usage</h2>
          <div className="flex items-center space-x-3">
             <div className="flex items-center bg-[#000000] border border-white/10 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-300 cursor-pointer hover:border-gray-500 transition-all">
                <Calendar size={14} className="mr-2 text-gray-500" />
                <span>May 1, 2026 – May 3, 2026</span>
                <ChevronDown size={14} className="ml-2 text-gray-500" />
             </div>
             <button className="p-2 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-all border border-white/5">
                <Download size={16} />
             </button>
          </div>
      </div>

      <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden p-6">
         <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-[14px] font-medium text-gray-400 uppercase tracking-widest">Total Action Resolutions</h3>
               <div className="text-[32px] font-normal text-white mt-1">12,402 <span className="text-[14px] text-gray-500 font-normal ml-2">units</span></div>
            </div>
            <div className="flex items-center space-x-4">
               <div className="flex items-center text-[11px] text-gray-500"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2" /> Action Resolve</div>
               <div className="flex items-center text-[11px] text-gray-500"><div className="w-2 h-2 bg-emerald-500/50 rounded-full mr-2" /> Forensic Audit</div>
            </div>
         </div>

         <div className="h-[240px] w-full flex items-end justify-between gap-1 group/chart">
            {[34, 45, 67, 89, 45, 34, 23, 56, 78, 90, 45, 67, 34, 56, 78, 89, 45, 67, 89, 100, 78, 56, 45, 67, 89, 45, 23, 56, 78, 95].map((val, i) => (
               <div key={i} className="flex-1 flex flex-col justify-end items-center group relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ delay: i * 0.01, duration: 0.5 }}
                    className={cn(
                      "w-full rounded-t-[2px] transition-all duration-300",
                      i === 29 ? "bg-blue-400" : "bg-blue-500/40 group-hover:bg-blue-500"
                    )}
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                     May {i + 1}: {Math.floor(val * 123)} units
                  </div>
               </div>
            ))}
         </div>
         <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
            <span>May 01</span>
            <span>May 15</span>
            <span>May 31</span>
         </div>
      </div>

      <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden">
         <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01]">
            <h3 className="text-[15px] font-medium text-white">Usage by Service</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                     <th className="px-6 py-3 font-medium">Service</th>
                     <th className="px-6 py-3 font-medium">Units</th>
                     <th className="px-6 py-3 font-medium text-right">Cost (Est.)</th>
                  </tr>
               </thead>
               <tbody className="text-[13px]">
                  {[
                    { name: 'SVTP Action Resolution', units: '8,402', cost: '$84.02' },
                    { name: 'Forensic Audit Layer', units: '2,100', cost: '$21.00' },
                    { name: 'Identity Anchor Minting', units: '1,200', cost: '$12.00' },
                    { name: 'Protocol Heartbeat', units: '700', cost: '$0.70' },
                  ].map((service, i) => (
                     <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                           <div className="text-white font-medium">{service.name}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 font-mono">{service.units}</td>
                        <td className="px-6 py-4 text-right font-mono text-white">{service.cost}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-normal text-white tracking-tight">Transactions</h2>
          <div className="flex items-center space-x-3">
             <div className="relative group">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-gray-300 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filter by ID or Hash..." 
                  className="bg-[#000000] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[13px] w-[300px] focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-600"
                />
             </div>
             <button className="flex items-center space-x-2 bg-[#000000] border border-white/10 rounded-lg px-4 py-2 text-[13px] font-medium text-gray-300 hover:bg-white/5 transition-all">
                <Filter size={14} className="text-gray-500" />
                <span>Filters</span>
             </button>
             <button className="p-2 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-all border border-white/5">
                <Download size={16} />
             </button>
          </div>
      </div>

      <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                     <th className="px-6 py-3 font-medium">Date</th>
                     <th className="px-6 py-3 font-medium">Description</th>
                     <th className="px-6 py-3 font-medium">Status</th>
                     <th className="px-6 py-3 font-medium">Transaction ID</th>
                     <th className="px-6 py-3 font-medium text-right">Amount (SVTP)</th>
                  </tr>
               </thead>
               <tbody className="text-[13px]">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const tx = stats.transactions[i % stats.transactions.length];
                    return (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{tx.date}</td>
                        <td className="px-6 py-4">
                           <div className="text-white font-medium">{tx.type}</div>
                           <div className="text-[11px] text-gray-600 mt-1 flex items-center">
                              Handshake Verified <ShieldCheck size={10} className="ml-1 text-emerald-500/50" />
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={cn(
                             "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter border",
                             tx.status === 'SETTLED' ? "bg-white/5 border-white/10 text-gray-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                           )}>
                             {tx.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-gray-500 text-[12px]">
                           {tx.id}
                           <div className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity mt-1">{tx.hash}</div>
                        </td>
                        <td className={cn(
                           "px-6 py-4 text-right font-mono text-[14px]",
                           tx.amount > 0 ? "text-emerald-400" : "text-white"
                        )}>
                           {tx.amount > 0 ? `+${tx.amount.toFixed(2)}` : tx.amount.toFixed(4)}
                        </td>
                      </tr>
                    );
                  })}
               </tbody>
            </table>
         </div>
         <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-[13px] text-gray-500">
            <div className="flex items-center space-x-6">
               <span>Rows per page: <span className="text-white ml-1">10</span> <ChevronDown size={14} className="inline ml-1" /></span>
               <span>1–10 of 1,250</span>
            </div>
            <div className="flex items-center space-x-6">
               <button className="hover:text-white disabled:opacity-30 flex items-center" disabled><ChevronRight size={18} className="rotate-180 mr-1" /> Previous</button>
               <button className="hover:text-white flex items-center">Next <ChevronRight size={18} className="ml-1" /></button>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#E3E3E3] font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Institutional Top Bar (Primary Header) */}
      <div className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-[#000000] sticky top-0 z-40">
        <div className="flex items-center space-x-6">
           <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
              <ArrowLeft size={18} />
           </Link>
           <div className="h-6 w-px bg-white/10" />
           <div className="flex items-center space-x-3">
              <h1 className="text-[18px] font-medium tracking-tight text-white">Billing</h1>
              <span className="px-1.5 py-0.5 rounded-sm bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-[0.1em] border border-blue-500/20">
                 PRO
              </span>
           </div>
        </div>
        <div className="flex items-center space-x-6">
           <button 
             onClick={() => setIsHandshakeOpen(true)}
             disabled={isProcessing}
             className="px-4 py-1.5 bg-[#8AB4F8] text-[#001D35] text-[12px] font-bold rounded hover:bg-[#A1C2FA] transition-all disabled:opacity-50"
           >
              {isProcessing ? 'Handshake...' : 'Setup billing'}
           </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        
        {/* Navigation Rail (Google Style) */}
        <aside className="w-[240px] border-r border-white/5 bg-[#000000] flex flex-col py-4">
          <div className="px-3 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'usage', label: 'Usage', icon: BarChart3 },
              { id: 'history', label: 'Transactions', icon: History },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-2.5 text-[14px] font-medium rounded-lg transition-all",
                  activeTab === item.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                )}
              >
                <item.icon size={18} className="mr-4" />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-auto px-3 pb-4">
             {/* Secondary actions removed to avoid duplication with main dashboard navigation */}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#050505]">
          <div className="p-8 max-w-[1200px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'usage' && renderUsage()}
                {activeTab === 'history' && renderHistory()}
                {(activeTab !== 'overview' && activeTab !== 'usage' && activeTab !== 'history') && (
                  <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 space-y-4">
                     <Lock size={48} className="opacity-20" />
                     <p className="text-[14px] font-medium uppercase tracking-widest">Nexus Module Restricted</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Institutional Footnote */}
            <div className="mt-8 p-6 bg-blue-500/[0.03] border border-blue-500/10 rounded-xl flex items-start space-x-4">
               <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
               <div className="space-y-1">
                  <h4 className="text-[13px] font-bold text-blue-400 uppercase tracking-widest">Compliance Handshake Required</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed max-w-4xl">
                     Sovereign AG enforces a strict forensic audit ledger. All transactions are cryptographically verified via the SVTP v1.0 protocol. For large agent deployments (&gt;100 units), institutional credit anchors must be provisioned 48 hours in advance.
                  </p>
               </div>
            </div>
          </div>
        </main>
      </div>

      <InstitutionalHandshake 
        isOpen={isHandshakeOpen}
        onClose={() => setIsHandshakeOpen(false)}
        onConfirm={() => {
          setIsHandshakeOpen(false);
          handleCheckout(100, 'TOP_UP');
        }}
        user={{
          name: session?.user?.name || "Institutional Actor",
          email: session?.user?.email || "billing@sovereign.ag",
          avatar: session?.user?.image || undefined
        }}
      />
    </div>
  );
}
