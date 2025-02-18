import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

interface AccordionProps {
  titleChildren: React.ReactNode;
  contentChildren: React.ReactNode;
  className?: string;
  defaultIsExpanded?: boolean;
}
interface AccordionTitleProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children: React.ReactNode;
}
interface AccordionContentProps {
  isExpanded: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FramerMotionAccordion: React.FC<AccordionProps> = ({
  titleChildren,
  contentChildren,
  className = "",
  defaultIsExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);

  return (
    <div className={`accordion-container ${className}`}>
      <AccordionTitle
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        className="border-bg1 border bg-white p-2"
      >
        {titleChildren}
      </AccordionTitle>
      <AccordionContent isExpanded={isExpanded}>{contentChildren}</AccordionContent>
    </div>
  );
};

const AccordionTitle: React.FC<AccordionTitleProps> = ({
  isExpanded,
  setIsExpanded,
  className = "",
  children,
}) => {
  return (
    <motion.div
      initial={false}
      //   animate={{ backgroundColor: isExpanded ? "#e4e4e7" : "#ffffff" }}
      onClick={() => setIsExpanded((prev) => !prev)}
      className={`flex w-full cursor-pointer items-center justify-between gap-2 ${className}`}
    >
      {children}
      <motion.span
        animate={{
          rotate: isOpen ? [0, -10, 180] : [180, 10, 0],
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="flex items-center"
      >
        {isOpen ? (closeIcon ?? <FaMinus />) : (openIcon ?? <FaPlus />)}
      </motion.span>
    </motion.div>
  );
};

const AccordionContent: React.FC<AccordionContentProps> = ({
  isExpanded,
  className = "",
  children,
}) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
