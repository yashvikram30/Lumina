import PortfolioAnalytics from "@/components/PortfolioAnalytics";
import Footer from "@/components/ui/Footer";

export default function PortfolioPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        <PortfolioAnalytics />
      </main>
      <Footer />
    </>
  );
} 