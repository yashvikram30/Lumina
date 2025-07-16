import React from "react";

const Header: React.FC = () => (
  <header className="header sticky top-0 z-[100] bg-[#FFE066] border-b-4 border-black py-5">
    <div className="container mx-auto px-5">
      <nav className="flex justify-between items-center">
        <a href="#" className="flex items-center gap-4 text-black no-underline">
          <div className="w-[50px] h-[50px] bg-[#FF6B6B] border-4 border-black shadow-[4px_4px_0_#000] flex items-center justify-center text-white text-2xl -rotate-6">
            <i className="fas fa-chart-line"></i>
          </div>
          <span className="text-3xl font-extrabold uppercase tracking-wider">Lumina</span>
        </a>
        <div className="flex gap-4">
          <a
            href="https://github.com/yashvikram30/Lumina"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-card flex items-center gap-2 bg-[#FFD700] px-6 py-2 font-bold text-black text-base no-underline box-shadow-brutal rounded-xl border-4 border-black uppercase tracking-wide"
          >
            <i className="fas fa-star text-black text-lg"></i>
            Star on GitHub
          </a>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
// Tailwind utility for box-shadow-brutal: shadow-[6px_6px_0_#000] hover:shadow-[9px_9px_0_#000] 