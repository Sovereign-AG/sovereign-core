"use client";

import React from 'react';
import InstitutionalHeader from '@/components/InstitutionalHeader';
import { motion } from 'framer-motion';
import InstitutionalFooter from './InstitutionalFooter';

interface StandardDocProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  content?: React.ReactNode; // For legacy compatibility
  lastUpdated?: string;
  titleIcon?: React.ReactNode;
  sections?: { id: string; label: string }[];
}

export default function StandardDoc({ 
  title, 
  subtitle, 
  children, 
  content, 
  lastUpdated, 
  titleIcon,
  sections 
}: StandardDocProps) {
  return (
    <div className="min-h-screen bg-[#000000] text-gray-400 font-sans selection:bg-lime-500/30 antialiased selection:text-white">
      <InstitutionalHeader />
      
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:60px_60px]" />

      <main className="pt-24 relative z-10">
        {/* Header Block */}
        <div className="bg-[#050505] border-b border-[#111] pb-24 pt-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center space-x-3 text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">
                  {titleIcon && <div className="p-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none shadow-sm">{titleIcon}</div>}
                  <span>Protocol Manual / {title}</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">{title}</h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">{subtitle}</p>
              </div>
              {lastUpdated && (
                <div className="flex flex-col items-start lg:items-end space-y-1">
                  <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Last Modified</div>
                  <div className="text-sm font-black text-white uppercase tracking-tighter">{lastUpdated}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-20 py-32">
          {/* Sticky Navigation (Desktop Only) */}
          {sections && sections.length > 0 && (
            <aside className="lg:w-64 shrink-0 hidden lg:block">
              <div className="sticky top-44 space-y-10">
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-gray-800 uppercase tracking-[0.3em] mb-6">Page Index</div>
                  <nav className="flex flex-col space-y-4">
                    {sections.map((section) => (
                      <a 
                        key={section.id} 
                        href={`#${section.id}`}
                        className="text-xs font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors flex items-center group"
                      >
                        <div className="w-1.5 h-1.5 bg-[#111] rounded-none mr-3 group-hover:bg-lime-500 transition-colors" />
                        {section.label}
                      </a>
                    ))}
                  </nav>
                </div>
                
                <div className="p-8 bg-[#050505] border border-[#111] rounded-none space-y-4">
                   <div className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Status</div>
                   <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-lime-500 rounded-none animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.5)]" />
                      <span className="text-[10px] font-black text-lime-500 uppercase tracking-widest">Live // NIST-Aligned</span>
                   </div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <article className="flex-1 max-w-4xl space-y-24 pb-48">
            <div className="prose prose-invert max-w-none 
              prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-lg
              prose-strong:text-white prose-strong:font-bold
              prose-ul:list-none prose-ul:pl-0
              prose-code:text-lime-400 prose-code:bg-[#0A0A0A] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
            ">
              {children || content}
            </div>
          </article>
        </div>
      </main>

      <InstitutionalFooter />
    </div>
  );
}
