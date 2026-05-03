"use client";
import React from 'react';
import StandardDoc from '@/components/StandardDoc';

export default function SupportIndex() {
  return (
    <StandardDoc 
      title="Integrator Support"
      subtitle="Resources for developers building on the Sovereign Identity Protocol."
    >
      <p>
        Welcome to the Sovereign Knowledge Base. Our goal is to make cryptographic identity as simple as a single SDK call.
      </p>
      <h3>Primary Resources</h3>
      <ul>
        <li><a href="/support/docs" className="text-emerald-600 underline">Integrator's Manual</a>: Technical documentation.</li>
        <li><strong>API Status:</strong> Real-time network health.</li>
        <li><strong>Contact Center:</strong> Institutional onboarding support.</li>
      </ul>
      <p>
        To get started immediately, run <code>pip install sovereign-sdk</code> in your agent terminal.
      </p>
    </StandardDoc>
  );
}

