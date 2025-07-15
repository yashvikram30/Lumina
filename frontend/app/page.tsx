// import WalletButton from "@/components/WalletButton";
"use client"
import dynamic from "next/dynamic";
const TokenBalances = dynamic(() => import("@/components/TokenBalances"), { ssr: false });
import SplitText from "../components/SplitText/SplitText"
import PriceChart from "@/components/PriceChart";

export default function Home() {
  // Wrapped SOL mint address (works for mainnet and devnet)
  const SOL_MINT = "So11111111111111111111111111111111111111112";
  return (
    <main>
      {/* <SplitText
        text="Hello, GSAP!"
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        // onLetterAnimationComplete={handleAnimationComplete}
      /> */}
      <PriceChart mint={SOL_MINT} symbol="SOL" />
      <TokenBalances />
    </main>
  )
}
