"use client"
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import Banner from "@/components/ui/Banner";
import Badge from "@/components/ui/Badge";
import OutlinedPanel from "@/components/ui/OutlinedPanel";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, Tooltip as LineTooltip } from "recharts";
import { useTokenPriceHistory } from "@/hooks/useTokenPriceHistory";

const PIE_COLORS = [
  "#fde047", // yellow
  "#f472b6", // pink
  "#60a5fa", // blue
  "#34d399", // green
  "#a78bfa", // purple
  "#f87171", // red
  "#fbbf24", // orange
  "#38bdf8", // sky
];

// Map supported mints to Coingecko IDs (should match useTokenPrices)
const COINGECKO_MINTS: Record<string, string> = {
  "So11111111111111111111111111111111111111112": "solana",
  // USDC mainnet (correct address)
  "EPjFWdd5AufqSSqeM2q8VsJb9KztnwYk2bB6Pp8XKX": "usd-coin",
  "Es9vMFrzaCERZ6t2kF9Q4FQp9Qd8Q6Qd8Q6Qd8Q6Qd8Q": "tether",
  "DezX6SeB1bGzjKz5u5h5u5h5u5h5u5h5u5h5u5h5u5h5": "bonk",
  "2ndtZr1n2y1k1t1v1u1w1x1y1z1A1B1C1D1E1F1G1H1I1J1K1L1M1N1O1P1Q1R1S1T1U1V1W1X1Y1Z": "ethereum",
  "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E": "bitcoin",
  "7XSzF1Q6Xo8Xz8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q": "sui",
};

