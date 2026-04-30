import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

/**
 * Sovereign Tail-Stream Settlement Engine (SSE)
 * Enforces Zero-Inference: Dashboard starts at 0.00 and only updates on real-world events.
 */
export async function GET(req: NextRequest) {
  const ledgerPath = path.resolve(process.cwd(), '..', 'sovereign_ledger.ndjson');
  const dbPath = path.resolve(process.cwd(), '..', 'sovereign_db.json');

  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = (data: any) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch (e) {
          // Controller might be closed
        }
      };

      // Tally Logic (Precision Integer Settlement)
      const calculateSettlement = () => {
        let actions = 0;
        let pulses = 0;
        let mints = 0;

        try {
          if (fs.existsSync(ledgerPath)) {
            const data = fs.readFileSync(ledgerPath, 'utf-8');
            const lines = data.split('\n').filter(l => l.trim());
            lines.forEach(line => {
              try {
                const entry = JSON.parse(line);
                const type = (entry.Type || entry.type || 'ACTION').toUpperCase();
                if (type === 'ACTION') actions++;
                else if (type === 'PULSE') pulses++;
              } catch (e) {}
            });
          }

          if (fs.existsSync(dbPath)) {
            const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
            mints = db.registered_agents ? db.registered_agents.length : 0;
          }
        } catch (err) {
          console.error('Audit Sync Fault:', err);
        }

        const totalRevenue = (mints * 1000000 + actions * 10000 + pulses * 100) / 1000000;
        return { totalRevenue, actions, pulses, mints };
      };

      // 1. Zero-Inference Initialization
      sendUpdate({ totalRevenue: 0.00, actions: 0, pulses: 0, mints: 0 });

      // 2. High-Sensitivity File Watcher
      const watcher = fs.watch(ledgerPath, (event) => {
        if (event === 'change') {
          sendUpdate(calculateSettlement());
        }
      });

      // Also watch DB for Mints
      const dbWatcher = fs.watch(dbPath, (event) => {
        if (event === 'change') {
          sendUpdate(calculateSettlement());
        }
      });

      req.signal.addEventListener('abort', () => {
        watcher.close();
        dbWatcher.close();
        try { controller.close(); } catch(e) {}
      });
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Encoding': 'none',
    },
  });
}
