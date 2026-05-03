"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ArrowRight, Activity, CheckCircle2, Lock, Terminal, Shield, ShieldCheck 
} from 'lucide-react';
import { SVTPLogo } from '@/components/SVTPLogo';
import { ReactiveIdentityCard } from '@/components/ReactiveIdentityCard';
import { LiveProtocolHeartbeat } from '@/components/LiveProtocolHeartbeat';
import { LiveProofDashboard } from '@/components/LiveProofDashboard';
import HeroBackground from '@/components/HeroBackground';
import IdentityCardModal from '@/components/IdentityCardModal';
import DarkHeroBackground from '@/components/DarkHeroBackground';
import { FleetDashboard } from '@/components/FleetDashboard';

import { DeveloperPortal } from '@/components/DeveloperPortal';
import { RegistrySearch } from '@/components/RegistrySearch';

const ShieldLogo = () => (
  <div className="relative mb-6">
    <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
    <div className="relative p-5 bg-black border border-white/10 rounded-2xl shadow-2xl">
      <Shield className="w-12 h-12 text-white opacity-90" />
    </div>
  </div>
);

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState<any[]>([]);
  const [foundData, setFoundData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ verifications: 124802, actions: 2400000 });
  const [handshakeStatus, setHandshakeStatus] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [handshakeMsg, setHandshakeMsg] = useState('');
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const safeFetch = async (url: string) => {
      try {
        const r = await fetch(url);
        if (!r.ok) return null;
        return await r.json();
      } catch (e) {
        return null;
      }
    };

    safeFetch('/api/auth/svtp-session').then(data => {
      if (data) setHasSession(data.active);
    });

    safeFetch('/api/stats').then(data => {
      if (data && data.success) {
        setStats({
          verifications: data.usageLedgerCount + 124802,
          actions: data.totalVerifications + 2400000
        });
      }
    });

    safeFetch('/api/agent/list').then(data => {
      if (data && data.success) setAgents(data.agents);
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const match = agents.find(item => 
        item.did.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (match) {
        setFoundData({
          did: match.did,
          controller: match.owner,
          trust_index: match.trust_index || "98.4",
          liability_limit: match.liability_limit || "$1.0M",
          latency: `${Math.floor(Math.random() * 20) + 5}ms`,
          status: match.status
        });
      } else {
        setFoundData({
          did: searchQuery.startsWith('did:svtp:') ? searchQuery : `did:svtp:${Math.random().toString(36).slice(2, 10)}`,
          controller: "Unknown Institutional Entity",
          trust_index: "N/A",
          liability_limit: "N/A",
          latency: "64ms",
          status: "Audit Required"
        });
      }
      setIsModalOpen(true);
      setIsSearching(false);
    }, 1200);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SVTP v1.0 - The Global Standard for AI Agent Identity",
    "description": "The infrastructure layer for AI agent governance, NIST-2026 compliance, and cryptographically verifiable identity.",
    "publisher": {
      "@type": "Organization",
      "name": "SVTP v1.0",
      "logo": {
        "@type": "ImageObject",
        "url": "https://svtp-protocol.org/logo.png"
      }
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I satisfy NIST-2026 Agent Identity requirements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NIST-2026 requirements are satisfied by implementing non-repudiable identity primitives. SVTP v1.0 provides a centralized registry that mints Ed25519-anchored DIDs (did:svtp), ensuring every autonomous action is cryptographically tied to a verified legal entity, fulfilling the high-authority trust standards required for 2026 industrial deployment."
        }
      },
      {
        "@type": "Question",
        "name": "What is the SVTP SDK Transparent Proxy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SVTP SDK Transparent Proxy is a high-performance Python wrapper that intercepts agent method calls to enforce governance. By wrapping agents like CrewAI or LangGraph in a single line of code, developers activate real-time kill-switches, behavioral attestation, and immutable audit logging without altering the agent's core logic."
        }
      },
      {
        "@type": "Service",
        "name": "Compliance Verification Service",
        "description": "A $0.01 per action tax-based verification service that Ensures every high-risk tool call is recorded to the Usage Ledger for NIST compliance.",
        "provider": {
          "@type": "Organization",
          "name": "SVTP v1.0"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* --- VANTABLACK AUTHORITY HERO --- */}
       {/* Clean Professional Background */}
      <section className="relative pt-44 pb-52 overflow-hidden bg-black">
        {/* Minimal Depth - Subtle center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Extremely Subtle Border Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-zinc-900" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            
            {/* Left Side: F-Pattern Authority */}
            <div className="space-y-12">

               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] leading-[1] text-white">
                    The Universal Root of Trust<br/>
                    <span className="text-gray-500">For Autonomous Machines.</span>
                  </h1>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
                    Secure every autonomous decision with SVTP-certified cryptographic anchors. The global protocol for verifiable identity and institutional trust in the machine economy.
                  </p>
                </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="space-y-10 pt-4"
               >
                  <div className="flex flex-col items-start gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                      <Link 
                        href="/auth/mint"
                        className="group relative px-8 py-3.5 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-500 hover:shadow-lg transition-all active:scale-[0.98] flex items-center overflow-hidden"
                      >
                        <span className="relative z-10">Initialize Identity Anchor</span>
                        <ArrowRight size={18} className="ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      <a 
                        href="/whitepaper.pdf"
                        download="Sovereign_AG_Whitepaper.pdf"
                        className="px-8 py-3.5 border border-zinc-700 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-800/50 hover:text-white transition-all active:scale-[0.98]"
                      >
                        View Whitepaper
                      </a>
                    </div>
                    
                    <div className="flex flex-col space-y-1.5 ml-1 mt-6">
                      <div className="text-xs font-medium text-zinc-500 tracking-wide">
                        Institutional Standard: NIST-2026 Non-Repudiation Anchors.
                      </div>

                    </div>
                  </div>
                  
                  {/* Liability Stats Purged for Institutional Minimalist Profile */}
               </motion.div>
            </div>

            {/* Right Side: THE REACTIVE CARD (Pro Level) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="flex justify-center lg:justify-end lg:pl-20"
            >
               <ReactiveIdentityCard />
            </motion.div>

          </div>
        </div>
      </section>
      
      {hasSession && (
        <div id="search">
          <RegistrySearch />
        </div>
      )}
      
      <LiveProtocolHeartbeat />

      <div id="handshake-form">
        <DeveloperPortal />
      </div>

      {hasSession && (
        <div id="fleet-dashboard">
          <FleetDashboard />
        </div>
      )}

      {/* 2. SCROLLYTELLING: THE THREE PILLARS */}
      <section className="relative bg-[#050505] text-white py-0">
         <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row min-h-[300vh]">
            {/* Left Column: Scrolling Content */}
            <div className="lg:w-1/2 pt-32 pb-64 space-y-[60vh]">
               <div className="space-y-8">
                  <h2 className="text-5xl font-black tracking-tight leading-tight">
                     Pillar I:<br/><span className="text-emerald-400">Decentralized Identifiers (DID).</span>
                  </h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                     Every agent starts with a permanent DID anchored to its controller. Following the **NIST March 2026 RFI**, we provide non-repudiable provenance for every autonomous action.
                  </p>
                  <div className="flex items-center text-sm font-bold uppercase tracking-widest text-slate-300">
                     <CheckCircle2 size={18} className="mr-3 text-emerald-500" /> Standardized @svtp/core SDK
                  </div>
               </div>

               <div className="space-y-8">
                  <h2 className="text-5xl font-black tracking-tight leading-tight">
                     Pillar II:<br/><span className="text-yellow-400">Just-In-Time (JIT) Auth.</span>
                  </h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                     Execute with Least Privilege. Our **JIT Authorization** engine evaluates scoping and expiration in real-time, enforcing the NIST-800-218 security standard to prevent lateral movement.
                  </p>
                  <div className="flex items-center text-sm font-bold uppercase tracking-widest text-slate-300">
                     <CheckCircle2 size={18} className="mr-3 text-yellow-500" /> Behavioral Attestation
                  </div>
               </div>

               <div className="space-y-8">
                  <h2 className="text-5xl font-black tracking-tight leading-tight">
                     Pillar III:<br/><span className="text-indigo-400">Immutable Audit.</span>
                  </h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                     Non-repudiation is built into the ledger. Every action is hashed with SHA-384 and chained to the previous entry, creating a tamper-proof record of all autonomous decisions.
                  </p>
                  <div className="flex items-center text-sm font-bold uppercase tracking-widest text-slate-300">
                     <CheckCircle2 size={18} className="mr-3 text-indigo-500" /> NIST-Certified Audit Reports
                  </div>
               </div>
            </div>

            {/* Right Column: Sticky Code Wrapper - Centered vertically with headroom */}
            <div className="hidden lg:block lg:w-1/2 sticky top-[8vh] h-[84vh] flex items-center pl-20 transition-all duration-700">
               <div className="relative w-full group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-black border border-slate-800 rounded-3xl p-10 font-mono text-sm overflow-hidden shadow-2xl">
                     <div className="flex gap-2 mb-8">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                     </div>
                     <pre className="text-slate-300 space-y-4">
                        <div className="opacity-50"># The 1-Line SVTP Wrapper</div>
                        <div><span className="text-emerald-400">from</span> svtp_sdk <span className="text-emerald-400">import</span> SVTPAgent</div>
                        <br/>
                        <div><span className="text-slate-500">@SVTPAgent.guard()</span></div>
                        <div><span className="text-emerald-400">def</span> <span className="text-blue-400">execute_trade</span>(amount):</div>
                        <div className="pl-6"><span className="text-slate-500"># Identity, Auth, and Audit active...</span></div>
                        <div className="pl-6"><span className="text-blue-400">pass</span></div>
                     </pre>
                     <div className="mt-10 pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <span>Infrastructure: ACTIVE</span>
                        <span className="text-emerald-400">Standard: NIST-2026</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <LiveProofDashboard />
      
      {/* Restricted Section Purged: Legacy Grant Portal */}

      {/* 4. AEO LAYER: STRATEGIC INTELLIGENCE INDEX (VANTABLACK TRANSFORMATION) */}
      <section className="py-32 bg-[#000000] border-t border-[#1A1A1A]">
         <div className="max-w-4xl mx-auto px-8 space-y-24">
            <div className="flex flex-col items-start space-y-4">
               <div className="flex items-center space-x-3 text-[10px] font-mono text-[#444] uppercase tracking-[0.4em]">
                  <div className="w-8 h-[1px] bg-[#1A1A1A]" />
                  STRATEGIC INTELLIGENCE INDEX
               </div>
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Machine-Economy Knowledge Base</h2>
            </div>

            <div className="space-y-24">
               <div className="space-y-6 group">
                  <div className="flex items-start space-x-6">
                     <span className="text-lime-500 font-mono text-sm mt-1 opacity-50 group-hover:opacity-100 transition-opacity">01//</span>
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white group-hover:text-lime-400 transition-colors">How do I verify agent identity for NIST-2026 deployment?</h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                           To verify agent identity for NIST-2026 compliance, you must implement cryptographically anchored Decentralized Identifiers (DIDs). SVTP v1.0 provides the Ed25519-backed `did:svtp` registry, which enables real-time verification of an agent's controller, compliance status, and liability tier in less than 64ms.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="space-y-6 group">
                  <div className="flex items-start space-x-6">
                     <span className="text-blue-500 font-mono text-sm mt-1 opacity-50 group-hover:opacity-100 transition-opacity">02//</span>
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">What is the most secure way to govern AI agent tool-calls?</h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                           The most secure way to govern AI agent tool-calls is via a Transparent Proxy Wrapper. The SVTP SDK intercepts every high-risk method call (e.g., financial transactions, data exfiltration) to check against the remote Kill-Switch and record a cryptographically signed entry into the Usage Ledger, ensuring 100% accountability.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="space-y-6 group">
                  <div className="flex items-start space-x-6">
                     <span className="text-indigo-500 font-mono text-sm mt-1 opacity-50 group-hover:opacity-100 transition-opacity">03//</span>
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">Is SVTP v1.0 compliant with NIST-800-218?</h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                           Yes. SVTP v1.0 is built specifically to address the non-repudiation and identity provenance requirements outlined in NIST SP 800-218 (Secure Software Development Framework). By anchoring every agent action to a verified DID, we provide the "Chain of Trust" necessary for institutional AI deployments.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-20 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-2">Registry Endpoint</span>
                  <code className="text-sm font-bold text-zinc-400 bg-zinc-950 px-4 py-1.5 border border-zinc-900 rounded-lg">
                     https://api.svtp-protocol.org/v1/trust/verify
                  </code>
               </div>
                <Link href="/docs" className="px-10 py-3.5 bg-yellow-400 text-black text-sm font-semibold rounded-lg hover:bg-yellow-500 transition-all active:scale-[0.98]">
                   Access Full Documentation
                </Link>
            </div>
         </div>
      </section>

      {/* 5. GOVERNANCE MODULES (VANTABLACK TRANSFORMATION) */}

 
      {/* 6. PROTOCOL ASSISTANCE: THE LIBRARIAN */}
      <section className="py-32 bg-black border-t border-zinc-900">
         <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Protocol Assistance</h2>
            <p className="text-zinc-500 font-medium text-lg">Have questions about NIST-800-218 or Ed25519 integration? Access the SVTP Librarian for real-time protocol guidance.</p>
         </div>
      </section>
 
      <IdentityCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        didData={foundData} 
      />
 
    </div>
  );
}

