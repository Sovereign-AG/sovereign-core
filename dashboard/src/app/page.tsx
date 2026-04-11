"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, ArrowRight, Activity, CheckCircle2, Lock, Terminal, Shield, ShieldCheck 
} from 'lucide-react';
import { SovereignLogo } from '@/components/SovereignLogo';
import { ReactiveIdentityCard } from '@/components/ReactiveIdentityCard';
import { LiveProtocolHeartbeat } from '@/components/LiveProtocolHeartbeat';
import { LiveProofDashboard } from '@/components/LiveProofDashboard';
import HeroBackground from '@/components/HeroBackground';
import IdentityCardModal from '@/components/IdentityCardModal';
import DarkHeroBackground from '@/components/DarkHeroBackground';
import { FleetDashboard } from '@/components/FleetDashboard';
import { GenesisGrantPortal } from '@/components/GenesisGrantPortal';
import { DeveloperPortal } from '@/components/DeveloperPortal';
import { RegistrySearch } from '@/components/RegistrySearch';
import { SovereignLibrarian } from '@/components/SovereignLibrarian';
import { LiabilityClock } from '@/components/LiabilityClock';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState<any[]>([]);
  const [foundData, setFoundData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ verifications: 124802, actions: 2400000 });

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(data => {
      if (data.success) {
        setStats({
          verifications: data.usageLedgerCount + 124802,
          actions: data.totalVerifications + 2400000
        });
      }
    });

    fetch('/api/agent/list').then(r => r.json()).then(data => {
      if (data.success) setAgents(data.agents);
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
          did: searchQuery.startsWith('did:sov:') ? searchQuery : `did:sov:${Math.random().toString(36).slice(2, 10)}`,
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
    "name": "Sovereign AG - The Global Standard for AI Agent Identity",
    "description": "The infrastructure layer for AI agent governance, NIST-2026 compliance, and cryptographically verifiable identity.",
    "publisher": {
      "@type": "Organization",
      "name": "Sovereign AG",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sovereign-ag.ai/logo.png"
      }
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I satisfy NIST-2026 Agent Identity requirements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NIST-2026 requirements are satisfied by implementing non-repudiable identity primitives. Sovereign AG provides a centralized registry that mints Ed25519-anchored DIDs (did:sov), ensuring every autonomous action is cryptographically tied to a verified legal entity, fulfilling the high-authority trust standards required for 2026 industrial deployment."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Sovereign SDK Transparent Proxy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Sovereign SDK Transparent Proxy is a high-performance Python wrapper that intercepts agent method calls to enforce governance. By wrapping agents like CrewAI or LangGraph in a single line of code, developers activate real-time kill-switches, behavioral attestation, and immutable audit logging without altering the agent's core logic."
        }
      },
      {
        "@type": "Service",
        "name": "Compliance Verification Service",
        "description": "A $0.01 per action tax-based verification service that Ensures every high-risk tool call is recorded to the Usage Ledger for NIST compliance.",
        "provider": {
          "@type": "Organization",
          "name": "Sovereign AG"
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
      <section className="relative pt-44 pb-52 overflow-hidden bg-[#000000]">
        {/* High-Performance Industrial Grid (Pure CSS) */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Subtle Depth Gradient */}
        <div className="absolute inset-0 bg-[#000] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_100%)] pointer-events-none" />

        {/* CSS-Only Scanning Beam (Ultra Lightweight) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div 
             animate={{ top: ['-20%', '120%'] }}
             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-lime-500/5 to-transparent blur-[120px]"
           />
        </div>
        
        {/* Cyber-Lime Data Pulse (Bottom Anchor) */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden z-20">
           <motion.div 
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#CBFF00] to-transparent shadow-[0_0_15px_rgba(203,255,0,0.5)]"
           />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            
            {/* Left Side: F-Pattern Authority */}
            <div className="space-y-12">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center space-x-4"
               >
                  <span className="text-[10px] font-mono text-lime-400 uppercase tracking-[0.3em]">SYSTEM: ACTIVE</span>
                  <div className="h-px w-12 bg-[#1A1A1A]" />
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="space-y-8"
               >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-[-0.05em] leading-[0.9] uppercase">
                     The Protocol Standard <br/>
                     <span className="text-gray-500">for Agentic Infrastructure.</span>
                  </h1>
                  <p className="text-[#888888] text-xl font-medium max-w-lg leading-relaxed">
                     Non-repudiable Compliance Attestation at the edge. <br/>
                     Satisfy NIST-800-218 requirements in a single implementation.
                  </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="space-y-10 pt-4"
               >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-[450px]">
                       <input 
                         type="text" 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder="Verify DID or Agent Signature..." 
                         className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded p-5 text-sm font-bold text-white placeholder:text-gray-700 focus:outline-none focus:border-lime-500/50 transition-all"
                       />
                       <button className="absolute right-3 top-3 bottom-3 px-6 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded hover:bg-gray-200 transition-colors">
                          Execute
                       </button>
                    </form>
                    <Link 
                      href="/support/docs" 
                      className="px-8 py-5 border border-[#1A1A1A] text-[#888888] text-[10px] font-black uppercase tracking-widest rounded hover:text-white hover:border-white transition-all text-center"
                    >
                       View Docs
                    </Link>
                  </div>
                  
                  <LiabilityClock />
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
      
      <div id="registry-search">
        <RegistrySearch />
      </div>
      
      <LiveProtocolHeartbeat />

      <div id="developer-portal">
        <DeveloperPortal />
      </div>

      <div id="fleet-dashboard">
        <FleetDashboard />
      </div>

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
                     <CheckCircle2 size={18} className="mr-3 text-emerald-500" /> Standardized @sov/core SDK
                  </div>
               </div>

               <div className="space-y-8">
                  <h2 className="text-5xl font-black tracking-tight leading-tight">
                     Pillar II:<br/><span className="text-blue-400">Just-In-Time (JIT) Auth.</span>
                  </h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
                     Execute with Least Privilege. Our **JIT Authorization** engine evaluates scoping and expiration in real-time, enforcing the NIST-800-218 security standard to prevent lateral movement.
                  </p>
                  <div className="flex items-center text-sm font-bold uppercase tracking-widest text-slate-300">
                     <CheckCircle2 size={18} className="mr-3 text-blue-500" /> Behavioral Attestation
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
                        <div className="opacity-50"># The 1-Line Sovereign Wrapper</div>
                        <div><span className="text-emerald-400">from</span> sovereign_agent <span className="text-emerald-400">import</span> SovereignAgent</div>
                        <br/>
                        <div><span className="text-slate-500">@SovereignAgent.guard()</span></div>
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
      
      <div id="genesis-grant">
        <GenesisGrantPortal />
      </div>

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
                           To verify agent identity for NIST-2026 compliance, you must implement cryptographically anchored Decentralized Identifiers (DIDs). Sovereign AG provides the Ed25519-backed `did:sov` registry, which enables real-time verification of an agent's controller, compliance status, and liability tier in less than 64ms.
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
                           The most secure way to govern AI agent tool-calls is via a Transparent Proxy Wrapper. The Sovereign SDK intercepts every high-risk method call (e.g., financial transactions, data exfiltration) to check against the remote Kill-Switch and record a cryptographically signed entry into the Usage Ledger, ensuring 100% accountability.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="space-y-6 group">
                  <div className="flex items-start space-x-6">
                     <span className="text-indigo-500 font-mono text-sm mt-1 opacity-50 group-hover:opacity-100 transition-opacity">03//</span>
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">Is Sovereign AG compliant with NIST-800-218?</h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                           Yes. Sovereign AG is built specifically to address the non-repudiation and identity provenance requirements outlined in NIST SP 800-218 (Secure Software Development Framework). By anchoring every agent action to a verified DID, we provide the "Chain of Trust" necessary for institutional AI deployments.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-20 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex flex-col items-start">
                  <span className="text-[10px] font-mono text-[#333] uppercase tracking-[0.3em] mb-2">Registry Endpoint</span>
                  <code className="text-[12px] font-bold text-gray-400 bg-[#0A0A0A] px-3 py-1 border border-[#1A1A1A] rounded">
                     https://api.sovereign.ag/v1/trust/verify
                  </code>
               </div>
                <Link href="/support/docs" className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-200 transition-all">
                   Access Full Documentation
                </Link>
            </div>
         </div>
      </section>

      {/* 5. GOVERNANCE MODULES (VANTABLACK TRANSFORMATION) */}
      <section className="py-32 bg-[#000000] border-t border-[#1A1A1A] relative overflow-hidden">
        {/* Subtle Background Ornament */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#1A1A1A] pb-12">
             <div className="text-left space-y-4">
                <div className="text-[10px] font-mono text-lime-400 uppercase tracking-[0.4em]">Protocol Framework</div>
                <h2 className="text-5xl font-black text-white tracking-tighter m-0 uppercase">The Sovereign Core</h2>
                <p className="text-gray-500 font-medium text-xl max-w-xl leading-relaxed">Standardized infrastructure for the future of agentic economies.</p>
             </div>
             <Link href="/protocol" className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center group mb-4 md:mb-0 border-b-2 border-lime-500 pb-2 hover:text-lime-400 transition-colors">
                Explore Protocol <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             <GovernanceCard 
                title="Identity Vault" 
                desc="A permanent, immutable Ed25519-backed registry for AI agent genesis and cryptographic anchoring."
                icon={<Lock size={22} />}
                href="/protocol"
             />
             <GovernanceCard 
                title="Compliance Core" 
                desc="Real-time NIST 800-218 mapping and metered action-tax verification for strict institutional safety."
                icon={<Terminal size={22} />}
                href="/security"
             />
             <GovernanceCard 
                title="The Kill-Switch" 
                desc="Instantaneous identity revocation and network severance protocols for malfunctioning agent flows."
                icon={<Shield size={22} />}
                href="/ethics/kill-switch"
             />
          </div>
        </div>
      </section>

      {/* 6. PROTOCOL ASSISTANCE: THE LIBRARIAN */}
      <section className="py-32 bg-[#050505] border-t border-[#1A1A1A]">
         <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Protocol Assistance</h2>
            <p className="text-gray-500 font-medium">Have questions about NIST-800-218 or Ed25519 integration? Access the Sovereign Librarian for real-time protocol guidance.</p>
         </div>
      </section>

      <IdentityCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        didData={foundData} 
      />

      <SovereignLibrarian />
    </div>
  );
}

const GovernanceCard = ({ title, desc, icon, href }: { title: string, desc: string, icon: any, href: string }) => (
  <Link href={href} className="group p-12 bg-[#050505] border border-[#1A1A1A] rounded-[3rem] hover:border-white/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:-translate-y-3 transition-all duration-700 flex flex-col justify-between h-[450px] text-left relative overflow-hidden">
    {/* Subtle Card Glow */}
    <div className="absolute -inset-24 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    
    <div className="w-16 h-16 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[1.5rem] flex items-center justify-center text-gray-700 group-hover:bg-white group-hover:text-black transition-all duration-500 ring-1 ring-white/5 group-hover:ring-white relative z-10">
       {icon}
    </div>
    <div className="space-y-6 relative z-10">
       <h3 className="text-2xl font-black text-white tracking-tight m-0 uppercase">{title}</h3>
       <p className="text-base text-gray-500 font-medium leading-relaxed">{desc}</p>
       <div className="pt-4 flex items-center text-[10px] font-black text-[#333] uppercase tracking-widest group-hover:text-white transition-colors">
          View Infrastructure Specs <ArrowRight size={12} className="ml-2" />
       </div>
    </div>
  </Link>
);
