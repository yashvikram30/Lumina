"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "@/components/WalletContextProvider";
import "@solana/wallet-adapter-react-ui/styles.css";
import Header from "@/components/header";
import { useState } from "react";



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
  const [network, setNetwork] = useState<"mainnet-beta" | "devnet">("devnet");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900 min-h-screen`}
      >
        <WalletContextProvider network={network}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center w-full">
              {children}
            </main>
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}
