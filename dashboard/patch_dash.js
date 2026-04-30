const fs = require('fs');

let content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

const replacements = [
  // Typography and weights
  [/"text-\[10px\] font-bold uppercase tracking-widest"/g, '"text-[11px] font-medium tracking-wide text-gray-400"'],
  [/"text-\[10px\] font-bold uppercase text-amber-500 tracking-widest mb-4 flex items-center relative z-10"/g, '"text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10"'],
  [/"text-\[10px\] font-bold uppercase text-emerald-500 tracking-widest mb-4 flex items-center relative z-10"/g, '"text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10"'],
  [/"text-\[10px\] font-bold uppercase text-indigo-500 tracking-widest mb-4 flex items-center relative z-10"/g, '"text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10"'],
  [/"text-\[10px\] font-bold uppercase text-blue-400 tracking-widest mb-4 flex items-center relative z-10"/g, '"text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10"'],
  [/"text-\[10px\] font-bold uppercase text-gray-400 tracking-widest mb-4 flex items-center font-mono relative z-10"/g, '"text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10"'],
  [/"text-\[10px\] font-bold uppercase text-emerald-500 tracking-widest flex items-center"/g, '"text-[11px] font-medium tracking-wide text-gray-400 flex items-center"'],
  [/"text-\[10px\] font-bold uppercase text-blue-500 tracking-widest mb-4 flex items-center relative z-10"/g, '"text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10"'],
  [/"text-\[10px\] font-bold uppercase text-gray-400 tracking-widest mb-4 flex items-center relative z-10"/g, '"text-[11px] font-medium tracking-wide text-gray-400 mb-4 flex items-center relative z-10"'],

  // Cards and background
  [/"bg-white\/\[0\.05\] backdrop-blur-2xl border border-white\/10 p-6 rounded-3xl shadow-\[0_10px_40px_rgba\(0,0,0,0\.4\)\] relative overflow-hidden group hover:bg-white\/\[0\.08\] transition-all h-full flex flex-col justify-between ring-1 ring-white\/5 ring-inset"/g, '"bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:bg-white/[0.08] transition-all h-full flex flex-col justify-between"'],
  [/"bg-white\/\[0\.05\] backdrop-blur-2xl border border-white\/10 p-6 rounded-3xl shadow-\[0_10px_40px_rgba\(0,0,0,0\.4\)\] relative overflow-hidden group transition-all h-full flex flex-col justify-between ring-1 ring-white\/5 ring-inset"/g, '"bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group transition-all h-full flex flex-col justify-between"'],
  [/"bg-white\/\[0\.05\] backdrop-blur-2xl border border-white\/10 p-6 rounded-3xl shadow-\[0_10px_40px_rgba\(0,0,0,0\.4\)\] relative overflow-hidden group transition-all ring-1 ring-white\/5 ring-inset"/g, '"bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group transition-all"'],
  [/"bg-white\/5 backdrop-blur-xl border border-white\/10 p-5 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group cursor-help shadow-2xl"/g, '"bg-white/5 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36 relative overflow-hidden group hover:bg-white/[0.08] transition-all cursor-help shadow-sm"'],
  
  // Specific large sections
  [/"bg-white\/5 backdrop-blur-2xl border border-white\/10 rounded-none p-6 shadow-2xl"/g, '"bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-sm"'],
  [/"bg-white\/5 backdrop-blur-xl border border-white\/10 p-6 rounded-none relative overflow-hidden min-h-\[300px\] flex flex-col shadow-2xl"/g, '"bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden min-h-[300px] flex flex-col shadow-sm"'],
  [/"bg-white\/5 backdrop-blur-xl border border-white\/10 p-6 rounded-none shadow-2xl"/g, '"bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm"'],
  [/"bg-white\/5 backdrop-blur-xl border border-white\/10 p-6 rounded-none shadow-2xl relative overflow-hidden group"/g, '"bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden group"'],
  
  // Buttons and shadow alerts
  [/"px-5 py-2 bg-red-900\/40 border border-red-500\/50 text-red-500 rounded text-sm font-semibold hover:bg-red-900\/60 transition-colors flex items-center justify-center"/g, '"px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[13px] font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center"'],
  [/"px-5 py-2 bg-indigo-600 border border-indigo-500 text-white rounded text-sm font-semibold hover:bg-indigo-500 transition-colors flex items-center justify-center"/g, '"px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-[13px] font-medium hover:bg-indigo-500/20 transition-colors flex items-center justify-center"'],
  [/"bg-red-900\/10 border border-red-500\/20 rounded-none p-6"/g, '"bg-red-500/5 border border-red-500/10 rounded-2xl p-6"'],
  [/"text-base font-semibold text-white"/g, '"text-base font-medium text-white"'],

  // Refine card headers dynamically for the large sections.
  [/"px-5 py-2 bg-white text-black rounded text-sm font-bold hover:bg-gray-100 transition-colors flex items-center justify-center shadow-\[0_0_20px_rgba\(255,255,255,0\.1\)\]"/g, '"px-5 py-2 bg-white text-black rounded-xl text-[13px] font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"']
];

for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
}

fs.writeFileSync('src/app/dashboard/page.tsx', content, 'utf8');
console.log('Dashboard redesign styles applied.');
