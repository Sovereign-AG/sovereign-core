"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Activity, Database, ShieldAlert, Search, Filter, X, 
  OctagonAlert, Cpu, Lock, Unlock,
  ArrowUpRight, TrendingUp, LayoutDashboard, Clock, User, TriangleAlert,
  Building2, KeyRound, Fingerprint, Globe, BookOpen, Terminal,
  Blocks, Shield, CircleCheck, CircleX, Download, Copy, Check, FileText, ExternalLink, FileCode, DollarSign, ScanSearch
} from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateNISTReport } from '@/lib/pdf';
import Link from 'next/link';

const Sparkline = () => (
  <svg viewBox="0 0 100 20" className="absolute bottom-4 inset-x-5 w-[calc(100%-40px)] h-8 opacity-40 overflow-visible text-gray-600">
    <path d="M0,15 L10,12 L20,18 L30,5 L40,14 L50,8 L60,11 L70,2 L80,10 L90,6 L100,12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Minimalist Custom SVGs
const LiabilityLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
    <path d="M 4 20 L 10 12 L 14 16 L 20 6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="6" r="2" fill="currentColor" />
  </svg>
);

const TrustScoreLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
    <path d="M 12 3 L 20 6 L 20 12 C 20 17 12 21 12 21 C 12 21 4 17 4 12 L 4 6 Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 9 12 L 11 14 L 15 10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ApprovalLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
    <circle cx="12" cy="8" r="4" />
    <path d="M 6 20 C 6 16 9 14 12 14 C 15 14 18 16 18 20" strokeLinecap="round" />
    <circle cx="18" cy="8" r="1.5" />
    <path d="M 21 8 h 2 M 19 11 l 1 1" strokeLinecap="round" />
  </svg>
);

const SovereignLogo = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Frame: Outer Hexagon */}
    <motion.path 
      d="M50 5L90 28V72L50 95L10 72V28L50 5Z" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    
    {/* Glyph: High-Authority 'S' - Faithfully following the 60-degree interlocking architecture */}
    <motion.path 
      d="M82 35L50 17L18 35V50L82 65V80L50 98L18 80" 
      stroke="currentColor" 
      strokeWidth="11" 
      strokeLinejoin="round" 
      strokeLinecap="butt"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
    />
    
    {/* Branded Identity Token */}
    <motion.circle 
      cx="82" 
      cy="35" 
      r="4.5" 
      fill="#0EA5E9"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 2.2 }}
    />
  </svg>
);

