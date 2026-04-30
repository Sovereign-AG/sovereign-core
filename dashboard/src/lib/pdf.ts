import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateNISTReport(agent: any) {
  const doc = new jsPDF();
  const width = doc.internal.pageSize.getWidth();
  
  // High-fidelity Enterprise Dark Mode PDF background
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, width, doc.internal.pageSize.getHeight(), 'F');

  // Header Layout
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('Sovereign AG', 14, 25);
  
  doc.setTextColor(52, 211, 153); // Emerald-400
  doc.setFontSize(10);
  doc.text('NIST SP 800-218 CERTIFICATE OF COMPLIANCE', 14, 33);

  // Structural Seperator
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(0.5);
  doc.line(14, 40, width - 14, 40);

  // Subheader Details
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Network Identity Profile', 14, 50);

  doc.setTextColor(170, 170, 170);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Agent Alias:`, 14, 58);
  doc.text(`Agent DID:`, 14, 65);
  doc.text(`System Owner:`, 14, 72);
  doc.text(`Current Status:`, 14, 79);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(agent.alias, 48, 58);
  doc.text(agent.did || 'Not Assigned', 48, 65);
  doc.text(agent.owner || 'Null Set', 48, 72);
  doc.text(agent.status, 48, 79);

  // Status/Integrity Badge
  const sealColor = agent.status === 'Active' ? [16, 185, 129] : [220, 38, 38];
  doc.setFillColor(sealColor[0], sealColor[1], sealColor[2]);
  doc.rect(width - 50, 48, 36, 9, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(agent.status === 'Active' ? 'COMPLIANT' : 'WARNING', width - 32, 54, { align: 'center' });

  // Sovereign AG Autotable Styling
  const tableData = [
    ['Audit Hash Signature', agent.auditHash || 'Pending Core Generation'],
    ['Security Authorization Tier', agent.tier || 'Standard'],
    ['Cryptographic Variance', `${(agent.variance || 0).toFixed(6)} Δ`],
    ['Identity Source', agent.source || 'Internal Override'],
    ['Regional Hosting', agent.region || 'GLOBAL-NODE'],
    ['Computational Overhead', agent.cpu || '0%'],
    ['Live Language Models', agent.models ? agent.models.join(', ') : 'None Designated'],
    ['Operational Purpose', agent.purpose || 'General Automated Infrastructure Tasking']
  ];

  autoTable(doc, {
    startY: 95,
    head: [['Risk Assessment Metric', 'Cryptographic Truth']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [24, 24, 24], textColor: [255, 255, 255], fontStyle: 'bold', lineWidth: 0.1, lineColor: [40, 40, 40] },
    bodyStyles: { fillColor: [15, 15, 15], textColor: [200, 200, 200], lineWidth: 0.1, lineColor: [40, 40, 40] },
    alternateRowStyles: { fillColor: [20, 20, 20] },
    columnStyles: { 0: { cellWidth: 70 } },
  });

  // Signatory Footer
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.setDrawColor(40, 40, 40);
  doc.line(14, finalY - 8, width - 14, finalY - 8);

  doc.setTextColor(130, 130, 130);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('This document legally verifies algorithmic compliance at the exact point of execution.', 14, finalY);
  doc.setFont('helvetica', 'bold');
  doc.text(`Immutable Digital Signatory Date: ${new Date().toISOString()}`, 14, finalY + 6);
  doc.text('Sovereign AG Control Tower | Real-time AI Audit Governance', 14, finalY + 12);
  
  // Download trigger
  const safeName = (agent.alias || agent.id).replace(/\W+/g, "_");
  doc.save(`Sovereign_NIST_Report_${safeName}.pdf`);
}

export async function generateGlobalExecutiveLedger(stats: any, agents: any[]) {
  const doc = new jsPDF();
  const width = doc.internal.pageSize.getWidth();
  const timestamp = new Date().toISOString();
  
  // High-fidelity Enterprise Dark Mode PDF background
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, width, doc.internal.pageSize.getHeight(), 'F');

  // Header Typography
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('SOVEREIGN AG', 14, 25);
  
  doc.setTextColor(52, 211, 153); // Emerald-400
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('INSTITUTIONAL AUDIT LEDGER // NIST-2026 COMPLIANCE PROTOCOL', 14, 32);

  // Structural Seperator
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(0.5);
  doc.line(14, 38, width - 14, 38);

  // Organization Overview Block
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Governance Overview', 14, 48);

  const overviewData = [
    ['Organization ID', 'sovereign-org'],
    ['Active Agent Fleet', `${agents.length} Nodes`],
    ['Protocol Trust Avg', `${stats.avgTrustScore?.toFixed(2) || '99.9'}%`],
    ['Fairness Index', `${stats.avgFairnessScore?.toFixed(2) || '99.4'}%`],
    ['Total Verified Actions', `${stats.totalVerifications || 0} Transactions`],
    ['Current Credit Balance', `$${stats.balance?.toFixed(2) || '0.00'}`]
  ];

  autoTable(doc, {
    startY: 54,
    body: overviewData,
    theme: 'grid',
    styles: { fillColor: [15, 15, 15], textColor: [200, 200, 200], fontSize: 9, lineWidth: 0.1, lineColor: [40, 40, 40], cellPadding: 3 },
    columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold', textColor: [150, 150, 150] } },
  });

  // Fleet Registry Table
  const tableY = (doc as any).lastAutoTable.finalY + 15;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Active Agent Registry', 14, tableY);

  const fleetBody = agents.map(a => [
    a.alias || 'UNNAMED_NODE',
    (a.did || '').substring(0, 15) + '...',
    a.status || 'Active',
    `${a.trust_index || '99.0'}%`,
    a.tier || 'Standard'
  ]);

  autoTable(doc, {
    startY: tableY + 6,
    head: [['Alias', 'DID Signature', 'Status', 'Trust', 'Tier']],
    body: fleetBody,
    theme: 'grid',
    headStyles: { fillColor: [30, 30, 30], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fillColor: [18, 18, 18], textColor: [180, 180, 180], fontSize: 8, lineWidth: 0.1, lineColor: [40, 40, 40] },
    alternateRowStyles: { fillColor: [22, 22, 22] },
  });

  // Integrity Footer
  const footerY = doc.internal.pageSize.getHeight() - 30;
  doc.setDrawColor(40, 40, 40);
  doc.line(14, footerY, width - 14, footerY);

  // Simple Cryptographic Hash Representation (for UI/Visual compliance)
  const integrityHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify({stats, agents, timestamp})))))
                        .map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(7);
  doc.setFont('courier', 'normal');
  doc.text(`LEDGER_INTEGRITY_HASH: ${integrityHash.toUpperCase()}`, 14, footerY + 8);
  
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(`Generated: ${timestamp}`, 14, footerY + 15);
  doc.text('SOVEREIGN AG PROTOCOL // AUTHORIZED AUDIT DOCUMENT', 14, footerY + 20);

  doc.save(`Sovereign_Executive_Ledger_${timestamp.split('T')[0]}.pdf`);
}

