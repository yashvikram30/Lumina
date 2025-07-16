import React from "react";
import dynamic from "next/dynamic";
import CardCustomisable from "./ui/CardCustomisable";
import Banner from "./ui/Banner";
const WalletButton = dynamic(() => import("./WalletButton"), { ssr: false });

const features = [
  {
    title: "Portfolio Analytics",
    desc: "Visualize your token holdings and track your portfolio value over time.",
    icon: "CHART",
  },
  {
    title: "Live Price Charts",
    desc: "Get real-time price charts for major tokens and assets.",
    icon: "TREND",
  },
  {
    title: "Transaction History",
    desc: "See all your recent transactions with beautiful, readable tables.",
    icon: "HISTORY",
  },
  {
    title: "Multi-Chain Support",
    desc: "Track assets across Solana, Ethereum, Polygon, Sui, Bitcoin, and more.",
    icon: "CHAIN",
  },
  {
    title: "Neobrutal UI",
    desc: "Enjoy a playful, modern, and accessible design experience.",
    icon: "DESIGN",
  },
];

const steps = [
  {
    step: 1,
    title: "Connect Your Wallet",
    desc: "Securely connect your Solana wallet with one click.",
  },
  {
    step: 2,
    title: "Explore Your Portfolio",
    desc: "See all your tokens, balances, and analytics instantly.",
  },
  {
    step: 3,
    title: "Track & Transact",
    desc: "View history, send/receive, and monitor prices in real time.",
  },
];

const LandingPage: React.FC = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 relative overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-60 right-20 w-24 h-24 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-yellow-300 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-300 rounded-full opacity-25 animate-bounce"></div>
    </div>

    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 py-12 gap-20">
      {/* Hero Section */}
      <div className="max-w-4xl w-full flex flex-col items-center gap-8 animate-fade-in">
        <CardCustomisable 
          className="w-full flex flex-col items-center gap-8 transform hover:scale-105 transition-all duration-300 hover:rotate-1" 
          padding="p-16" 
          shadow="shadow-[16px_16px_0_0_#000]" 
          accentCorner 
          accentColor="bg-gradient-to-r from-yellow-300 to-orange-400"
        >
          <div className="text-center">
            <h1 className="text-8xl font-black text-purple-600 drop-shadow-[8px_8px_0_#000] mb-4 animate-pulse">
              Lumina
            </h1>
            <div className="w-32 h-2 bg-yellow-500 mx-auto mb-6 rounded-full animate-pulse"></div>
            <p className="text-3xl text-neutral-800 text-center font-bold font-mono bg-yellow-100 px-6 py-3 rounded-lg border-4 border-black shadow-[4px_4px_0_0_#000] inline-block transform -rotate-1">
              Your playful, powerful multi-chain portfolio dashboard.
            </p>
          </div>
          <div className="transform hover:scale-110 transition-all duration-200">
            <WalletButton />
          </div>
        </CardCustomisable>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl flex flex-col items-center gap-12">
        <div className="transform hover:scale-105 transition-all duration-300">
          <Banner className="mb-0 text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-black shadow-[8px_8px_0_0_#000]">
            Why Lumina?
          </Banner>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
          {features.map((f, idx) => (
            <CardCustomisable 
              key={f.title} 
              className={`flex flex-col items-center gap-4 transform hover:scale-110 hover:-rotate-2 transition-all duration-300 hover:z-10 animate-fade-in`}
              style={{animationDelay: `${idx * 100}ms`}}
              padding="p-8" 
              accentCorner 
              accentColor={[
                "bg-gradient-to-br from-yellow-200 to-yellow-400",
                "bg-gradient-to-br from-orange-200 to-orange-400", 
                "bg-gradient-to-br from-amber-200 to-amber-400",
                "bg-gradient-to-br from-yellow-300 to-orange-300",
                "bg-gradient-to-br from-orange-300 to-red-400"
              ][idx]}
              shadow="shadow-[8px_8px_0_0_#000]"
            >
              <div className="relative mb-4">
                <div className="text-4xl font-black text-black mb-2 bg-white px-6 py-3 rounded-full border-4 border-black shadow-[4px_4px_0_0_#000] animate-bounce transform hover:scale-110 transition-all duration-200" style={{animationDelay: `${idx * 200}ms`}}>
                  {f.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div className="text-xl font-black text-black text-center bg-white px-3 py-1 rounded-md border-2 border-black">{f.title}</div>
              <div className="text-neutral-800 text-center text-base font-semibold">{f.desc}</div>
            </CardCustomisable>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="w-full max-w-5xl flex flex-col items-center gap-12">
        <div className="transform hover:scale-105 transition-all duration-300">
          <Banner className="mb-0 text-4xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 border-4 border-black shadow-[8px_8px_0_0_#000]">
            How It Works
          </Banner>
        </div>
        <div className="flex flex-col md:flex-row gap-8 w-full items-stretch justify-center">
          {steps.map((s, idx) => (
            <CardCustomisable 
              key={s.step} 
              className={`flex-1 flex flex-col items-center gap-4 transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-fade-in`}
              style={{animationDelay: `${idx * 150}ms`}}
              padding="p-8" 
              accentCorner 
              accentColor={[
                "bg-gradient-to-br from-yellow-200 to-orange-300",
                "bg-gradient-to-br from-orange-200 to-yellow-300", 
                "bg-gradient-to-br from-amber-200 to-orange-400"
              ][idx]}
              shadow="shadow-[8px_8px_0_0_#000]"
            >
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-black mb-2 border-4 border-white shadow-[4px_4px_0_0_#666]">
                {s.step}
              </div>
              <div className="text-2xl font-black text-black text-center mb-2 bg-white px-4 py-2 rounded-lg border-2 border-black">{s.title}</div>
              <div className="text-neutral-800 text-center text-base font-semibold">{s.desc}</div>
            </CardCustomisable>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-6 mt-12">
        <div className="transform hover:scale-105 transition-all duration-300">
          <Banner className="mb-0 text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black shadow-[6px_6px_0_0_#000]">
            Made with love by the Lumina Team
          </Banner>
        </div>
        <div className="flex gap-4 items-center justify-center flex-wrap">
          <div className="bg-white px-4 py-2 rounded-lg border-3 border-black shadow-[4px_4px_0_0_#000] font-bold text-sm">
            Open Source
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border-3 border-black shadow-[4px_4px_0_0_#000] font-bold text-sm">
            Neobrutalism
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border-3 border-black shadow-[4px_4px_0_0_#000] font-bold text-sm">
            Multi-chain
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fade-in {
        animation: fade-in 0.8s ease-out forwards;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `}</style>
  </div>
);

export default LandingPage;