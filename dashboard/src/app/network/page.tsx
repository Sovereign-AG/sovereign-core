import StandardDoc from '@/components/StandardDoc';

export default function NetworkPage() {
  return (
    <StandardDoc 
      title="Global Network"
      subtitle="Distributed attestation at the speed of thought."
      content={
        <p>The Sovereign Network is a geographically distributed mesh of Validator Nodes that ensure 100% availability for identity heartbeats. By processing attestations at the edge, we maintain a global average latency of 12ms per verification cycle.</p>
      }
    />
  );
}
