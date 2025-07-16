import React from "react";

interface CardCustomisableProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: string; // e.g. 'max-w-5xl w-full'
  padding?: string; // e.g. 'p-8'
  border?: string; // e.g. 'border-4 border-black'
  rounded?: string; // e.g. 'rounded-2xl'
  bg?: string; // e.g. 'bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200'
  shadow?: string; // e.g. 'shadow-[8px_8px_0_0_#000]'
  accentCorner?: boolean; // show accent corner or not
  accentColor?: string; // e.g. 'bg-pink-400'
  accentSize?: string; // e.g. 'w-8 h-8'
  accentBorder?: string; // e.g. 'border-b-4 border-r-4 border-black'
  onClick?: () => void;
}

const CardCustomisable: React.FC<CardCustomisableProps> = ({
  children,
  className = "",
  style = {},
  width = "max-w-5xl w-full",
  padding = "p-8",
  border = "border-4 border-black",
  rounded = "rounded-2xl",
  bg = "bg-white",
  shadow = "shadow-[8px_8px_0_0_#000] hover:shadow-[16px_16px_0_0_#000]",
  accentCorner = true,
  accentColor = "bg-pink-400",
  accentSize = "w-8 h-8",
  accentBorder = "border-b-4 border-r-4 border-black",
  onClick,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-between font-extrabold text-black ${width} ${padding} ${border} ${rounded} ${bg} ${shadow} ${className}`}
      style={style}
      onClick={onClick}
    >
      {accentCorner && (
        <div className={`absolute top-0 left-0 ${accentSize} ${accentColor} ${accentBorder} rounded-br-2xl z-10`} />
      )}
      {children}
    </div>
  );
};

export default CardCustomisable; 