"use client";
import React, { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useTokenList } from "@/hooks/useTokenList";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Banner from "@/components/ui/Banner";
import NeobrutalCard from "@/components/ui/NeobrutalCard";
import CardCustomisable from "@/components/ui/CardCustomisable";

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
    <div className="w-full max-w-7xl mx-auto mt-8 mb-4">
      <Banner>Transaction History</Banner>
      <CardCustomisable
        width="max-w-7xl w-full"
        padding="p-8"
        border="border-4 border-black"
        rounded="rounded-2xl"
        bg="bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200"
        shadow="shadow-[8px_8px_0_0_#000] hover:shadow-[16px_16px_0_0_#000]"
        accentCorner={true}
        accentColor="bg-pink-400"
        accentSize="w-8 h-8"
        accentBorder="border-b-4 border-r-4 border-black"
        className="mx-auto"
      >
        {/* Summary */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-2 pt-2 pb-2">
          <div className="font-bold text-lg text-black">Total: <span className="text-blue-700">{transactions.length}</span> txns</div>
          {lastUpdated && <div className="text-sm text-neutral-600">Last updated: {lastUpdated}</div>}
        </div>
        <div className="w-full">
          <table className="w-full border-collapse text-black table-fixed">
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
                <th className="px-2 py-2 border-b-2 border-black text-left text-base">Date</th>
                <th className="px-2 py-2 border-b-2 border-black text-left text-base">Type</th>
                <th className="px-2 py-2 border-b-2 border-black text-left text-base">Token</th>
                <th className="px-2 py-2 border-b-2 border-black text-left text-base">Amount</th>
                <th className="px-2 py-2 border-b-2 border-black text-left text-base">From</th>
                <th className="px-2 py-2 border-b-2 border-black text-left text-base">To</th>
                <th className="px-2 py-2 border-b-2 border-black text-left text-base">Explorer</th>
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
                    <td className="px-2 py-2 border-b border-black font-mono text-xs whitespace-nowrap">{tx.date}</td>
                    <td className="px-2 py-2 border-b border-black font-bold">
                      <Badge color={typeColors[tx.type] || "bg-gray-200"}>{tx.type}</Badge>
                    </td>
                    <td className="px-2 py-2 border-b border-black font-mono truncate max-w-[80px]" title={tokenMeta?.name || tx.token}>
                      {tokenMeta?.name || tokenMeta?.symbol || tx.token}
                    </td>
                    <td className="px-2 py-2 border-b border-black font-mono text-right">{formatDisplayAmount(tx.amount, tx.token)}</td>
                    <td className="px-2 py-2 border-b border-black font-mono text-xs truncate max-w-[80px]" title={tx.from}>{truncate(tx.from, 12)}</td>
                    <td className="px-2 py-2 border-b border-black font-mono text-xs truncate max-w-[80px]" title={tx.to}>{truncate(tx.to, 12)}</td>
                    <td className="px-2 py-2 border-b border-black text-center">
                      <a
                        href={explorerUrl(tx.signature)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600 hover:text-blue-900 font-mono text-xs"
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
      </CardCustomisable>
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