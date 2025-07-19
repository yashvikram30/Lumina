import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "@/components/WalletContextProvider";
import "@solana/wallet-adapter-react-ui/styles.css";
import AppGate from "@/components/AppGate";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Lumina',
  description: 'Track your crypto portfolio across chains with a beautiful, neobrutalist UI.',
  openGraph: {
    images: ['/i.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900 min-h-screen`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <WalletContextProvider network="mainnet-beta">
        <Analytics/>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200">
            <AppGate>{children}</AppGate>
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}
