"use client";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";

const TransactionHistory: React.FC = () => {
  const { publicKey } = useWallet();
  const address = publicKey?.toBase58();
  const { transactions, loading, error } = useTransactionHistory(address);

  if (!address) return <div className="text-center py-8">Connect your wallet to view transaction history.</div>;
  if (loading) return <div className="text-center py-8">Loading transactions...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!transactions.length) return <div className="text-center py-8">No transactions found.</div>;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-4 p-6 rounded-2xl border-4 border-black bg-white shadow-[8px_8px_0_0_#000]">
      <h2 className="text-2xl font-extrabold mb-4 text-black drop-shadow-neobrutalism">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-yellow-200">
              <th className="px-4 py-2 border-b-2 border-black text-left">Date</th>
              <th className="px-4 py-2 border-b-2 border-black text-left">Type</th>
              <th className="px-4 py-2 border-b-2 border-black text-left">Token</th>
              <th className="px-4 py-2 border-b-2 border-black text-left">Amount</th>
              <th className="px-4 py-2 border-b-2 border-black text-left">From</th>
              <th className="px-4 py-2 border-b-2 border-black text-left">To</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.signature} className="odd:bg-pink-50 even:bg-blue-50">
                <td className="px-4 py-2 border-b border-black font-mono text-xs">{tx.date}</td>
                <td className="px-4 py-2 border-b border-black font-bold">{tx.type}</td>
                <td className="px-4 py-2 border-b border-black font-mono">{tx.token}</td>
                <td className="px-4 py-2 border-b border-black font-mono">{tx.amount}</td>
                <td className="px-4 py-2 border-b border-black font-mono text-xs truncate max-w-[120px]">{tx.from}</td>
                <td className="px-4 py-2 border-b border-black font-mono text-xs truncate max-w-[120px]">{tx.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory; 