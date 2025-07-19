"use client"
import React, { useState } from "react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenList } from "@/hooks/useTokenList";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import NeobrutalCard from "@/components/ui/NeobrutalCard";
import Banner from "@/components/ui/Banner";
import FloatingShapes from "@/components/ui/FloatingShapes";
import Button from "@/components/ui/Button";
import Footer from "@/components/ui/Footer";

const WSOL_MINT = "So11111111111111111111111111111111111111112";

async function sendSplToken({
  connection,
  wallet,
  mint,
  amount,
  recipient,
  decimals,
}: {
  connection: any;
  wallet: any;
  mint: string;
  amount: number;
  recipient: string;
  decimals: number;
}) {
  const { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } = await import("@solana/spl-token");
  const fromWallet = wallet.publicKey;
  const toWallet = new PublicKey(recipient);
  const fromTokenAccount = await getAssociatedTokenAddress(new PublicKey(mint), fromWallet);
  const toTokenAccount = await getAssociatedTokenAddress(new PublicKey(mint), toWallet);
  const ix = createTransferInstruction(
    fromTokenAccount,
    toTokenAccount,
    fromWallet,
    amount * Math.pow(10, decimals),
    [],
    TOKEN_PROGRAM_ID
  );
  const tx = new Transaction().add(ix);
  tx.feePayer = fromWallet;
  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  const signed = await wallet.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(sig);
  return sig;
}

const SendPage = () => {
  const tokens = useTokenBalances();
  const { tokens: tokenList } = useTokenList();
  const { publicKey, signTransaction, connected } = useWallet();
  const { connection } = useConnection();
  const [selectedMint, setSelectedMint] = useState(tokens[0]?.mint || "");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSend = async () => {
    setMessage(null);
    if (!connected || !publicKey) {
      setMessage("Connect your wallet first.");
      return;
    }
    if (!signTransaction) {
      setMessage("Wallet does not support transaction signing.");
      return;
    }
    if (!recipient || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setMessage("Enter a valid recipient and amount.");
      return;
    }
    const token = tokens.find(t => t.mint === selectedMint);
    if (!token) {
      setMessage("Invalid token selected.");
      return;
    }
    setLoading(true);
    try {
      if (selectedMint === WSOL_MINT) {
        // Send SOL
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipient),
            lamports: Math.floor(Number(amount) * LAMPORTS_PER_SOL),
          })
        );
        tx.feePayer = publicKey;
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;
        const signed = await signTransaction(tx);
        const sig = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(sig);
        setMessage("✅ Sent SOL! Tx: " + sig);
      } else {
        // Send SPL token
        const sig = await sendSplToken({
          connection,
          wallet: { publicKey, signTransaction },
          mint: selectedMint,
          amount: Number(amount),
          recipient,
          decimals: token.decimals,
        });
        setMessage("✅ Sent token! Tx: " + sig);
      }
    } catch (e: any) {
      setMessage("❌ Error: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <main className="relative flex flex-col items-center justify-top min-h-screen w-full gap-6 md:gap-8 py-6 md:py-8 bg-[#eaf6ff] px-4 md:px-0">
      <div className="hidden md:block"><FloatingShapes /></div>
      <h1 className="text-2xl md:text-4xl font-black mb-2 z-10">Send Tokens</h1>
      <Banner className="z-10 max-w-xl mx-auto text-base md:text-lg rounded-none">Send tokens to any address on Solana. Choose a token, enter the recipient, and amount.</Banner>
      <div className="w-full max-w-2xl flex flex-col gap-6 md:gap-10 items-center z-10">
        <NeobrutalCard
          className="bg-white border-black shadow-[8px_8px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-all duration-200 w-full"
          rounded="rounded-none"
          padding="p-4 md:p-8 lg:p-10"
        >
          <form className="flex flex-col gap-4 md:gap-6 w-full max-w-lg mx-auto" onSubmit={e => { e.preventDefault(); handleSend(); }}>
            <label className="font-mono text-base md:text-lg">Token
              <select
                className="w-full mt-1 p-2 border-2 border-black rounded-none font-mono text-sm md:text-base"
                value={selectedMint}
                onChange={e => setSelectedMint(e.target.value)}
              >
                {tokens.map(token => {
                  const meta = tokenList.find(t => t.address?.toLowerCase() === token.mint.toLowerCase());
                  const label = meta?.name || token.mint.slice(0, 4);
                  return (
                    <option key={token.mint} value={token.mint}>
                      {label} ({token.amount})
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="font-mono text-base md:text-lg">Recipient Address
              <input
                className="w-full mt-1 p-2 border-2 border-black rounded-none font-mono text-sm md:text-base"
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Enter recipient address"
                disabled={loading}
              />
            </label>
            <label className="font-mono text-base md:text-lg">Amount
              <input
                className="w-full mt-1 p-2 border-2 border-black rounded-none font-mono text-sm md:text-base"
                type="number"
                min="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                disabled={loading}
              />
            </label>
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="mt-4 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] rounded-none w-full text-lg md:text-xl font-black"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </Button>
            {message && <div className="mt-2 text-center font-mono text-sm md:text-base">{message}</div>}
          </form>
        </NeobrutalCard>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default SendPage; 