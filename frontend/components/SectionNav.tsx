import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { href: "/portfolio", label: "Portfolio Analytics" },
  { href: "/tokens", label: "Tokens" },
  { href: "/history", label: "Transaction History" },
  { href: "/send", label: "Send" },
  { href: "/receive", label: "Receive" },
];

const SectionNav: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full flex justify-center top-0 z-0" style={{ background: '#e0f0ff', borderBottom: '4px solid #000', boxShadow: '6px 6px 0 0 #000', borderRadius: 0, top: 64, padding: '0 0 0 0' }}>
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
  );
};

export default SectionNav; 