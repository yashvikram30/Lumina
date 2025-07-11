// import WalletButton from "@/components/WalletButton";
"use client"
import dynamic from "next/dynamic";
const TokenBalances = dynamic(() => import("@/components/TokenBalances"), { ssr: false });

export default function Home() {
  return(
    <main>
      <TokenBalances/>
    </main>
  )
}
