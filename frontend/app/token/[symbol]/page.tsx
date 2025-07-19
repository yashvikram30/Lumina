"use client";
import { useParams, useRouter } from "next/navigation";
import NeobrutalCard from "@/components/ui/NeobrutalCard";
import PriceChart from "@/components/PriceChart";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import Banner from "@/components/ui/Banner";
import OutlinedPanel from "@/components/ui/OutlinedPanel";
import Badge from "@/components/ui/Badge";
import React from "react";
import FloatingShapes from "@/components/ui/FloatingShapes";

const localImages = ["sui", "polygon", "eth", "bitcoin", "sol", "usdc"];
const fallbackLogo = "/vercel.svg";

// NOTE: Using 'any' for params due to Next.js 15 type issues with dynamic route params
export default function TokenDetailPage() {
  const router = useRouter();
  const params = useParams();
  if (!params) {
    return <div className="text-center py-8">Invalid token symbol.</div>;
  }
  const symbolParam = params.symbol;
  let symbol = symbolParam;
  if (Array.isArray(symbol)) {
    symbol = symbol[0];
  }
  if (!symbol) {
    return <div className="text-center py-8">Invalid token symbol.</div>;
  }
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
      address: "7XSzF1Q6Xo8Xz8Q6Qd8Q6d8Q6Qd8Q6Qd8Q6Qd8Q6Qd8Q", // USDC Devnet
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
  let tokenMeta = tokenList.find(t => (t.symbol || '').toLowerCase() === symbol.toLowerCase());
  if (!tokenMeta) {
    tokenMeta = devnetTokenList.find(t => (t.symbol || '').toLowerCase() === symbol.toLowerCase());
  }
  const mint = tokenMeta?.address || symbol; // fallback to symbol if not found
  const balanceObj = balances.find(t => t.mint.toLowerCase() === mint.toLowerCase());
  const displaySymbol = tokenMeta?.symbol || symbol.toUpperCase();
  const name = tokenMeta?.name || "Unknown Token";
  const logoURI = tokenMeta?.logoURI || fallbackLogo;
  const balance = balanceObj ? balanceObj.amount : 0;

  // Local image fallback logic
  const lowerSymbol = (displaySymbol || "").toLowerCase();
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
        <title>{displaySymbol} | Solana Portfolio</title>
      </Head>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#eaf6ff] gap-6 md:gap-8 py-6 md:py-8 overflow-hidden px-4 md:px-0">
        <div className="hidden md:block"><FloatingShapes /></div>
        {/* <h1 className="text-4xl font-black mb-16 text-center">{displaySymbol} Details</h1>
        <Banner className="rounded-none max-w-2xl mx-auto w-full mb-16">{name}</Banner> */}
        <div className="w-full max-w-xl flex flex-col gap-4 md:gap-6 z-10">
          <button
            className="mb-2 bg-blue-400 border-2 border-black text-black rounded-none px-4 md:px-6 py-2 text-base md:text-lg font-extrabold shadow-[2px_2px_0_0_#000] hover:bg-blue-300 transition self-start"
            onClick={() => router.push("/tokens")}
          >
            ← Back
          </button>
          <OutlinedPanel className="flex flex-col items-center gap-3 md:gap-4">
            <Image
              src={imgSrc}
              alt={displaySymbol}
              width={48}
              height={48}
              className="mb-2 w-12 h-12 md:w-16 md:h-16"
              onError={() => {
                if (imgSrc !== logoURI && logoURI) {
                  setImgSrc(logoURI);
                } else if (imgSrc !== fallbackLogo) {
                  setImgSrc(fallbackLogo);
                }
              }}
            />
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <Badge color="bg-blue-200">{displaySymbol}</Badge>
            </div>
            <div className="text-base md:text-lg font-mono text-black text-center">Your Balance: <span className="font-extrabold">{balance}</span></div>
          </OutlinedPanel>
          <OutlinedPanel className="w-full mt-2">
            <PriceChart symbol={displaySymbol} />
          </OutlinedPanel>
        </div>
      </div>
    </>
  );
} 