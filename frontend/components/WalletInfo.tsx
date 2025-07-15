"use client";
import { useWalletInfo } from "@/hooks/useWalletInfo";

function shortenAddress(address: string) {
  return address.slice(0, 4) + "..." + address.slice(-4);
}

const WalletInfo = () => {
  const { publicKey, balance } = useWalletInfo();

  if (!publicKey) return null;

  return (
    <div className="px-3 py-2 border-2 border-black rounded-lg bg-yellow-100 font-mono text-xs text-black flex flex-col items-start shadow-neobrutalism">
      <div className="mb-1">Address: <span className="font-bold">{shortenAddress(publicKey.toBase58())}</span></div>
      <div>SOL: <span className="font-bold">{balance !== null ? balance.toFixed(4) : "Loading..."}</span></div>
    </div>
  );
};

export default WalletInfo;