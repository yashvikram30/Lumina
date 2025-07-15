"use client";
import { useRouter } from "next/navigation";
import NeobrutalCard from "@/components/ui/NeobrutalCard";
import PriceChart from "@/components/PriceChart";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import React from "react";

const localImages = ["sui", "polygon", "eth", "bitcoin", "sol", "usdc"];
const fallbackLogo = "/vercel.svg";

export default function TokenDetailPage({ params }: { params: { symbol: string } }) {
  const router = useRouter();
  const { symbol: symbolParam } = React.use(params);
  const { tokens: tokenList } = useTokenList();
  const balances = useTokenBalances();

  // Import devnetTokenList structure from TokenBalances (copy here for now)
  const devnetTokenList = [
    {
      address: "So11111111111111111111111111111111111111112", // wSOL
      name: "Solana",
      symbol: "SOL",
      logoURI: "https://cryptologos.cc/logos/solana-sol-logo.png",
    },
    {
      address: "Es9vMFrzaCERZ6t2kF9Q4FQp9Qd8Q6Qd8Q6Qd8Q6Qd8Q", // USDT Devnet
      name: "Tether USD (Devnet)",
      symbol: "USDT",
      logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    },
    {
      address: "7XSzF1Q6Xo8Xz8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q", // USDC Devnet
      name: "USD Coin (Devnet)",
      symbol: "USDC",
      logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    },
    {
      address: "4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM", // BONK Devnet
      name: "BONK (Devnet)",
      symbol: "BONK",
      logoURI: "https://assets.coingecko.com/coins/images/28793/standard/bonk.jpg",
    },
  ];

  // Find token meta by symbol (case-insensitive)
  let tokenMeta = tokenList.find(t => (t.symbol || '').toLowerCase() === symbolParam.toLowerCase());
  if (!tokenMeta) {
    tokenMeta = devnetTokenList.find(t => (t.symbol || '').toLowerCase() === symbolParam.toLowerCase());
  }
  const mint = tokenMeta?.address || symbolParam; // fallback to symbolParam if not found
  const balanceObj = balances.find(t => t.mint.toLowerCase() === mint.toLowerCase());
  const symbol = tokenMeta?.symbol || symbolParam.toUpperCase();
  const name = tokenMeta?.name || "Unknown Token";
  const logoURI = tokenMeta?.logoURI || fallbackLogo;
  const balance = balanceObj ? balanceObj.amount : 0;

  // Local image fallback logic
  const lowerSymbol = (symbol || "").toLowerCase();
  let initialImageSrc = logoURI;
  if (localImages.includes(lowerSymbol)) {
    initialImageSrc = `/${lowerSymbol}.png`;
  }
  const [imgSrc, setImgSrc] = useState(initialImageSrc);
  useEffect(() => {
    setImgSrc(initialImageSrc);
  }, [initialImageSrc]);

  return (
    <>
      <Head>
        <title>{symbol} | Solana Portfolio</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <NeobrutalCard className="max-w-xl w-full flex flex-col items-center mt-16">
          <button
            className="mb-6 bg-blue-400 border-2 border-black text-black rounded-lg px-6 py-2 text-lg font-extrabold shadow-[2px_2px_0_0_#000] hover:bg-blue-300 transition"
            onClick={() => router.push("/")}
          >
            ← Back
          </button>
          <Image
            src={imgSrc}
            alt={symbol}
            width={64}
            height={64}
            className="mb-4"
            onError={() => {
              if (imgSrc !== logoURI && logoURI) {
                setImgSrc(logoURI);
              } else if (imgSrc !== fallbackLogo) {
                setImgSrc(fallbackLogo);
              }
            }}
          />
          <h1 className="text-3xl font-extrabold mb-2 text-black drop-shadow-neobrutalism">{name}</h1>
          <div className="mb-2 text-lg font-mono text-black">Symbol: {symbol}</div>
          <div className="mb-2 text-lg font-mono text-black">Mint: <span className="break-all">{mint}</span></div>
          <div className="mb-4 text-lg font-mono text-black">Your Balance: {balance}</div>
          <div className="w-full mb-6">
            <PriceChart symbol={symbol} />
          </div>
        </NeobrutalCard>
      </div>
    </>
  );
} 