"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Receipt, TrendingUp, ShieldCheck, 
  ArrowUpRight, Download, Activity, Landmark, History, DollarSign, Wallet,
  Info, AlertCircle, CheckCircle2, ChevronRight, BarChart3, FileText,
  Lock, Globe, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SovereignBilling() {
  const router = useRouter();
  const [stats, setStats] = useState({
    balance: 499.94,
    unbilled: 0,
    totalSettled: 0.12,
    threshold: 1000,
    freeSlots: 5,
    provisionedCount: 0,
    insurability: 98.4,
    transactions: [
      { id: 'TX-4921', date: 'Just Now', type: 'Action Resolution', amount: -0.01, status: 'Settled', hash: '0x8f2a...c3e1' },
      { id: 'TX-4920', date: '5m ago', type: 'Agent Pulse Tax', amount: -0.0001, status: 'Settled', hash: '0x1d4b...a9f2' },
      { id: 'TX-4919', date: '12m ago', type: 'Forensic Audit', amount: -0.01, status: 'Settled', hash: '0x9e5c...d0b4' },
      { id: 'TX-PROT-001', date: '2026-05-01', type: 'Protocol Initializer', amount: 500.00, status: 'Confirmed', hash: 'GENESIS' },
    ]
  });

  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsRes = await fetch('/api/stats');
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(prev => ({
            ...prev,
            balance: statsData.balance,
            unbilled: statsData.unbilledAssessments,
            threshold: statsData.settlementThreshold || 1000,
            totalSettled: statsData.realizedRevenue,
            provisionedCount: statsData.totalAgents
          }));
        }
      } catch (e) {}
    };
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#000] text-gray-200 font-sans selection:bg-emerald-500/30">
      
      {/* Top Professional Banner */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-600 w-full" />

      <div className="max-w-[1400px] mx-auto flex flex-col min-h-screen">
        
        {/* Navigation Header */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white">
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-[1px] bg-white/10" />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white uppercase">SVTP Billing</h1>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Institutional Ledger</span>
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Live Sync</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex items-center space-x-6 px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full">
                <div className="text-center">
                  <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Insurability Score</div>
                  <div className="text-xs font-mono font-bold text-white">{stats.insurability}%</div>
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <div className="text-center">
                  <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Protocol Version</div>
                  <div className="text-xs font-mono font-bold text-gray-400">1.0.4-S</div>
                </div>
             </div>
             <button className="px-5 py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all rounded-full shadow-lg shadow-white/5">
                Download Statements
             </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          
          {/* Sub-navigation Sidebar (Google Cloud Style) */}
          <aside className="w-64 border-r border-white/5 p-6 space-y-8 hidden lg:block">
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-4">Operations</div>
              {[
                { id: 'overview', label: 'Billing Overview', icon: LayoutDashboard },
                { id: 'methods', label: 'Payment Methods', icon: CreditCard },
                { id: 'usage', label: 'Usage Breakdown', icon: BarChart3 },
                { id: 'history', label: 'Transactions', icon: History }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center px-4 py-2.5 text-[13px] font-semibold rounded-xl transition-all",
                    activeTab === item.id ? "bg-white/5 text-white" : "text-gray-400 hover:bg-white/[0.02] hover:text-gray-200"
                  )}
                >
                  <item.icon size={16} className={cn("mr-3", activeTab === item.id ? "text-emerald-500" : "text-gray-600")} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-8 space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-4">Governance</div>
              <button className="w-full flex items-center px-4 py-2.5 text-[13px] font-semibold text-gray-400 hover:bg-white/[0.02] rounded-xl transition-all">
                <Shield size={16} className="mr-3 text-gray-600" /> Cost Controls
              </button>
              <button className="w-full flex items-center px-4 py-2.5 text-[13px] font-semibold text-gray-400 hover:bg-white/[0.02] rounded-xl transition-all">
                <FileText size={16} className="mr-3 text-gray-600" /> Tax Identity
              </button>
            </div>
          </aside>

          {/* Main Billing Content */}
          <main className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
            
            {/* Top Cards: The Google Cloud Look */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Primary: Current Costs */}
              <div className="lg:col-span-2 bg-[#050505] border border-white/5 rounded-[32px] p-10 flex flex-col md:flex-row gap-10 items-center justify-between group hover:border-white/10 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                   <Activity size={200} />
                </div>
                <div className="space-y-6 relative z-10 w-full md:w-auto">
                   <div>
                     <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Accrued Unbilled Liabilities</div>
                     <div className="text-6xl font-bold text-white tracking-tighter">
                        ${stats.unbilled.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                     </div>
                   </div>
                   <div className="flex items-center space-x-6">
                      <div className="flex items-center text-xs font-medium text-emerald-500">
                        <TrendingUp size={14} className="mr-2" /> 
                        Real-time Metering
                      </div>
                      <div className="h-4 w-[1px] bg-white/10" />
                      <div className="text-xs text-gray-400 font-medium">
                        Next Cycle: <span className="text-white">Sunday 23:59 IST</span>
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-64 space-y-6 relative z-10">
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-gray-500">Settlement Threshold</span>
                         <span className="text-white">${stats.threshold.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${Math.min((stats.unbilled / stats.threshold) * 100, 100)}%` }}
                           className={cn("h-full rounded-full transition-all duration-1000", (stats.unbilled / stats.threshold) > 0.8 ? "bg-amber-500" : "bg-emerald-500")}
                         />
                      </div>
                      <div className="text-[9px] text-gray-600 font-mono text-right">
                         {(stats.unbilled / stats.threshold * 100).toFixed(1)}% TO AUTO-DEDUCTION
                      </div>
                   </div>
                   <button 
                     onClick={() => router.push('/dashboard/checkout')}
                     className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all rounded-2xl shadow-xl shadow-white/5"
                   >
                     Force Settle Balance
                   </button>
                </div>
              </div>

              {/* Account Health */}
              <div className="bg-[#050505] border border-white/5 rounded-[32px] p-8 flex flex-col justify-between shadow-sm group hover:border-white/10 transition-all">
                 <div className="space-y-4">
                    <div className="flex justify-between items-start">
                       <div className="p-3 bg-white/5 rounded-2xl text-gray-400 group-hover:text-emerald-500 transition-colors">
                          <Globe size={24} />
                       </div>
                       <Badge type="Verified">Protocol Active</Badge>
                    </div>
                    <div className="space-y-1">
                       <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Settled</div>
                       <div className="text-3xl font-bold text-white">${stats.totalSettled.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    </div>
                 </div>
                 <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-[11px]">
                       <span className="text-gray-500">Fleet Coverage</span>
                       <span className="text-white font-bold">{stats.provisionedCount} Active Nodes</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                       <span className="text-gray-500">Billing Identity</span>
                       <span className="text-white font-bold truncate max-w-[120px]">SVTP Main Org</span>
                    </div>
                 </div>
              </div>

            </div>

            {/* Bottom Section: History & Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
               
               {/* Transaction Audit Ledger */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                     <h2 className="text-base font-bold text-white uppercase tracking-tight">Financial Audit Trail</h2>
                     <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors flex items-center">
                        View Full Ledger <ChevronRight size={14} className="ml-1" />
                     </button>
                  </div>
                  
                  <div className="bg-[#050505] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
                     <table className="w-full text-left text-[12px]">
                        <thead className="border-b border-white/5 text-gray-500 font-bold uppercase tracking-widest">
                           <tr>
                              <th className="px-8 py-5">Event ID</th>
                              <th className="px-8 py-5">Description</th>
                              <th className="px-8 py-5">Status</th>
                              <th className="px-8 py-5 text-right">Amount</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                           {stats.transactions.map((tx, i) => (
                              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                 <td className="px-8 py-5 font-mono text-gray-500 group-hover:text-gray-300 transition-colors">{tx.id}</td>
                                 <td className="px-8 py-5">
                                    <div className="text-white font-medium">{tx.type}</div>
                                    <div className="text-[10px] text-gray-600 mt-0.5 font-mono">{tx.hash}</div>
                                 </td>
                                 <td className="px-8 py-5">
                                    <div className="flex items-center">
                                       <div className={cn("w-1.5 h-1.5 rounded-full mr-2", tx.amount > 0 ? "bg-emerald-500" : "bg-gray-500")} />
                                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{tx.status}</span>
                                    </div>
                                 </td>
                                 <td className={cn("px-8 py-5 text-right font-mono font-bold text-sm", tx.amount > 0 ? "text-emerald-500" : "text-white")}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: tx.amount < 0.01 ? 4 : 2 })}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Institutional Settlement Rail */}
               <div className="space-y-6">
                  <h2 className="text-base font-bold text-white uppercase tracking-tight">Settlement Rail</h2>
                  <div className="bg-[#050505] border border-white/5 rounded-[32px] p-8 space-y-8 relative overflow-hidden group shadow-sm">
                     <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-white">
                        <Lock size={120} />
                     </div>
                     
                     <div className="space-y-4 relative z-10">
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                           Connect an Institutional Settlement Method to enable automatic weekly deductions and high-volume agent provisioning.
                        </p>
                        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl space-y-3">
                           <div className="flex items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
                              <Info size={12} className="mr-2" /> Compliance Requirement
                           </div>
                           <p className="text-[10px] text-gray-400 leading-relaxed uppercase">
                              NIST-800-218 mandates an active financial anchor for agent fleets exceeding 5 units.
                           </p>
                        </div>
                     </div>

                     <div className="space-y-4 relative z-10">
                        {isConnecting ? (
                           <div className="w-full py-12 flex flex-col items-center justify-center space-y-4">
                              <Activity className="text-emerald-500 animate-spin" size={32} />
                              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] animate-pulse">Establishing Secure Channel...</div>
                           </div>
                        ) : (
                           <>
                             <button 
                               onClick={() => {
                                 setIsConnecting(true);
                                 setTimeout(() => {
                                   setIsConnecting(false);
                                   router.push('/dashboard/checkout');
                                 }, 1500);
                               }}
                               className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all rounded-2xl flex items-center justify-center shadow-xl"
                             >
                               <PlusCircle size={16} className="mr-2" /> Add Settlement Method
                             </button>
                             <div className="flex items-center justify-center space-x-4 opacity-30 transition-all cursor-not-allowed">
                               <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Supported:</span>
                               <Landmark size={18} />
                               <div className="font-bold text-sm italic uppercase tracking-tighter">Sovereign Direct</div>
                             </div>
                           </>
                        )}
                     </div>
                  </div>

                  {/* Budget Alert Small Card */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center">
                           <AlertCircle size={14} className="mr-2" /> Threshold Warning
                        </div>
                        <div className="text-[10px] font-bold text-emerald-500 uppercase">Active</div>
                     </div>
                     <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                        You will receive an encrypted notification when unbilled usage exceeds <span className="text-white font-bold">$800.00</span> (80% of threshold).
                     </p>
                  </div>
               </div>

            </div>

          </main>
        </div>

      </div>
    </div>
  );
}

// Reuse components from page.tsx or local versions
function Badge({ children, type = 'Default' }: { children: React.ReactNode, type?: string }) {
  const colors: Record<string, string> = {
    'Verified': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Critical': 'bg-red-500/10 text-red-500 border-red-500/20',
    'Warning': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Default': 'bg-white/5 text-gray-400 border-white/10'
  };
  return (
    <span className={cn("px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border", colors[type] || colors.Default)}>
      {children}
    </span>
  );
}

function PlusCircle({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  );
}


