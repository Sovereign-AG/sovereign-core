"use client";

import React, { useState, useEffect } from 'react';
import StandardDoc from '@/components/StandardDoc';
import { DollarSign, TrendingUp, Clock, CreditCard, PieChart, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BillingPortalPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    projectedMonthlyRevenue: 0,
    usageLedgerCount: 0,
    verifiedOrgs: 0
  });
  const [ledger, setLedger] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ledgerRes, pricingRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/agent/list'), // We'll need a better ledger API, but for now I'll mock the ledger view or fetch it
          fetch('/api/v1/pricing') // Assuming this exists or I'll just use the DB
        ]);
        
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats({
            totalRevenue: statsData.totalRevenue,
            projectedMonthlyRevenue: statsData.projectedMonthlyRevenue,
            usageLedgerCount: statsData.usageLedgerCount,
            verifiedOrgs: statsData.verifiedOrgs
          });
        }

        // Fetch the raw ledger from a dedicated endpoint (I'll create /api/billing/ledger)
        const ledgerFetch = await fetch('/api/billing/ledger');
        const ledgerData = await ledgerFetch.json();
        if (ledgerData.success) {
          setLedger(ledgerData.ledger);
          setPricing(ledgerData.pricing_rules);
        }
      } catch (err) {
        console.error("Billing fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const sections = [
    { id: 'overview', label: '1.0 Financial Overview' },
    { id: 'pricing', label: '2.0 Active Pricing Standards' },
    { id: 'history', label: '3.0 Usage Ledger (Live)' },
  ];

  return (
    <StandardDoc 
      title="Institutional Billing Portal"
      subtitle="The clinical root of financial transparency. Monitor metered usage and automated invoice projections."
      lastUpdated="Live Synchronization Active"
      titleIcon={<DollarSign size={24} className="text-slate-900" />}
      sections={sections}
    >
      <section id="overview">
        <h3 className="flex items-center"><PieChart size={20} className="mr-3 text-slate-400" /> 1.0 Current Allocation</h3>
        <p className="mb-10">
          Sovereign AG operates as a pre-paid metered utility. Below is the live aggregation of your unbilled autonomous activity across all registered DIDs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-slate-900 text-white rounded-[1.5rem] p-8 space-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <CreditCard size={64} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Unbilled Value</div>
              <div className="text-4xl font-black tracking-tight">${stats.totalRevenue.toFixed(2)}</div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-tight">Settled on Registry Chain</div>
           </div>

           <div className="bg-white border border-slate-200 rounded-[1.5rem] p-8 space-y-2 group shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimated Next Invoice</div>
              <div className="text-4xl font-black tracking-tight text-slate-900">${stats.projectedMonthlyRevenue.toFixed(2)}</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tight flex items-center">
                 <TrendingUp size={12} className="mr-1 text-blue-500" /> 30-Day Velocity Projection
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-[1.5rem] p-8 space-y-2 group shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Metered Handshakes</div>
              <div className="text-4xl font-black tracking-tight text-slate-900">{stats.usageLedgerCount}</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-tight flex items-center">
                 <Activity size={12} className="mr-1 text-emerald-500" /> Live Protocol Throughput
              </div>
           </div>
        </div>
      </section>

      <section id="pricing">
        <h3 className="flex items-center"><ShieldCheck size={20} className="mr-3 text-slate-400" /> 2.0 Active Pricing Rules</h3>
        <p>
          These rules are cryptographically bound to the authentication handshake. All costs are in USD and settled at the moment of verification.
        </p>
        
        <div className="my-8 overflow-hidden rounded-2xl border border-slate-200">
           <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Event Type</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Unit Cost</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Protocol Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {pricing.map((rule, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                             <div className="p-2 bg-slate-900 rounded-lg text-emerald-400">
                                {rule.event_type === 'MINT' ? <div className="w-3 h-3 border-2 border-current rounded-full" /> : 
                                 rule.event_type === 'ACTION' ? <Activity size={12} /> : <Clock size={12} />}
                             </div>
                             <span className="font-bold text-slate-900">{rule.event_type}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <span className="font-mono font-bold text-slate-900">${rule.cost.toFixed(4)}</span>
                          <span className="text-[10px] text-slate-400 ml-2">/ event</span>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[9px] font-black uppercase tracking-widest">Active</span>
                       </td>
                    </tr>
                 ))}
                 {pricing.length === 0 && (
                    <tr>
                       <td colSpan={3} className="px-6 py-10 text-center text-slate-400 font-medium italic">
                          Retrieving regional pricing standards...
                       </td>
                    </tr>
                 )}
              </tbody>
           </table>
        </div>
      </section>

      <section id="history">
        <h3 className="flex items-center"><Terminal size={20} className="mr-3 text-slate-400" /> 3.0 Real-Time Usage Ledger</h3>
        <p>
          The absolute source of truth for all metered interactions. This ledger serves as the basis for automated institutional invoicing.
        </p>

        <div className="my-8 overflow-hidden rounded-2xl border border-slate-200">
           <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Agent DID</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Event</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Fee</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {ledger.slice(0, 10).map((entry, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-6 py-4 font-mono text-[11px] text-slate-400">{new Date(entry.timestamp).toLocaleString()}</td>
                       <td className="px-6 py-4 font-mono text-[11px] text-slate-900 font-bold">{entry.agent_did || entry.did}</td>
                       <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-widest">{entry.action_type || entry.type}</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <span className="font-mono font-black text-slate-900">${(entry.fee || 0).toFixed(4)}</span>
                       </td>
                    </tr>
                 ))}
                 {ledger.length === 0 && (
                    <tr>
                       <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium italic">
                          No metered activity recorded in the current billing cycle.
                       </td>
                    </tr>
                 )}
              </tbody>
           </table>
           {ledger.length > 10 && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                 + {ledger.length - 10} Additional Entries Stored in Registry
              </div>
           )}
        </div>
      </section>
    </StandardDoc>
  );
}

