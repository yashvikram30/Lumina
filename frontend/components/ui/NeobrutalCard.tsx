import React from "react";

interface NeobrutalCardProps {
  children: React.ReactNode;
  className?: string; // Use Tailwind classes for bg, shadow, border, etc.
  padding?: string; // Tailwind padding classes
  rounded?: string; // Tailwind rounded classes
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NeobrutalCard: React.FC<NeobrutalCardProps> = ({
  children,
  className = "",
  padding = "p-6 sm:p-8 md:p-4",
  rounded = "rounded-2xl",
  style = {},
  onClick,
}) => {
  return (
    <div
      className={`relative border-4 border-black ${rounded} ${padding} w-full max-w-4xl flex flex-col items-center justify-between font-extrabold text-black bg-white shadow-[8px_8px_0_0_#000] hover:shadow-[16px_16px_0_0_#000] transition-transform duration-200 ease-in-out ${className}`}
      style={style}
      onClick={onClick}
    >
      {/* Accent corner */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-pink-400 border-b-4 border-r-4 border-black rounded-br-2xl z-10" />
      {children}
    </div>
  );
};

export default NeobrutalCard; 