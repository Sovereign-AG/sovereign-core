"use client";

import React from 'react';
import Link from 'next/link';
import { SVTPLogo } from './SVTPLogo';
import { ShieldCheck, ArrowUpRight, Globe, Activity, Shield } from 'lucide-react';

const InstitutionalFooter = () => {
  const currentYear = 2026;

  const footerGroups = [
    {
      title: "Protocol Hub",
      links: [
        { label: "Institutional Anchor Forge", href: "/#handshake-form" },
        { label: "NIST Alignment", href: "/protocol/nist" },
        { label: "Kill-Switch Charter", href: "/ethics/kill-switch" },
        { label: "Data Sovereignty", href: "/ethics/sovereignty" },
      ]
    },
    {
      title: "Integrator Portal",
      links: [
        { label: "Protocol Manual", href: "/docs" },
        { label: "SDK Download", href: "/support/sdk" },
        { label: "Node Status", href: "/support/status" },
        { label: "Request Node Access", href: "/support/contact" },
      ]
    },
    {
      title: "Network Registry",
      links: [
        { label: "Usage Ledger", href: "/network" },
        { label: "Consortium Nodes", href: "/network#consortium" },
        { label: "Security Audits", href: "/protocol/nist#audits" },
        { label: "DID Registry", href: "/#search" },
      ]
    },
    {
      title: "Governance & Legal",
      links: [
        { label: "Rules & Policy", href: "/legal/rules" },
        { label: "Privacy Notice", href: "/legal/privacy" },
        { label: "Cookie Preferences", href: "/legal/cookies" },
        { label: "Compliance Index", href: "/protocol/nist" },
      ]
    },
    {
      title: "Protocol Infrastructure",
      links: [
        { label: "Founding Validators", href: "/protocol/nodes" },
        { label: "Institutional SLA", href: "/docs#sla" },
        { label: "Partner Portal", href: "/dashboard" },
        { label: "Developer Forge", href: "/docs" },
      ]
    }
  ];

  return (
    <footer className="bg-[#000000] border-t border-[#1A1A1A] pt-32 pb-16 px-8 md:px-16 overflow-hidden relative">
      {/* Background Ornament - Subtler for Vantablack */}

      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 mb-24">
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-8">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-[13px] font-medium text-gray-500 hover:text-white transition-colors flex items-center group/link"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover/link:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-16 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="flex items-center space-x-4">
               <SVTPLogo size={32} className="text-white" />
               <div className="h-8 w-px bg-[#1A1A1A]" />
               <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Institutional Root of Trust</div>
            </div>
            <p className="text-[11px] text-gray-600 max-w-sm text-center md:text-left font-medium leading-relaxed">
              SVTP v1.0 is the definitive cryptographic registry for the autonomous machine economy. Built for NIST-2026 performance and non-repudiable provenance.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex items-center space-x-4">
               {[
                 { Icon: Activity, id: 'act' },
                 { Icon: Globe, id: 'glb' },
                 { Icon: Shield, id: 'shd' }
               ].map(({ Icon, id }) => (
                 <div key={id} className="p-3 bg-[#050505] border border-[#1A1A1A] rounded-none hover:border-white/20 transition-colors cursor-pointer group">
                    <Icon size={16} className="text-[#333] group-hover:text-white" />
                 </div>
               ))}
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
               <span className="text-[9px] font-mono text-[#333] uppercase animate-pulse">● Node_Status: Active</span>
               <span className="text-[9px] font-mono text-[#333]">© {currentYear} SVTP_V1_REGISTRY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default InstitutionalFooter;

