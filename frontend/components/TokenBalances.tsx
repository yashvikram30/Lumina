"use client";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenPrices } from "@/hooks/useTokenPrices";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PriceChart from "@/components/PriceChart";
import NeobrutalCard from "@/components/ui/NeobrutalCard"; // Import the new component
import { useEffect, useState } from "react";

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
  const router = useRouter();

  if (loading) return <div className="text-center text-lg font-semibold py-8">Loading...</div>;
  if (!tokens.length) return <div className="text-center text-lg font-semibold py-8">No tokens found.</div>;
  

  // Helper to get tokenMeta
  const getTokenMeta = (mint: string) => {
    let tokenMeta = tokenList.find(t => t.address.toLowerCase() === mint.toLowerCase());
    if (!tokenMeta) {
      tokenMeta = devnetTokenList.find(t => t.address.toLowerCase() === mint.toLowerCase());
    }
    return tokenMeta;
  };

  // Define color themes for cycling backgrounds
  const colorThemes = [
    "bg-yellow-300",
    "bg-blue-400",
    "bg-pink-400",
  ];

  // List of available local images in public folder
  const localImages = ["sui", "polygon", "eth", "bitcoin", "sol", "usdc"];

  function TokenImage({ symbol, logoURI, ...props }: { symbol?: string; logoURI?: string; [key: string]: any }) {
    const lowerSymbol = (symbol || "").toLowerCase();
    let initialImageSrc = logoURI || fallbackLogo;
    if (localImages.includes(lowerSymbol)) {
      initialImageSrc = `/${lowerSymbol}.png`;
    }
    const [imgSrc, setImgSrc] = useState(initialImageSrc);

    useEffect(() => {
      setImgSrc(initialImageSrc);
    }, [initialImageSrc]);

    return (
      <Image
        src={imgSrc}
        alt={symbol || "Unknown Token"}
        width={48}
        height={48}
        className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black object-cover shadow-[3px_3px_0_0_#000] mr-4 md:mr-10"
        onError={() => {
          if (imgSrc !== logoURI && logoURI) {
            setImgSrc(logoURI);
          } else if (imgSrc !== fallbackLogo) {
            setImgSrc(fallbackLogo);
          }
        }}
        {...props}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10 mt-4 md:mt-8 mx-auto max-w-2xl w-full items-center px-2 md:px-0">
      {tokens.map((token, idx) => {
        const tokenMeta = getTokenMeta(token.mint);
        const cardColors = [
          "bg-[#ffe066]", // yellow
          "bg-[#ff6b6b]", // pink/red
          "bg-[#4ecdc4]", // teal
          "bg-[#f472b6]", // pink
          "bg-[#60a5fa]", // blue
        ];
        const cardColor = cardColors[idx % cardColors.length];
        return (
          <div
            key={token.mint}
            className={`relative flex flex-col md:flex-row items-center w-full min-w-[280px] md:min-w-[340px] max-w-2xl px-4 md:px-12 py-6 md:py-10 border-4 border-black ${cardColor} shadow-[8px_8px_0_0_#000] transition-transform hover:scale-[1.02]`}
            style={{ borderRadius: 0, cursor: 'pointer' }}
            onClick={() => router.push(`/token/${tokenMeta?.symbol?.toLowerCase()}`)}
          >
            {/* Accent corner */}
            <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 bg-pink-400 border-b-4 border-r-4 border-black z-10" style={{ borderRadius: 0 }} />
            <TokenImage symbol={tokenMeta?.symbol} logoURI={tokenMeta?.logoURI} style={{ width: 56, height: 56, marginRight: 16, borderRadius: 0, border: '4px solid #000', boxShadow: '4px 4px 0 #000' }} />
            <div className="flex-1 flex flex-col justify-center min-w-0 gap-2 items-center text-center">
              <div className="text-2xl md:text-4xl font-black text-black truncate mb-2" style={{ letterSpacing: 1 }}>{tokenMeta?.name || "Devnet Token"}</div>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2">
                <span className={`hidden md:inline-block border-2 border-black px-4 md:px-8 py-2 md:py-3 text-lg md:text-2xl font-black shadow-[4px_4px_0_0_#000] bg-[#60a5fa] text-black`} style={{ borderRadius: 0 }}>{tokenMeta?.symbol || "Devnet"}</span>
                <span className="text-lg md:text-2xl text-black font-mono truncate text-center" style={{ letterSpacing: 1 }}>{token.amount} {tokenMeta?.symbol || ""}</span>
              </div>
            </div>
            <button
              className="mt-4 md:mt-0 md:ml-10 px-6 md:px-12 py-3 md:py-5 text-lg md:text-2xl font-black border-2 border-black bg-[#60a5fa] text-black shadow-[6px_6px_0_0_#000] transition hover:scale-105"
              style={{ borderRadius: 0 }}
              onClick={e => { e.stopPropagation(); router.push(`/token/${tokenMeta?.symbol?.toLowerCase()}`); }}
            >
              Details
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TokenBalances;