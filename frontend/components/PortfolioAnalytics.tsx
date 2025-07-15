"use client"
import React, { useEffect, useState } from "react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import Banner from "@/components/ui/Banner";
import Badge from "@/components/ui/Badge";
import OutlinedPanel from "@/components/ui/OutlinedPanel";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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
  const mintAddresses = tokens.map((t) => t.mint);
  const prices = useTokenPrices(mintAddresses);

  // 24h price state
  const [prices24h, setPrices24h] = useState<{ [mint: string]: number }>({});
  const [loading24h, setLoading24h] = useState(false);

  // Fetch 24h-ago prices for supported tokens
  useEffect(() => {
    const fetch24hPrices = async () => {
      setLoading24h(true);
      const entries = await Promise.all(
        mintAddresses.map(async (address) => {
          const coingeckoId = COINGECKO_MINTS[address];
          if (coingeckoId) {
            try {
              const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=2&interval=daily`
              );
              const data = await res.json();
              // Get the price from 24h ago (first entry)
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
    };
    if (mintAddresses.length > 0) fetch24hPrices();
  }, [mintAddresses.join(",")]);

  // Loading state for prices
  const loadingPrices = mintAddresses.length > 0 && mintAddresses.some((mint) => prices[mint] === undefined);

  if (loadingList || loadingPrices || loading24h) return <div className="text-center text-lg font-semibold py-8">Loading portfolio analytics...</div>;
  if (!tokens.length) return <div className="text-center text-lg font-semibold py-8">No tokens found.</div>;

  // Helper to get token meta
  const getTokenMeta = (mint: string) => {
    return tokenList.find((t) => t.address.toLowerCase() === mint.toLowerCase());
  };

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
      <Banner>Portfolio Analytics</Banner>
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
    </div>
  );
};

export default PortfolioAnalytics; 