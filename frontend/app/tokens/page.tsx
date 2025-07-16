import Banner from "@/components/ui/Banner";
import TokenBalances from "@/components/TokenBalances";
import Footer from "@/components/ui/Footer";

export default function TokensPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        <TokenBalances />
      </main>
      <Footer />
    </>
  );
} 