const PortfolioAnalytics: React.FC = () => {
  const tokens = useTokenBalances();
  const { tokens: tokenList, loading: loadingList } = useTokenList();
  const mintAddresses = useMemo(() => tokens.map((t) => t.mint), [tokens]);
  const prices = useTokenPrices(mintAddresses);

  // 24h price state
  const [prices24h, setPrices24h] = useState<{ [mint: string]: number }>({});
  const [loading24h, setLoading24h] = useState(false);
  const [error24h, setError24h] = useState<string | null>(null);
  const [retried24h, setRetried24h] = useState(false);

  // Retry handler for historical fetch
  const handleRetryHistory = () => {
    setHistoryError(null);
    setHistoryLoaded(false);
    setRetriedHistory(false);
    setPortfolioHistory([]);
    setHistoryLoading(false);
    fetchAllHistories();
  };

  // Retry handler for 24h fetch
  const handleRetry24h = () => {
    setError24h(null);
    setRetried24h(false);
    setPrices24h({});
    setLoading24h(false);
    fetch24hPrices();
  };

  // Fetch 24h-ago prices for supported tokens (on mount only, retry on user action)
  const fetch24hPrices = useCallback(async () => {
    setLoading24h(true);
    setError24h(null);
    try {
      const entries = await Promise.all(
        mintAddresses.map(async (address) => {
          const coingeckoId = COINGECKO_MINTS[address];
          if (coingeckoId) {
            try {
              const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=2&interval=daily`
              );
              if (!res.ok) throw new Error("Failed to fetch");
              const data = await res.json();
              const price24h = Array.isArray(data.prices) && data.prices.length > 0 ? data.prices[0][1] : 0;
              return [address, price24h];
            } catch {
              return [address, 0];
            }
          }
          return [address, 0];
        })
      );
      setPrices24h(Object.fromEntries(entries));
      setLoading24h(false);
    } catch (err) {
      setError24h("Failed to fetch 24h prices");
      setLoading24h(false);
    }
  }, [mintAddresses]);

  useEffect(() => {
    fetch24hPrices();
  }, [fetch24hPrices]);

  // Loading state for prices
  const loadingPrices = mintAddresses.length > 0 && mintAddresses.some((mint) => prices[mint] === undefined);

  // Helper to get token meta
  const getTokenMeta = (mint: string) => {
    return tokenList.find((t) => t.address.toLowerCase() === mint.toLowerCase());
  };

  // --- Historical Portfolio Value State ---
  const [historyLoading, setHistoryLoading] = useState(false);
  const [portfolioHistory, setPortfolioHistory] = useState<{ time: number; value: number }[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [retriedHistory, setRetriedHistory] = useState(false);

  // Fetch all histories for all tokens with a valid Coingecko ID (on mount only, retry on user action)
  const fetchAllHistories = useCallback(async () => {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const supportedTokens = tokens.filter(t => {
        const coingeckoId = COINGECKO_MINTS[t.mint];
        return !!coingeckoId;
      });
      const results = await Promise.all(
        supportedTokens.map(async t => {
          const coingeckoId = COINGECKO_MINTS[t.mint];
          if (!coingeckoId) return [];
          try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=30`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            return (data.prices || []).map(([ts, price]: [number, number]) => ({ time: Math.floor(ts / 1000), value: price, amount: t.amount }));
          } catch {
            return [];
          }
        })
      );
      const byDate: Record<number, number> = {};
      results.forEach(tokenHistory => {
        tokenHistory.forEach((entry: { time: number; value: number; amount: number }) => {
          const { time, value, amount } = entry;
          if (!byDate[time]) byDate[time] = 0;
          byDate[time] += value * amount;
        });
      });
      const historyArr = Object.entries(byDate)
        .map(([time, value]) => ({ time: Number(time), value }))
        .sort((a, b) => a.time - b.time);
      setPortfolioHistory(historyArr);
      setHistoryLoaded(true);
      setHistoryLoading(false);
    } catch (err) {
      setHistoryError("Failed to fetch historical prices");
      setHistoryLoading(false);
    }
  }, [tokens]);

  useEffect(() => {
    fetchAllHistories();
  }, [fetchAllHistories]);

  if (loadingList || loadingPrices || loading24h) return <div className="text-center text-lg font-semibold py-8">Loading portfolio analytics...</div>;
  if (!tokens.length) return <div className="text-center text-lg font-semibold py-8">No tokens found.</div>;

  // Calculate per-token and total values
  let totalValue = 0;
  let totalValue24h = 0;
  const tokenValues = tokens.map((token) => {
    const price = prices[token.mint] || 0;
    const price24h = prices24h[token.mint] || 0;
    const value = token.amount * price;
    const value24h = token.amount * price24h;
    totalValue += value;
    totalValue24h += value24h;
    const meta = getTokenMeta(token.mint);
    return {
      mint: token.mint,
      symbol: meta?.symbol || token.mint.slice(0, 4),
      name: meta?.name || "Unknown Token",
      amount: token.amount,
      price,
      value,
      value24h,
    };
  });

  // Find top holding
  const topHolding = tokenValues.reduce((max, t) => (t.value > (max?.value || 0) ? t : max), null as null | typeof tokenValues[0]);

  // Check for missing or zero prices
  const tokensWithNoPrice = tokenValues.filter(t => t.price === 0);
  const allPricesZero = tokenValues.length > 0 && tokenValues.every(t => t.price === 0);

  // Pie chart data: only tokens with value > 0
  const pieData = tokenValues.filter(t => t.value > 0).map(t => ({ name: t.symbol, value: t.value }));

  // Calculate 24h change
  let change24h = "--";
  if (totalValue24h > 0) {
    const percent = ((totalValue - totalValue24h) / totalValue24h) * 100;
    change24h = `${percent > 0 ? "+" : ""}${percent.toFixed(2)}`;
  }

  // Top holding percentage
  let topHoldingPercent = "--";
  if (topHolding && totalValue > 0 && isFinite(topHolding.value) && isFinite(totalValue)) {
    topHoldingPercent = `${((topHolding.value / totalValue) * 100).toFixed(1)}%`;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-4 flex flex-col items-center gap-4">
      {/* <Banner>Portfolio Analytics</Banner> */}
      {allPricesZero && (
        <div className="w-full text-center text-red-600 font-bold mb-2">
          Warning: No price data available for your tokens. Portfolio value may be inaccurate.
        </div>
      )}
      {tokensWithNoPrice.length > 0 && !allPricesZero && (
        <div className="w-full text-center text-yellow-600 font-semibold mb-2 text-sm">
          No price data for: {tokensWithNoPrice.map(t => t.symbol).join(", ")}
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between">
        <OutlinedPanel className="flex-1 min-w-[220px]">
          <div className="text-lg font-semibold mb-1 text-black">Total Value</div>
          <div className="text-3xl font-bold text-green-600 mb-2">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </OutlinedPanel>
        <OutlinedPanel className="flex-1 min-w-[180px] items-center">
          <div className="text-lg font-semibold mb-1 text-black">24h Change</div>
          <Badge color="bg-pink-200">{change24h !== "--" ? `${change24h}%` : "--%"}</Badge>
        </OutlinedPanel>
        <OutlinedPanel className="flex-1 min-w-[180px] items-center">
          <div className="text-lg font-semibold mb-1 text-black">Top Holding</div>
          {topHolding && (
            <Badge color="bg-blue-200">{topHolding.symbol} ({topHoldingPercent})</Badge>
          )}
        </OutlinedPanel>
      </div>
      <OutlinedPanel className="w-full mt-2">
        <div className="text-lg font-semibold mb-2 text-black">Allocation</div>
        <div className="w-full flex justify-center items-center">
          {pieData.length > 0 ? (
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  stroke="#000"
                  strokeWidth={3}
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-40 h-40 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">No data</div>
          )}
        </div>
      </OutlinedPanel>
      <OutlinedPanel className="w-full mt-2">
        <div className="text-lg font-semibold mb-2 text-black">Portfolio Value History (30d)</div>
        <div className="w-full flex justify-center items-center">
          {historyLoading ? (
            <div className="w-full text-center py-8">Loading portfolio history...</div>
          ) : historyError ? (
            <div className="w-full text-center py-8 text-red-600">
              {historyError}
              <button onClick={handleRetryHistory} className="ml-4 px-4 py-2 bg-pink-200 border-2 border-black rounded font-bold">Retry</button>
            </div>
          ) : portfolioHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={portfolioHistory} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <XAxis dataKey="time" tickFormatter={ts => new Date(ts * 1000).toLocaleDateString()} fontSize={12} />
                <YAxis dataKey="value" domain={["auto", "auto"]} fontSize={12} tickFormatter={v => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                <LineTooltip labelFormatter={ts => new Date(ts * 1000).toLocaleDateString()} formatter={(v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full text-center py-8 text-gray-400">No historical data available for your tokens.</div>
          )}
        </div>
      </OutlinedPanel>
    </div>
  );
};

export default PortfolioAnalytics; 