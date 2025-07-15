"use client";
import dynamic from "next/dynamic";
const WalletButton = dynamic(() => import("./WalletButton"), { ssr: false });
import WalletInfo from "./WalletInfo";

const Header = () => (
  <header className="w-full border-b-4 border-black bg-white shadow-neobrutalism px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-extrabold tracking-tight text-black drop-shadow-neobrutalism">Solana Portfolio Tracker</h1>
    <div className="flex items-center gap-4">
      <WalletInfo />
      <WalletButton />
    </div>
  </header>
);

export default Header;