import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { host } = new URL(request.url);
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const filePath = path.join(process.cwd(), '..', 'svtp_quickstart.py');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Update the port and paths dynamically based on the current host
    let updatedContent = content.replace(/http:\/\/localhost:5001/g, baseUrl);
    updatedContent = updatedContent.replace(/http:\/\/localhost:3001/g, baseUrl);
    updatedContent = updatedContent.replace(/\/register/g, '/api/agent/register');
    updatedContent = updatedContent.replace(/\/heartbeat/g, '/api/billing/tax');
    
    // Add logic to handle /heartbeat to /api/billing/tax conversion in payload
    updatedContent = updatedContent.replace(
      'resp = requests.post(f"{VALIDATOR_URL}/register", json=registration_payload, timeout=5.0)',
      'resp = requests.post(f"{VALIDATOR_URL}/api/agent/register", json={**registration_payload, "owner": "adityagawand79@gmail.com"}, timeout=5.0)'
    );
    
    updatedContent = updatedContent.replace(
      'requests.post(\n            f"{validator_url}/heartbeat",',
      'requests.post(\n            f"{validator_url}/api/billing/tax",\n            json={"type": "PULSE", "orgId": "sovereign-org", "agentId": did, "count": 1},'
    );
    
    return new NextResponse(updatedContent, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Quickstart script not found' }, { status: 404 });
  }
}

