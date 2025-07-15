import { useEffect, useState } from "react";

export function useTokenPriceHistory(mint: string, interval: string = "1d") {
  const [history, setHistory] = useState<{ time: number; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mint) return;
    setLoading(true);
    fetch(`https://public-api.birdeye.so/public/chart/price?address=${mint}&interval=${interval}`)
      .then(res => res.json())
      .then(data => {
        setHistory(data.data?.items || []);
        setLoading(false);
      });
  }, [mint, interval]);

  return { history, loading };
}