import React from "react";

interface OutlinedPanelProps {
  children: React.ReactNode;
  className?: string;
}

const OutlinedPanel: React.FC<OutlinedPanelProps> = ({ children, className = "" }) => (
  <div
    className={`relative border-4 border-black rounded-2xl bg-white shadow-[8px_8px_0_0_#000] p-4 flex flex-col items-center justify-center ${className}`}
  >
    {/* Optional accent sticker */}
    <div className="absolute top-0 right-0 w-6 h-6 bg-blue-200 border-b-4 border-l-4 border-black rounded-bl-2xl z-10" />
    {children}
  </div>
);

export default OutlinedPanel; 