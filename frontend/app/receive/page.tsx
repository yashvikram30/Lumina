"use client"
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";

let QRCode: any = null;
try {
  QRCode = require('qrcode.react').QRCode;
} catch {}

const ReceivePage = () => {
  const { publicKey } = useWallet();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-8 py-8">
      <h1 className="text-4xl font-black mb-6">Receive Tokens</h1>
      <div className="w-full max-w-2xl flex flex-col gap-6 items-center">
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_0_#000] p-8 flex flex-col items-center justify-center gap-6">
          {publicKey ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-base break-all text-center">{publicKey.toBase58()}</span>
                <button
                  className="bg-yellow-200 border-2 border-black rounded-lg px-4 py-1 font-mono text-sm mt-1 shadow-[2px_2px_0_0_#000] hover:bg-yellow-300"
                  onClick={() => {navigator.clipboard.writeText(publicKey.toBase58())}}
                >
                  Copy Address
                </button>
              </div>
              <div className="mt-4">
                {QRCode ? (
                  <QRCode value={publicKey.toBase58()} size={160} />
                ) : (
                  <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-500">QR</div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center font-mono text-base">Connect your wallet to receive tokens.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReceivePage; 