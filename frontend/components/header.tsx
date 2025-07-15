"use client";
import dynamic from "next/dynamic";
const WalletButton = dynamic(() => import("./WalletButton"), { ssr: false });
import NetworkSwitcher from "./WalletInfo";
import SectionNav from "@/components/SectionNav";

interface HeaderProps {
  network: "mainnet-beta" | "devnet";
  onNetworkChange: (network: "mainnet-beta" | "devnet") => void;
}

const Header = ({ network, onNetworkChange }: HeaderProps) => (
  <>
    <header className="w-full border-b-4 border-black bg-white shadow-neobrutalism px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-black drop-shadow-neobrutalism">Lumina</h1>
      <div className="flex items-center gap-4">
        <NetworkSwitcher network={network} onNetworkChange={onNetworkChange} />
        <WalletButton />
      </div>
    </header>
    <SectionNav />
  </>
);

export default Header;