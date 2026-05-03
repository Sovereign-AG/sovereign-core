"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Receipt, TrendingUp, ShieldCheck, 
  ArrowUpRight, Download, Activity, Landmark, History, DollarSign, Wallet,
  Lock, Globe, Shield, LayoutDashboard, Search, Filter, MoreHorizontal, Settings,
  BarChart3, AlertCircle, ChevronRight, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SovereignBilling() {
  const router = useRouter();
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
    <div className="min-h-screen bg-[#000000] text-[#E8EAED] font-sans selection:bg-blue-500/30">
      
      {/* Institutional Top Bar (GCP Style) */}
      <div className="h-14 border-b border-white/5 flex items-center px-6 justify-between bg-[#000000]/50 backdrop-blur-md sticky top-14 z-40">
        <div className="flex items-center space-x-4">
           <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
              <ArrowLeft size={18} />
           </Link>
           <div className="h-4 w-px bg-white/10" />
           <h1 className="text-sm font-semibold tracking-tight">Billing & Cost Management</h1>
           <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">Production</span>
        </div>
        <div className="flex items-center space-x-3">
           <button className="px-3 py-1.5 text-[11px] font-bold text-gray-400 hover:text-white transition-colors border border-white/10 rounded-md hover:bg-white/5">
              Submit Feedback
           </button>
           <button className="px-3 py-1.5 text-[11px] font-bold text-gray-400 hover:text-white transition-colors">
              Help
           </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-112px)]">
        
        {/* Navigation Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#000000] flex flex-col">
          <div className="p-4 space-y-1">
            {[
              { id: 'overview', label: 'Billing Overview', icon: LayoutDashboard },
              { id: 'reports', label: 'Cost Table', icon: BarChart3 },
              { id: 'budgets', label: 'Budgets & Alerts', icon: AlertCircle },
              { id: 'commitments', label: 'Commitments', icon: ShieldCheck },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-2.5 text-[13px] font-medium rounded-lg transition-all",
                  activeTab === item.id ? "bg-blue-500/10 text-blue-400" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                )}
              >
                <item.icon size={16} className="mr-3" />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-auto border-t border-white/5 p-4 space-y-1">
             <button className="w-full flex items-center px-4 py-2 text-[12px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
                <Settings size={14} className="mr-3" /> Billing Settings
             </button>
             <button className="w-full flex items-center px-4 py-2 text-[12px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
                <CreditCard size={14} className="mr-3" /> Payment Methods
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#050505]">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Page Header */}
            <div className="flex items-end justify-between border-b border-white/5 pb-6">
              <div>
                <h2 className="text-2xl font-normal text-white">Billing Overview</h2>
                <p className="text-sm text-gray-500 mt-1">Sovereign AG Institutional Account: <span className="font-mono text-gray-400">SVTP-MAIN-ORG</span></p>
              </div>
              <div className="flex items-center space-x-3">
                 <button 
                  onClick={() => handleCheckout(100, 'TOP_UP')}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50"
                 >
                    {isProcessing ? 'Processing...' : 'Add Funds'}
                 </button>
                 <button className="px-4 py-2 border border-white/10 text-white text-xs font-bold rounded hover:bg-white/5 transition-all">
                    Settle Dues
                 </button>
              </div>
            </div>

            {/* Financial Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Cost Summary Card */}
              <div className="md:col-span-3 bg-[#000000] border border-white/10 rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Current Month Accrual</h3>
                   <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Real-time</span>
                </div>
                <div className="flex items-baseline space-x-3">
                   <div className="text-5xl font-light text-white">${stats.unbilled.toFixed(2)}</div>
                   <div className="text-sm text-gray-500">USD</div>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-4">
                   <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-500 font-medium uppercase tracking-tight">Settlement Threshold</span>
                      <span className="text-gray-300 font-mono">${stats.threshold.toLocaleString()}</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.unbilled / stats.threshold) * 100}%` }}
                        className="h-full bg-blue-500"
                      />
                   </div>
                   <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-wider">
                      Handshake will automatically trigger at 100% threshold or Sunday 23:59 IST.
                   </p>
                </div>
              </div>

              {/* Status Sidebars */}
              <div className="space-y-6">
                 <div className="bg-[#000000] border border-white/10 rounded-lg p-5 space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Registry Balance</h3>
                    <div className="text-2xl font-light text-white">${stats.balance.toFixed(2)}</div>
                    <div className="flex items-center text-[10px] text-emerald-400 font-bold">
                       <ShieldCheck size={12} className="mr-1.5" /> AG-SECURED
                    </div>
                 </div>
                 <div className="bg-[#000000] border border-white/10 rounded-lg p-5 space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fleet Compliance</h3>
                    <div className="text-2xl font-light text-white">{stats.insurability}%</div>
                    <div className="flex items-center text-[10px] text-gray-500 font-medium">
                       Based on NIST-2026 Audit
                    </div>
                 </div>
              </div>
            </div>

            {/* Detailed Transaction Ledger (The "Google" Table) */}
            <div className="bg-[#000000] border border-white/10 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-sm font-semibold text-white">Financial Audit Trail</h3>
                 <div className="flex items-center space-x-4">
                    <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                       <Filter size={16} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                       <Download size={16} />
                    </button>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Event ID</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4 text-right">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px] font-medium">
                    {stats.transactions.map((tx, i) => (
                      <tr 
                        key={tx.id} 
                        className={cn(
                          "border-b border-white/5 transition-colors hover:bg-white/[0.02]",
                          i === stats.transactions.length - 1 && "border-0"
                        )}
                      >
                        <td className="px-6 py-4 font-mono text-gray-400">{tx.id}</td>
                        <td className="px-6 py-4">
                           <div className="text-gray-200">{tx.type}</div>
                           <div className="text-[10px] text-gray-600 font-mono mt-0.5">{tx.hash}</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center justify-center">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase",
                                tx.status === 'SETTLED' ? "bg-gray-400/10 text-gray-400" : "bg-blue-500/10 text-blue-400"
                              )}>
                                ● {tx.status}
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
              <div className="px-6 py-4 bg-white/[0.01] flex items-center justify-between text-[11px] text-gray-600">
                 <div className="flex items-center space-x-6">
                    <span>Rows per page: 10</span>
                    <span>1-4 of 1250</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <button className="p-1 hover:text-white disabled:opacity-30" disabled>Previous</button>
                    <button className="p-1 hover:text-white">Next</button>
                 </div>
              </div>
            </div>

            {/* Compliance Footnote */}
            <div className="flex items-start space-x-4 p-6 bg-blue-500/5 border border-blue-500/10 rounded-lg">
               <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
               <div className="space-y-1">
                 <h4 className="text-[12px] font-bold text-blue-300">Institutional Notice</h4>
                 <p className="text-[11px] text-blue-200/60 leading-relaxed">
                   Sovereign AG billing cycles are governed by the SVTP v1.0 root authority. 
                   All financial settlements are cryptographically linked to the protocol ledger for audit compliance. 
                   Unbilled liabilities exceeding the threshold will trigger an immediate settlement handshake to preserve registry availability.
                 </p>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
