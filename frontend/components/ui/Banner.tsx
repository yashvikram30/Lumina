import React from "react";

interface BannerProps {
  children: React.ReactNode;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ children, className = "" }) => (
  <div
    className={`relative w-full flex items-center justify-center border-4 border-black bg-yellow-200 py-4 px-6 mb-4 rounded-2xl shadow-[6px_6px_0_0_#000] font-extrabold text-2xl text-black tracking-tight ${className}`}
    style={{ position: "relative" }}
  >
    {/* Accent corner */}
    <div className="absolute top-0 left-0 w-8 h-8 bg-pink-400 border-b-4 border-r-4 border-black rounded-br-2xl z-10" />
    {children}
  </div>
);

export default Banner; 