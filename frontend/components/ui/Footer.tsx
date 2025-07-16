import React from "react";

const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Support", href: "#" },
  { label: "API", href: "#" },
  { label: "Status", href: "#" },
];

const Footer: React.FC = () => (
  <footer className="bg-black text-white py-20 border-t-4 border-black">
    <div className="container mx-auto px-5">
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-[#FFE066] border-4 border-white shadow-[4px_4px_0_#fff] flex items-center justify-center text-black text-xl -rotate-6">
            <i className="fas fa-chart-line"></i>
          </div>
          <span className="text-2xl font-extrabold uppercase tracking-wider">Lumina</span>
        </div>
        <p className="mb-4">The most brutal portfolio tracker in crypto</p>
      </div>
      <div className="flex justify-center gap-10 mb-10 flex-wrap">
        {footerLinks.map((l) => (
          <a href={l.href} className="text-white no-underline font-bold uppercase tracking-wide hover:text-[#FFE066]" key={l.label}>{l.label}</a>
        ))}
      </div>
      <div className="text-center">
        <p>&copy; 2024 Lumina. Built with 🔥 for crypto degens.</p>
      </div>
    </div>
  </footer>
);

export default Footer; 