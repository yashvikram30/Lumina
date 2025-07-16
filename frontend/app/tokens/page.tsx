import Banner from "@/components/ui/Banner";
import TokenBalances from "@/components/TokenBalances";
import Footer from "@/components/ui/Footer";
import FloatingShapes from "@/components/ui/FloatingShapes";

export default function TokensPage() {
  return (
    <>
      <main className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#eaf6ff] overflow-hidden">
        <FloatingShapes />
        {/* <h1 className="text-4xl font-black mb-16 text-center">Your Tokens</h1>
        <Banner className="rounded-none max-w-2xl mx-auto w-full mb-16">View all your tokens and balances. Click a token for more details.</Banner> */}
        <TokenBalances />
      </main>
      <Footer />
    </>
  );
} 