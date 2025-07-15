"use client"
import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
  } from "@solana/wallet-adapter-wallets";

interface WalletContextProviderProps {
  children: ReactNode;
  network?: "mainnet-beta" | "devnet";
}

const WalletContextProvider: FC<WalletContextProviderProps> = ({ children, network = "devnet" }) => {
  const endpoint = useMemo(() => {
    if (network === "mainnet-beta") {
      return String(process.env.NEXT_PUBLIC_HELIUS_API_KEY);
    }
    return clusterApiUrl("devnet");
  }, [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),   
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint} key={network}>
      <WalletProvider wallets={wallets} key={network}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;