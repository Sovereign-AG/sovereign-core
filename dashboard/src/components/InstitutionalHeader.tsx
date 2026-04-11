"use client";
import React from 'react';
import Link from 'next/link';
import { SovereignLogo } from './SovereignLogo';
import { ShieldCheck, Search } from 'lucide-react';

export default function InstitutionalHeader() {
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <header className="bg-[#000000] border-b border-[#1A1A1A] h-16 w-full relative">
        <div className="max-w-[1240px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo Zone */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <SovereignLogo size={28} className="text-white group-hover:text-lime-400 transition-colors" />
              <span className="font-bold text-[15px] tracking-tight text-white">Sovereign AG</span>
            </Link>
            <div className="hidden lg:flex items-center px-3 py-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded text-[9px] font-mono text-lime-500 uppercase tracking-widest">
               STATUS: OPERATIONAL
            </div>
          </div>
 
          {/* Core Navigation - Clean Sans-Serif */}
          <nav className="hidden md:flex items-center space-x-10">
            {[
              { name: 'Protocol', href: '/protocol' },
              { name: 'Network', href: '/network' },
              { name: 'Security', href: '/security' },
              { name: 'Docs', href: '/support/docs' }
            ].map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-[12px] font-medium text-gray-400 hover:text-white transition-colors tracking-tight"
              >
                {item.name}
              </Link>
            ))}
          </nav>
 
          {/* Action Zone */}
          <div className="flex items-center space-x-6">
            <Link href="#developer-portal" className="hidden sm:inline-block text-[12px] font-medium text-gray-400 hover:text-white">
               Login
            </Link>
            <Link href="#genesis-grant" className="px-6 py-2 bg-[#CBFF00] hover:bg-[#B5E600] text-black text-[11px] font-black uppercase tracking-widest rounded transition-all shadow-lg active:scale-95">
               Claim Genesis Grant
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
