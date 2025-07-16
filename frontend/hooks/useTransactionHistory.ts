import { useEffect, useState } from "react";

export interface ParsedTransaction {
  signature: string;
  date: string;
  type: string;
  token: string;
  amount: number;
  from: string;
  to: string;
  side: 'buy' | 'sell' | 'transfer' | 'unknown'; // new field
}

// Map known native mints/addresses to symbols/names
const NATIVE_ASSET_MAP: Record<string, { symbol: string; name: string }> = {
  // Solana
  SOL: { symbol: "SOL", name: "Solana" },
  // Ethereum
  ETH: { symbol: "ETH", name: "Ethereum" },
  // Bitcoin
  BTC: { symbol: "BTC", name: "Bitcoin" },
  // Polygon
  MATIC: { symbol: "MATIC", name: "Polygon" },
  // Base
  BASE: { symbol: "ETH", name: "Base" },
  // Sui
  SUI: { symbol: "SUI", name: "Sui" },
  // Add more as needed
};

export function useTransactionHistory(address: string | undefined) {
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    const apiKey = String(process.env.NEXT_PUBLIC_HELIUS_API_KEY);
    if (!apiKey) {
      setError("Helius API key not set");
      return;
    }
    setLoading(true);
    setError(null);
    fetch(
      `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${apiKey}&limit=20`
    )
      .then((res) => res.json())
      .then((data) => {
        // Parse transactions
        const txs: ParsedTransaction[] = [];
        (data || []).forEach((tx: any) => {
          // 1. SPL token transfers (Solana, Wormhole, etc)
          if (Array.isArray(tx.tokenTransfers) && tx.tokenTransfers.length > 0) {
            const meta = tx.tokenTransfers[0];
            // Classify side
            let side: 'buy' | 'sell' | 'transfer' | 'unknown' = 'unknown';
            if (meta.fromUserAccount === address) side = 'sell';
            else if (meta.toUserAccount === address) side = 'buy';
            // TODO: Add transfer/unknown logic if needed
            txs.push({
              signature: tx.signature,
              date: tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleString() : "-",
              type: meta.fromUserAccount === address ? "Send" : "Receive",
              token: meta.tokenSymbol || meta.mint || "-",
              amount: meta.tokenAmount || 0,
              from: meta.fromUserAccount || "-",
              to: meta.toUserAccount || "-",
              side,
            });
            return; // prioritize token transfer
          }
          // 2. Native asset transfers (SOL, ETH, BTC, etc)
          if (Array.isArray(tx.nativeTransfers) && tx.nativeTransfers.length > 0) {
            const nt = tx.nativeTransfers[0];
            let asset = nt.asset || nt.symbol || "SOL";
            asset = asset.toUpperCase();
            const assetMeta = NATIVE_ASSET_MAP[asset] || { symbol: asset, name: asset };
            // Classify side
            let side: 'buy' | 'sell' | 'transfer' | 'unknown' = 'unknown';
            if (nt.fromUserAccount === address) side = 'sell';
            else if (nt.toUserAccount === address) side = 'buy';
            txs.push({
              signature: tx.signature,
              date: tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleString() : "-",
              type: nt.fromUserAccount === address ? "Send" : "Receive",
              token: assetMeta.symbol,
              amount: nt.amount || 0,
              from: nt.fromUserAccount || nt.from || "-",
              to: nt.toUserAccount || nt.to || "-",
              side,
            });
            return;
          }
          // 3. Fallback: Unknown
          txs.push({
            signature: tx.signature,
            date: tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleString() : "-",
            type: "Unknown",
            token: "-",
            amount: 0,
            from: "-",
            to: "-",
            side: 'unknown',
          });
        });
        setTransactions(txs);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch transactions");
        setLoading(false);
      });
  }, [address]);

  return { transactions, loading, error };
} 