"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "@/components/WalletContextProvider";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useState } from "react";
import AppGate from "@/components/AppGate";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [network, setNetwork] = useState<"mainnet-beta" | "devnet">("mainnet-beta");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900 min-h-screen`}
      >
        <WalletContextProvider network={network}>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200">
            <AppGate network={network} onNetworkChange={setNetwork}>{children}</AppGate>
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}
