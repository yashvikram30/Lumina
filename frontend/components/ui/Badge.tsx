import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // e.g. 'bg-blue-200'
}

const Badge: React.FC<BadgeProps> = ({ children, className = "", color = "bg-blue-200" }) => (
  <span
    className={`inline-block border-2 border-black rounded-lg px-4 py-2 font-bold text-black shadow-[3px_3px_0_0_#000] text-lg ${color} ${className}`}
  >
    {children}
  </span>
);

export default Badge; 