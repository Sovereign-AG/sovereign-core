"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Fingerprint, Copy, Check, ArrowRight, Zap, Target, Shield, Network, Cpu, Lock, Mail, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

export default function IdentityForge() {
  const { data: session, status: authStatus } = useSession();
  const [email, setEmail] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [did, setDid] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mintStage, setMintStage] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) setEmail(emailParam);
    
      // Auto-bridge SSO Session to Identity Registry
      if (authStatus === 'authenticated' && session?.user?.email && !did && !isMinting) {
        console.log(`[SVTP_OIDC] Authenticated as ${session.user.email}, bridging to registry...`);
        handleAutoOnboard(session.user.email);
      }
    }, [authStatus, session, did, isMinting]);
  
    const handleAutoOnboard = async (userEmail: string) => {
      setIsMinting(true);
      setMintStage(0); // Identifying...
      try {
        // 1. Check if returning user
        const checkRes = await fetch('/api/auth/portal-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail })
        });
        const checkData = await checkRes.json();
  
        if (checkData.action === 'RETURNING') {
          const regRes = await fetch('/api/agent/list');
          const regData = await regRes.json();
          
          if (regData?.success && regData?.agents) {
            const existing = regData.agents.find((a: any) => a.owner?.toLowerCase() === userEmail.toLowerCase());
            if (existing) {
              setDid(existing.did);
              // Sync legacy session
              await fetch('/api/auth/svtp-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, action: 'SET' })
              });
              return;
            }
          }
        }
  
        // 2. New Identity: Auto-Mint Anchor
        setMintStage(2); // Sharding Keys
        const regRes = await fetch('/api/agent/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            alias: 'ROOT_IDENTITY_ANCHOR', 
            owner: userEmail,
            org_id: 'sovereign-org',
            purpose: 'Institutional Root of Trust (OIDC Verified)'
          })
        });
        const data = await regRes.json();
        if (data.success) {
          setDid(data.agent.did);
          await fetch('/api/auth/svtp-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, action: 'SET' })
          });
        }
      } catch (err) {
        console.error('[SVTP_OIDC] Bridge Fault:', err);
      } finally {
        setIsMinting(false);
      }
    };
  
    const handleSignInFlow = async (provider?: string) => {
      if (provider) {
        // Direct SSO Handshake
        signIn(provider, { callbackUrl: '/auth/mint' });
        return;
      }
  
      if (!email) return;
  
      setIsMinting(true);
      setMintStage(0); // Identifying...
      
      try {
        // 1. Initial Handshake Check
        const checkRes = await fetch('/api/auth/portal-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const checkData = await checkRes.json();
  
        if (checkData.action === 'RETURNING') {
          // Returning User: Direct Session Set (for legacy/email flow)
          await fetch('/api/auth/svtp-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, action: 'SET' })
          });
          window.location.href = '/dashboard';
          return;
        }
  
        // New User: Proceed with Minting Animation
        setMintStage(1); // Generating Entropy
        setTimeout(() => setMintStage(2), 1000); // Sharding Keys
        setTimeout(() => setMintStage(3), 2000); // Anchoring to Registry
        
        const regRes = await fetch('/api/agent/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            alias: 'ROOT_IDENTITY_ANCHOR', 
            owner: email,
            org_id: 'sovereign-org',
            purpose: 'Institutional Root of Trust'
          })
        });
        const data = await regRes.json();
        
        if (data.success) {
          await new Promise(r => setTimeout(r, 2000));
          setDid(data.agent.did);
          
          // Ensure standard session is set for dashboard compatibility
          await fetch('/api/auth/svtp-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, action: 'SET' })
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsMinting(false);
      }
    };

  const handleCopy = () => {
    if (did) {
      navigator.clipboard.writeText(did);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#CBFF00] selection:text-black overflow-hidden relative flex flex-col">
      
      {/* Background Ornament: Minimal Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />

      <main className="flex-1 flex items-center justify-center relative z-10 px-8 pt-20">
        <AnimatePresence mode="wait">
        {!did ? (
          <motion.div 
            key="minting-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-[440px]"
          >
            <div className="bg-[#111111] border border-white/5 p-10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none">
                  {isMinting ? "Analyzing Identity" : (session ? "Verify Identity" : "Initialize Anchor")}
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  {isMinting ? "Handshaking with Sovereign Registry..." : (session ? `Authenticated as ${session.user?.email}` : "Enter your institutional credentials to secure your node.")}
                </p>
              </div>

              {isMinting && authStatus === 'authenticated' ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-6">
                  <div className="w-16 h-16 border-4 border-[#CBFF00]/10 border-t-[#CBFF00] rounded-full animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#CBFF00] animate-pulse">Establishing Identity Bridge...</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSignInFlow(); }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444] ml-1">Institutional Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#CBFF00] transition-colors" size={16} />
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      required
                      suppressHydrationWarning
                      className="w-full bg-[#000000] border border-white/5 px-12 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#CBFF00]/30 transition-all rounded-2xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end ml-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">Governance Passkey</label>
                    <span className="text-[9px] font-mono text-[#222] uppercase tracking-widest">Optional</span>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 group-focus-within:text-[#CBFF00] transition-colors" size={16} />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      disabled
                      className="w-full bg-[#000000] border border-white/5 px-12 py-4 text-sm font-bold text-white placeholder:text-gray-800 focus:outline-none transition-all rounded-2xl opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    type="submit"
                    disabled={isMinting || !email}
                    className="w-full py-5 bg-[#CBFF00] text-black font-bold uppercase tracking-[0.25em] text-[10px] rounded-2xl hover:bg-[#d8ff33] transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(203,255,0,0.15)]"
                  >
                    {isMinting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        {mintStage === 0 ? 'IDENTIFYING ANCHOR...' :
                         mintStage === 1 ? 'CALCULATING ENTROPY...' :
                         mintStage === 2 ? 'SHARDING PRIVATE MASTER...' :
                         'ANCHORING TO REGISTRY...'}
                      </>
                    ) : (
                      <>
                        SIGN IN / INITIALIZE <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-4 py-2">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <span className="text-[10px] font-bold text-[#222] uppercase tracking-widest">OR</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button" 
                      onClick={() => handleSignInFlow('github')}
                      className="flex items-center justify-center gap-3 py-4 bg-[#000000] border border-white/5 text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all rounded-2xl group/sso"
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                      GitHub
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSignInFlow('google')}
                      className="flex items-center justify-center gap-3 py-4 bg-[#000000] border border-white/5 text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all rounded-2xl group/sso"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      </div>
                      Google
                    </button>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed">
                    By initializing, you agree to the <Link href="/governance/rules" className="text-gray-500 hover:text-[#CBFF00]">SVTP Rules</Link> and <Link href="/governance/privacy" className="text-gray-500 hover:text-[#CBFF00]">Privacy Protocol</Link>.
                  </p>
                </div>
              </form>
            )}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/" className="text-[10px] font-black text-[#333] uppercase tracking-[0.4em] hover:text-white transition-colors">
                Return to Command Center
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[440px]"
          >
            <div className="bg-[#111111] border border-white/5 p-12 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] text-center space-y-10">
              <div className="w-20 h-20 bg-[#CBFF00]/10 border border-[#CBFF00]/30 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck size={40} className="text-[#CBFF00]" />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black uppercase tracking-tight leading-none text-white">Anchor Deployed</h1>
                <p className="text-gray-500 text-sm font-medium">Node <span className="text-[#CBFF00] font-mono text-[11px]">{did?.slice(0, 12)}...</span> is now globally verifiable.</p>
              </div>

              <div className="relative group p-6 bg-black border border-white/5 rounded-2xl flex items-center justify-between">
                <code className="text-[#CBFF00] font-mono text-xs break-all">{did}</code>
                <button 
                  onClick={handleCopy} 
                  className="ml-4 p-2.5 text-gray-500 hover:text-white transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-[#CBFF00] transition-all flex items-center justify-center group shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                ENTER WATCHTOWER <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </main>

      {/* Decorative Technical Footnote */}
      <div className="px-12 py-10 flex justify-between items-center opacity-20 pointer-events-none">
        <div className="text-[9px] font-mono text-white tracking-[0.5em] uppercase">SVRN-AUTH-v2.1</div>
        <div className="flex gap-1">
          {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/20 rounded-full" />)}
        </div>
      </div>
    </div>
  );
}