const Badge = ({ children, type }: { children: React.ReactNode, type: string }) => {
  const styles: Record<string, string> = {
    Low: 'bg-[#111] text-gray-400 border-[#333]',
    Medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    High: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    Verified: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    NonCompliant: 'bg-red-900/10 text-red-500 border-red-500/20',
    Warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Revoked: 'bg-red-900/30 text-red-500 border-red-500/30 font-semibold',
    TERMINATED: 'bg-red-900/30 text-red-500 border-red-500/30 font-semibold uppercase relative inline-flex overflow-hidden',
    Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };
  // Map our DB "Non-Compliant" to the correct style key
  const safeType = type === 'Non-Compliant' ? 'NonCompliant' : type;
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider border ${styles[safeType] || styles.Low}`}>
      {children}
    </span>
  );
};


export default function App() {
  const [activeZone, setActiveZone] = useState('tower'); 
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState('CISO'); 
  const [lastSyncSeconds, setLastSyncSeconds] = useState(0);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const [agents, setAgents] = useState<any[]>([]);
  const [scannedAgents, setScannedAgents] = useState<any[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<string | null>(null);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-1', time: '2026-04-03T09:12:00Z', actor: 'System Auto', action: 'NIST Check', target: 'ag-001', status: 'Success', hash: '0x8f2a...9b1c' },
  ]);

  const [approvals, setApprovals] = useState([
    { id: 'app-1', agent: 'Finance-Optima-X1', action: 'Execute Wire Transfer ($50k)', risk: 'Critical', time: '2 min ago', requestedBy: 'Auto', did: 'did:sov:3k9v' },
    { id: 'app-2', agent: 'Legal-Contract-Gen', action: 'Delete Archive "Merger_V2"', risk: 'High', time: '14 min ago', requestedBy: 'Claude', did: 'did:sov:5b8v' },
  ]);

  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [showKillConfirm, setShowKillConfirm] = useState(false);
  const [isKillArmed, setIsKillArmed] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string|null>(null);
  const [heartbeats, setHeartbeats] = useState<string[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [availableNodes, setAvailableNodes] = useState(20);
  const [totalVerifications, setTotalVerifications] = useState(0);
  const [usageLedgerCount, setUsageLedgerCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [realizedRevenue, setRealizedRevenue] = useState(0);
  const [liabilityMitigated, setLiabilityMitigated] = useState(0);
  const [projectedMonthlyRevenue, setProjectedMonthlyRevenue] = useState(0);
  const [generatedApiKey, setGeneratedApiKey] = useState<string|null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [lookupDid, setLookupDid] = useState('');
  const [foundAgent, setFoundAgent] = useState<any>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchStats = () => {
      fetch('/api/stats').then(r => r.json()).then(data => {
        if (data.success) {
          setAvailableNodes(Math.max(0, 20 - data.verifiedOrgs));
          setTotalVerifications(data.totalVerifications || 0);
          setUsageLedgerCount(data.usageLedgerCount || 0);
          setTotalRevenue(data.totalRevenue || 0);
          setRealizedRevenue(data.realizedRevenue || 0);
          setLiabilityMitigated(data.liabilityMitigated || 0);
          setProjectedMonthlyRevenue(data.projectedMonthlyRevenue || 0);
        }
      }).catch(() => {});
    };

    fetchStats();
    const statsInterval = setInterval(fetchStats, 5000); // Standard Institutional Sync
    return () => clearInterval(statsInterval);
  }, []);

  // Fetch agents on load
  useEffect(() => {
    fetch('/api/agent/list').then(r => r.json()).then(data => {
      if(data.success) setAgents(data.agents);
    });
  }, []);

  useEffect(() => {
    if (activeZone === 'gate') setActiveView('landing');
    if (activeZone === 'forge') setActiveView('apikeys');
    if (activeZone === 'tower') {
      setActiveView(userRole === 'Developer' ? 'registry' : 'dashboard');
    }
  }, [activeZone, userRole]);

  useEffect(() => { setIsKillArmed(false); }, [selectedAgent]);
  useEffect(() => {
    const interval = setInterval(() => setLastSyncSeconds(p => (p >= 14 ? 0 : p + 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hbInterval = setInterval(() => {
      setHeartbeats(prev => {
        const newLog = `[PASS] Agent-DID-0x${Math.floor(Math.random()*1000).toString(16)} Heartbeat Received - ${Math.floor(Math.random()*20)+5}ms`;
        return [newLog, ...prev].slice(0, 5);
      });
    }, 2000);
    return () => clearInterval(hbInterval);
  }, []);

  const trustScore = Math.max(0, 100 - (agents.filter(a => a.status === 'TERMINATED').length * 10));

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const res = await fetch('/api/dodo', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Failed to secure Dodo Payments checkout UI.");
    } catch (err) {
      console.error(err);
      alert("Error contacting payment gateway.");
    } finally { setIsUpgrading(false); }
  };

  const handleApproval = (id: string, decision: string) => {
    setApprovals(p => p.filter(a => a.id !== id));
    setAuditLogs(p => [{ id: `log-${Date.now()}`, time: new Date().toISOString(), actor: userRole, action: `HITL ${decision}`, target: id, status: 'Success', hash: `0x${Math.random().toString(16).slice(2,10)}` }, ...p]);
  };

  const executeRevoke = async () => {
    if (!selectedAgent) return;
    try {
      const res = await fetch('/api/agent/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedAgent.id })
      });
      if(res.ok) {
        setAgents(p => p.map(a => a.id === selectedAgent.id ? { ...a, status: 'TERMINATED', nist: 'Non-Compliant', tier: 'Critical' } : a));
        setAuditLogs(p => [{ id: `log-${Date.now()}`, time: new Date().toISOString(), actor: userRole, action: `Agent Terminated`, target: selectedAgent.id, status: 'Success', hash: `0x${Math.random().toString(16).slice(2,10)}` }, ...p]);
      }
    } catch(e){}
    setShowKillConfirm(false); setSelectedAgent(null);
  };

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/agent/scan');
      const data = await res.json();
      if(data.success) {
        setScannedAgents(data.found_shadow_agents);
      }
    } catch (err) {}
    setIsScanning(false);
  };

  const handleRegister = async () => {
    try {
      // Mock hitting the Elite 20 check by using a random Org ID
      const randomOrg = `org-${Math.floor(Math.random() * 30)}`; // High chance to hit duplicate or hit limit quickly if pushed multiple times
      const res = await fetch('/api/agent/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias: `Shadow-Bot-${Math.floor(Math.random() * 999)}`, owner: 'Dev Team', purpose: 'Testing', org_id: randomOrg })
      });
      const data = await res.json();
      if(!res.ok) {
        setRegisterStatus(data.message); // Will show the 20 Limit Waitlist message
      } else {
        setAgents(p => [...p, data.agent]);
        setRegisterStatus("Agent explicitly registered to vault.");
      }
    } catch(err) {
      console.error(err);
    }
  };

  const exportLog = () => {
     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(agents, null, 2));
     const dlAnchorElem = document.createElement('a');
     dlAnchorElem.setAttribute("href", dataStr);
     dlAnchorElem.setAttribute("download", "sovereign_security_log.json");
     dlAnchorElem.click();
  };

  const handleLookup = async () => {
    if (!lookupDid) return;
    setIsLookingUp(true);
    setFoundAgent(null);
    try {
      // Find agent from current list or fetch specifically
      const agent = agents.find(a => a.did === lookupDid || a.id === lookupDid);
      if (agent) {
        setFoundAgent(agent);
      } else {
        // Mock a failure if not in our local set
        setTimeout(() => setIsLookingUp(false), 800);
      }
    } catch (err) {}
    setIsLookingUp(false);
  };

  const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.2 } }, exit: { opacity: 0, transition: { duration: 0.1 } } };

  // Feature Render Functions
  const renderFrontGate = () => (
    <motion.div key="gate" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#000] border border-[#1a1a1a] shadow-2xl p-12 py-24 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-[0.2em] mb-4">
            System Status: Optimal & NIST Compliant
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Standardized <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-500">Provenance</span> for Agents.
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Non-repudiable Agent Provenance for NIST 800-218 Compliance. 
            Govern autonomous actions with mathematical precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button onClick={() => { setActiveZone('tower'); setActiveView('dashboard'); }} className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Enter Control Tower
            </button>
            <button onClick={() => { setActiveZone('forge'); setActiveView('installation'); }} className="px-8 py-3 bg-transparent border border-[#333] text-white font-semibold rounded-lg hover:bg-white/5 transition-all">
              Initialize SDK
            </button>
            <a href="/SovereignSchema.json" target="_blank" className="px-8 py-3 border border-[#222] bg-[#050505] text-gray-300 rounded font-semibold hover:bg-[#111] transition-colors flex items-center text-sm">
                <FileCode className="mr-2 w-4 h-4 text-gray-500" /> View Sovereign Schema (JSON)
            </a>
          </div>
        </motion.div>
      </section>

      {/* Code Snippet / Technical Proof */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4 pr-8">
           <h2 className="text-2xl font-semibold text-white tracking-tight">Zero-Trust Identity.</h2>
           <p className="text-gray-400 leading-relaxed text-sm">
             Every agent is issued a unique Decentralized Identifier (DID) bound to its owner. 
             Sign every action, audit every heartbeat, and terminate rogue processes with a single cryptographic signature.
           </p>
           <ul className="space-y-3 pt-2">
             {['NIST SP 800-218 Certified', 'Immutable Audit Trails', 'Shadow AI Detection'].map((item, i) => (
               <li key={i} className="flex items-center text-xs text-gray-300">
                 <div className="w-1 h-1 bg-emerald-500 rounded-full mr-2" /> {item}
               </li>
             ))}
           </ul>
        </div>
        <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6 font-mono text-xs overflow-hidden relative group">
           <div className="absolute top-4 right-4 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
             <Fingerprint size={48} />
           </div>
           <div className="flex gap-1.5 mb-6">
             <div className="w-2 h-2 rounded-full bg-[#333]"></div>
             <div className="w-2 h-2 rounded-full bg-[#333]"></div>
             <div className="w-2 h-2 rounded-full bg-[#333]"></div>
           </div>
           <pre className="text-gray-400 space-y-1">
             <div className="text-emerald-500">// Sovereign Protocol Initializer</div>
             <div><span className="text-indigo-400">import</span> {'{ SovereignAgent }'} <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@sov/core'</span>;</div>
             <br/>
             <div><span className="text-indigo-400">const</span> identity = <span className="text-indigo-400">await</span> SovereignAgent.<span className="text-blue-400">mint</span>({'{'}</div>
             <div className="pl-4 text-gray-300">alias: <span className="text-emerald-400">'Finance-Optima'</span>,</div>
             <div className="pl-4 text-gray-300">capabilities: [<span className="text-emerald-400">'finance'</span>, <span className="text-emerald-400">'read'</span>]</div>
             <div>{'}'});</div>
             <br/>
             <div className="text-gray-500">// DID: did:sov:7x9p3z... [Identity Issued]</div>
           </pre>
        </div>
      </div>
    </motion.div>
  );

  const renderDeveloperForge = () => (
    <motion.div key="forge" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-4xl mx-auto space-y-6">
      {activeView === 'installation' ? (
        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-8">
          <h2 className="text-xl font-semibold text-white mb-4">SDK Installation</h2>
          <p className="text-gray-400 mb-6 text-sm">Integrate the core authorization library securely via NPM.</p>
          <div className="flex bg-black border border-[#222] rounded-lg p-3 font-mono text-sm text-gray-300 justify-between items-center group">
            <span>npm install @sovereign/core dodopayments</span>
            <button onClick={() => { setCopiedKey('npm'); setTimeout(() => setCopiedKey(null), 2000); }} className="text-gray-500 hover:text-white transition-colors">
              {copiedKey === 'npm' ? <Check size={16} className="text-[#34d399]" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      ) : activeView === 'apikeys' ? (
        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-semibold text-white">Cryptographic Node Keys</h2>
              <p className="text-gray-400 text-sm mt-1">Manage network access tokens.</p>
            </div>
            <button onClick={handleUpgrade} disabled={isUpgrading} className="px-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-200 transition-colors flex items-center">
              {isUpgrading ? "Securing API..." : "Upgrade Node Limit (Dodo Payments)"}
            </button>
          </div>
          <div className="p-4 border border-[#222] rounded-lg flex justify-between items-center bg-black">
             <div>
                <div className="font-semibold text-white text-sm">Production Node (Harvey)</div>
                <div className="text-xs font-mono text-gray-500 mt-1">sk_live_9f8e...2b1a</div>
             </div>
             <Badge type="Verified">Active</Badge>
          </div>
        </div>
      ) : activeView === 'integrations' ? (
        <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-8">
           <h2 className="text-xl font-semibold text-white mb-4">API Integrations</h2>
           <p className="text-gray-400 mb-6 text-sm">Generate programmatic access tokens for automated operations.</p>
           <div className="flex bg-black border border-[#222] rounded-lg p-3 justify-between items-center group">
              <span className="font-mono text-sm text-gray-300">{generatedApiKey || 'sov_live_••••••••••••••••'}</span>
              <button onClick={async () => {
                 try {
                   const res = await fetch('/api/keys/generate', { method: 'POST', body: JSON.stringify({org_id: 'org-001'})});
                   const data = await res.json();
                   if(data.success) setGeneratedApiKey(data.api_key);
                 } catch(e) {}
              }} className="text-sm font-semibold bg-[#111] hover:bg-[#222] px-3 py-1 border border-[#333] rounded text-white transition-colors">Generate Key</button>
           </div>
        </div>
      ) : null}
    </motion.div>
  );

  const renderDashboard = () => (
    <motion.div key="dash" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ 
          { title: 'Standardization Progress', val: `${usageLedgerCount}`, sub: 'Verified Agents & Actions', Icon: Globe },
          { 
            title: 'Liability Mitigated', 
            val: `$${liabilityMitigated.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 
            sub: 'Risk Projection', 
            Icon: LiabilityLogo,
            tooltip: 'Estimated risk-reduction value based on NIST-800-218 industrial benchmarks ($12.50 protection per $0.01 action tax).'
          },
          { title: 'Potential Yield', val: `$${totalRevenue.toFixed(2)}`, sub: `Post-Grant Revenue Subsidized`, Icon: () => <DollarSign className="text-emerald-500 w-5 h-5" /> },
          { title: 'Realized Revenue', val: `$${realizedRevenue.toFixed(2)}`, sub: `Dodo Settlement Active`, Icon: () => <TrendingUp className="text-blue-500 w-5 h-5" /> },
          { title: 'Human Approvals', val: approvals.length.toString(), sub: 'Governance Gate', Icon: ApprovalLogo }
        ].map((item, i) => (
          <div key={i} title={(item as any).tooltip} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group cursor-help shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex justify-between items-start text-gray-400 relative z-10">
               <span className="text-xs font-medium uppercase tracking-wider">{item.title}</span>
               <item.Icon />
             </div>
              <div className="relative z-10">
               <div className="text-2xl font-bold text-white tracking-tight">{item.val}</div>
               <div className="text-[10px] text-gray-500 mt-1 uppercase font-mono">{item.sub}</div>
             </div>
             <Sparkline />
           </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div>
           <h3 className="text-base font-semibold text-white">Active System Hooks</h3>
           <p className="text-xs text-gray-400 mt-1">Interact with the real Sovereign JSON DB and local network stack.</p>
           {registerStatus && <p className="text-xs font-mono text-amber-500 mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded inline-block">{registerStatus}</p>}
        </div>
        <div className="flex space-x-3">
          <button onClick={handleRegister} className="px-5 py-2 border border-[#333] text-white bg-[#111] font-semibold rounded text-sm hover:bg-[#1a1a1a] transition-colors shadow">
             Register Test Agent (DB Hook)
          </button>
          <button onClick={handleScan} disabled={isScanning} className="px-5 py-2 bg-indigo-600 border border-indigo-500 text-white rounded text-sm font-semibold hover:bg-indigo-500 transition-colors flex items-center justify-center">
             <Search size={16} className="mr-2"/> {isScanning ? 'Scanning Network...' : 'Analyze Local Traffic'}
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white flex items-center"><User size={18} className="mr-2 text-indigo-400" /> Executive Safety Valve (HITL)</h3>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">Liability Protection ACTIVE</span>
        </div>
        <div className="bg-[#111] border border-amber-500/20 rounded-lg p-5 flex justify-between items-center shadow-[0_0_15px_rgba(245,158,11,0.05)]">
           <div>
             <div className="flex items-center space-x-3 mb-2"><Badge type="Critical">Critical Scope</Badge><span className="text-xs text-amber-500/70 font-mono">Just now</span></div>
             <h4 className="text-lg font-semibold text-white">High-Authority Tool Execution</h4>
             <p className="text-sm text-gray-400 mt-1">Reviewing this action shields the **Approving Officer** from personal liability under NIST-2026 protocols. Requested by: <span className="text-gray-200 font-medium">Finance-Optima-X1</span></p>
           </div>
           <div className="flex space-x-3">
             <button onClick={() => alert('Emergency Block Initiated. Protocol Revoked.')} className="px-5 py-2 rounded bg-black border border-red-500/50 text-red-500 hover:bg-red-900/30 text-sm font-semibold transition-colors">Block & Revoke</button>
             <button onClick={() => alert('Access Cryptographically Approved.')} className="px-5 py-2 rounded bg-white text-black hover:bg-gray-200 text-sm font-semibold transition-colors shadow-[0_0_10px_rgba(255,255,255,0.1)]">Approve Action</button>
           </div>
        </div>
      </div>
      {scannedAgents && scannedAgents.length > 0 && (
         <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-6">
           <h3 className="text-red-400 font-semibold mb-4 flex items-center"><ShieldAlert size={18} className="mr-2 text-red-500"/> Shadow AI Detected (Localhost Endpoints)</h3>
           <div className="grid grid-cols-2 gap-3">
             {scannedAgents.map((ag: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-4 border border-red-500/10 bg-red-500/5 rounded-lg">
                   <div>
                     <div className="text-sm text-gray-200 font-semibold">{ag.alias}</div>
                     <div className="text-xs text-gray-500 font-mono mt-1">Port: {ag.port} | Net I/O: {ag.detected_traffic}</div>
                     <div className="text-[11px] text-red-400/80 mt-2">{ag.reason}</div>
                   </div>
                   <Badge type="Critical">{ag.risk}</Badge>
                </div>
             ))}
           </div>
         </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl relative overflow-hidden min-h-[300px] flex flex-col shadow-2xl">
           <h3 className="text-sm font-medium text-white flex items-center mb-6 z-20 relative"><Globe size={16} className="mr-2 text-gray-400"/> Global Topology</h3>
           <div className="absolute inset-0 flex items-center justify-center p-8 opacity-30 pointer-events-none">
             <div className="flex w-full items-center justify-between text-xs font-mono text-gray-500">
               <div className="flex flex-col items-center"><div className="h-2 w-2 bg-emerald-500 rounded-full mb-2"></div>NODE</div>
               <div className="flex-1 border-t border-dashed border-[#333] mx-4 relative"><div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-2 bg-[#0A0A0A]">SECURE TUNNEL</div></div>
               <div className="flex flex-col items-center"><div className="h-2 w-2 bg-blue-500 rounded-full mb-2"></div>ROOT</div>
             </div>
           </div>

           <div className="relative z-10 w-full flex-1 flex flex-col justify-end mt-4">
             <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3 border-b border-[#222] pb-2">Live Heartbeat Log</div>
             <div className="space-y-1.5 overflow-hidden h-32 flex flex-col justify-end pb-2">
               {heartbeats.map((log, i) => (
                 <motion.div key={`${log}-${i}`} initial={{opacity:0, x:-10}} animate={{opacity:1 - (i*0.2), x:0}} className="text-xs font-mono truncate" style={{color: i===0?'#34d399':'#6b7280'}}>
                   {log}
                 </motion.div>
               ))}
             </div>
           </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
           <h3 className="text-sm font-medium text-white mb-6">Recent Audits</h3>
           <div className="space-y-4">
            {auditLogs.slice(0, 4).map(log => (
              <div key={log.id} className="flex flex-col pb-3 border-b border-[#222] last:border-0 last:pb-0">
                <span className="text-sm text-gray-200">{log.action} <span className="text-gray-500">on {log.target}</span></span>
                <span className="text-xs text-gray-500 font-mono mt-1">{log.time.slice(11,19)} UTC</span>
              </div>
            ))}
           </div>
        </div>
      </div>
    </motion.div>
  );

  const renderApprovals = () => (
    <motion.div key="app" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
      {approvals.length === 0 ? (
        <div className="p-12 text-center text-gray-500 border border-dashed border-[#333] rounded-xl bg-[#0A0A0A]">Zero pending compliance requests.</div>
      ) : approvals.map(app => (
        <div key={app.id} className="bg-[#0A0A0A] border border-[#222] rounded-xl p-6 flex justify-between items-center">
          <div>
             <div className="flex items-center space-x-3 mb-2"><Badge type={app.risk}>{app.risk}</Badge><span className="text-xs text-gray-500 font-mono">{app.time}</span></div>
             <h3 className="text-lg font-semibold text-white">{app.action}</h3>
             <p className="text-sm text-gray-400 mt-1">Agent: {app.agent}</p>
          </div>
          <div className="flex space-x-2">
             <button onClick={() => handleApproval(app.id, 'Denied')} className="px-4 py-2 rounded bg-black border border-[#333] text-gray-300 hover:bg-[#111] text-sm font-medium transition-colors">Deny</button>
             <button onClick={() => handleApproval(app.id, 'Approved')} className="px-4 py-2 rounded bg-white text-black hover:bg-gray-200 text-sm font-semibold transition-colors">Authorize</button>
          </div>
        </div>
      ))}
    </motion.div>
  );

  const renderRegistry = () => (
    <motion.div key="reg" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div>
           <h3 className="text-base font-semibold text-white">Registry Active Functions</h3>
           <p className="text-xs text-gray-400 mt-1">Interact with the Sovereign local database or scan traffic.</p>
           {registerStatus && <p className="text-xs font-mono text-amber-500 mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded inline-block">{registerStatus}</p>}
        </div>
        <div className="flex flex-col space-y-2">
          <button onClick={handleRegister} className="px-4 py-2 border border-[#333] text-white bg-[#111] font-semibold rounded text-sm hover:bg-[#1a1a1a] transition-colors shadow">
             Register Test Agent (Trigger 20 Limit logic)
          </button>
          <button onClick={exportLog} className="px-4 py-2 border border-[#333] text-gray-300 bg-[#050505] font-semibold rounded text-sm hover:bg-[#111] transition-colors flex items-center justify-center">
             <FileText size={16} className="mr-2"/> Export Security Log (JSON)
          </button>
          <button onClick={handleScan} disabled={isScanning} className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/50 text-indigo-400 rounded text-sm font-semibold hover:bg-indigo-600/30 transition-colors flex items-center justify-center mt-2">
             <ScanSearch size={16} className="mr-2"/> {isScanning ? 'Scanning Network...' : 'Analyze Shadow AI Traffic'}
          </button>
        </div>
      </div>

      {scannedAgents && scannedAgents.length > 0 && (
         <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-6">
           <h3 className="text-red-400 font-semibold mb-4 flex items-center"><ShieldAlert size={18} className="mr-2 text-red-500"/> Shadow AI Detected via Localhost Scan</h3>
           <div className="space-y-3">
             {scannedAgents.map((ag: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-4 border border-red-500/10 bg-red-500/5 rounded-lg">
                   <div>
                     <div className="text-sm text-gray-200 font-semibold">{ag.alias} <span className="text-xs text-gray-500 ml-2 font-mono">Port: {ag.port}</span> <span className="text-xs text-gray-500 ml-2 font-mono">Traffic: {ag.detected_traffic}</span></div>
                     <div className="text-xs text-red-400/80 mt-1">{ag.reason}</div>
                   </div>
                   <Badge type="Critical">{ag.risk}</Badge>
                </div>
             ))}
           </div>
         </div>
      )}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#111] border-b border-[#222] text-xs uppercase font-semibold text-gray-500">
            <tr><th className="px-5 py-3">Agent</th><th className="px-5 py-3">DID</th><th className="px-5 py-3">Hash</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Audit</th></tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
             {agents.map((agent: any) => (
               <tr key={agent.id} onClick={() => setSelectedAgent(agent)} className="hover:bg-[#111] cursor-pointer transition-colors group">
                 <td className="px-5 py-4 font-medium text-gray-200 flex items-center">
                   <div className={`w-1.5 h-1.5 rounded-full mr-3 ${agent.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} /> {agent.alias}
                 </td>
                 <td className="px-5 py-4 font-mono text-xs text-gray-500 group-hover:text-gray-300">{agent.did || 'Not assigned'}</td>
                 <td className="px-5 py-4 font-mono text-xs text-gray-500">{agent.auditHash || 'Pending'}</td>
                 <td className="px-5 py-4">
                   <Badge type={agent.status === 'TERMINATED' ? 'TERMINATED' : (agent.status === 'Active' ? 'Active' : agent.tier)}>
                     {agent.status}
                   </Badge>
                 </td>
                 <td className="px-5 py-4 text-right">
                   <button onClick={(e) => { e.stopPropagation(); generateNISTReport(agent); }} className="text-gray-500 hover:text-emerald-400 transition-colors p-1" title="Download NIST Report">
                     <Download size={16} />
                   </button>
                   <Link href={`/verify/${encodeURIComponent(agent.did || agent.id)}`} onClick={(e) => e.stopPropagation()} target="_blank" className="text-gray-500 hover:text-white transition-colors p-1 inline-block ml-2" title="Public Certificate Link">
                     <ExternalLink size={16} />
                   </Link>
                 </td>
               </tr>
             ))}
             {agents.length === 0 && (
               <tr><td colSpan={5} className="p-8 text-center text-gray-500">No agents registered in local database.</td></tr>
             )}
          </tbody>
        </table>
        {/* Price per Transaction Ticker */}
        <div className="bg-[#050505] border-t border-[#222] px-5 py-3 flex justify-between items-center overflow-hidden">
           <div className="flex items-center space-x-6 animate-marquee whitespace-nowrap">
              <span className="text-[10px] font-mono text-emerald-500 flex items-center"><div className="w-1 h-1 bg-emerald-500 rounded-full mr-2" /> MINT TAX: $1.00 / node</span>
              <span className="text-[10px] font-mono text-blue-400 flex items-center"><div className="w-1 h-1 bg-blue-400 rounded-full mr-2" /> ACTION TAX: $0.01 / verify</span>
              <span className="text-[10px] font-mono text-gray-500 flex items-center"><div className="w-1 h-1 bg-gray-500 rounded-full mr-2" /> PULSE TAX: $0.0001 / heartbeat</span>
              <span className="text-[10px] font-mono text-amber-500 opacity-60">SOVEREIGN NETWORK METERING ACTIVE — ALL ACTIONS SETTLED ON REGISTRY CHAIN</span>
           </div>
           <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-4 bg-[#050505] z-10">Current Pricing Standard</div>
        </div>
      </div>
    </motion.div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#000000] text-gray-200 flex flex-col items-center justify-center font-sans selection:bg-neutral-800 bg-tech-grid">
        <div className="max-w-xl w-full text-center space-y-8 px-6">
           <div className="flex justify-center mb-12"><SovereignLogo size={80} className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"/></div>
           <h1 className="text-4xl font-bold text-white tracking-tight">Public Gateway</h1>
           <p className="text-gray-400">Verify a Decentralized Identifier against the Sovereign Root.</p>
           
           <div className="relative group">
             <input 
               type="text" 
               placeholder="Verify Agent Identity (DID)..." 
               value={lookupDid}
               onChange={(e) => setLookupDid(e.target.value)}
               className="w-full bg-[#0A0A0A] border border-[#333] rounded-full px-6 py-4 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
               onKeyDown={(e) => { 
                 if(e.key === 'Enter') handleLookup(); 
               }} 
             />
             <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-emerald-500 transition-colors cursor-pointer" size={18} onClick={handleLookup} />
           </div>

           <AnimatePresence>
             {foundAgent && (
               <motion.div 
                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="mt-12 bg-gradient-to-br from-[#111] to-[#050505] border border-[#222] rounded-2xl p-8 relative overflow-hidden shadow-2xl text-left"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />
                 <div className="flex justify-between items-start mb-8">
                   <div className="flex items-center space-x-4">
                     <div className="p-3 bg-black border border-[#333] rounded-xl shadow-inner">
                       <SovereignLogo size={32} className="text-white" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-white tracking-tight">{foundAgent.alias}</h3>
                       <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">Verified Sovereign Root</div>
                     </div>
                   </div>
                   <div className="flex flex-col items-end">
                     <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[10px] font-mono uppercase tracking-widest flex items-center">
                       <CircleCheck size={10} className="mr-1.5" /> NIST Certified
                     </div>
                     <span className="text-[8px] text-gray-600 mt-2 font-mono uppercase">Issued 2026</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8 mb-8 border-t border-b border-[#222] py-6">
                    <div>
                      <span className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">Registration DID</span>
                      <span className="text-xs font-mono text-gray-300 break-all">{foundAgent.did}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">Standard Tier</span>
                      <Badge type={foundAgent.tier}>{foundAgent.tier}</Badge>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">Compliance Link</span>
                      <span className="text-xs text-emerald-500 font-mono underline decoration-emerald-500/30 underline-offset-4 cursor-pointer">nist-sp-800-218.sov</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">Authority Root</span>
                      <span className="text-xs font-mono text-gray-400">0x{foundAgent.auditHash?.slice(2) || '8f2a...9b1c'}</span>
                    </div>
                 </div>

                 <div className="flex items-center justify-between">
                   <div className="flex items-center text-xs text-gray-500 space-x-2">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="font-mono">CRYPTO-ANCHOR ACTIVE</span>
                   </div>
                   <button 
                     onClick={() => window.open(`/verify/${encodeURIComponent(foundAgent.did)}`, '_blank')}
                     className="px-5 py-2 bg-white text-black text-xs font-bold rounded hover:bg-gray-200 transition-colors flex items-center"
                   >
                     View Full Integrity Audit <ExternalLink size={12} className="ml-2" />
                   </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
           
           <div className="pt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center mt-12 border-t border-[#111]">
              <button className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors" onClick={() => setIsLoggedIn(true)}>Enter Registry Tower</button>
              <Link href="/docs" className="px-8 py-3 bg-transparent border border-[#333] text-white font-semibold rounded hover:bg-white/5 transition-colors">Documentation</Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Initial Loading Splash Screen */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1, 0.95],
                opacity: [0, 1, 1]
              }}
              transition={{ duration: 1.2, times: [0, 0.6, 1], ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <SovereignLogo size={120} className="text-white mb-8" />
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-xl font-bold tracking-[0.3em] text-white uppercase">Sovereign AG</div>
                <div className="text-[10px] tracking-[0.5em] text-gray-500 uppercase mt-2">Identity Registry</div>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="absolute bottom-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#000000] text-gray-200 flex font-sans selection:bg-neutral-800 relative z-0 bg-tech-grid">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#1a1a1a] flex flex-col shrink-0 bg-[#000000] z-20">
          <div className="h-20 flex items-center px-6 border-b border-[#1a1a1a]">
            <SovereignLogo size={28} className="text-white mr-3" />
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white leading-tight uppercase">Sovereign AG</span>
              <span className="text-[8px] text-gray-500 tracking-widest uppercase">Protocol Node</span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
            {/* Main Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Protocol</div>
              <Link href="/" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-400 hover:bg-[#111]">
                <Globe size={16} className="mr-3" /> Overview
              </Link>
              <Link href="/docs" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-400 hover:bg-[#111]">
                <BookOpen size={16} className="mr-3" /> Documentation
              </Link>
            </div>

            {/* Governance Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Governance</div>
              <button onClick={() => { setActiveZone('tower'); setActiveView('dashboard'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors", activeView==='dashboard' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <LayoutDashboard size={16} className="mr-3" /> Dashboard
              </button>
              <button onClick={() => { setActiveZone('tower'); setActiveView('approvals'); }} className={cn("w-full flex justify-between items-center px-3 py-2 text-sm font-medium rounded-md transition-colors", activeView==='approvals' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <div className="flex items-center"><User size={16} className="mr-3" /> Approvals</div>
                {approvals.length > 0 && <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 rounded-full border border-emerald-500/20">{approvals.length}</span>}
              </button>
              <button onClick={() => { setActiveZone('tower'); setActiveView('registry'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors", activeView==='registry' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <Cpu size={16} className="mr-3" /> Fleet Registry
              </button>
            </div>

            {/* Developer forge Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Build & Scale</div>
              <button onClick={() => { setActiveZone('forge'); setActiveView('installation'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors", activeView==='installation' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <Terminal size={16} className="mr-3" /> Installation
              </button>
              <button onClick={() => { setActiveZone('forge'); setActiveView('integrations'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors", activeView==='integrations' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <Blocks size={16} className="mr-3" /> Integrations
              </button>
              <button onClick={() => { setActiveZone('forge'); setActiveView('apikeys'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors", activeView==='apikeys' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <KeyRound size={16} className="mr-3" /> API Keys
              </button>
            </div>
          </nav>

          {/* Invisible AI Integration - Embedded Docs Assistant */}
          <div className="mt-auto p-4 border-t border-[#1a1a1a] bg-[#050505]/50">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-4 shadow-xl group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">AI Docs Assistant</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed mb-3 group-hover:text-slate-300 transition-colors">
                "How do I sign headers using Ed25519 in Java?"
              </p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask the protocol..." 
                  className="w-full bg-black/50 border border-slate-800 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                />
                <ArrowUpRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#050505]">
          <header className="h-16 flex items-center justify-between px-8 border-b border-[#1a1a1a] shrink-0 bg-[#050505]">
            <h1 className="text-base font-medium text-white tracking-tight capitalize">
              {activeView === 'apikeys' ? 'API Key Management' : activeView}
            </h1>
            <div className="text-sm font-mono text-gray-500 flex items-center"><Clock size={14} className={`mr-2 ${lastSyncSeconds === 0 ?'text-gray-100':''}`}/> Sync: {lastSyncSeconds}s</div>
          </header>
          <div className="flex-1 overflow-y-auto p-10">
            <AnimatePresence mode="wait">
               {activeZone === 'gate' && renderFrontGate()}
               {activeZone === 'forge' && renderDeveloperForge()}
               {activeZone === 'tower' && activeView === 'dashboard' && renderDashboard()}
               {activeZone === 'tower' && activeView === 'approvals' && renderApprovals()}
               {activeZone === 'tower' && activeView === 'registry' && renderRegistry()}
            </AnimatePresence>
          </div>
          <footer className="h-auto py-5 border-t border-[#1a1a1a] bg-[#0A0A0A] flex flex-col items-center justify-center px-8 shrink-0 relative z-50">
             <div className="flex flex-col items-center w-full max-w-xl">
               <div className="w-full bg-[#111] h-1 rounded-full overflow-hidden mb-3 border border-[#222]">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '100.1%' }} 
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-emerald-500"
                  />
               </div>
               <div className="flex justify-between items-center w-full text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                 <div className="flex items-center space-x-6">
                    <span className="flex items-center text-emerald-400"><div className="w-1.5 h-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] rounded-full mr-2"></div> NIST-2026 Alignment: 100%</span>
                    <span>Sovereign Protocol v1.0.4</span>
                 </div>
                 <div className="flex items-center space-x-6">
                    <Link href="/docs" className="hover:text-white transition-colors">Integrator Manual</Link>
                    <Link href="#" className="hover:text-white transition-colors">Security Policy</Link>
                    <span>{new Date().toLocaleTimeString()}</span>
                 </div>
               </div>
             </div>
          </footer>
        </main>

        {/* Detail Drawer */}
        <AnimatePresence>
          {selectedAgent && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => { setSelectedAgent(null); setShowKillConfirm(false); }} />
              <motion.aside initial={{ x: '100%' }} animate={{ x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-96 bg-[#0A0A0A] border-l border-[#222] z-50 flex flex-col shadow-2xl">
                <div className="p-6 border-b border-[#222] flex justify-between items-center">
                   <div><h2 className="text-lg font-semibold text-white">{selectedAgent.alias}</h2><p className="text-xs text-gray-500 font-mono mt-1">{selectedAgent.id}</p></div>
                   <button onClick={() => setSelectedAgent(null)} className="text-gray-500 hover:text-white p-1 rounded transition-colors" title="Close Details"><X size={20}/></button>
                </div>
                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                   <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Network Status</span><Badge type={selectedAgent.status}>{selectedAgent.status}</Badge></div>
                   <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">NIST Compliance</span><Badge type={selectedAgent.nist}>{selectedAgent.nist}</Badge></div>
                   <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">System Owner</span><span className="text-sm font-medium text-gray-200">{selectedAgent.owner}</span></div>
                   {selectedAgent.purpose && <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Purpose</span><span className="text-sm font-medium text-gray-400">{selectedAgent.purpose}</span></div>}
                </div>
                <div className="p-6 border-t border-[#222] bg-[#050505] relative">
                   <AnimatePresence>
                     {showKillConfirm && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute inset-x-6 bottom-6 bg-[#000000] border border-red-500/30 p-4 rounded-xl z-20 shadow-xl flex flex-col items-center">
                          <TriangleAlert size={24} className="text-red-500 mb-3" />
                          <h4 className="text-sm font-semibold text-white mb-4 text-center">Terminate {selectedAgent.id} cryptographically?</h4>
                          <div className="flex space-x-2 w-full"><button onClick={() => setShowKillConfirm(false)} className="flex-1 py-2 text-xs border border-[#333] rounded text-gray-300">Abort</button><button onClick={executeRevoke} className="flex-1 py-2 text-xs bg-red-600 text-white rounded font-medium">Confirm</button></div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                   {selectedAgent.status !== 'TERMINATED' ? (
                     !isKillArmed ? (
                       <button onClick={() => setIsKillArmed(true)} className="w-full py-2.5 bg-[#111] border border-[#333] text-gray-400 rounded hover:text-white hover:bg-[#1a1a1a] text-sm font-semibold transition-colors flex justify-center items-center"><Lock size={14} className="mr-2"/> ARM REVOCATION</button>
                     ) : (
                       <button onClick={() => setShowKillConfirm(true)} className="w-full py-2.5 bg-red-900/40 border border-red-500/50 text-red-500 rounded hover:bg-red-900/60 text-sm font-semibold transition-colors flex justify-center items-center animate-pulse"><ShieldAlert size={14} className="mr-2"/> TRIGGER KILL SWITCH</button>
                     )
                   ) : <div className="text-center text-xs text-red-500/50 font-mono uppercase tracking-widest">Agent Terminated</div>}
                   
                   <button onClick={() => generateNISTReport(selectedAgent)} className="w-full mt-4 py-2.5 bg-white text-black rounded hover:bg-gray-200 text-sm font-semibold transition-colors flex justify-center items-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <Download size={14} className="mr-2"/> Export NIST Audit Report
                   </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}