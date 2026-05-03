import React from 'react';
import Link from 'next/link';
import HeroBackground from '@/components/HeroBackground';
import { ShieldCheck, Server, Lock, ArrowRight, Shield, Globe, FileJson } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#e0e0e0] font-sans selection:bg-neutral-800 relative">
      <HeroBackground />
      
      {/* Premium Minimal Header */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-white w-6 h-6" />
          <span className="font-semibold text-[16px] tracking-tight text-white">Sovereign AG</span>
          <div className="flex items-center space-x-2 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-[10px] font-medium tracking-wide text-emerald-400">Elite 20 Production</span>
          </div>
        </div>
        <nav className="flex items-center space-x-8">
          <Link href="#protocol" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors">Protocol</Link>
          <Link href="#pricing" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors">Enterprise</Link>
          <Link href="/" className="px-5 py-2 bg-white text-black text-[13px] font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.15)] flex items-center">
            Launch Tower <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-10">
        {/* HERO SECTION */}
        <section className="py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-8 uppercase tracking-widest">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span> Network Live & Compliant
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white max-w-4xl leading-tight">
            The Root of Trust for the <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-600">Agentic Economy.</span>
          </h1>
          <p className="mt-8 text-xl text-gray-400 max-w-2xl leading-relaxed">
            NIST SP 800-218 compliant cryptographic identity and operational governance for autonomous AI agents. We verify code so enterprise can scale without risk.
          </p>
          <div className="mt-12 flex items-center space-x-4">
            <Link href="/" className="px-8 py-4 bg-white text-black rounded text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center">
              Deploy Control Tower <ArrowRight className="ml-2 w-4 h-4"/>
            </Link>
            <a href="/SovereignSchema.json" target="_blank" className="px-8 py-4 bg-black border border-[#333] text-white rounded text-sm font-semibold hover:bg-[#111] transition-colors flex items-center">
              <FileJson className="mr-2 w-4 h-4 text-gray-400"/> View Sovereign Schema (JSON)
            </a>
          </div>
        </section>

        {/* METRICS / FEATURES */}
        <section id="protocol" className="py-24 border-t border-[#111]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 border border-[#222] bg-[#050505] rounded-xl">
                 <Lock className="w-8 h-8 text-white mb-6" />
                 <h3 className="text-xl font-semibold text-white mb-3">Immutable Identity Vault</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">Issue cryptographically secure Decentralized Identifiers (DIDs) to AI nodes. Zero spoofing, absolute provenance.</p>
              </div>
              <div className="p-8 border border-[#222] bg-[#050505] rounded-xl relative overflow-hidden group">
                 <Server className="w-8 h-8 text-white mb-6 relative z-10" />
                 <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Shadow AI Scanner</h3>
                 <p className="text-gray-400 text-sm leading-relaxed relative z-10">Real-time heuristics detect rogue, unregistered LLM traffic running isolated inside corporate environments.</p>
                 <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
              </div>
              <div className="p-8 border border-[#222] bg-[#050505] rounded-xl">
                 <Shield className="w-8 h-8 text-white mb-6" />
                 <h3 className="text-xl font-semibold text-white mb-3">Algorithmic Kill-Switch</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">Instantly revoke network access and terminate rogue agents via cryptographic signature invalidation globally.</p>
              </div>
           </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 border-t border-[#111] flex flex-col items-center">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Securing the Fortune 500</h2>
             <p className="text-gray-400 text-lg">We strictly cap active organizations to maintain high-touch oversight.</p>
           </div>

           <div className="w-full max-w-md border border-[#333] bg-[#050505] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-white"></div>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">Enterprise Node</h3>
                  <p className="text-sm text-gray-500 mt-1">Full NIST-compliant capability.</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">$5,000</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">/ mo</div>
                </div>
              </div>

              <div className="space-y-4 my-8">
                 {['Unlimited Identity Generation', 'Advanced Shadow Network Scanners', 'Global Merchant of Record handling', 'Priority HITL Approval Routing', 'Legal Defense Audit Certifications'].map((ft, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-300">
                       <ShieldCheck className="w-4 h-4 mr-3 text-gray-500"/> {ft}
                    </div>
                 ))}
              </div>

              <Link href="/" className="block w-full py-3 px-4 bg-white text-black text-center text-sm font-semibold rounded hover:bg-gray-200 transition-colors">
                Initialize Waitlist Protocol
              </Link>
           </div>
        </section>
      </main>

      <footer className="py-8 border-t border-[#111] text-center text-xs text-gray-600 font-mono">
         &copy; 2026 Sovereign AG. The Vanguard of Cryptographic Protocol.
      </footer>
    </div>
  );
}

