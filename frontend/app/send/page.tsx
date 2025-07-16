"use client"
import React, { useState } from "react";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import { useTokenList } from "@/hooks/useTokenList";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";

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
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-8 py-8">
      <h1 className="text-4xl font-black mb-6">Send Tokens</h1>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0_0_#000] p-8 flex flex-col items-center justify-center gap-6">
          <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={e => { e.preventDefault(); handleSend(); }}>
            <label className="font-mono text-lg">Token
              <select
                className="w-full mt-1 p-2 border-2 border-black rounded-lg font-mono"
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
            <label className="font-mono text-lg">Recipient Address
              <input
                className="w-full mt-1 p-2 border-2 border-black rounded-lg font-mono"
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="Enter recipient address"
                disabled={loading}
              />
            </label>
            <label className="font-mono text-lg">Amount
              <input
                className="w-full mt-1 p-2 border-2 border-black rounded-lg font-mono"
                type="number"
                min="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                disabled={loading}
              />
            </label>
            <button
              type="submit"
              className="mt-4 bg-blue-400 border-2 border-black text-black rounded-lg px-6 py-2 text-lg font-extrabold shadow-[2px_2px_0_0_#000] hover:bg-blue-300 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
            {message && <div className="mt-2 text-center font-mono text-base">{message}</div>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default SendPage; 