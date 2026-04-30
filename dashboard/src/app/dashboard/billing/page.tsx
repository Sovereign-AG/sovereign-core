"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Receipt, TrendingUp, ShieldCheck, 
  ArrowUpRight, Download, Activity, Landmark, History, DollarSign, Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BillingNexus() {
  const router = useRouter();
  const [stats, setStats] = useState({
    balance: 499.94,
    unbilled: 0,
    totalSpent: 0.12,
    threshold: 1000,
    transactions: [
      { id: 'TX-4921', date: 'Just Now', type: 'Action Resolution', amount: -0.01, status: 'Settled' },
      { id: 'TX-4920', date: 'Just Now', type: 'Action Resolution', amount: -0.01, status: 'Settled' },
      { id: 'TX-4919', date: '1m ago', type: 'Network Pulse', amount: -0.0001, status: 'Settled' },
      { id: 'TX-PROT-001', date: 'Genesis', type: 'Trial Credit Allocation', amount: 10.00, status: 'Injected' },
      { id: 'TX-INIT-000', date: 'Genesis', type: 'Initial Protocol Identity', amount: 490.00, status: 'Confirmed' },
    ]
  });
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, ledgerRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/billing/ledger')
        ]);
        
        const statsData = await statsRes.json();
        const ledgerData = await ledgerRes.json();

        if (statsData.success) {
          setStats(prev => ({
            ...prev,
            balance: statsData.balance || 499.94,
            unbilled: statsData.unbilledAssessments || 0,
            threshold: statsData.settlementThreshold || 1000,
            freeSlots: statsData.freeSlots ?? 5
          }));
        }

        if (ledgerData.success) {
          setStats(prev => ({
            ...prev,
            transactions: ledgerData.transactions
          }));
        }

        const pmRes = await fetch('/api/billing/payment-method');
        const pmData = await pmRes.json();
        if (pmData.success) {
          setPaymentMethod(pmData.paymentMethod);
        }
      } catch (e) {
        console.error("Failed to load billing data", e);
      }
    };
    
    loadData();
    const interval = setInterval(loadData, 10000); // Polling every 10s for "Real-time" feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800">
      
      <div className="max-w-6xl mx-auto px-8 py-16">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
           <div className="space-y-2">
              <Link href="/dashboard" className="group inline-flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors mb-4">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Return to Dashboard
              </Link>
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Billing & Credits
              </h1>
              <p className="text-zinc-400 text-sm max-w-xl">
                 Manage your organization's credits, settlement thresholds, and institutional invoices.
              </p>
           </div>
           
           <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-sm font-medium text-emerald-400">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                 <span>Real-time Settlement Active</span>
              </div>
              <button 
                onClick={() => {
                  const blob = new Blob([`SOVEREIGN AG INVOICE\nDate: ${new Date().toLocaleDateString()}\nBalance: $${stats.balance}\nUnbilled: $${stats.unbilled}`], { type: 'text/plain' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Sovereign_Invoice_${Date.now()}.txt`;
                  a.click();
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <Download size={16} />
                <span>Download Invoice</span>
              </button>
           </div>
        </div>

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
           
           {/* Current Liabilities */}
           <div className="bg-black border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between h-[180px] shadow-sm">
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <span className="text-sm font-medium text-zinc-400">Accrued Liabilities</span>
                    <div className="text-4xl font-semibold tracking-tight text-white">
                       ${stats.unbilled.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                 </div>
                 <div className="p-2 bg-zinc-950 border border-zinc-900 rounded-lg text-zinc-400">
                    <History size={20} />
                 </div>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-900">
                  <Link 
                    href="/dashboard/checkout"
                    className="text-sm font-medium text-white hover:text-zinc-300 transition-colors flex items-center"
                  >
                     Settle Now <ArrowUpRight size={16} className="ml-1" />
                  </Link>
              </div>
           </div>

           {/* Burn Rate */}
           <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between h-[180px] shadow-sm">
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <span className="text-sm font-medium text-zinc-400">Unbilled Assessments</span>
                    <div className="text-4xl font-semibold tracking-tight text-white">
                       ${stats.unbilled.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                 </div>
                 <div className="p-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-400">
                    <TrendingUp size={20} />
                 </div>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex justify-between items-center text-sm text-zinc-400">
                 <span>Settlement Threshold</span>
                 <span className="font-medium text-zinc-200">${stats.threshold.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
           </div>

           {/* Genesis Subsidy Status */}
           <div className="bg-black border border-zinc-900 p-6 rounded-2xl flex flex-col justify-between h-[180px] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <ShieldCheck size={48} className="text-emerald-500" />
              </div>
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <span className="text-sm font-medium text-zinc-400">Genesis Subsidized Slots</span>
                    <div className="text-3xl font-black tracking-tight text-white">
                        {5 - (stats.freeSlots ?? 5)} / 5
                    </div>
                 </div>
                 <div className="p-2 bg-zinc-950 border border-zinc-900 rounded-lg text-emerald-500/80">
                    <Activity size={20} />
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${((5 - (stats.freeSlots ?? 5)) / 5) * 100}%` }} />
                 </div>
                 <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-mono">
                    <span>Slots Remaining</span>
                    <span className="text-zinc-300">{stats.freeSlots ?? 5} Available</span>
                 </div>
              </div>
           </div>

        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Transaction History */}
            <div className="lg:col-span-2 space-y-6">
               <h2 className="text-lg font-semibold text-white">Audit Ledger</h2>
               <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-900/80 border-b border-zinc-800/80 text-zinc-400 font-medium">
                      <tr>
                        <th className="px-6 py-4">Transaction ID</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Agent DID</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {stats.transactions.map((tx, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-zinc-500">{tx.id}</td>
                          <td className="px-6 py-4 text-zinc-200">{tx.type}</td>
                          <td className="px-6 py-4 font-mono text-[11px] text-zinc-500">{tx.did || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center text-xs font-medium text-zinc-400">
                              <span className={`w-1.5 h-1.5 rounded-full mr-2 ${tx.amount > 0 ? 'bg-emerald-500' : 'bg-zinc-500'}`}></span>
                              {tx.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-right font-medium font-mono ${tx.amount > 0 ? 'text-emerald-400' : 'text-zinc-100'}`}>
                              {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(4)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/30 text-center">
                    <button className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                      View All Transactions
                    </button>
                  </div>
               </div>
            </div>

            {/* Sidebar: Bridge Access */}
            <div className="space-y-6">
               <div className="bg-black border border-zinc-900 p-8 rounded-2xl flex flex-col shadow-sm relative overflow-hidden">
                  {isConnecting && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-6 space-y-4">
                       <Activity className="text-emerald-500 animate-spin" size={32} />
                       <div className="space-y-1">
                          <p className="text-sm font-bold text-white uppercase tracking-widest">Connecting Bridge</p>
                          <p className="text-[10px] text-zinc-500 font-mono">ENFORCING NIST-800-218 SECURE CHANNEL...</p>
                       </div>
                    </div>
                  )}
                  
                  <div className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-zinc-100 w-fit mb-6">
                     <CreditCard size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Institutional Settlement Rail</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                     Proprietary corporate settlement gateway for high-density agent fleets. Activates NIST-compliant 30-day post-paid tax reconciliation.
                  </p>

                  <div className="space-y-4">
                     {paymentMethod ? (
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                              <ShieldCheck className="text-emerald-500" size={18} />
                              <div>
                                 <p className="text-xs font-bold text-white uppercase tracking-tight">Handshake Verified</p>
                                 <p className="text-[10px] text-zinc-500">•••• {paymentMethod.last4}</p>
                              </div>
                           </div>
                           <button onClick={() => alert("Contact treasury for bridge revocation.")} className="text-[10px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-widest">Manage</button>
                        </div>
                     ) : (
                        <button 
                          onClick={() => {
                            setIsConnecting(true);
                            setTimeout(() => {
                              setIsConnecting(false);
                              router.push('/dashboard/checkout');
                            }, 1500);
                          }}
                    className={cn(
                      "w-full py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center shadow-lg active:scale-[0.98]",
                      paymentMethod ? "bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-default" : "bg-white text-black hover:bg-zinc-200 shadow-white/5"
                    )}
                  >
                     {paymentMethod ? 'Bridge Authorized' : 'Authorize Protocol Handshake'}
                     {!paymentMethod && <ArrowUpRight size={18} className="ml-2" />}
                  </button>
                     )}
                     <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest font-mono">Handshake Required for Agent #6+</p>
                  </div>
               </div>
            </div>

        </div>

      </div>
    </div>
  );
}
