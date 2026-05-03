"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Receipt, TrendingUp, ShieldCheck, 
  ArrowUpRight, Download, Activity, Landmark, History, DollarSign, Wallet,
  Lock, Globe, Shield, LayoutDashboard, Search, Filter, MoreHorizontal, Settings,
  BarChart3, AlertCircle, ChevronRight, Info, ExternalLink
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
           <button className="text-[12px] font-medium text-gray-500 hover:text-white transition-colors">
              Feedback
           </button>
           <button className="text-[12px] font-medium text-gray-500 hover:text-white transition-colors">
              Support
           </button>
           <div className="h-4 w-px bg-white/10" />
           <button 
             onClick={() => setIsHandshakeOpen(true)}
             disabled={isProcessing}
             className="px-4 py-1.5 bg-[#8AB4F8] text-[#001D35] text-[12px] font-bold rounded hover:bg-[#A1C2FA] transition-all disabled:opacity-50"
           >
              {isProcessing ? 'Handshake...' : 'Add funds'}
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
              { id: 'methods', label: 'Payment methods', icon: CreditCard },
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
          
          <div className="mt-auto px-3 pb-4 space-y-1">
             <div className="h-px bg-white/5 my-4 mx-4" />
             <button className="w-full flex items-center px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
                <Settings size={16} className="mr-4" /> Settings
             </button>
             <button className="w-full flex items-center px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
                <Shield size={16} className="mr-4" /> Compliance
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#050505]">
          <div className="p-8 max-w-[1200px] mx-auto space-y-6">
            
            <div className="flex items-center justify-between">
               <h2 className="text-[28px] font-normal text-white tracking-tight">Overview</h2>
               <div className="flex items-center text-[12px] text-gray-500">
                  Account ID: <span className="font-mono text-gray-400 ml-2 uppercase">SVTP-MAIN-ORG</span>
               </div>
            </div>

            {/* Google-Style Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               
               {/* Balance Card */}
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

               {/* Usage Card */}
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

               {/* Threshold Card */}
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

            {/* Large Table Card */}
            <div className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                  <h3 className="text-[15px] font-medium text-white">Transactions</h3>
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
                        {stats.transactions.map((tx, i) => (
                           <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                              <td className="px-6 py-4 font-mono text-gray-400 text-[12px]">{tx.id}</td>
                              <td className="px-6 py-4">
                                 <div className="text-white font-medium">{tx.type}</div>
                                 <div className="text-[11px] text-gray-600 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{tx.hash}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex justify-center">
                                    <span className={cn(
                                       "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter border",
                                       tx.status === 'SETTLED' ? "bg-white/5 border-white/10 text-gray-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                    )}>
                                       {tx.status}
                                    </span>
                                 </div>
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
               <div className="px-6 py-3 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-[11px] text-gray-600">
                  <span>Showing 4 of 1,250 settlements</span>
                  <div className="flex items-center space-x-4">
                     <button className="hover:text-white disabled:opacity-30" disabled>Previous</button>
                     <button className="hover:text-white">Next</button>
                  </div>
               </div>
            </div>

            {/* Institutional Footnote */}
            <div className="p-6 bg-blue-500/[0.03] border border-blue-500/10 rounded-xl flex items-start space-x-4">
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
