"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletButton = () => (
  <div className="ml-2">
    <WalletMultiButton className="!bg-white !border-2 !border-black !rounded-lg !shadow-neobrutalism !text-black !font-bold !px-4 !py-2 hover:!bg-yellow-200 transition" />
  </div>
);

export default WalletButton;