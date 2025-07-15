import { useEffect, useState } from "react";

// Map token symbols to Coingecko IDs
const COINGECKO_IDS: Record<string, string> = {
  sol: "solana",
  usdc: "usd-coin",
};

export function useTokenPriceHistory(symbol: string, interval: string = "1d") {
  const [history, setHistory] = useState<{ time: number; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = COINGECKO_IDS[symbol.toLowerCase()];
    if (!id) {
      setError("Price history not supported for this token.");
      setHistory([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    // Coingecko returns daily prices for up to 90 days
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch price history");
        return res.json();
      })
      .then(data => {
        // data.prices is an array of [timestamp, price]
        const items = (data.prices || []).map(([ts, value]: [number, number]) => ({
          time: Math.floor(ts / 1000),
          value,
        }));
        setHistory(items);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch price history");
        setHistory([]);
        setLoading(false);
      });
  }, [symbol, interval]);

  return { history, loading, error };
}