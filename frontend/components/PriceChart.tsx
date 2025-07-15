"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTokenPriceHistory } from "@/hooks/useTokenPriceHistory";

interface PriceChartProps {
  mint: string;
  symbol?: string;
}

const PriceChart = ({ mint, symbol = "Token" }: PriceChartProps) => {
  const { history, loading } = useTokenPriceHistory(mint);

  if (loading) return <div className="text-center py-8">Loading chart...</div>;
  if (!history.length) return <div className="text-center py-8">No price data available.</div>;

  // Format timestamp to readable date
  const formatDate = (ts: number) => new Date(ts * 1000).toLocaleDateString();

  return (
    <div className="w-full h-64 bg-white rounded-lg shadow p-4 mb-8">
      <h2 className="text-lg font-semibold mb-2">{symbol} Price Chart</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={history} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <XAxis dataKey="time" tickFormatter={formatDate} fontSize={12} />
          <YAxis dataKey="value" domain={["auto", "auto"]} fontSize={12} />
          <Tooltip labelFormatter={formatDate} formatter={(v: number) => `$${v.toFixed(4)}`} />
          <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart; 