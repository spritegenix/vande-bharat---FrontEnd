import React, { ElementType, ReactNode } from "react";

interface ButtonProps {
  as?: ElementType;
  className?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  [key: string]: any; // Allows other props like onClick, etc.
}

export default function Button({
  as: Component = "button",
  className = "",
  variant = "primary",
  size = "sm",
  children,
  leftIcon = null,
  rightIcon = null,
  disabled = false,
  ...props
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return `bg-primary dark:bg-primary text-white hover:bg-bg1/80 ${disabled ? "bg-bg1/80 cursor-not-allowed" : ""}`;
      case "green":
        return "bg-green-500 text-white hover:bg-green-500/80";
      case "primary-gradient":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-500";
      case "white":
        return "bg-white text-black hover:bg-gray-100/80 border border-gray-300";
      default:
        return "";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "md":
        return "px-6 py-3 gap-x-2 text-base";
      case "sm":
        return "px-4 py-2 gap-x-1 text-sm";
      case "lg":
        return "px-8 py-4 gap-x-2 text-lg";
      default:
        return "";
    }
  };

  return (
    <Component
      className={`${className} ${getVariantClasses()} ${getSizeClasses()} flex cursor-pointer items-center justify-center text-nowrap rounded-md text-center capitalize transition-all duration-300 active:scale-90`}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span className="cursor-pointer">{children}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </Component>
  );
}
