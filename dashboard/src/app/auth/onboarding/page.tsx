"use client";

import React, { useState } from 'react';
import { InstitutionalNote } from '@/components/InstitutionalNote';
import InstitutionalHeader from '@/components/InstitutionalHeader';

export default function OnboardingPage() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const callback = urlParams.get('callback');
    // Redirect to the main handshake with a source flag
    window.location.href = `/?source=sdk_onboarding${callback ? `&callback=${encodeURIComponent(callback)}` : ''}`;
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-500/30">
      <InstitutionalHeader />
      
      <main className="max-w-4xl mx-auto px-8 pt-48 pb-32">
        <InstitutionalNote onAccept={handleAccept} />
      </main>
    </div>
  );
}
