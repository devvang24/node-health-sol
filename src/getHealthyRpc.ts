import { Connection } from "@solana/web3.js";

export async function getHealthyRpc(rpcs: string[], slotDrift = 20): Promise<{ url: string; latency: number; slot: number }> {
  let best: { url: string; latency: number; slot: number } | null = null;
  let maxSlot = 0;
  const candidates: any[] = [];

  for (const url of rpcs) {
    try {
      const conn = new Connection(url);
      const start = Date.now();
      const slot = await conn.getSlot();
      const latency = Date.now() - start;

      candidates.push({ url, slot, latency });
      if (slot > maxSlot) maxSlot = slot;
    } catch (e) {
      continue;
    }
  }

  for (const node of candidates) {
    const drift = maxSlot - node.slot;
    if (drift <= slotDrift) {
      if (!best || node.latency < best.latency) {
        best = node;
      }
    }
  }

  if (!best) throw new Error("No healthy RPC found.");
  return best;
}
