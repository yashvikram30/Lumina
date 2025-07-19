"use client"
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import NeobrutalCard from "@/components/ui/NeobrutalCard";
import Button from "@/components/ui/Button";
import Banner from "@/components/ui/Banner";
import FloatingShapes from "@/components/ui/FloatingShapes";
import { QRCodeSVG } from "qrcode.react";
import Footer from "@/components/ui/Footer";


const ReceivePage = () => {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toBase58());
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        setCopied(false);
      }
    }
  };

  return (
    <>
    <main className="relative flex flex-col items-center justify-top min-h-screen w-full gap-6 md:gap-8 py-6 md:py-8 bg-[#eaf6ff] px-4 md:px-0">
      <div className="hidden md:block"><FloatingShapes /></div>
      <h1 className="text-2xl md:text-4xl font-black mb-2 z-10">Receive Tokens</h1>
      <Banner className="z-10 max-w-xl mx-auto text-base md:text-lg rounded-none">Share your address or QR code to receive tokens.</Banner>
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8 md:gap-14 items-center justify-center z-10">
        {/* Copy Address Card */}
        <NeobrutalCard
          className="bg-white border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 w-full md:flex-[1.5] md:min-w-[390px] md:mr-20"
          rounded="rounded-none"
          padding="p-4 md:p-6 lg:p-8"
        >
          {publicKey ? (
            <div className="flex flex-col items-center gap-3 md:gap-4 w-full">
              <span className="font-mono text-sm md:text-lg break-all text-center border-2 border-black px-3 md:px-4 py-2 rounded-md shadow-[2px_2px_0_0_#000] bg-white font-black">{publicKey.toBase58()}</span>
              <Button
                variant="accent"
                size="md"
                className={`border-black shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] rounded-md mt-1 w-full text-lg md:text-xl font-black ${copied ? 'bg-green-300' : ''}`}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy Address'}
              </Button>
            </div>
          ) : (
            <div className="text-center font-mono text-sm md:text-base">Connect your wallet to receive tokens.</div>
          )}
        </NeobrutalCard>
        {/* QR Code Card */}
        <NeobrutalCard
          className="bg-white border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 w-full md:flex-1 md:min-w-[260px] flex items-center justify-center"
          rounded="rounded-none"
          padding="p-4 md:p-6 lg:p-8"
        >
          {publicKey ? (
            <div className="flex flex-col items-center w-full">
              <div className="bg-white border-2 border-black p-2 md:p-3 rounded-md shadow-[2px_2px_0_0_#000] flex items-center justify-center">
                <QRCodeSVG value={publicKey.toBase58()} size={120} className="md:w-40 md:h-40" />
              </div>
            </div>
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-black rounded-md text-sm md:text-base">QR</div>
          )}
        </NeobrutalCard>
      </div>
      
    </main>
    <Footer />
    </>
  );
};

export default ReceivePage; 