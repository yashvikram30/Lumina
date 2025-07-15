import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { href: "/portfolio", label: "Portfolio Analytics" },
  { href: "/tokens", label: "Tokens" },
  { href: "/history", label: "Transaction History" },
  { href: "/transaction", label: "Send or Receive" },
];

const SectionNav: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav className="w-full flex justify-center bg-yellow-100 border-b-4 border-black shadow-neobrutalism z-20 top-[64px]">
      <ul className="flex gap-4 py-3">
        {SECTIONS.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className={`px-6 py-2 rounded-2xl border-4 border-black font-extrabold text-lg transition-all shadow-[3px_3px_0_0_#000] ${
                pathname === section.href
                  ? "bg-yellow-300 text-black scale-105"
                  : "bg-white text-neutral-700 hover:bg-yellow-200"
              }`}
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