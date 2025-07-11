"use client";
import { useWalletInfo } from "@/hooks/useWalletInfo";

function shortenAddress(address: string) {
  return address.slice(0, 4) + "..." + address.slice(-4);
}

const WalletInfo = () => {
  const { publicKey, balance } = useWalletInfo();

  if (!publicKey) return null;

  return (
    <div>
      <div>Address: {shortenAddress(publicKey.toBase58())}</div>
      <div>SOL Balance: {balance !== null ? balance.toFixed(4) : "Loading..."}</div>
    </div>
  );
};

export default WalletInfo;