import React from "react";

interface NeobrutalCardProps {
  children: React.ReactNode;
  className?: string;
  idx?: number; // for color cycling
}

const colorThemes = [
  { bg: "bg-yellow-300", shadow: "8px 8px 0 0 #ec4899" }, // pink shadow
  { bg: "bg-pink-200", shadow: "8px 8px 0 0 #6366f1" },   // blue shadow
  { bg: "bg-blue-200", shadow: "8px 8px 0 0 #22c55e" },   // green shadow
  { bg: "bg-green-200", shadow: "8px 8px 0 0 #a21caf" },  // purple shadow
  { bg: "bg-purple-200", shadow: "8px 8px 0 0 #000" },    // black shadow
];

const NeobrutalCard: React.FC<NeobrutalCardProps> = ({
  children,
  className = "",
  idx = 0,
}) => {
  const theme = colorThemes[idx % colorThemes.length];
  return (
    <div
      className={`relative border-4 border-black rounded-2xl p-8 w-full max-w-2xl flex items-center justify-between font-extrabold text-black transition-transform hover:scale-[1.03] ${theme.bg} ${className}`}
      style={{ boxShadow: theme.shadow }}
    >
      {children}
    </div>
  );
};

export default NeobrutalCard; 