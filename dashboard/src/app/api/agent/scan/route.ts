import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate the "Shadow AI Scanner" pinging the network
  // In a real environment, this might run nmap or fetch internal metrics.
  
  // Fake delay to simulate network scanning
  await new Promise(r => setTimeout(r, 1500));

  const foundShadowAgents = [
    {
      alias: "Shadow_Local_Llama",
      port: 11434, // Default Ollama port
      detected_traffic: "3.2 GB",
      risk: "High",
      reason: "Unregistered LLM node running on default local port."
    },
    {
      alias: "Dev_GPT4_Proxy",
      port: 8080,
      detected_traffic: "125 MB",
      risk: "Warning",
      reason: "Unauthorized outbound requests to api.openai.com detected."
    }
  ];

  return NextResponse.json({
    success: true,
    scanned_endpoints: 412,
    found_shadow_agents: foundShadowAgents
  });
}
