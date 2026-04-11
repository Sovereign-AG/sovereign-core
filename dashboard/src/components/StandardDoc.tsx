import React from 'react';
import InstitutionalHeader from '@/components/InstitutionalHeader';
import { motion } from 'framer-motion';

interface StandardDocProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export default function StandardDoc({ title, subtitle, content }: StandardDocProps) {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <InstitutionalHeader />
      <section className="pt-44 pb-32">
        <div className="max-w-4xl mx-auto px-8 space-y-16">
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-lime-500 uppercase tracking-[0.4em]">Protocol Documentation / {title}</div>
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter">{title}</h1>
            <p className="text-gray-500 text-xl font-medium">{subtitle}</p>
          </div>
          <div className="prose prose-invert prose-lime max-w-none text-gray-400 font-medium leading-relaxed space-y-8">
            {content}
          </div>
        </div>
      </section>
    </div>
  );
}
