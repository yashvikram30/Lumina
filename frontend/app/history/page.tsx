"use client";
import TransactionHistory from "@/components/TransactionHistory";
import Footer from "@/components/ui/Footer";
import FloatingShapes from "@/components/ui/FloatingShapes";
import Banner from "@/components/ui/Banner";

export default function HistoryPage() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-top min-h-screen w-full bg-[#eaf6ff] px-4 md:px-0 py-8 md:py-16">
        <div className="hidden md:block"><FloatingShapes /></div>
        <h1 className="text-2xl md:text-4xl font-black mb-8 md:mb-16 text-center">Transaction History</h1>
        <Banner className="rounded-none max-w-2xl mx-auto w-full mb-8 md:mb-16 text-base md:text-lg">View all your recent transactions, including sends and receives, in one place.</Banner>
        <TransactionHistory />
      </main>
      <Footer />
    </>
  );
} 