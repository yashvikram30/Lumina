import PortfolioAnalytics from "@/components/PortfolioAnalytics";
import Footer from "@/components/ui/Footer";
import FloatingShapes from "@/components/ui/FloatingShapes";
import Banner from "@/components/ui/Banner";

export default function PortfolioPage() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#eaf6ff]">
        <div className="hidden md:block z-5"><FloatingShapes /></div>
        {/* <h1 className="text-4xl font-black mb-16 text-center">Portfolio Overview</h1>
        <Banner className="rounded-none max-w-2xl mx-auto w-full mb-16">See your total portfolio value, allocation, and analytics at a glance.</Banner> */}
        <PortfolioAnalytics />
      </main>
      <Footer />
    </>
  );
} 