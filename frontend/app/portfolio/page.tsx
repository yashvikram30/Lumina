import PortfolioAnalytics from "@/components/PortfolioAnalytics";
import Footer from "@/components/ui/Footer";
import FloatingShapes from "@/components/ui/FloatingShapes";
import Banner from "@/components/ui/Banner";

export default function PortfolioPage() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-top min-h-screen w-full bg-[#eaf6ff] px-4 md:px-0 py-8 md:py-16">
        <div className="hidden md:block z-5"><FloatingShapes /></div>
        <h1 className="text-2xl md:text-4xl font-black mb-8 md:mb-16 text-center">Portfolio Analytics</h1>
        <Banner className="rounded-none max-w-2xl mx-auto w-full mb-8 md:mb-16 text-base md:text-lg">See your total portfolio value, allocation, and analytics at a glance.</Banner>
        <PortfolioAnalytics />
      </main>
      <Footer />
    </>
  );
} 