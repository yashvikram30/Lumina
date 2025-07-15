import { useEffect, useState } from "react";

export interface ParsedTransaction {
  signature: string;
  date: string;
  type: string;
  token: string;
  amount: number;
  from: string;
  to: string;
}

export function useTransactionHistory(address: string | undefined) {
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
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
        const txs: ParsedTransaction[] = (data || []).map((tx: any) => {
          // Basic parsing, can be improved for more token types
          const meta = tx.tokenTransfers && tx.tokenTransfers[0];
          return {
            signature: tx.signature,
            date: tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleString() : "-",
            type: meta ? (meta.fromUserAccount === address ? "Send" : "Receive") : "Unknown",
            token: meta ? meta.tokenSymbol || meta.mint : "-",
            amount: meta ? meta.tokenAmount : 0,
            from: meta ? meta.fromUserAccount : "-",
            to: meta ? meta.toUserAccount : "-",
          };
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