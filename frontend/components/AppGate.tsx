import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import LandingPage from "./LandingPage";
import Header from "./header";

const AppGate: React.FC<{
  children: React.ReactNode;
  network: "mainnet-beta" | "devnet";
  onNetworkChange: (network: "mainnet-beta" | "devnet") => void;
}> = ({ children, network, onNetworkChange }) => {
  const { publicKey } = useWallet();
  if (!publicKey) return <LandingPage />;
  return <>
    <Header network={network} onNetworkChange={onNetworkChange} />
    {children}
  </>;
};

export default AppGate; 