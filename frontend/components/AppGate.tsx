"use client"
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import LandingPage from "./LandingPage";
import Header from "./header";

const AppGate: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { publicKey } = useWallet();
  if (!publicKey) return <LandingPage />;
  return <>
    <Header />
    {children}
  </>;
};

export default AppGate; 