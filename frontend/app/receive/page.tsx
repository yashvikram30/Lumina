"use client"
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import NeobrutalCard from "@/components/ui/NeobrutalCard";
import Button from "@/components/ui/Button";
import Banner from "@/components/ui/Banner";
import FloatingShapes from "@/components/ui/FloatingShapes";
import { QRCodeSVG } from "qrcode.react";

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
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full gap-8 py-8 bg-[#eaf6ff] overflow-hidden">
      <FloatingShapes />
      <h1 className="text-4xl font-black mb-2 z-10">Receive Tokens</h1>
      <Banner className="z-10 max-w-xl mx-auto text-lg rounded-none">Share your address or QR code to receive tokens.</Banner>
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-14 items-center justify-center z-10">
        {/* Copy Address Card */}
        <NeobrutalCard
          className="bg-white border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 flex-[1.5] min-w-[390px] mr-20"
          rounded="rounded-none"
          padding="p-6 sm:p-8"
        >
          {publicKey ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="font-mono text-lg break-all text-center border-2 border-black px-4 py-2 rounded-md shadow-[2px_2px_0_0_#000] bg-white font-black">{publicKey.toBase58()}</span>
              <Button
                variant="accent"
                size="md"
                className={`border-black shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] rounded-md mt-1 w-full text-xl font-black ${copied ? 'bg-green-300' : ''}`}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy Address'}
              </Button>
            </div>
          ) : (
            <div className="text-center font-mono text-base">Connect your wallet to receive tokens.</div>
          )}
        </NeobrutalCard>
        {/* QR Code Card */}
        <NeobrutalCard
          className="bg-white border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 flex-1 min-w-[260px] flex items-center justify-center"
          rounded="rounded-none"
          padding="p-6 sm:p-8"
        >
          {publicKey ? (
            <div className="flex flex-col items-center w-full">
              <div className="bg-white border-2 border-black p-3 rounded-md shadow-[2px_2px_0_0_#000] flex items-center justify-center">
                <QRCodeSVG value={publicKey.toBase58()} size={160} />
              </div>
            </div>
          ) : (
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-black rounded-md">QR</div>
          )}
        </NeobrutalCard>
      </div>
    </main>
  );
};

export default ReceivePage; 