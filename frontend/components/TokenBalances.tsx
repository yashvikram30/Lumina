"use client";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import { useState } from "react";
import PriceChart from "@/components/PriceChart";
const fallbackLogo = "/vercel.svg";

// Popular devnet tokens (add more as needed)
const devnetTokenList = [
  {
    address: "So11111111111111111111111111111111111111112", // wSOL
    name: "Solana",
    symbol: "SOL",
    logoURI: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    address: "Es9vMFrzaCERZ6t2kF9Q4FQp9Qd8Q6Qd8Q6Qd8Q6Qd8Q", // USDT Devnet (example, replace with actual devnet mint)
    name: "Tether USD (Devnet)",
    symbol: "USDT",
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  {
    address: "7XSzF1Q6Xo8Xz8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q", // USDC Devnet (example, replace with actual devnet mint)
    name: "USD Coin (Devnet)",
    symbol: "USDC",
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    address: "4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM", // BONK Devnet (example, replace with actual devnet mint)
    name: "BONK (Devnet)",
    symbol: "BONK",
    logoURI: "https://assets.coingecko.com/coins/images/28793/standard/bonk.jpg",
  },
  // Add more popular devnet tokens here as needed
];

const TokenBalances = () => {
  const tokens = useTokenBalances();
  const { tokens: tokenList, loading } = useTokenList();
  const mintAddresses = tokens.map(t => t.mint);
  const prices = useTokenPrices(mintAddresses);
  const [opened, setOpened] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);

  if (!tokens.length) return <div className="text-center text-lg font-semibold py-8">No tokens found.</div>;
  if (loading) return <div className="text-center text-lg font-semibold py-8">Loading...</div>;

  // Helper to get tokenMeta
  const getTokenMeta = (mint: string) => {
    let tokenMeta = tokenList.find(t => t.address.toLowerCase() === mint.toLowerCase());
    if (!tokenMeta) {
      tokenMeta = devnetTokenList.find(t => t.address.toLowerCase() === mint.toLowerCase());
    }
    return tokenMeta;
  };

  return (
    <>
      {/* Modal */}
      {opened && selectedToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white border-4 border-black rounded-xl shadow-neobrutalism p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-800 transition"
              onClick={() => setOpened(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={getTokenMeta(selectedToken.mint)?.logoURI || fallbackLogo}
                alt={getTokenMeta(selectedToken.mint)?.symbol || "Token"}
                className="w-12 h-12 rounded-full border-2 border-black bg-white object-cover"
              />
              <div>
                <div className="font-bold text-lg">{getTokenMeta(selectedToken.mint)?.name || "Devnet Token"}</div>
                <span className="inline-block bg-yellow-200 border-2 border-black rounded px-2 py-0.5 text-xs font-mono mt-1">{getTokenMeta(selectedToken.mint)?.symbol || "Devnet"}</span>
              </div>
            </div>
            <div className="text-sm text-neutral-700 mb-2 break-all">Mint: {selectedToken.mint}</div>
            <div className="mb-1">Balance: <span className="font-mono">{selectedToken.amount}</span></div>
            <div className="mb-1">Decimals: <span className="font-mono">{selectedToken.decimals}</span></div>
            <div className="mb-4">Value (USD): <span className="font-mono">${(selectedToken.amount * (prices[selectedToken.mint] || 0)).toFixed(2)}</span></div>
            <PriceChart mint={selectedToken.mint} symbol={getTokenMeta(selectedToken.mint)?.symbol || "Token"} />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-8 mx-auto max-w-2xl">
        {tokens.map((token) => {
          const tokenMeta = getTokenMeta(token.mint);
          return (
            <div
              key={token.mint}
              className="bg-white border-4 border-black rounded-xl shadow-neobrutalism flex items-center gap-4 p-4 cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => { setSelectedToken(token); setOpened(true); }}
            >
              <img
                src={tokenMeta?.logoURI || fallbackLogo}
                alt={tokenMeta?.symbol || "Unknown Token"}
                className="w-10 h-10 rounded-full border-2 border-black bg-white object-cover"
              />
              <div className="flex-1">
                <div className="font-bold text-lg">{tokenMeta?.name || "Devnet Token"}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block bg-yellow-200 border-2 border-black rounded px-2 py-0.5 text-xs font-mono">{tokenMeta?.symbol || "Devnet"}</span>
                  <span className="text-sm text-neutral-500">{token.amount} {tokenMeta?.symbol || ""}</span>
                </div>
              </div>
              <button
                className="bg-black text-white rounded-lg px-3 py-1 text-xs font-bold border-2 border-black hover:bg-neutral-800 transition"
                onClick={e => { e.stopPropagation(); setSelectedToken(token); setOpened(true); }}
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TokenBalances;