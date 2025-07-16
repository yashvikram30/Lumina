"use client";
import TransactionHistory from "@/components/TransactionHistory";
import Footer from "@/components/ui/Footer";
import FloatingShapes from "@/components/ui/FloatingShapes";

export default function HistoryPage() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#eaf6ff] overflow-hidden">
        <FloatingShapes />
        <TransactionHistory />
      </main>
      <Footer />
    </>
  );
} 