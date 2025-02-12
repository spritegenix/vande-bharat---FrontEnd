// Tooltip.tsx
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";

type TooltipProps = {
  content: string;
  children: ReactNode;
  direction?: "top" | "right" | "bottom" | "left";
  className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ content, children, direction = "top", className }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getDirectionClasses = () => {
    switch (direction) {
      case "top":
        return "bottom-full left-1/2 !-translate-x-1/2 mb-2";
      case "right":
        return "left-full top-1/2 !-translate-y-1/2 ml-2";
      case "bottom":
        return "top-full left-1/2 !-translate-x-1/2 mt-2";
      case "left":
        return "right-full bottom-1/2 !translate-y-1/2 mr-2";
      default:
        return "";
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`absolute z-10 min-w-max rounded-md border-2 border-bg1 bg-white px-3 py-2 text-center text-sm text-bg1 shadow-lg ${getDirectionClasses()}`}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

export default Tooltip;
