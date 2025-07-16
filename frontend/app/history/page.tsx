"use client";
import TransactionHistory from "@/components/TransactionHistory";
import Footer from "@/components/ui/Footer";

export default function HistoryPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        <TransactionHistory />
      </main>
      <Footer />
    </>
  );
} 