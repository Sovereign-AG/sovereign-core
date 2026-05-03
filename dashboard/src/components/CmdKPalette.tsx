"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Shield, Award, Book, Layout, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CmdKPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const actions = [
    { name: 'Claim SVTP Grant', icon: Award, href: '/grant', keywords: 'money free credit' },
    { name: 'Compliance Registry', icon: Shield, href: '/compliance', keywords: 'nist legal audit' },
    { name: 'Technical Docs', icon: Book, href: '/docs', keywords: 'sdk python help' },
    { name: 'Network Ledger', icon: Layout, href: '/network', keywords: 'status audit activity' },
    { name: 'Protocol Standard', icon: FileText, href: '/protocol', keywords: 'nist rules about' },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filtered = actions.filter(action => 
    action.name.toLowerCase().includes(query.toLowerCase()) || 
    action.keywords.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (href: string) => {
    router.push(href);
    setOpen(false);
    setQuery('');
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-6 md:pt-32">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden relative z-10"
            >
              <div className="flex items-center space-x-4 px-6 py-5 border-b border-slate-100">
                <Search size={20} className="text-slate-400" />
                <input 
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-900 placeholder:text-slate-300"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-slate-100 rounded text-[10px] font-black text-slate-400"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-[360px] overflow-y-auto p-3 space-y-1">
                {filtered.map((action) => (
                  <button
                    key={action.name}
                    onClick={() => navigate(action.href)}
                    className="w-full flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group text-left"
                  >
                    <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-white transition-colors">
                      <action.icon size={18} className="text-slate-600 group-hover:text-slate-900" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-black text-slate-900">{action.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{action.href}</div>
                    </div>
                    <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                      <span className="text-xs">⏎</span>
                    </kbd>
                  </button>
                ))}
                
                {filtered.length === 0 && (
                  <div className="py-12 text-center space-y-2">
                    <p className="text-sm font-bold text-slate-900">No results found.</p>
                    <p className="text-xs text-slate-400">Try searching for 'NIST' or 'Grant'.</p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                   <div className="flex items-center space-x-1.5">
                      <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500">↑↓</kbd>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Navigate</span>
                   </div>
                   <div className="flex items-center space-x-1.5">
                      <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500">⏎</kbd>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Select</span>
                   </div>
                </div>
                <div className="flex items-center space-x-2 grayscale opacity-50">
                   <Command size={12} className="text-slate-900" />
                   <span className="text-[8px] font-black uppercase tracking-widest">SVTP OS</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

