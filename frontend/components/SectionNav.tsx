"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { href: "/portfolio", label: "Portfolio Analytics", icon: "fas fa-chart-pie" },
  { href: "/tokens", label: "Tokens", icon: "fas fa-coins" },
  { href: "/history", label: "Transaction History", icon: "fas fa-history" },
  { href: "/send", label: "Send", icon: "fas fa-paper-plane" },
  { href: "/receive", label: "Receive", icon: "fas fa-download" },
];

const SectionNav: React.FC = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="w-12 h-12 bg-[#FF6B6B] border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center"
          style={{ borderRadius: 0 }}
        >
          <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-black text-xl`}></i>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-64 bg-[#e0f0ff] border-r-4 border-black shadow-[8px_0_0_0_#000] z-50 transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#FF6B6B] border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center text-white text-lg -rotate-6">
              <i className="fas fa-chart-line"></i>
            </div>
            <span className="text-xl font-bold text-black uppercase tracking-wider">Lumina</span>
          </div>
          
          <nav>
            <ul className="space-y-4">
              {SECTIONS.map((section) => (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    onClick={closeSidebar}
                    className={`w-full px-4 py-3 border-4 border-black font-bold text-sm transition-all shadow-[4px_4px_0_0_#000] flex items-center gap-3 ${
                      pathname === section.href
                        ? "bg-[#ff6b6b] text-black scale-105"
                        : "bg-[#ff6b6b] text-black hover:bg-[#ff8787] hover:scale-105"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <i className={`${section.icon} text-lg`}></i>
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex w-full justify-center top-0 z-0" style={{ background: '#e0f0ff', borderBottom: '4px solid #000', boxShadow: '6px 6px 0 0 #000', borderRadius: 0, top: 64, padding: '0 0 0 0' }}>
        <ul className="flex gap-4 py-2">
          {SECTIONS.map((section) => (
            <li key={section.href} className="m-0">
              <Link
                href={section.href}
                className={`px-6 py-2 border-4 border-black font-extrabold text-base transition-all shadow-[4px_4px_0_0_#000] bg-[#ff6b6b] text-black flex items-center justify-center select-none` +
                  (pathname === section.href
                    ? " scale-105 bg-[#ff6b6b] text-black"
                    : " bg-[#ff6b6b] text-black hover:bg-[#ff8787]")
                }
                style={{ borderRadius: 0, minWidth: 120, boxShadow: '4px 4px 0 #000', background: '#ff6b6b' }}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SectionNav; 