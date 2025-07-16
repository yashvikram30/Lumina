import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "dark";
  size?: "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
}

const variantStyles = {
  primary: "bg-[#FF6B6B] text-white",
  secondary: "bg-[#4ECDC4] text-black",
  accent: "bg-[#FFE066] text-black",
  dark: "bg-black text-white",
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  style = {},
}) => {
  const sizeStyles = size === "lg" ? "py-5 px-10 text-lg" : "py-4 px-8 text-base";
  return (
    <button
      type={type}
      className={`btn ${variantStyles[variant]} ${sizeStyles} border-4 border-black box-shadow-brutal rounded-xl font-bold uppercase tracking-wide transition-all duration-200 ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
// Tailwind utility for box-shadow-brutal: shadow-[6px_6px_0_#000] hover:shadow-[9px_9px_0_#000] active:shadow-[2px_2px_0_#000] 