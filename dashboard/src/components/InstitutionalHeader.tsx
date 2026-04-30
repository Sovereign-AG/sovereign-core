"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from "next-auth/react";
import { SovereignLogo } from './SovereignLogo';
import { ShieldCheck, Search } from 'lucide-react';

export default function InstitutionalHeader() {
  const { data: session, status: authStatus } = useSession();
  const [hasLegacySession, setHasLegacySession] = React.useState(false);

  React.useEffect(() => {
    fetch('/api/auth/session')
      .then(r => r.json())
      .then(data => {
        if (data && typeof data.active === 'boolean') {
          setHasLegacySession(data.active);
        }
      })
      .catch(err => {
        console.warn('[SOVEREIGN_AUTH] Legacy Session Check Delayed:', err);
      });
  }, [authStatus]);

  const hasSession = authStatus === 'authenticated' || hasLegacySession;

  const handleSignOut = async () => {
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'CLEAR' })
    });
    localStorage.removeItem('sov_anchor_email');
    window.location.href = '/';
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[9999]">
      <header className="bg-[#000000] border-b border-[#1A1A1A] h-16 w-full relative">
        <div className="max-w-[1240px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo Zone */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <SovereignLogo size={28} className="text-white group-hover:text-yellow-400 transition-colors" />
              <span className="font-bold text-[17px] tracking-tight text-white">Sovereign AG</span>
            </Link>
            <div className="hidden lg:flex items-center px-3.5 py-1.5 bg-yellow-400 border border-yellow-500 rounded-full text-[10px] font-bold text-black tracking-wide gap-2.5">
               <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black"></span>
               </span>
               <span className="uppercase tracking-widest text-[9px] opacity-80">Status: Operational</span>
            </div>
          </div>
 
          {/* Action Zone */}
          <div className="flex items-center space-x-4">
            {hasSession ? (
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/dashboard"
                    className="px-6 py-2 bg-yellow-400 text-black text-xs font-bold rounded-full hover:bg-yellow-500 transition-all active:scale-[0.98]"
                  >
                    Control Tower
                  </Link>
                </motion.div>
 
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button 
                    onClick={handleSignOut}
                    className="px-6 py-2 border border-zinc-800 text-zinc-400 text-xs font-bold rounded-full hover:bg-zinc-900 hover:text-white transition-all"
                  >
                    Sign Out
                  </button>
                </motion.div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {
                    const el = document.getElementById('handshake-form');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                      window.location.href = '/#handshake-form';
                    }
                  }}
                  className="hidden sm:inline-block text-xs font-bold text-zinc-500 hover:text-yellow-400 transition-all cursor-pointer mr-4"
                >
                  Access Registry
                </button>
                <Link 
                  href="/auth/mint"
                  className="px-6 py-2 bg-yellow-400 text-black text-xs font-bold rounded-lg hover:bg-yellow-500 transition-all active:scale-[0.98]"
                >
                  Initialize Anchor
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
