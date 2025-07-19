"use client";
import React, { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useTokenList } from "@/hooks/useTokenList";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Banner from "@/components/ui/Banner";
import NeobrutalCard from "@/components/ui/NeobrutalCard";

const fallbackLogo = "/vercel.svg";
const localImages = ["sui", "polygon", "eth", "bitcoin", "sol", "usdc"];

function TokenImage({ symbol, logoURI, ...props }: { symbol?: string; logoURI?: string; [key: string]: any }) {
  const lowerSymbol = (symbol || "").toLowerCase();
  let initialImageSrc = logoURI || fallbackLogo;
  if (localImages.includes(lowerSymbol)) {
    initialImageSrc = `/${lowerSymbol}.png`;
  }
  const [imgSrc, setImgSrc] = React.useState(initialImageSrc);
  React.useEffect(() => { setImgSrc(initialImageSrc); }, [initialImageSrc]);
  return (
    <Image
      src={imgSrc}
      alt={symbol || "Unknown Token"}
      width={32}
      height={32}
      className="w-8 h-8 rounded-full border-2 border-black object-cover shadow mr-2"
      onError={() => {
        if (imgSrc !== logoURI && logoURI) setImgSrc(logoURI);
        else if (imgSrc !== fallbackLogo) setImgSrc(fallbackLogo);
      }}
      {...props}
    />
  );
}

const typeColors: Record<string, string> = {
  Send: "bg-pink-200",
  Receive: "bg-blue-200",
  Unknown: "bg-gray-200",
};

const explorerUrl = (signature: string) => `https://solscan.io/tx/${signature}`;

// Add a map for native asset decimals
const NATIVE_ASSET_DECIMALS: Record<string, number> = {
  SOL: 9,
  ETH: 18,
  BTC: 8,
  MATIC: 18,
  SUI: 9,
  // Add more as needed
};

// Helper to format amount based on token
function formatDisplayAmount(amount: number, token: string) {
  // If token is a known native asset, convert from base units
  const upper = (token || '').toUpperCase();
  if (NATIVE_ASSET_DECIMALS[upper]) {
    const decimals = NATIVE_ASSET_DECIMALS[upper];
    const val = amount / Math.pow(10, decimals);
    // Remove trailing zeros, show up to 6 decimals
    return val.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }
  // Otherwise, show as is (for SPL tokens, already in UI amount)
  return amount.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

const truncate = (str: string, n = 8) => str.length > n ? `${str.slice(0, 4)}...${str.slice(-4)}` : str;

const TransactionHistory: React.FC = () => {
  const { publicKey } = useWallet();
  const address = publicKey?.toBase58();
  const { transactions, loading, error } = useTransactionHistory(address);
  const { tokens: tokenList } = useTokenList();

  // Memoize token meta lookup for performance
  const getTokenMeta = useMemo(() => {
    return (symbolOrMint: string) => {
      if (!symbolOrMint || symbolOrMint === "-") return undefined;
      return tokenList.find(
        t => t.symbol?.toLowerCase() === symbolOrMint.toLowerCase() || t.address?.toLowerCase() === symbolOrMint.toLowerCase()
      );
    };
  }, [tokenList]);

  const lastUpdated = transactions.length ? transactions[0].date : null;

  if (!address) return <div className="text-center py-8">Connect your wallet to view transaction history.</div>;
  if (loading) return <div className="text-center py-8">Loading transactions...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!transactions.length) return <div className="text-center py-8">No transactions found.</div>;

  return (
    <div className="w-full max-w-5xl px-2 md:px-4 mx-auto">
      <NeobrutalCard
        className="bg-white border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] mx-auto"
        rounded="rounded-none"
        padding="p-4 md:p-8"
      >
        {/* Summary */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-2 pt-2 pb-2">
          <div className="font-bold text-base md:text-lg text-black">Total: <span className="text-blue-700">{transactions.length}</span> txns</div>
          {lastUpdated && <div className="text-xs md:text-sm text-neutral-600">Last updated: {lastUpdated}</div>}
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-black table-fixed min-w-[600px]">
            <colgroup>
              <col style={{ width: '18%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '8%' }} />
            </colgroup>
            <thead className="sticky top-0 z-10">
              <tr className="bg-yellow-200">
                <th className="px-1 md:px-2 py-2 border-b-2 border-black text-left text-xs md:text-base">Date</th>
                <th className="px-1 md:px-2 py-2 border-b-2 border-black text-left text-xs md:text-base">Type</th>
                <th className="px-1 md:px-2 py-2 border-b-2 border-black text-left text-xs md:text-base">Token</th>
                <th className="px-1 md:px-2 py-2 border-b-2 border-black text-left text-xs md:text-base">Amount</th>
                <th className="px-1 md:px-2 py-2 border-b-2 border-black text-left text-xs md:text-base">From</th>
                <th className="px-1 md:px-2 py-2 border-b-2 border-black text-left text-xs md:text-base">To</th>
                <th className="px-1 md:px-2 py-2 border-b-2 border-black text-center text-xs md:text-base w-40 whitespace-nowrap">Explorer</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => {
                const tokenMeta = getTokenMeta(tx.token);
                return (
                  <tr
                    key={tx.signature}
                    className={`transition-all duration-200 ease-in-out hover:bg-yellow-100 ${idx % 2 === 0 ? "bg-blue-50" : "bg-pink-50"}`}
                    style={{ animation: `fadeIn 0.4s ${idx * 0.04}s both` }}
                  >
                    <td className="px-1 md:px-2 py-2 border-b border-black font-mono text-xs whitespace-nowrap">{tx.date}</td>
                    <td className="px-1 md:px-2 py-2 border-b border-black font-bold text-center">
                      <span className={`inline-block px-2 md:px-3 py-1 border-2 border-black rounded-full font-bold text-xs shadow-[1.5px_1.5px_0_0_#000] ${typeColors[tx.type] || "bg-gray-200"}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-1 md:px-2 py-2 border-b border-black font-mono truncate max-w-[60px] md:max-w-[80px]" title={tokenMeta?.name || tx.token}>
                      {tokenMeta?.name || tokenMeta?.symbol || tx.token}
                    </td>
                    <td className="px-1 md:px-2 py-2 border-b border-black font-mono text-right text-xs md:text-base">{formatDisplayAmount(tx.amount, tx.token)}</td>
                    <td className="px-1 md:px-2 py-2 border-b border-black font-mono text-xs truncate max-w-[60px] md:max-w-[80px]" title={tx.from}>{truncate(tx.from, 8)}</td>
                    <td className="px-1 md:px-2 py-2 border-b border-black font-mono text-xs truncate max-w-[60px] md:max-w-[80px]" title={tx.to}>{truncate(tx.to, 8)}</td>
                    <td className="px-1 md:px-2 py-2 border-b border-black text-center">
                      <a
                        href={explorerUrl(tx.signature)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-2 md:px-4 py-1 font-bold font-mono text-xs bg-yellow-200 border-2 border-black rounded shadow-[2px_2px_0_0_#000] hover:bg-pink-200 hover:text-black transition-all duration-150"
                        title="View on Solscan"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </NeobrutalCard>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default TransactionHistory; 