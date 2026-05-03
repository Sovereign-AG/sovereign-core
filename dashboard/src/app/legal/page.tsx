"use client";

import React from 'react';
import StandardDoc from '@/components/StandardDoc';
import { Gavel, ShieldCheck, Lock, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LegalIndex() {
  const categories = [
    {
      title: "Core Framework",
      icon: <ShieldCheck className="text-emerald-600" />,
      docs: [
        { name: "Global Privacy Notice", href: "/legal/privacy", desc: "Governance of agentic metadata and telemetry." },
        { name: "Sovereign Rules & Policy", href: "/legal/rules", desc: "Mandatory operating standards for the Elite 20." }
      ]
    },
    {
      title: "Governance & Liability",
      icon: <Gavel className="text-slate-900" />,
      docs: [
        { name: "Liability Transparency Charter", href: "/legal/rules#liability", desc: "Defining the legal wrapper for autonomous agency." },
        { name: "Cookie & Telemetry Framework", href: "/legal/cookies", desc: "Details on data persistence and monitor categorization." }
      ]
    }
  ];

  return (
    <StandardDoc 
      title="Compliance Matrix"
      subtitle="Institutional governance, regulatory alignment, and the legal framework for the 2026 Agentic Economy."
      lastUpdated="April 8, 2026"
      titleIcon={<Lock size={32} className="text-slate-300" />}
    >
      <div className="space-y-16 py-8">
        <section>
          <p className="text-lg leading-relaxed text-slate-600 font-medium max-w-2xl mb-12">
            The Sovereign AG Legal Framework establishes the necessary regulatory certainty required for enterprise organizations to deploy autonomous AI agents within NIST-compliant trust environments.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 m-0">{cat.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {cat.docs.map((doc, dIdx) => (
                    <Link 
                      key={dIdx} 
                      href={doc.href}
                      className="group block p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-300 transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{doc.name}</span>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{doc.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-8 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-white mt-0 mb-4 flex items-center">
              <FileText size={20} className="mr-3 text-slate-400" />
              Institutional Support
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-xl">
              For organizations requiring custom legal wrappers or specific NIST-compliance audit documentation for internal security committees, please contact your Node Administrator.
            </p>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full w-fit">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-2" />
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Dedicated Counsel Available</span>
            </div>
          </div>
        </section>
      </div>
    </StandardDoc>
  );
}

