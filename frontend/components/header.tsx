"use client";
import dynamic from "next/dynamic";
const WalletButton = dynamic(() => import("./WalletButton"), { ssr: false });
import NetworkSwitcher from "./WalletInfo";
import SectionNav from "@/components/SectionNav";

const Header = () => (
  <>
    <header className="w-full border-b-4 border-black bg-[#FFE066] px-0 py-5 flex justify-between items-center" style={{ boxShadow: 'none' }}>
      <div className="flex items-center gap-4 pl-8">
        <div className="logo-icon ml-30" style={{ width: 50, height: 50, background: '#FF6B6B', border: '4px solid #000', boxShadow: '4px 4px 0 #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, transform: 'rotate(-10deg)' }}>
          <i className="fas fa-chart-line"></i>
        </div>
        <span className="logo-text" style={{ fontSize: 32, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>Lumina</span>
      </div>
      <div className="nav-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingRight: '32px' }}>
        <a
          href="https://github.com/yashvikram30/Lumina"
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-card"
          style={{
            background: '#FFD700',
            padding: '0.5rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            color: '#000',
            boxShadow: '6px 6px 0 #000',
            borderRadius: '12px',
            border: '4px solid #000',
            gap: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          <i className="fas fa-star" style={{ fontSize: '1.2rem', color: '#000' }}></i>
          Star on GitHub
        </a>
        <div className="brutal-card mr-26" style={{ background: '#6C3DF4', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', boxShadow: '6px 6px 0 #000', borderRadius: '12px', border: '4px solid #000' }}>
          <WalletButton />
        </div>
      </div>
    </header>
    <SectionNav />
  </>
);

export default Header;