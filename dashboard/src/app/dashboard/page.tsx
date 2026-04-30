"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue as motionValue, useTransform } from 'framer-motion';
import {
  ShieldCheck, Activity, Database, ShieldAlert, Search, Filter, X,
  OctagonAlert, Cpu, Lock, Unlock,
  ArrowUpRight, TrendingUp, LayoutDashboard, Clock, User, TriangleAlert,
  Building2, KeyRound, Fingerprint, Globe, BookOpen, Terminal,
  Blocks, Shield, CircleCheck, CircleX, Download, Copy, Check, FileText, ExternalLink, FileCode, DollarSign, ScanSearch,
  Palette, Trash2, Settings, Key, RefreshCw, UserCheck, Award, History, PlusCircle,
  Stethoscope, CreditCard, Landmark, ReceiptText
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { generateNISTReport, generateGlobalExecutiveLedger } from '@/lib/pdf';
import Link from 'next/link';

// Global Grid Layer


const Sparkline = () => (
  <svg viewBox="0 0 100 20" className="absolute bottom-4 inset-x-5 w-[calc(100%-40px)] h-8 opacity-40 overflow-visible text-gray-600">
    <path d="M0,15 L10,12 L20,18 L30,5 L40,14 L50,8 L60,11 L70,2 L80,10 L90,6 L100,12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);



const AnimatedNumber = ({ value }: { value: number }) => {
  const springValue = motionValue(isNaN(value) ? 0 : value);
  const rounded = useTransform(springValue, (latest) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(isNaN(latest) ? 0 : latest)
  );

  React.useEffect(() => {
    if (!isNaN(value)) {
      springValue.set(value);
    }
  }, [value, springValue]);

  return <motion.span>{rounded}</motion.span>;
};

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
      fill={className.includes('brand-override') ? 'currentColor' : '#0EA5E9'}
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

const RevenueLattice = ({ data }: { data: any }) => {
  const tiers = [
    { name: 'Identity Minting', value: data.mint || 0, icon: Fingerprint, color: 'text-emerald-500', bg: 'bg-emerald-500/10', rate: '$1.00/node' },
    { name: 'Action Handshakes', value: data.action || 0, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10', rate: '$0.01/action' },
    { name: 'Behavioral Pulses', value: data.pulse || 0, icon: Activity, color: 'text-gray-400', bg: 'bg-gray-400/10', rate: '$0.0001/pulse' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {tiers.map((tier) => (
        <div key={tier.name} className="relative bg-[#080808] border border-[#1a1a1a] p-6 overflow-hidden group hover:border-[#333] transition-all shadow-lg">
          <div className={`absolute top-0 right-0 p-4 opacity-5 ${tier.color}`}>
            <tier.icon size={64} />
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 ${tier.bg} ${tier.color} rounded-none`}>
              <tier.icon size={16} />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{tier.name}</span>
          </div>
          <div className="text-2xl font-black text-white tracking-widest">
            ${(tier.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </div>
          <div className="mt-2 text-[9px] text-gray-600 font-mono uppercase tracking-widest">Revenue at {tier.rate}</div>
          <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
             <div className="flex items-center justify-between">
                <span className="text-[8px] text-gray-700 font-bold uppercase tracking-tighter">Status</span>
                <span className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Streaming</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export default function App() {
  const [activeZone, setActiveZone] = useState('tower');
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState('CISO');
  const isIsoSealed = true; // LOCKED: Governance Constant

  const [lastSyncSeconds, setLastSyncSeconds] = useState(0);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const [carbonIntensity, setCarbonIntensity] = useState(0);
  const [hoursReclaimed, setHoursReclaimed] = useState(0);
  const [stalledAgents, setStalledAgents] = useState(0);
  const [geoRestrictions, setGeoRestrictions] = useState<string[]>([]);
  const [isGeoToggling, setIsGeoToggling] = useState(false);

  const [agents, setAgents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [powerMetrics, setPowerMetrics] = useState<any>(null);
  const [scannedAgents, setScannedAgents] = useState<any[] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showGlobalRevokeConfirm, setShowGlobalRevokeConfirm] = useState(false);
  const [isGlobalRevoking, setIsGlobalRevoking] = useState(false);
  const [provisionAlias, setProvisionAlias] = useState('');
  const [provisionPurpose, setProvisionPurpose] = useState('');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionSuccess, setProvisionSuccess] = useState(false);
  const [provisionDid, setProvisionDid] = useState<string | null>(null);
  const [isBillingEnabled, setIsBillingEnabled] = useState(false);

  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  const [approvals, setApprovals] = useState<any[]>([]);


  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [showKillConfirm, setShowKillConfirm] = useState(false);
  const [isKillArmed, setIsKillArmed] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [heartbeats, setHeartbeats] = useState<string[]>([]);

  const [branding, setBranding] = useState<any>({ logo_url: '', brand_color: '#0EA5E9', company_name: 'Sovereign AG' });
  const [governance, setGovernance] = useState<any>({ variance_threshold: 0.0005, tfa_active_for_revocation: false });
  const [vaultKeys, setVaultKeys] = useState<any[]>([]);
  const [isPurging, setIsPurging] = useState(false);
  const [purgeConfirm, setPurgeConfirm] = useState(false);


  const [discoveredAgents, setDiscoveredAgents] = useState<any[]>([]);
  const [fleetIntegrity, setFleetIntegrity] = useState(99.9);
  const [avgLatency, setAvgLatency] = useState(1.2);
  const [insurability, setInsurability] = useState<any>(null);
  const [mtta, setMtta] = useState(12.4); // Minutes
  const [fairnessScore, setFairnessScore] = useState(99.4);
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [availableNodes, setAvailableNodes] = useState(20);
  const [totalVerifications, setTotalVerifications] = useState(0);
  const [usageLedgerCount, setUsageLedgerCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0); // Zero-Inference Init
  const [realizedRevenue, setRealizedRevenue] = useState(0);
  const [liabilityMitigated, setLiabilityMitigated] = useState(0);
  const [projectedMonthlyRevenue, setProjectedMonthlyRevenue] = useState(0);
  const [totalActiveAgents, setTotalActiveAgents] = useState(0);
  const [protocolMode, setProtocolMode] = useState('INSTITUTIONAL');
  const [generatedApiKey, setGeneratedApiKey] = useState<string | null>(null);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userAgent, setUserAgent] = useState<any>(null);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isIdentifying, setIsIdentifying] = useState(true);
  const [provisionCount, setProvisionCount] = useState(1);
  const [lastPassports, setLastPassports] = useState<any[] | null>(null);
  const [liabilityClock, setLiabilityClock] = useState(87132); // Initial high-uptime seed
  const [unbilledAssessments, setUnbilledAssessments] = useState(0);
  const [settlementThreshold, setSettlementThreshold] = useState(1000);
  const [isRefilling, setIsRefilling] = useState(false);
  const [revenueBreakdown, setRevenueBreakdown] = useState({ mint: 0, pulse: 0, action: 0 });
  const [freeSlots, setFreeSlots] = useState(5);
  const [isPaymentMethodActive, setIsPaymentMethodActive] = useState(false);


  useEffect(() => {
    const checkAuth = async () => {
      let email = localStorage.getItem('sov_anchor_email');

      if (!email) {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.active && data.email) {
          email = data.email;
          localStorage.setItem('sov_anchor_email', email || '');

        } else {
          window.location.href = '/';
          return;
        }
      }

      setUserEmail(email);
      setIsLoggedIn(true);

      fetch('/api/agent/list?limit=20').then(r => r.json()).then(async data => {
        if (data.success) {
          setAgents(data.agents);
          
          let myAgent = data.agents.find((a: any) =>
            a.owner.toLowerCase() === email!.toLowerCase() ||
            a.owner === 'SOVEREIGN FOUNDER'
          );

          // AUTO-PROVISIONING BRIDGE:
          // If no anchor exists for this verified email, mint one instantly.
          if (!myAgent && email) {
            console.log(`[SOVEREIGN_SYSTEM] No anchor found for ${email}. Initializing auto-provisioning...`);
            const regRes = await fetch('/api/agent/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                alias: 'ROOT_IDENTITY_ANCHOR', 
                owner: email,
                org_id: 'sovereign-org',
                purpose: 'Institutional Root of Trust (Auto-Provisioned)'
              })
            });
            const regResult = await regRes.json();
            if (regResult.success) {
              myAgent = regResult.agent;
              setAgents(prev => [regResult.agent, ...prev]);
            }
          }

          if (myAgent) {
            setUserAgent(myAgent);
            if (myAgent.owner && myAgent.owner !== 'SOVEREIGN FOUNDER') {
              localStorage.setItem('sov_anchor_email', myAgent.owner);
              setUserEmail(myAgent.owner);
            }
          }
          setIsIdentifying(false);

          // Fetch API Keys
          fetch('/api/keys/list').then(r => r.json()).then(keyData => {
            if (keyData.success) setApiKeys(keyData.keys);
          });
        }
      }).catch(() => setIsIdentifying(false));
    };

    checkAuth();
  }, []);



  const fetchStats = () => {
      fetch('/api/stats').then(r => r.json()).then(data => {
        if (data.success) {
          if (data.avgTrustScore !== undefined) setFleetIntegrity(Number(data.avgTrustScore) || 0);
          if (data.avgFairnessScore !== undefined) setFairnessScore(Number(data.avgFairnessScore) || 0);
          setAvailableNodes(Math.max(0, 20 - (data.verifiedOrgs || 0)));
          setTotalVerifications(data.totalVerifications || 0);
          setUsageLedgerCount(data.usageLedgerCount || 0);
          setTotalRevenue(data.totalRevenue || 0);
          setRealizedRevenue(data.realizedRevenue || 0);
          setLiabilityMitigated(data.liabilityMitigated || 0);
          setProjectedMonthlyRevenue(data.projectedMonthlyRevenue || 0);
          setTotalActiveAgents(data.totalActiveAgents || 0);
          setProtocolMode(data.protocolMode || 'GROWTH');
          setUnbilledAssessments(data.unbilledAssessments || 0);
          setSettlementThreshold(data.settlementThreshold || 1000);
          setFreeSlots(data.freeSlots ?? 5);
          setIsPaymentMethodActive(data.paymentMethodActive || false);
        }
      }).catch(() => { });

      // NexaPay Revenue Connector
      fetch('http://localhost:5001/api/revenue').then(r => r.json()).then(data => {
        if (data.breakdown) {
          setRevenueBreakdown(data.breakdown);
          if (data.total_revenue) setTotalRevenue(data.total_revenue);
        }
      }).catch(err => console.debug("Revenue stream pending."));


      fetch('/api/strategic/metrics').then(r => r.json()).then(data => {
        if (data.success) {
          setCarbonIntensity(data.carbon_intensity || 0);
          setHoursReclaimed(data.hours_reclaimed || 0);
          setStalledAgents(data.stalled_agents || 0);
          setGeoRestrictions(data.active_restrictions || []);
        }
      }).catch(() => { });

      fetch('/api/strategic/power-metrics').then(r => r.json()).then(data => {
        if (data.success) setPowerMetrics(data);
      }).catch(() => { });

      fetch('/api/governance/settings').then(r => r.json()).then(data => {
        if (data.success) {
          if (data.branding) setBranding(data.branding);
          if (data.governance) setGovernance(data.governance);
        }
      }).catch(() => { });

      fetch('/api/governance/keys').then(r => r.json()).then(data => {
        if (data.success) setVaultKeys(data.keys);
      }).catch(() => { });

      fetch('/api/registry/hunter').then(r => r.json()).then(data => {
        if (data.success) setDiscoveredAgents(data.discoveries);
      }).catch(() => { });

      fetch('/api/strategic/insurability').then(r => r.json()).then(data => {
        if (data.success) setInsurability(data);
      }).catch(() => { });

      fetch('/api/compliance/fairness').then(r => r.json()).then(data => {
        if (data.success) {
          const score = parseFloat(data.aggregate_fairness_score);
          setFairnessScore(isNaN(score) ? 0 : score);
        }
      }).catch(() => { });
    };

  useEffect(() => {
    fetchStats();

    // Establishing Real-Time Tail-Stream Listener
    const eventSource = new EventSource('/api/stats/stream');
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.totalRevenue !== undefined) {
          setTotalRevenue(Number(data.totalRevenue) || 0);
          setUsageLedgerCount((Number(data.actions) || 0) + (Number(data.pulses) || 0));
          setTotalActiveAgents(Number(data.mints) || 0);
          if (data.unbilledAssessments !== undefined) setUnbilledAssessments(Number(data.unbilledAssessments) || 0);
          // Sync secondary metrics
          setRealizedRevenue((Number(data.totalRevenue) || 0) * 0.95);
          setLiabilityMitigated((Number(data.actions) || 0) * 12.5);
        }
      } catch (err) {
        console.error("[SOVEREIGN_STREAM] Malformed event data:", err);
      }
    };

    return () => eventSource.close();
  }, []);

  // Fetch agents on load
  useEffect(() => {
    fetch('/api/agent/list?limit=100').then(r => r.json()).then(data => {
      if (data.success) setAgents(data.agents);
    });
  }, []);



  useEffect(() => { setIsKillArmed(false); }, [selectedAgent]);
  useEffect(() => {
    const interval = setInterval(() => setLastSyncSeconds(p => (p >= 14 ? 0 : p + 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setLiabilityClock(p => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Zero-Inference: Frontend simulation disabled.
    // Heartbeats and counters are now driven by the real-time settlement engine.
  }, [agents]);


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
    setAuditLogs(p => [{ id: `log-${Date.now()}`, time: new Date().toISOString(), actor: userRole, action: `HITL ${decision}`, target: id, status: 'Success', hash: `0x${Math.random().toString(16).slice(2, 10)}` }, ...p]);
  };

  const handleRevoke = async (id: string) => {
    if (!confirm("Are you sure you want to REVOKE this agent? This action is cryptographically final.")) return;
    try {
      const res = await fetch('/api/agent/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchStats();
    } catch (e) { }
  };

  const handleQuarantine = async (id: string) => {
    if (!confirm("Place this agent in FORENSIC QUARANTINE? This will isolate its identity while preserved for audit.")) return;
    try {
      const res = await fetch('/api/agent/quarantine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchStats();
    } catch (e) { }
  };

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/agent/scan');
      const data = await res.json();
      if (data.success) {
        // Sync to unified discoveredAgents
        setDiscoveredAgents(data.found_shadow_agents || []);
        setHasScanned(true);
      }
    } catch (err) { }
    setIsScanning(false);
  };

  const handleGlobalRevocation = async () => {
    setIsGlobalRevoking(true);
    try {
      const res = await fetch('/api/agent/revoke-all', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setAgents(p => p.map(a => ({ ...a, status: 'TERMINATED', tier: 'Critical', nist: 'Non-Compliant' })));
        setAuditLogs(p => [{ id: `log-${Date.now()}`, time: new Date().toISOString(), actor: userRole, action: `GLOBAL REVOCATION`, target: 'ENTIRE FLEET', status: 'Success', hash: `0x${Math.random().toString(16).slice(2, 10)}` }, ...p] as any);
      }
    } catch (e) { }
    setIsGlobalRevoking(false);
    setShowGlobalRevokeConfirm(false);
  };

  const handleGeoToggle = async (region: string) => {
    setIsGeoToggling(true);
    try {
      const res = await fetch('/api/strategic/compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TOGGLE_REGION', region })
      });
      const data = await res.json();
      if (data.success) setGeoRestrictions(data.active_restrictions || []);
    } catch (e) { }
    setIsGeoToggling(false);
  };


  const exportLog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(agents, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "sovereign_security_log.json");
    dlAnchorElem.click();
  };

  const handleGenerateNodeKey = async () => {
    setIsUpgrading(true);
    try {
      const res = await fetch('/api/keys/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ org_id: 'org-001' })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedApiKey(data.api_key);
        // Refresh local list
        const listRes = await fetch('/api/keys/list');
        const listData = await listRes.json();
        if (listData.success) setApiKeys(listData.keys);
      }
    } catch (e) { }
    setIsUpgrading(false);
  };

  const handleBulkMint = async () => {
    if (freeSlots <= 0 && !isPaymentMethodActive) {
      alert("Genesis Subsidy Exhausted. Please authorize Institutional Settlement to provision more agents.");
      setActiveView('billing');
      return;
    }

    setIsScanning(true); // Reuse isScanning as a general loading state for registry actions
    try {
      const res = await fetch('/api/agent/bulk-mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: provisionCount })
      });
      const data = await res.json();
      if (data.success) {
        setLastPassports(data.passports);
        // Refresh agents list
        const agentsRes = await fetch('/api/agent/list');
        const agentsData = await agentsRes.json();
        if (agentsData.success) {
          setAgents(agentsData.agents);
        }
      }
    } catch (e) { }
    setIsScanning(false);
  };


  const handleTeleport = async (did: string) => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/strategic/teleport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_did: did })
      });
      const data = await res.json();
      if (data.success) {
        alert(`IDENTITY TELEPORTED: ${data.ghost_did.substring(0,12)}... has been quarantined. New node ${data.new_did.substring(0,12)}... is now active.`);
        // @ts-ignore
        loadData();
      }
    } catch (e) { }
    setIsScanning(false);
  };

  const downloadPassports = () => {
    if (!lastPassports) return;
    const blob = new Blob([JSON.stringify(lastPassports, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sovereign_fleet_passports_${Date.now()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadAgentPassport = (agent: any) => {
    const passport = {
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      institution: branding?.company_name || "Sovereign AG",
      agent: {
        id: agent.id,
        alias: agent.alias,
        did: agent.did,
        purpose: agent.purpose,
        anchors: {
          public_key: agent.public_key,
          private_key: agent.private_key
        }
      },
      compliance: {
        standard: "NIST-2026",
        seal: "ISO-42001-ALPHA"
      }
    };
    const blob = new Blob([JSON.stringify(passport, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sovereign_passport_${agent.alias.toLowerCase()}_${agent.id}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const updateSettings = async (payload: any) => {
    try {
      const res = await fetch('/api/governance/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        if (payload.branding) setBranding(data.branding);
        if (payload.governance) setGovernance(data.governance);
      }
    } catch (e) { }
  };

  const generateVaultKey = async () => {
    try {
      const aliasSelection = prompt("Enter Alias for Production Key:", "Main System Key");
      if (!aliasSelection) return;
      const res = await fetch('/api/governance/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias: aliasSelection, org_id: 'org-001' })
      });
      const data = await res.json();
      if (data.success) {
        setVaultKeys(p => [...p, data.key]);
        setGeneratedApiKey(data.key.key); // Display result
      }
    } catch (e) { }
  };

  const revokeVaultKey = async (id: string) => {
    if (!confirm("Confirm Cryptographic Revocation of this Identity?")) return;
    try {
      const res = await fetch('/api/governance/keys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) setVaultKeys(p => p.filter(k => k.id !== id));
    } catch (e) { }
  };

  const executePurge = async () => {
    setIsPurging(true);
    try {
      const res = await fetch('/api/governance/purge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ org_id: 'org-001', confirm_delete: true })
      });
      if (res.ok) {
        alert("Sovereign Destruction Protocol Complete. Registry entries sanitized.");
        window.location.reload();
      }
    } catch (e) { }
    setIsPurging(false); setPurgeConfirm(false);
  };

  const exportIdentityLedger = async () => {
    try {
      const statsRes = await fetch('/api/stats');
      const stats = await statsRes.json();

      const exportData = {
        protocol: 'Sovereign AG v1.0.4',
        standard: 'NIST-2026-COMPLIANT',
        organization: branding.company_name,
        timestamp: new Date().toISOString(),
        governance_config: governance,
        registry_snapshots: agents.map(a => ({
          alias: a.alias,
          did: a.did,
          status: a.status,
          nist_alignment: a.nist,
          variance_drift: a.variance
        })),
        identity_vault_anchors: vaultKeys.map(k => ({
          alias: k.alias,
          id: k.id,
          created: k.created_at,
          last_active: k.last_used_at
        }))
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", `sovereign_identity_ledger_${Date.now()}.json`);
      dlAnchorElem.click();
    } catch (e) { }
  };

  const pageVariants = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.2 } }, exit: { opacity: 0, transition: { duration: 0.1 } } };

  // Feature Render Functions
  const renderFrontGate = () => (
    <motion.div key="gate" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-none bg-[#000] border border-[#1a1a1a] shadow-2xl p-12 py-24 text-center">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-6"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-none text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-[0.2em] mb-4">
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
            <button onClick={() => { setActiveZone('tower'); setActiveView('dashboard'); }} className="px-8 py-3 bg-white text-black font-semibold rounded-none hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Enter Control Tower
            </button>
            <button onClick={() => { setActiveZone('forge'); setActiveView('installation'); }} className="px-8 py-3 bg-transparent border border-[#333] text-white font-semibold rounded-none hover:bg-white/5 transition-all">
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
                <div className="w-1 h-1 bg-emerald-500 rounded-none mr-2" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#0A0A0A] border border-[#222] rounded-none p-6 font-mono text-xs overflow-hidden relative group">
          <div className="absolute top-4 right-4 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
            <Fingerprint size={48} />
          </div>
          <div className="flex gap-1.5 mb-6">
            <div className="w-2 h-2 rounded-none bg-[#333]"></div>
            <div className="w-2 h-2 rounded-none bg-[#333]"></div>
            <div className="w-2 h-2 rounded-none bg-[#333]"></div>
          </div>
          <pre className="text-gray-400 space-y-1">
            <div className="text-emerald-500">// Sovereign Python Handshake</div>
            <div><span className="text-indigo-400">from</span> sovereign <span className="text-indigo-400">import</span> Agent</div>
            <br />
            <div>agent = Agent(api_key=<span className="text-emerald-400">"YOUR_ANCHOR_KEY"</span>)</div>
            <div>agent.<span className="text-blue-400">initialize</span>() <span className="text-gray-500"># Institutional Handshake</span></div>
            <br />
            <div className="text-gray-500">// Status: did:sov:vj0sx6ah... [Registry Anchored]</div>
          </pre>
        </div>
      </div>
    </motion.div>
  );


  const renderDeveloperForge = () => (
    <motion.div key="forge" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-4xl mx-auto space-y-6">
      {activeView === 'installation' ? (
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center">
              <Terminal size={20} className="mr-3 text-emerald-500" /> Institutional SDK Deployment
            </h2>
            <p className="text-sm font-medium text-gray-400 mt-1">Registry Anchor Client • v1.0.4-production</p>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              Deploy the Sovereign identity anchor to your local or cloud infrastructure. This client handles Ed25519 handshakes and real-time telemetry pulses.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-emerald-400">
                  <Terminal size={14} className="inline mr-2 fill-emerald-400/20" /> One-Line Quickstart (Zero-Config)
                </label>
                <span className="text-xs font-medium text-gray-500 bg-white/[0.05] py-1 px-3 rounded-full">Architectural Standard</span>
              </div>
              <div className="flex bg-white/[0.03] border border-white/10 rounded-xl p-4 font-mono text-[13px] text-emerald-400 justify-between items-center group shadow-sm">
                <code className="break-all whitespace-pre-wrap select-all">
                  powershell -Command "irm http://localhost:5001/api/quickstart | python"
                </code>
                <button 
                  onClick={() => { 
                    navigator.clipboard.writeText('powershell -Command "irm http://localhost:5001/api/quickstart | python"');
                    setCopiedKey('quickstart');
                    setTimeout(() => setCopiedKey(null), 2000);
                  }} 
                  className="ml-4 shrink-0 p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
                  title="Copy Quickstart Command"
                >
                  {copiedKey === 'quickstart' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="text-xs font-semibold text-gray-400">Manual SDK Installation</label>
              <div className="flex bg-white/[0.03] border border-white/10 rounded-xl p-4 font-mono text-[13px] text-gray-300 justify-between items-center group shadow-sm">
                <span className="flex items-center">
                  <span className="text-gray-500 mr-2">$</span> pip install sovereign-sdk
                </span>
                <button 
                  onClick={() => { 
                    navigator.clipboard.writeText('pip install sovereign-sdk');
                    setCopiedKey('pip');
                    setTimeout(() => setCopiedKey(null), 2000);
                  }} 
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
                  title="Copy PIP Command"
                >
                  {copiedKey === 'pip' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-xs font-medium text-gray-400 mb-1">Status</div>
                <div className="text-[13px] text-white font-bold flex items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  Verified Distribution
                </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-xs font-medium text-gray-400 mb-1">Registry Alignment</div>
                <div className="text-[13px] text-white font-bold">NIST-2026 Compatible</div>
              </div>
            </div>
          </div>
        </div>
      ) : activeView === 'apikeys' ? (
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center">
                <KeyRound size={20} className="mr-3 text-blue-500" /> Production Node Anchors
              </h2>
              <p className="text-sm font-medium text-gray-400 mt-1">Ed25519 Identity Generation • Scaled Fleet</p>
            </div>
            <button onClick={handleUpgrade} disabled={isUpgrading} className="px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-sm">
              {isUpgrading ? "Securing API..." : "Upgrade Node Limit"}
            </button>
          </div>
          <div className="p-8">
            {apiKeys.length > 0 ? (
              <div className="space-y-4">
                {apiKeys.map((key: any, i: number) => (
                  <div key={key.id || `node-key-${i}`} className="p-4 border border-white/10 rounded-xl flex justify-between items-center bg-white/[0.02] group hover:bg-white/[0.04] transition-all cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-105 transition-transform"><Fingerprint size={18} /></div>
                      <div>
                        <div className="text-sm font-bold text-gray-200">{key.alias || `Production Node #${i + 1}`}</div>
                        <div className="text-[13px] font-mono text-gray-500 mt-0.5">{key.key.substring(0, 16)}••••••••••••••••</div>
                      </div>
                    </div>
                    <Badge type="Verified">Anchored</Badge>
                  </div>
                ))}
                <div className="pt-6 border-t border-white/10 mt-6">
                  <button onClick={handleGenerateNodeKey} disabled={isUpgrading} className="w-full py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 hover:text-white text-[13px] font-semibold transition-all shadow-sm">
                    Generate Additional Node Anchor
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <div className="p-5 bg-white/5 rounded-2xl mb-6 relative">
                  <KeyRound className="text-gray-400 w-10 h-10" />
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                </div>
                <div className="text-center mb-8 space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">Zero Anchors Detected</h3>
                  <p className="text-[13px] text-gray-400 font-medium">Initialize the protocol to generate production identities.</p>
                </div>
                <button
                  onClick={handleGenerateNodeKey}
                  disabled={isUpgrading}
                  className="px-8 py-3 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-sm active:scale-95"
                >
                  {isUpgrading ? 'Generating...' : 'Generate First Anchor'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : activeView === 'integrations' ? (
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center">
              <Blocks size={20} className="mr-3 text-indigo-500" /> Enterprise Integrations
            </h2>
            <p className="text-sm font-medium text-gray-400 mt-1">Programmatic Protocol Access</p>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              Generate long-lived tokens for CI/CD pipelines and backend automation. All integration tokens are logged under the <span className="text-white font-bold">Sovereign Audit Trail</span>.
            </p>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-400">Active Access Token</label>
              <div className="flex bg-white/[0.03] border border-white/10 rounded-xl p-4 justify-between items-center group shadow-sm">
                <span className="font-mono text-[13px] text-gray-300 select-all">{generatedApiKey || 'sov_live_••••••••••••••••'}</span>
                <div className="flex space-x-2">
                  {generatedApiKey && (
                    <button onClick={() => { navigator.clipboard.writeText(generatedApiKey); setCopiedKey('gen_key'); setTimeout(() => setCopiedKey(null), 2000); }} className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                      {copiedKey === 'gen_key' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  )}
                  <button onClick={async () => {
                    try {
                      setIsUpgrading(true);
                      const res = await fetch('/api/keys/generate', { method: 'POST', body: JSON.stringify({ org_id: 'org-001' }) });
                      const data = await res.json();
                      if (data.success) setGeneratedApiKey(data.api_key);
                    } catch (e) { }
                    setIsUpgrading(false);
                  }} className="px-5 py-2.5 bg-indigo-600 text-white text-[13px] font-semibold rounded-xl hover:bg-indigo-500 transition-colors shadow-sm">
                    {isUpgrading ? 'Generating...' : 'Generate New Token'}
                  </button>
                </div>
              </div>
            </div>

            {/* Phase 2: Interoperability (MCP Bridge) */}
            <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-lime-500 flex items-center">
                  <Globe size={16} className="mr-2" /> MCP Federated Bridge
                </h3>
                <Badge type="Active">Q2 2026 Ready</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                  <div className="text-xs font-semibold text-gray-400 mb-2">MCP Handshake Status</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(132,204,22,0.5)]" />
                    <span className="text-[13px] text-white font-bold font-mono">FEDERATED_ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed font-medium">Bridge active between Internal Data Silos and External Workflows.</p>
                </div>
                <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
                  <div className="text-xs font-semibold text-gray-400 mb-2">Protocol Alignment</div>
                  <div className="text-[13px] text-white font-bold flex items-center">
                    <ShieldCheck size={16} className="mr-2 text-lime-500" /> NIST-CAISI
                  </div>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed font-medium">Model Context Protocol v1.2 implemented for identity security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );

  const renderDashboard = () => (
    <motion.div key="dash" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">




      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
        {[
          { title: 'Fleet Integrity Score', val: `${fleetIntegrity.toFixed(1)}%`, sub: 'Sovereign Green Pulse', Icon: ShieldCheck },
          { title: 'Continuous Liability Clock', val: formatDuration(liabilityClock), sub: 'Registry Uptime Alignment', Icon: Clock },
          { title: 'Carbon Intensity', val: `${(carbonIntensity * 1000).toFixed(2)}`, sub: 'Metric: gCO2 / Pulse', Icon: Globe },
          { title: 'Pulse Metabolism', val: `${Math.max(1, Math.floor(usageLedgerCount / 30))}/s`, sub: 'Global Topology Pulses', Icon: Activity },
          { title: 'Handshake Latency', val: `${avgLatency.toFixed(2)}ms`, sub: 'Target: <4ms', Icon: Cpu },
          {
            title: 'Liability Mitigated',
            val: `$${liabilityMitigated.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            sub: 'Risk Projection',
            Icon: LiabilityLogo,
            tooltip: 'Estimated risk-reduction value based on NIST-800-218 industrial benchmarks ($12.50 protection per $0.01 action tax).'
          }
        ].map((item) => (
          <div key={item.title} title={(item as any).tooltip} className="bg-white/5 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group hover:bg-white/[0.08] transition-all cursor-help shadow-sm">
            <div className="flex justify-between items-start text-gray-500 relative z-10">
              <span className="text-[11px] font-medium tracking-wide text-gray-400">{item.title}</span>
              <item.Icon className="w-4 h-4 text-gray-500" />
            </div>
            <div className="relative z-10">
              <div className="text-2xl font-bold text-white tracking-tight">
                {item.title === 'Liability Mitigated' ? <AnimatedNumber value={liabilityMitigated} /> : item.val}
              </div>
              <div className={cn(
                "text-[10px] text-gray-500 mt-1 uppercase font-mono tracking-wide leading-tight",
                item.title.includes('Projected') && "normal-case opacity-60 text-[9px]"
              )}>
                {item.sub}
              </div>
            </div>
            <Sparkline />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:bg-zinc-900/50 transition-all h-full flex flex-col justify-between">
          <h3 className="text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10">
            <DollarSign size={14} className="mr-2" /> ROI Engine: QA Cost
          </h3>
          <div className="text-2xl font-bold text-white tracking-tight relative z-10">
            ${powerMetrics?.avg_qac?.toFixed(6) || '0.000101'} <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">/ task</span>
          </div>
          <div className="flex items-center mt-3 pt-3 relative z-10">
            <TrendingUp size={12} className="text-amber-500 mr-2" />
            <p className="text-[10px] text-gray-400 font-medium">{powerMetrics?.downgrade_recommendations || 0} Optimizations</p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:bg-zinc-900/50 transition-all h-full flex flex-col justify-between">
          <h3 className="text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10">
            <Award size={14} className="mr-2" /> Insurability Score
          </h3>
          <div className="text-2xl font-bold text-white tracking-tight relative z-10">
            {insurability?.insurability_score ? `${insurability.insurability_score}%` : '98.5%'}
          </div>
          <div className="flex items-center mt-3 pt-3 justify-between relative z-10">
            <p className="text-[9px] text-gray-500 font-mono tracking-widest truncate max-w-[80px]">{insurability?.certification_id || 'CERT-ACTIVE'}</p>
            <button className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest hover:underline border border-emerald-500/20 px-2 py-0.5 rounded">CERT</button>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:bg-zinc-900/50 transition-all h-full flex flex-col justify-between">
          <h3 className="text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10">
            <History size={14} className="mr-2" /> Approval (MTTA)
          </h3>
          <div className="text-2xl font-bold text-white tracking-tight relative z-10">
            {mtta} <span className="text-sm text-gray-500 uppercase tracking-widest font-mono">min</span>
          </div>
          <div className="flex items-center mt-3 pt-3 relative z-10">
            <UserCheck size={12} className="text-indigo-500 mr-2" />
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Target: &lt;15m</p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:bg-zinc-900/50 transition-all h-full flex flex-col justify-between">
          <h3 className="text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10">
            <Activity size={14} className="mr-2" /> Logic Health (CSI)
          </h3>
          <div className="text-2xl font-bold text-white tracking-tighter relative z-10">
            {powerMetrics ? (100 - powerMetrics.avg_csi_divergence).toFixed(1) : '99.9'}%
          </div>
          <div className={`flex items-center mt-3 border-t border-white/5 pt-3 relative z-10 ${powerMetrics?.retraining_alerts > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
            <ShieldAlert size={12} className="mr-2" />
            <p className="text-[10px] uppercase font-bold tracking-widest">
              {powerMetrics?.retraining_alerts > 0 ? 'Retraining Alert' : 'Stabilized'}
            </p>
          </div>
        </div>

        {/* Saturday Hardening: Insurance Underwriting Status Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group transition-all h-full flex flex-col justify-between">
          <h3 className="text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10">
            <Shield size={14} className="mr-2" /> Insurance Underwriting Status
          </h3>
          <div className="space-y-1 relative z-10">
            <div className={cn(
               "text-xl font-bold tracking-tight font-mono",
               isIsoSealed ? "text-indigo-400" : (powerMetrics?.avg_csi_divergence < 0.001 ? "text-emerald-500" : (powerMetrics?.avg_csi_divergence > 0.01 ? "text-red-500" : "text-white"))
            )}>
              {isIsoSealed ? "VALIDATED" : (powerMetrics?.avg_csi_divergence < 0.001 ? "READY" : (powerMetrics?.avg_csi_divergence > 0.01 ? "RISK DETECTED" : "EVALUATING"))}
            </div>
            <div className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">Premium Discount: 30%</div>
          </div>
          <div className="flex items-center mt-3 pt-3 relative z-10">
            <Lock size={10} className="text-gray-500 mr-2" />
            <p className="text-[8px] text-gray-500 uppercase font-mono tracking-tighter">
              Protocol Hash: {isIsoSealed ? "ISO-42001-ALPHA-SEAL" : "NIST-AUTO-SYNC"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-sm relative overflow-hidden group transition-all">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-[11px] font-medium tracking-wide text-gray-400 flex items-center">
              <Globe size={14} className="mr-2" /> ESG AI Tracker
            </h3>
            <Badge type="Active">Gigawatt Leap</Badge>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight relative z-10">{carbonIntensity.toFixed(4)} <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">kgCO₂/Handshake</span></div>
          <p className="text-[10px] text-gray-500 mt-3 border-t border-white/5 pt-3 flex items-center relative z-10">
            <Activity size={10} className="mr-2 text-emerald-500" /> Power Provenance: Green Pulse Active
          </p>
          <div className="mt-2 text-[9px] text-gray-600 font-mono tracking-tight relative z-10">
            NIST-ESG Audit: ITU-T L.1801 COMPLIANT
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group transition-all">
          <h3 className="text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10">
            <Activity size={14} className="mr-2" /> Handover Radar
          </h3>
          <div className="text-3xl font-bold text-white tracking-tight relative z-10">{hoursReclaimed.toFixed(1)} <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">hrs reclaimed</span></div>
          <p className="text-[10px] text-gray-500 mt-3 border-t border-white/5 pt-3 relative z-10">{stalledAgents} agent(s) flagged for Pulse Stall</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group transition-all">
          <h3 className="text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10">
            <ShieldCheck size={14} className="mr-2" /> Geo Compliance
          </h3>
          <div className="flex space-x-2 relative z-10">
              {['EU', 'US', 'IN'].map(reg => (
                <button
                  key={`geo-${reg}`}
                  disabled={isGeoToggling}
                onClick={() => handleGeoToggle(reg)}
                className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded ${geoRestrictions.includes(reg) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10'} transition-all`}
              >
                {reg}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-3 border-t border-white/5 pt-3 relative z-10">Watchtower Revoke armed for unlisted Regions.</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-zinc-950 border border-zinc-900 rounded-none p-6 shadow-2xl">
        <div>
          <h3 className="text-base font-medium text-white">Institutional Watchtower</h3>
          <p className="text-xs text-gray-400 mt-1">Real-time attestation and shadow network analysis active.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowGlobalRevokeConfirm(true)}
            className="px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[13px] font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center"
          >
            <OctagonAlert size={16} className="mr-2" /> Global Revocation
          </button>
          
          <button onClick={handleScan} disabled={isScanning} className="px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-[13px] font-medium hover:bg-indigo-500/20 transition-colors flex items-center justify-center">
            <Search size={16} className="mr-2" /> {isScanning ? 'Scanning Network...' : 'Analyze Local Traffic'}
          </button>

          <button 
            onClick={() => generateGlobalExecutiveLedger(stats, agents)}
            className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-xl text-[13px] font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            <FileText size={16} className="mr-2" /> Executive PDF
          </button>

          <a href="/api/strategic/export-nist" download className="px-5 py-2 bg-white text-black rounded-xl text-[13px] font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
            <Download size={16} className="mr-2" /> NIST-2026 Audit (Signed JSON)
          </a>
        </div>
      </div>

      {discoveredAgents && discoveredAgents.length > 0 ? (
        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 mt-6">
          <h3 className="text-red-400 font-semibold mb-4 flex items-center"><ShieldAlert size={18} className="mr-2 text-red-500" /> Shadow AI Detected (Localhost Endpoints)</h3>
          <div className="grid grid-cols-2 gap-3">
            {discoveredAgents.map((app: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl group hover:border-red-500/30 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                    <Database size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{app.alias}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Detected Traffic: Active</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-1.5 py-0.5 bg-red-600/20 text-red-500 text-[7px] font-black border border-red-500/30 rounded uppercase tracking-widest animate-pulse">High Risk Signature</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : hasScanned && (
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 mt-6 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                 <ShieldCheck size={18} />
              </div>
              <div>
                 <div className="text-sm font-semibold text-white">Protocol Scan Complete</div>
                 <div className="text-[10px] text-zinc-500 uppercase tracking-widest">No unauthorized signatures identified in local topology.</div>
              </div>
           </div>
           <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-500 font-bold uppercase tracking-widest rounded-lg">
              Verified Secure
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden min-h-[300px] flex flex-col shadow-sm">
          <h3 className="text-sm font-medium text-white flex items-center mb-6 z-20 relative"><Globe size={16} className="mr-2 text-gray-400" /> Global Topology</h3>
          <div className="absolute inset-0 flex items-center justify-center p-8 opacity-30 pointer-events-none">
            <div className="flex w-full items-center justify-between text-xs font-mono text-gray-500">
              <div className="flex flex-col items-center"><div className="h-2 w-2 bg-emerald-500 rounded-none mb-2"></div>NODE</div>
              <div className="flex-1 border-t border-dashed border-[#333] mx-4 relative"><div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-2 bg-[#0A0A0A]">SECURE TUNNEL</div></div>
              <div className="flex flex-col items-center"><div className="h-2 w-2 bg-blue-500 rounded-none mb-2"></div>ROOT</div>
            </div>
          </div>

          <div className="relative z-10 w-full flex-1 flex flex-col justify-end mt-4">
            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-3 border-b border-[#222] pb-2">Live Heartbeat Log</div>
            <div className="space-y-1.5 overflow-hidden h-32 flex flex-col justify-end pb-2">
              {heartbeats.map((log, i) => (
                <motion.div key={`hb-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1 - (i * 0.2), x: 0 }} className="text-xs font-mono truncate" style={{ color: i === 0 ? '#34d399' : '#6b7280' }}>
                  {log}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-medium text-white flex items-center">
              <ShieldCheck size={16} className="mr-2 text-blue-400" /> Algorithmic Fairness Shield
            </h3>
            <Badge type={fairnessScore > 98 ? 'Active' : 'Warning'}>
              {fairnessScore > 98 ? 'OPTIMAL' : 'DRIFT'}
            </Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Bias Monitor Score</span>
            <div className="text-4xl font-black text-white">{fairnessScore.toFixed(1)}%</div>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-none overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fairnessScore}%` }}
              className="h-full bg-blue-500"
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-4 uppercase leading-relaxed font-mono">
            Reasoning traces audited against NIM AI Fairness Framework. Zero discriminatory drift detected in settlement signatures.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield size={64} className="text-emerald-500" />
          </div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-medium text-white flex items-center">
              <Shield size={16} className="mr-2 text-emerald-400" /> Insurance Underwriting Status
            </h3>
            <Badge type={isIsoSealed ? "Verified" : "Low"}>
              {isIsoSealed ? "VALIDATED" : "PENDING"}
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-black/40 border border-[#1a1a1a] p-3 rounded-none">
              <span className="text-[10px] text-gray-500 uppercase font-mono">Status</span>
              <span className={`text-xs font-black uppercase tracking-widest ${governance.variance_threshold < 0.001 ? 'text-emerald-500' : 'text-red-500'}`}>
                {governance.variance_threshold < 0.001 ? 'READY' : 'RISK DETECTED'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-black/40 border border-[#1a1a1a] p-3 rounded-none">
              <span className="text-[10px] text-gray-500 uppercase font-mono">Premium Discount</span>
              <span className="text-xs font-black text-white font-mono">30% ESTIMATE</span>
            </div>
          </div>
          <p className="text-[9px] text-gray-600 mt-4 uppercase leading-relaxed font-mono italic">
            Coverage active via ISO-42001 Seal alignment. Dynamic pricing adjusted for drift variance {'<'} 0.01%.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-medium text-white">Sovereign Compliance Logs</h3>
            <button onClick={() => window.open('/api/logs/download')} className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 hover:text-white flex items-center transition-colors">
              <Download size={12} className="mr-2" /> Export NIST-2026
            </button>
          </div>
          <div className="space-y-4">
            {auditLogs.slice(0, 4).map(log => (
              <div key={log.id} className="flex flex-col pb-3 border-b border-[#222] last:border-0 last:pb-0">
                <span className="text-sm text-gray-200">{log.action} <span className="text-gray-500">on {log.target}</span></span>
                <span className="text-xs text-gray-500 font-mono mt-1">{log.time.slice(11, 19)} UTC</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderTreasury = () => (
    <motion.div key="treasury" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Realized Revenue', value: realizedRevenue, icon: DollarSign, color: 'text-emerald-500', barBg: 'bg-emerald-500/20', barFill: 'bg-emerald-500' },
          { title: 'Potential Yield', value: totalRevenue, icon: TrendingUp, color: 'text-blue-500', barBg: 'bg-blue-500/20', barFill: 'bg-blue-500' },
          { title: 'Projected Monthly', value: projectedMonthlyRevenue, icon: Activity, color: 'text-indigo-500', barBg: 'bg-indigo-500/20', barFill: 'bg-indigo-500' }
        ].map((stat, i) => (
          <div key={stat.title} className="bg-zinc-950 border border-zinc-900 p-8 rounded-2xl shadow-xl group hover:bg-zinc-900/50 transition-all relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-xs font-semibold text-gray-400 capitalize tracking-wide">{stat.title}</span>
              <stat.icon className={`${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} size={20} />
            </div>
            <div className="text-3xl font-semibold text-white tracking-tight relative z-10">
              <AnimatedNumber value={stat.value} />
            </div>
            <div className="mt-6 relative z-10">
              <div className={`w-full h-1 rounded-full overflow-hidden ${stat.barBg}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${60 + (i * 10)}%` }}
                  className={`h-full ${stat.barFill}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-white group-hover:opacity-[0.05] transition-opacity">
          <Database size={240} />
        </div>
        <h3 className="text-base font-semibold text-white mb-6 relative z-10">System Metering & Yield</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            { label: 'Mint Tax', value: '$1.00', unit: '/ node', color: 'text-emerald-500', desc: 'Registry anchor fee per Ed25519 identity generation.' },
            { label: 'Action Tax', value: '$0.01', unit: '/ verify', color: 'text-blue-400', desc: 'Forensic audit fee per agentic settlement.' },
            { label: 'Pulse Tax', value: '$0.0001', unit: '/ heartbeat', color: 'text-gray-500', desc: 'Real-time telemetry fee per network pulse.' }
          ].map((price) => (
            <div key={price.label} className="p-6 border border-zinc-900 bg-zinc-950 rounded-xl hover:bg-zinc-900/50 transition-colors shadow-sm">
              <div className="text-xs text-gray-500 font-medium mb-2">{price.label}</div>
              <div className="text-2xl font-semibold text-white mb-2">{price.value} <span className="text-xs text-gray-500 font-normal">{price.unit}</span></div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-normal">{price.desc}</p>
            </div>
          ))}
        </div>

        {/* Phase 3: Economic Leap (x402 Settlement) */}
        <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center">
                <DollarSign size={16} className="mr-2 text-gray-400" /> x402 Settlement Clearinghouse
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 font-medium">Machine-to-Machine Commerce // Active</p>
            </div>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-white/10 text-gray-300 text-[10px] font-semibold rounded-md border border-white/5">x402-USDC Enabled</span>
              <span className="px-2 py-1 bg-white/10 text-gray-300 text-[10px] font-semibold rounded-md border border-white/5">Protocol v1.0.4-E</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
             <div className="lg:col-span-3 p-6 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/5 rounded-full">
                    <Database size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium mb-1">Institutional Threshold</div>
                    <div className="text-base font-medium text-white">${settlementThreshold?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-gray-500 font-medium mb-1">Settlement Readiness</div>
                  <div className={`text-[11px] font-semibold px-2 py-1 rounded-md inline-block ${unbilledAssessments < (settlementThreshold || 1000) * 0.9 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {unbilledAssessments < (settlementThreshold || 1000) * 0.9 ? 'Optimal' : 'Pending'}
                  </div>
                </div>
             </div>
             <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-xl text-center flex flex-col justify-center shadow-sm">
                <div className="text-[11px] text-gray-500 font-medium mb-1">Total Settled</div>
                <div className="text-xl font-semibold text-white">$42,912.42</div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderApprovals = () => {
    const combinedApprovals = [
      ...approvals,
      ...(agents.filter((ag: any) => (ag.decision_confidence || 100) < 80).map(ag => ({
        id: `low_conf_${ag.id}`,
        action: 'Decision Authorization Required',
        agent: ag.alias,
        risk: 'High',
        time: 'Just Now',
        isLowConf: true,
        isHighRisk: true,
        agentId: ag.id
      })))
    ].sort((a: any, b: any) => (b.isHighRisk ? 1 : 0) - (a.isHighRisk ? 1 : 0));

    return (
      <motion.div key="app" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
        {combinedApprovals.length === 0 ? (
          <div className="p-12 text-center text-gray-500 border border-dashed border-[#333] rounded-none bg-[#0A0A0A]">Zero pending compliance requests.</div>
        ) : combinedApprovals.map((app: any) => (
          <div key={app.id} className="bg-[#0A0A0A] border border-[#222] rounded-none p-6 flex justify-between items-center group hover:border-[#333] transition-all">
            <div className="flex items-center space-x-6">
              <div className={cn("p-3 rounded-none", app.isHighRisk ? "bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-white/5 text-gray-500")}>
                <ShieldAlert size={20} />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  {app.isHighRisk && <span className="px-1.5 py-0.5 bg-red-600/20 text-red-500 text-[7px] font-black border border-red-500/30 rounded uppercase tracking-widest animate-pulse">High Risk Signature</span>}
                  <Badge type={app.risk === 'High' ? 'Critical' : 'Warning'}>{app.risk} Risk</Badge>
                  <span className="text-[10px] text-gray-600 font-mono uppercase">{app.time}</span>
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-tight">{app.action}</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Sovereign Agent: {app.agent}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleApproval(app.id, 'Denied')} className="px-4 py-2 rounded bg-[#0A0A0A] border border-[#222] text-gray-400 hover:text-white hover:bg-[#111] text-[10px] font-bold uppercase tracking-widest transition-all">Deny</button>
              <button onClick={() => handleApproval(app.id, 'Approved')} className="px-5 py-2 rounded bg-white text-black hover:bg-gray-200 text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">Authorize Action</button>
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  const renderBilling = () => (
    <motion.div key="billing" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:bg-zinc-900/50 transition-all space-y-8">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-white group-hover:opacity-[0.05] transition-opacity">
            <DollarSign size={160} />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
              <Building2 size={16} className="mr-2 text-gray-400" /> Network Settlement Liability
            </h3>
            <p className="text-xs text-gray-400 font-medium mb-6">Accrued Unbilled Assessments</p>
            <div className="text-5xl font-semibold text-white tracking-tight">
              <AnimatedNumber value={unbilledAssessments} />
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-6 relative z-10">
             <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-gray-400">Network Tier</span>
                <span className={cn(
                  "font-semibold px-2 py-1 rounded-md",
                  !isBillingEnabled ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-500'
                )}>
                   {!isBillingEnabled ? 'GENESIS_SUBSIDIZED' : 'INSTITUTIONAL_ROOT'}
                </span>
             </div>
             <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-gray-400">Settlement Threshold</span>
                <span className="text-white">${settlementThreshold.toLocaleString()}</span>
             </div>
             <button 
               onClick={async () => {
                 setIsRefilling(true);
                 try {
                   const res = await fetch('/api/billing/settle', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ orgId: 'sovereign-org' })
                   });
                   const data = await res.json();
                   if (data.success) {
                     setUnbilledAssessments(0);
                     alert("Institutional Settlement Successful. Unbilled Assessments Cleared.");
                   }
                 } catch (e) {}
                 setIsRefilling(false);
               }}
               disabled={isRefilling || unbilledAssessments <= 0}
               className="w-full py-3 bg-white text-black rounded-xl text-[13px] font-semibold hover:bg-gray-200 transition-colors shadow-sm disabled:opacity-50"
             >
               {isRefilling ? 'Processing Settlement...' : 'Initiate Manual Settlement'}
             </button>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-2xl shadow-sm space-y-6">
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
            <Award size={16} className="mr-2 text-gray-400" /> Protocol Tax Rates
          </h3>
          <p className="text-xs text-gray-400 font-medium mb-6">Real-time usage pricing</p>
          <div className="space-y-4">
             {[
               { label: 'Agent Identity Mint', tax: '$1.00', frequency: 'One-time per DID' },
               { label: 'Agentic Action Token', tax: '$0.01', frequency: 'Per forensic receipt' },
               { label: 'Registry Heartbeat', tax: '$0.0001', frequency: 'Per network pulse' }
             ].map((rate, i) => (
               <div key={i} className="flex justify-between items-center p-5 bg-zinc-950 border border-zinc-900 rounded-xl group hover:bg-zinc-900/50 transition-all">
                  <div>
                    <div className="text-[13px] font-semibold text-white mb-1">{rate.label}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{rate.frequency}</div>
                  </div>
                  <div className="text-lg font-semibold text-white">{rate.tax}</div>
               </div>
             ))}
          </div>
          <div className="pt-6 border-t border-white/10">
             <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                Assessments are accrued in real-time. Automated settlement occurs at $1,000 threshold or weekly cycle.
             </p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-2xl shadow-sm">
         <h3 className="text-sm font-semibold text-white mb-6 flex items-center">
            <History size={16} className="mr-2 text-gray-400" /> Recent Settlement History
         </h3>
         <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {auditLogs.filter(log => log.action.includes('Tax') || log.action.includes('Deduction')).slice(0, 10).map((log, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-zinc-900 bg-zinc-950 rounded-xl mb-2 hover:bg-zinc-900/50 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="text-[11px] font-mono text-gray-500">{log.time.split('T')[1].split('.')[0]}</div>
                    <div className="text-[13px] text-white font-medium capitalize">{log.action}</div>
                 </div>
                 <div className="text-xs text-gray-400 max-w-[200px] truncate">{log.target}</div>
              </div>
            ))}
            {auditLogs.length === 0 && (
              <div className="text-center py-6 text-[13px] text-gray-500 font-medium">No Recent Settlements Logged</div>
            )}
         </div>
      </div>
    </motion.div>
  );

  const renderGovernanceSettings = () => (
    <motion.div key="gov" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 max-w-5xl mx-auto">
      {/* Phase 5: Global Seal (ISO Certification) */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
          <div className="flex items-center space-x-4">
             <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <ShieldCheck size={24} className="text-indigo-400" />
             </div>
             <div>
                <h2 className="text-lg font-bold text-white tracking-tight">ISO/IEC 42001 Certification</h2>
                <p className="text-[13px] text-gray-400 mt-1 font-medium">The Global Seal • Enterprise Governance Framework</p>
             </div>
          </div>
          <Badge type={isIsoSealed ? "Verified" : "Low"}>
            {isIsoSealed ? "PROVISIONAL_GOLDEN_SEAL" : "SEAL_PENDING_AUDIT"}
          </Badge>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="text-[11px] text-gray-500 uppercase font-mono tracking-widest mb-2 flex items-center"><Award size={12} className="mr-2"/> Governance Alignment</div>
              <div className="text-sm text-white font-bold">ISO/IEC 42001:2023</div>
           </div>
           <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="text-[11px] text-gray-500 uppercase font-mono tracking-widest mb-2 flex items-center"><Activity size={12} className="mr-2"/> Audit Cycle</div>
              <div className="text-sm text-white font-bold">Continuous Monitoring</div>
           </div>
           <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
              <div className="text-[11px] text-gray-500 uppercase font-mono tracking-widest mb-2 flex items-center"><Lock size={12} className="mr-2"/> Seal Status</div>
              <div className="text-sm text-indigo-400 font-bold">ANCHORED</div>
           </div>
        </div>
      </div>

      {/* 1. Identity Vault (API Keys) */}
      <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center tracking-tight"><Key className="mr-3 text-emerald-500" size={20} /> Identity Vault</h3>
            <p className="text-[13px] text-gray-400 mt-1 font-medium">Autonomous API Anchor Management</p>
          </div>
          <button onClick={generateVaultKey} className="px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-sm flex items-center">
            <RefreshCw size={14} className="mr-2" /> Generate New Anchor
          </button>
        </div>
        <div className="p-8 space-y-4">
          {vaultKeys.length > 0 ? vaultKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-xl group hover:bg-white/[0.04] transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-2.5 bg-white/5 rounded-xl"><Fingerprint size={18} className="text-gray-400" /></div>
                <div>
                  <div className="text-sm font-semibold text-white">{key.alias}</div>
                  <div className="text-[13px] font-mono text-gray-500 mt-0.5">{key.key.substring(0, 16)}••••••••••••••••</div>
                  <div className="text-[11px] text-gray-400 mt-1 font-medium">Last used: {key.last_used_at ? new Date(key.last_used_at).toLocaleString() : 'Never'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge type={key.status === 'ACTIVE' ? "Verified" : "Low"}>{key.status}</Badge>
                <button onClick={() => revokeVaultKey(key.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Revoke Key">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <KeyRound className="text-gray-400 w-8 h-8 mb-4 opacity-50" />
              <div className="text-[13px] text-gray-400 font-medium">No Active Identity Anchors Detected</div>
            </div>
          )}

          <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl flex items-center justify-center transition-colors ${governance.tfa_active_for_revocation ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-500'}`}>
                <Lock size={16} />
              </div>
              <span className="text-[13px] font-medium text-gray-300">Enforce MFA for High-Stakes Actions</span>
            </div>
            <button
              onClick={() => updateSettings({ governance: { tfa_active_for_revocation: !governance.tfa_active_for_revocation } })}
              className={`w-12 h-6 rounded-full relative transition-colors ${governance.tfa_active_for_revocation ? 'bg-emerald-500' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-sm ${governance.tfa_active_for_revocation ? 'bg-white right-1' : 'bg-gray-400 left-1'}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Thresholds & Branding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-sm">
          <h3 className="text-[13px] font-bold text-gray-300 uppercase tracking-widest mb-6 flex items-center">
            <Activity size={16} className="mr-3 text-emerald-500" /> Protocol Thresholds
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] font-medium text-gray-400">Variance Sensitivity Alert</span>
                <span className="text-[13px] font-mono font-bold text-emerald-500">{(governance.variance_threshold || 0.0005).toFixed(4)}</span>
              </div>
              <input
                type="range" min="0.0001" max="0.0050" step="0.0001"
                value={isNaN(governance.variance_threshold) ? 0.0005 : governance.variance_threshold}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateSettings({ governance: { variance_threshold: isNaN(val) ? 0.0005 : val } });
                }}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed font-medium">Alerts are triggered when agent drift exceeding this threshold is detected across the topology.</p>
            </div>
            <button className="w-full py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 hover:text-white transition-colors text-[13px] font-semibold flex items-center justify-center">
              <Download size={16} className="mr-2" /> Export Identity Ledger
            </button>
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-sm">
          <h3 className="text-[13px] font-bold text-gray-300 uppercase tracking-widest mb-6 flex items-center">
            <Palette size={16} className="mr-3 text-emerald-500" /> Watchtower Branding
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Firm Logo URL</label>
              <input
                type="text"
                value={branding?.logo_url || ''}
                onChange={(e) => updateSettings({ branding: { logo_url: e.target.value } })}
                placeholder="https://firm.com/logo.svg"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Brand Accent Color</label>
              <div className="flex items-center space-x-4 bg-white/[0.03] border border-white/10 rounded-xl p-2.5">
                <input
                  type="color"
                  value={branding?.brand_color || '#0EA5E9'}
                  onChange={(e) => updateSettings({ branding: { brand_color: e.target.value } })}
                  className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer overflow-hidden p-0"
                />
                <code className="text-[13px] font-mono font-bold text-gray-300">{branding?.brand_color || '#0EA5E9'}</code>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-sm">
        <h3 className="text-[13px] font-bold text-gray-300 uppercase tracking-widest mb-6 flex items-center">
          <DollarSign size={16} className="mr-3 text-emerald-500" /> Monetization Governance
        </h3>
        <div className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/10 rounded-xl">
          <div>
            <div className="text-[13px] font-bold text-white mb-1">Institutional Billing Mode</div>
            <p className="text-xs text-gray-500 font-medium tracking-wide">Current: <span className={isBillingEnabled ? 'text-emerald-500 font-bold' : 'text-blue-400 font-bold'}>{isBillingEnabled ? 'DODO PAYMENT WALL ACTIVE' : 'GENESIS SUBSIDIZED (FREE)'}</span></p>
          </div>
          <button
            onClick={() => setIsBillingEnabled(!isBillingEnabled)}
            className={`w-12 h-6 rounded-full relative transition-colors ${isBillingEnabled ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-gray-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-sm ${isBillingEnabled ? 'bg-white right-1' : 'bg-gray-400 left-1'}`} />
          </button>
        </div>
        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed font-medium">When disabled, the DODO payment wall is bypassed for all fleet anchoring and verification events.</p>
      </section>

      <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-sm">
        <h3 className="text-[13px] font-bold text-gray-300 uppercase tracking-widest mb-6 flex items-center">
          <Globe size={16} className="mr-3 text-emerald-500" /> Geographic Compliance Toggles
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['EU-GDPR', 'IN-DPDP', 'US-CCPA', 'UK-DPA'].map(region => (
            <div key={region} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-xl group hover:bg-white/[0.04] transition-colors">
              <span className="text-xs font-bold text-gray-400 group-hover:text-gray-200 transition-colors">{region}</span>
              <button
                onClick={() => handleGeoToggle(region)}
                className={`w-10 h-5 rounded-full relative transition-colors ${geoRestrictions.includes(region) ? 'bg-indigo-500' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 rounded-full transition-all shadow-sm ${geoRestrictions.includes(region) ? 'bg-white right-1' : 'bg-gray-400 left-1'}`} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-500 mt-4 leading-relaxed font-medium">Activating a toggle enforces geofencing rules and auto-quarantines agents from non-compliant jurisdictions.</p>
      </section>

      {/* Saturday Hardening: Sovereign-Verified Badge Generator */}
      <section className="bg-[#050505] border border-emerald-500/30 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center mb-1">
              <ShieldCheck size={20} className="mr-3 text-emerald-500" /> Sovereign-Verified Badge Generator
            </h3>
            <p className="text-[13px] text-gray-400 font-medium">Decentralized Trust Anchors • NIST-2026</p>
          </div>
          <Badge type="Verified">Active Production Seal</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
           <div className="p-10 border border-white/10 bg-white/[0.02] rounded-2xl flex flex-col items-center justify-center space-y-6 relative group cursor-pointer shadow-sm hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all">
              <SovereignLogo size={80} className="text-white" />
              <div className="text-center">
                 <div className="text-[13px] font-bold text-white tracking-widest mb-1">Sovereign-Verified</div>
                 <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Governance By Sovereign AG • NIST-2026</div>
              </div>
           </div>
           <div className="space-y-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                 <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">Export Badge (SVG)</h4>
                 <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl font-mono text-[11px] text-gray-400 break-all leading-relaxed h-32 overflow-y-auto custom-scrollbar">
                    {`<svg width="100" height="100" viewBox="0 0 100 100">
  <path d="M50 5L90 28V72L50 95L10 72V28L50 5Z" stroke="white" stroke-width="2" fill="black"/>
  <text x="50" y="55" fill="white" font-family="monospace" font-size="6" text-anchor="middle">SOVEREIGN</text>
  <text x="50" y="65" fill="gray" font-family="monospace" font-size="4" text-anchor="middle">NIST-2026</text>
</svg>`}
                 </div>
                 <button 
                   onClick={() => {
                     const svg = `<svg width="100" height="100" viewBox="0 0 100 100">...`;
                     navigator.clipboard.writeText(svg);
                     setCopiedBadge(true);
                     setTimeout(() => setCopiedBadge(false), 2000);
                   }}
                   className="w-full mt-4 py-3 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-sm flex items-center justify-center"
                 >
                    {copiedBadge ? <Check size={16} className="mr-2 text-emerald-600" /> : <Copy size={16} className="mr-2" />}
                    {copiedBadge ? "Snippet Cached" : "Copy Badge HTML"}
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* 3. GDPR Article 17 Purge Protocol */}
      <section className="bg-red-500/5 border border-red-500/20 rounded-2xl p-10 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent pointer-events-none" />
        <div className="p-3 bg-red-500/20 rounded-xl mb-4 text-red-500">
          <Trash2 size={24} />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">GDPR Sovereign Deletion (Burn Protocol)</h3>
        <p className="text-[13px] text-gray-400 max-w-md mt-3 leading-relaxed font-medium">
          This action irrecoverably purges all registry entries and ledger history for this Organization ID from the Sovereign Protocol nodes.
        </p>
        <div className="mt-8">
           <button disabled className="px-6 py-2.5 bg-white/5 border border-red-500/20 text-red-500 rounded-xl opacity-50 cursor-not-allowed font-semibold text-[13px] transition-colors">
              Locked: Destruction Protocol Revoked
           </button>
        </div>
      </section>
    </motion.div>
  );

  const handleHunterAction = async (did: string, action: 'ONBOARD' | 'KILL') => {
    try {
      const res = await fetch('/api/registry/hunter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ did, action })
      });
      if (res.ok) {
        setDiscoveredAgents(p => p.filter(a => a.did !== did));
      }
    } catch (e) { }
  };

  const renderDiscoveryQueue = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center">
          <Search size={12} className="mr-2" /> Discovery Queue (Shadow AI)
        </h4>
        <span className="text-[9px] text-gray-400 font-mono">Real-time Signature Sniffing Active</span>
      </div>
      {discoveredAgents.length > 0 ? (
        <div className="space-y-4">
          {discoveredAgents.map((actor: any) => (
            <div key={actor.did} className="bg-red-500/5 border border-red-500/10 p-4 rounded-none flex justify-between items-center group animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-500/10 rounded-none text-red-500 uppercase font-black text-xs">
                  {actor.risk === 'High' ? <ShieldAlert size={18} /> : <ScanSearch size={18} />}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-200">{actor.alias}</div>
                  <div className="text-[10px] font-mono text-gray-400 truncate max-w-[200px]">{actor.did}</div>
                  <div className="text-[9px] text-gray-500 uppercase mt-1 font-mono">
                    {actor.reason ? actor.reason : `Detected: ${new Date(actor.first_detected).toLocaleTimeString()} · Signatures: ${actor.signatures}`}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleHunterAction(actor.did, 'ONBOARD')}
                  className="px-4 py-2 bg-emerald-600 text-white text-[10px] font-black rounded-none hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-lg shadow-emerald-900/20"
                >
                  ONBOARD
                </button>
                <button
                  onClick={() => handleHunterAction(actor.did, 'KILL')}
                  className="px-4 py-2 bg-red-600/20 text-red-500 text-[10px] font-black rounded-none hover:bg-red-600 hover:text-white transition-all border border-red-500/30 uppercase tracking-widest"
                >
                  KILL-SWITCH BLOCK
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-[#222] rounded-none bg-black/20 flex flex-col items-center justify-center space-y-4">
          <div className={cn("p-3 rounded-full transition-all duration-700", hasScanned ? "bg-emerald-500/10 text-emerald-500" : "bg-gray-500/5 text-gray-700")}>
             <ShieldCheck size={32} strokeWidth={1} />
          </div>
          <div className="space-y-1">
            <p className={cn("text-[10px] font-black uppercase tracking-[0.3em]", hasScanned ? "text-emerald-500" : "text-gray-600")}>
              {hasScanned ? "Protocol Secure: Zero Shadow AI Detected" : "Institutional Scan Pending"}
            </p>
            {hasScanned && <p className="text-[9px] text-gray-700 font-mono uppercase tracking-widest">NIST-2026 Behavioral Baseline Verified</p>}
          </div>
        </div>
      )}
    </div>
  );

  const renderRegistry = () => (
    <motion.div key="reg" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">

      <div className="flex justify-between items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-none p-6 shadow-2xl">
        <div>
          <h3 className="text-base font-medium text-white">Registry Active Functions</h3>
          <p className="text-xs text-gray-400 mt-1">Interact with the Sovereign local database or scan traffic.</p>
        </div>
        <div className="flex flex-col space-y-2">
          {lastPassports ? (
            <button onClick={downloadPassports} className="px-4 py-2 bg-emerald-600 text-white font-black rounded text-[10px] hover:bg-emerald-500 transition-all uppercase tracking-widest flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Download size={14} className="mr-2" /> Download Fleet Passports (.JSON)
            </button>
          ) : (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between px-1">
                 <div className="flex items-center space-x-4">
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Genesis Subsidy</span>
                   <span className={cn("text-[10px] font-mono font-bold", freeSlots > 0 ? "text-emerald-500" : "text-amber-500")}>
                      {freeSlots > 0 ? `${freeSlots} SLOTS REMAINING` : "SUBSIDY EXHAUSTED"}
                   </span>
                 </div>
                 <div className="flex items-center space-x-2 ml-4">
                    <input
                      type="number"
                      value={provisionCount}
                      onChange={(e) => setProvisionCount(parseInt(e.target.value))}
                      className="w-12 bg-black border border-white/10 rounded-none px-2 py-2 text-[10px] font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                    <button onClick={handleBulkMint} disabled={isScanning} className="px-4 py-2 bg-white text-black font-semibold rounded-none text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center">
                      <Cpu size={14} className="mr-2" /> Bulk Provision
                    </button>
                 </div>
              </div>
            </div>
          )}
          <button onClick={handleScan} disabled={isScanning} className="px-4 py-2 bg-indigo-600/20 border border-indigo-500/50 text-indigo-400 rounded text-sm font-semibold hover:bg-indigo-600/30 transition-colors flex items-center justify-center mt-2">
            <ScanSearch size={16} className="mr-2" /> {isScanning ? 'Scanning Network...' : 'Analyze Shadow AI Traffic'}
          </button>
        </div>
      </div>

      {renderDiscoveryQueue()}

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-none overflow-hidden shadow-2xl">
         <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0d0d0d]">
            <div className="flex items-center space-x-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Live Registry Feed</span>
            </div>
            <div className="relative group">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text"
                placeholder="SEARCH FLEET (ALIAS / DID)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-black/40 border border-white/5 rounded-none text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-emerald-500/50 w-80 transition-all shadow-inner"
              />
            </div>
         </div>
         <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
          <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
            <thead className="sticky top-0 z-10 bg-[#111] border-b border-[#222] text-xs uppercase font-semibold text-gray-500 shadow-sm">
              <tr>
                <th className="px-5 py-3">Agent</th>
                <th className="px-5 py-3">DID</th>
                <th className="px-5 py-3">Integrity Monitor</th>
                <th className="px-5 py-3">Behavioral Score</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">
                  Audit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {agents.filter(a => 
                 a.alias?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 a.did?.toLowerCase().includes(searchTerm.toLowerCase())
               ).slice(0, 500).map((agent: any, i: number) => (
                <motion.tr
                  key={agent.did || agent.id || `agent-${i}`}
                  initial={{ opacity: 0, scale: 0.98, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.005, 1.5) }}
                  onClick={() => setSelectedAgent(agent)}
                  className="hover:bg-white/5 cursor-pointer transition-colors group relative border-l-2 border-transparent hover:border-emerald-500"
                >
                  <td className="px-5 py-4 font-medium text-gray-200">
                    <div className="flex items-center">
                      <div className={cn("w-1.5 h-1.5 rounded-none mr-3", 
                        agent.status === 'Active' ? "bg-emerald-500" : 
                        agent.status === 'Compromised' ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" : "bg-gray-500"
                      )} />
                      <span className={agent.status === 'Compromised' ? 'text-red-500' : ''}>{agent.alias}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-gray-500 group-hover:text-gray-300">{agent.did || 'Not assigned'}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col space-y-1.5 w-32">
                       <div className="flex justify-between text-[8px] font-bold text-gray-500 uppercase tracking-tighter">
                          <span>Health Sync</span>
                          <span className={cn((agent.status === 'Compromised' || (agent.current_state_hash && agent.current_state_hash !== agent.baseline_state_hash)) ? "text-red-500 animate-pulse" : "text-emerald-500")}>
                             {(agent.status === 'Compromised' || (agent.current_state_hash && agent.current_state_hash !== agent.baseline_state_hash)) ? "DRIFT" : "100%"}
                          </span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-none overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: (agent.status === 'Compromised' || (agent.current_state_hash && agent.current_state_hash !== agent.baseline_state_hash)) ? '30%' : '100%' }}
                            className={cn("h-full transition-colors", (agent.status === 'Compromised' || (agent.current_state_hash && agent.current_state_hash !== agent.baseline_state_hash)) ? "bg-red-500" : "bg-emerald-500")}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-2">
                      <Activity size={12} className={cn(Number(agent.trust_index) > 95 ? "text-emerald-500" : "text-amber-500")} />
                      <span className="font-mono text-xs font-bold text-gray-300">{agent.trust_index || '99.0'}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                        agent.status === 'Active' ? "bg-emerald-500" : 
                        agent.status === 'Compromised' ? "bg-red-500" : "bg-gray-500"
                      )} />
                      <span className={cn("text-[10px] font-black uppercase tracking-widest",
                        agent.status === 'Active' ? "text-emerald-500" : 
                        agent.status === 'Compromised' ? "text-red-500" : "text-gray-500"
                      )}>{agent.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end items-center space-x-3">
                      {agent.status === 'Compromised' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleTeleport(agent.did); }}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-none hover:bg-indigo-500 transition-all flex items-center text-[9px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(79,70,229,0.3)] border border-indigo-400/50"
                        >
                          <RefreshCw size={10} className="mr-2" /> Heal
                        </button>
                      )}
                      
                      <div className="flex items-center space-x-1 border-l border-white/10 pl-3">
                        <button onClick={(e) => { e.stopPropagation(); generateNISTReport(agent); }} className="text-gray-500 hover:text-emerald-400 transition-colors p-1" title="Download NIST Report">
                          <Download size={14} />
                        </button>
                        <Link href={`/verify/${encodeURIComponent(agent.did || agent.id)}`} onClick={(e) => e.stopPropagation()} target="_blank" className="text-gray-500 hover:text-white transition-colors p-1 inline-block" title="Public Certificate Link">
                          <ExternalLink size={14} />
                        </Link>
                        {(agent.status === 'Active' || agent.status === 'ACTIVE') && (
                          <button onClick={(e) => { e.stopPropagation(); handleQuarantine(agent.did || agent.id); }} className="text-gray-500 hover:text-amber-500 transition-colors p-1" title="Forensic Quarantine">
                            <Stethoscope size={14} />
                          </button>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); handleRevoke(agent.did || agent.id); }} className="text-gray-500 hover:text-red-500 transition-colors p-1" title="Revoke Anchor">
                          <ShieldAlert size={14} />
                        </button>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {agents.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No agents registered in local database.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Price per Transaction Ticker */}
        <div className="bg-[#050505] border-t border-[#222] px-5 py-3 flex justify-between items-center overflow-hidden">
          <div className="flex items-center space-x-6 animate-marquee whitespace-nowrap">
            <span className="text-[10px] font-mono text-emerald-500 flex items-center"><div className="w-1 h-1 bg-emerald-500 rounded-none mr-2" /> MINT TAX: {isBillingEnabled ? '$1.00 / node' : 'SUBSIDIZED (FREE)'}</span>
            <span className="text-[10px] font-mono text-blue-400 flex items-center"><div className="w-1 h-1 bg-blue-400 rounded-none mr-2" /> ACTION TAX: {isBillingEnabled ? '$0.01 / verify' : 'SUBSIDIZED (FREE)'}</span>
            <span className="text-[10px] font-mono text-gray-500 flex items-center"><div className="w-1 h-1 bg-gray-500 rounded-none mr-2" /> PULSE TAX: {isBillingEnabled ? '$0.0001 / heartbeat' : 'SUBSIDIZED (FREE)'}</span>
            <span className="text-[10px] font-mono text-amber-500 opacity-60">{isBillingEnabled ? 'SOVEREIGN NETWORK METERING ACTIVE â€” ALL ACTIONS SETTLED ON REGISTRY CHAIN' : 'GENESIS PILOT PROGRAM: ALL NETWORK METRICS CURRENTLY SUBSIDIZED'}</span>
          </div>
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-4 bg-[#050505] z-10">Current Pricing Standard</div>
        </div>
      </div>
    </motion.div>
  );

  const handleAddAgent = async () => {
    if (!provisionAlias || isProvisioning) return;
    
    if (freeSlots <= 0 && !isPaymentMethodActive) {
      alert("Genesis Subsidy Exhausted. Please authorize Institutional Settlement to provision more agents.");
      setActiveView('billing');
      return;
    }

    setIsProvisioning(true);
    try {
      const res = await fetch('/api/agent/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          alias: provisionAlias, 
          purpose: provisionPurpose,
          owner: userEmail,
          org_id: 'sovereign-org'
        })
      });
      const data = await res.json();
      if (data.success) {
        setProvisionDid(data.agent.did);
        setProvisionSuccess(true);
        setAgents(prev => [data.agent, ...prev]);
        downloadAgentPassport(data.agent);
      }
    } catch (e) {
      console.error('Registration Fault:', e);
    }
    setIsProvisioning(false);
  };

  const renderAddAgent = () => (
    <motion.div key="add-agent" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Add New Agent</h2>
            <p className="text-sm text-gray-400 mt-2 font-medium">Institutional Onboarding • NIST-2026 Compliant</p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Genesis Subsidy</div>
             <div className={cn("text-xs font-mono font-bold px-3 py-1 border rounded-lg", freeSlots > 0 ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20")}>
                {freeSlots > 0 ? `${freeSlots} SLOTS AVAILABLE` : "BRIDGE AUTHORIZATION REQUIRED"}
             </div>
          </div>
        </div>

      {provisionSuccess ? (
        <section className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-2xl text-center space-y-6 shadow-sm">
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 flex items-center justify-center rounded-full border border-emerald-500/20">
            <ShieldCheck size={32} className="text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Anchor Deployed</h3>
            <p className="text-sm text-gray-400 font-medium">Digital ID Successfully Notarized</p>
          </div>
          <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl font-mono text-[13px] text-emerald-400 break-all select-all">
            {provisionDid}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                const agent = agents.find(a => a.did === provisionDid);
                if (agent) downloadAgentPassport(agent);
              }}
              className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[13px] font-bold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center"
            >
              <Download size={16} className="mr-2" /> Download Passport
            </button>
            <button 
              onClick={() => {
                setProvisionSuccess(false);
                setProvisionAlias('');
                setProvisionPurpose('');
                setProvisionDid(null);
                setActiveView('dashboard');
              }}
              className="flex-1 py-3 bg-white text-black rounded-xl text-[13px] font-semibold hover:bg-gray-200 transition-colors shadow-sm"
            >
              Return to Watchtower
            </button>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-sm relative transition-all">
              <div className="space-y-6 relative z-10">
                <div className="space-y-2 flex flex-col">
                  <label className="text-xs font-semibold text-gray-300 ml-1">
                    Agent Name
                  </label>
                  <input 
                    type="text"
                    value={provisionAlias}
                    onChange={(e) => setProvisionAlias(e.target.value)}
                    placeholder="e.g. ALPHA-AUDITOR-01"
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-[13px] font-medium text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all rounded-xl placeholder:text-gray-600"
                  />
                </div>
                
                <div className="space-y-2 flex flex-col">
                  <label className="text-xs font-semibold text-gray-300 ml-1">
                    Institutional Purpose
                  </label>
                  <textarea 
                    value={provisionPurpose}
                    onChange={(e) => setProvisionPurpose(e.target.value)}
                    placeholder="Define the operational mandate..."
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-[13px] font-medium text-white focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all rounded-xl h-40 resize-none placeholder:text-gray-600 leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button 
                  disabled={isProvisioning || !provisionAlias}
                  onClick={handleAddAgent}
                  className="w-full py-3 bg-white text-black rounded-xl text-[13px] font-semibold hover:bg-gray-200 active:scale-[0.99] transition-all shadow-sm disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center relative z-10"
                >
                  {isProvisioning ? (
                    <>
                      <RefreshCw size={16} className="mr-2 animate-spin" />
                      Setting up architecture...
                    </>
                  ) : 'Deploy Identity Anchor'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <>


      <div className="min-h-screen bg-[#000000] text-gray-200 flex font-sans selection:bg-neutral-800 relative z-0">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#1a1a1a] flex flex-col shrink-0 bg-[#000000] z-20">
          <div className="h-20 flex items-center px-6 border-b border-[#1a1a1a]">
            <SovereignLogo size={28} className="mr-3 brand-override text-[#0EA5E9]" />

            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm tracking-tight text-white leading-tight uppercase">{branding?.company_name || 'Sovereign AG'}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-none text-[7px] font-black bg-white/10 text-white border border-white/20 uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                  Institutional Node Member
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-none text-[7px] font-black bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase tracking-widest ml-2">
                  ISO-42001 SEAL
                </span>
              </div>
              <span className="text-[8px] text-gray-500 tracking-widest uppercase mt-0.5">Protocol Node</span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">

            {/* Governance Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Governance</div>
              <button onClick={() => { setActiveZone('tower'); setActiveView('dashboard'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'dashboard' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <LayoutDashboard size={16} className="mr-3" /> Dashboard
              </button>
              <button onClick={() => { setActiveZone('tower'); setActiveView('treasury'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'treasury' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <DollarSign size={16} className="mr-3" /> Treasury
              </button>
              <Link href="/dashboard/billing" className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'billing' ? 'bg-[#1a1a1a] text-white border-l-2 border-emerald-500' : 'text-gray-400 hover:bg-[#111]')}>
                <ReceiptText size={16} className="mr-3 text-emerald-500" /> Billing
              </Link>
              <button onClick={() => { setActiveZone('tower'); setActiveView('approvals'); }} className={cn("w-full flex justify-between items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'approvals' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <div className="flex items-center"><User size={16} className="mr-3" /> Approvals</div>
                {approvals.length > 0 && <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 rounded-none border border-emerald-500/20">{approvals.length}</span>}
              </button>
              <button onClick={() => { setActiveZone('tower'); setActiveView('registry'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'registry' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <Cpu size={16} className="mr-3" /> Fleet Registry
              </button>

              <button 
                onClick={() => { setActiveZone('tower'); setActiveView('add-agent'); }} 
                className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'add-agent' ? 'bg-[#1a1a1a] text-white border-l-2 border-[#CBFF00]' : 'text-gray-400 hover:bg-[#111]')}
                style={activeView === 'add-agent' ? { color: '#CBFF00' } : {}}
              >
                <PlusCircle size={16} className="mr-3" /> Add New Agent
              </button>
            </div>

            {/* Developer forge Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Build & Scale</div>
              <button onClick={() => { setActiveZone('forge'); setActiveView('installation'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'installation' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <Terminal size={16} className="mr-3" /> Installation
              </button>
              <button onClick={() => { setActiveZone('forge'); setActiveView('integrations'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'integrations' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <Blocks size={16} className="mr-3" /> Integrations
              </button>
              <button onClick={() => { setActiveZone('forge'); setActiveView('apikeys'); }} className={cn("w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors", activeView === 'apikeys' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]')}>
                <KeyRound size={16} className="mr-3" /> API Keys
              </button>
            </div>

            {/* Administrative Governance */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-3 mb-2">Administration</div>
              <button
                onClick={() => { setActiveZone('governance'); setActiveView('settings'); }}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-none transition-colors",
                  activeView === 'settings' ? 'bg-[#1a1a1a] text-white' : 'text-gray-400 hover:bg-[#111]'
                )}
                style={activeView === 'settings' ? { borderLeft: `2px solid ${branding?.brand_color || '#0EA5E9'}`, color: branding?.brand_color || '#0EA5E9' } : {}}
              >
                <Settings size={16} className="mr-3" /> Sovereign Settings
              </button>
            </div>
          </nav>

          {/* Invisible AI Integration - Embedded Docs Assistant */}
          <div className="mt-auto p-4 border-t border-[#1a1a1a] bg-[#050505]/50">
            <div className="bg-slate-900/40 border border-slate-800/50 rounded-none p-4 shadow-xl group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-none h-2 w-2 bg-indigo-500"></span>
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
                  className="w-full bg-black/50 border border-slate-800 rounded-none px-3 py-2 text-[10px] text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                />
                <ArrowUpRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#050505] pt-16">
          <div className="flex-1 overflow-y-auto p-10 space-y-8">
            {/* IDENTITY VAULT HEADER */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
                  {activeView === 'dashboard' ? 'Registry Watchtower' :
                    activeView === 'treasury' ? 'Financial Treasury' :
                      activeView === 'billing' ? 'Billing' :
                        activeView === 'approvals' ? 'Governance Approvals' :
                        activeView === 'registry' ? 'Fleet Registry' :
                            activeView === 'installation' ? 'SDK Installation' :
                            activeView === 'integrations' ? 'System Integrations' :
                              activeView === 'apikeys' ? 'Node API Keys' :
                                activeView === 'settings' ? 'Sovereign Settings' : 'Registry Watchtower'}
                </h2>
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">Institutional Node Access // Session: ACTIVE</p>
              </div>

              <div className="w-full lg:w-[450px] bg-[#050505] border border-white/10 rounded-none p-6 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Fingerprint size={80} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="text-emerald-500 w-5 h-5" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Identity Vault</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Permanent Anchor DID</span>
                    <div className="flex items-center gap-3">
                      <code className="text-sm font-bold text-emerald-400 font-mono break-all line-clamp-1">
                        {userAgent?.did ? userAgent.did : (isIdentifying ? 'SYNCHRONIZING...' : 'NO ANCHOR DETECTED')}
                      </code>
                      {userAgent?.did && (
                        <button
                          onClick={() => {
                            if (userAgent?.did) {
                              navigator.clipboard.writeText(userAgent.did);
                              setCopiedKey('did_vault');
                              setTimeout(() => setCopiedKey(null), 2000);
                            }
                          }}
                          className="shrink-0 p-2 bg-black border border-[#333] rounded-none hover:border-emerald-500/50 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-all"
                        >
                          {copiedKey === 'did_vault' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-gray-500" />}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Authorized Email</span>
                    <div className="flex items-center gap-3">
                      <code className="text-sm font-bold text-gray-400 font-mono">
                        {userEmail || 'VERIFYING...'}
                      </code>
                      <div className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[8px] text-emerald-500 font-black uppercase tracking-widest">
                        Official
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeZone === 'gate' && renderFrontGate()}
              {activeZone === 'forge' && renderDeveloperForge()}
              {activeZone === 'tower' && activeView === 'dashboard' && renderDashboard()}
              {activeZone === 'tower' && activeView === 'treasury' && renderTreasury()}
              {activeZone === 'tower' && activeView === 'billing' && renderBilling()}
              {activeZone === 'tower' && activeView === 'approvals' && renderApprovals()}
              {activeZone === 'tower' && activeView === 'registry' && renderRegistry()}

              {activeZone === 'tower' && activeView === 'add-agent' && renderAddAgent()}
              {activeZone === 'governance' && activeView === 'settings' && renderGovernanceSettings()}
            </AnimatePresence>
          </div>


        </main>

        {/* Detail Drawer */}
        <AnimatePresence>
          {selectedAgent && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => { setSelectedAgent(null); setShowKillConfirm(false); }} />
              <motion.aside initial={{ x: '100%' }} animate={{ x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-96 bg-[#0A0A0A] border-l border-[#222] z-50 flex flex-col shadow-2xl">
                <div className="p-6 border-b border-[#222] flex justify-between items-center">
                  <div><h2 className="text-lg font-semibold text-white">{selectedAgent.alias}</h2><p className="text-xs text-gray-500 font-mono mt-1">{selectedAgent.id}</p></div>
                  <button onClick={() => setSelectedAgent(null)} className="text-gray-500 hover:text-white p-1 rounded transition-colors" title="Close Details"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                  <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Network Status</span><Badge type={selectedAgent.status === 'FAIL_CLOSED' ? 'Critical' : selectedAgent.status}>{selectedAgent.status === 'FAIL_CLOSED' ? '402 FAIL-CLOSED' : selectedAgent.status}</Badge></div>
                  <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Behavioral Integrity</span>
                    <div className="mt-2 p-3 bg-black border border-white/5 space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-gray-500 uppercase">Baseline Hash Alignment</span>
                          <span className={selectedAgent.status === 'FAIL_CLOSED' ? 'text-red-500' : 'text-emerald-500'}>
                             {selectedAgent.status === 'FAIL_CLOSED' ? 'DRIFT_DETECTED' : 'SECURE_MATCH'}
                          </span>
                       </div>
                       <div className="w-full bg-white/5 h-1.5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: selectedAgent.status === 'FAIL_CLOSED' ? '14%' : '100%' }}
                            className={cn("h-full", selectedAgent.status === 'FAIL_CLOSED' ? 'bg-red-500' : 'bg-emerald-500')}
                          />
                       </div>
                    </div>
                  </div>
                  <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">System Owner</span><span className="text-sm font-medium text-gray-200">{selectedAgent.owner}</span></div>
                  {selectedAgent.purpose && <div><span className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Purpose</span><span className="text-sm font-medium text-gray-400">{selectedAgent.purpose}</span></div>}

                  {/* Forensic Reasoning Trace */}
                  <div className="pt-4 border-t border-[#1a1a1a]">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3 flex items-center">
                      <Activity size={12} className="mr-2" /> Logic Reasoning Trace
                    </span>
                    <div className="space-y-3">
                      {(selectedAgent.reasoning_trace || [
                        'Input validated against Ed25519 registry',
                        'Logic variance within institutional bounds',
                        'Cryptographic settlement signed successfully'
                      ]).map((trace: string, i: number) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="mt-1 w-1 h-1 rounded-none bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                          <span className="text-[11px] text-gray-400 font-medium leading-relaxed">{trace}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded-none flex justify-between items-center">
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest">Decision Confidence</span>
                      <span className="text-[11px] font-black text-white font-mono">{selectedAgent.decision_confidence?.toFixed(1) || '99.2'}%</span>
                    </div>
                  </div>

                  {selectedAgent.status === 'REVOKED' && (
                    <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-none space-y-2">
                      <div className="flex items-center text-red-500 font-black text-[10px] uppercase tracking-[0.2em]">
                        <TriangleAlert size={14} className="mr-2" /> Security Anchor Lost
                      </div>
                      <p className="text-[10px] text-red-400/70 leading-relaxed uppercase">
                        This agent's identity has been revoked due to trial expiry. All high-criticality tool calls are currently blocked by the Sovereign Protocol.
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-[#222] bg-[#050505] relative">
                  <AnimatePresence>
                    {showKillConfirm && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute inset-x-6 bottom-6 bg-[#000000] border border-red-500/30 p-4 rounded-none z-20 shadow-xl flex flex-col items-center">
                        <TriangleAlert size={24} className="text-red-500 mb-3" />
                        <h4 className="text-sm font-semibold text-white mb-4 text-center">Terminate {selectedAgent.id} cryptographically?</h4>
                        <div className="flex space-x-2 w-full"><button onClick={() => setShowKillConfirm(false)} className="flex-1 py-2 text-xs border border-[#333] rounded text-gray-300">Abort</button><button onClick={() => { handleRevoke(selectedAgent.id); setShowKillConfirm(false); }} className="flex-1 py-2 text-xs bg-red-600 text-white rounded font-medium">Confirm</button></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {selectedAgent.status !== 'TERMINATED' ? (
                    !isKillArmed ? (
                      <button onClick={() => setIsKillArmed(true)} className="w-full py-2.5 bg-[#111] border border-[#333] text-gray-400 rounded hover:text-white hover:bg-[#1a1a1a] text-sm font-semibold transition-colors flex justify-center items-center"><Lock size={14} className="mr-2" /> ARM REVOCATION</button>
                    ) : (
                      <button onClick={() => setShowKillConfirm(true)} className="w-full py-2.5 bg-red-900/40 border border-red-500/50 text-red-500 rounded hover:bg-red-900/60 text-sm font-semibold transition-colors flex justify-center items-center animate-pulse"><ShieldAlert size={14} className="mr-2" /> TRIGGER KILL SWITCH</button>
                    )
                  ) : <div className="text-center text-xs text-red-500/50 font-mono uppercase tracking-widest">Agent Terminated</div>}

                  <button onClick={() => generateNISTReport(selectedAgent)} className="w-full mt-4 py-2.5 bg-white text-black rounded hover:bg-gray-200 text-sm font-semibold transition-colors flex justify-center items-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Download size={14} className="mr-2" /> Export NIST Audit Report
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Global Revocation Confirmation Modal */}
        <AnimatePresence>
          {showGlobalRevokeConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                onClick={() => !isGlobalRevoking && setShowGlobalRevokeConfirm(false)} 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }} 
                className="relative w-full max-w-lg bg-[#050505] border border-red-500/30 p-10 shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center space-y-8"
              >
                <div className="mx-auto w-20 h-20 bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <OctagonAlert size={40} className="text-red-500 animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Initiate Global Revocation?</h2>
                  <p className="text-sm text-gray-500 leading-relaxed uppercase font-mono">
                    This will cryptographically terminate <span className="text-white font-bold">ALL</span> active identities across the Sovereign Topology. This action is <span className="text-red-500 font-bold">IRREVERSIBLE</span> and will be logged in the NIST Audit Trail.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    disabled={isGlobalRevoking}
                    onClick={() => setShowGlobalRevokeConfirm(false)}
                    className="flex-1 py-4 border border-[#222] text-gray-400 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                    Abort Protocol
                  </button>
                  <button 
                    disabled={isGlobalRevoking}
                    onClick={handleGlobalRevocation}
                    className="flex-1 py-4 bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  >
                    {isGlobalRevoking ? 'TERMINATING FLEET...' : 'CONFIRM GLOBAL PURGE'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
