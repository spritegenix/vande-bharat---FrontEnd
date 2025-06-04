import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface AccordionProps {
  title: React.ReactNode;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  animationDuration?: number;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

const MotionAccordion: React.FC<AccordionProps> = ({
  title,
  titleIcon = "",
  children,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onToggle,
  className = "",
  titleClassName = "",
  contentClassName = "",
  animationDuration = 0.3,
  openIcon = "",
  closeIcon = "",
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;
  const [displayedOpen, setDisplayedOpen] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setDisplayedOpen(true), 400);
      return () => clearTimeout(timer);
    } else {
      setDisplayedOpen(false);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    const newState = !isOpen;
    if (!isControlled) setInternalOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div className={`${className}`}>
      <button
        className={`flex w-full items-center justify-between ${titleClassName}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <p className="flex cursor-pointer gap-2">
          {titleIcon && <span>{titleIcon}</span>}
          <span>{title}</span>
        </p>
        <motion.span
          animate={{
            rotate: isOpen ? [0, -40, 180] : [180, 40, 0],
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="flex items-center"
        >
          {displayedOpen ? <FaMinus /> : <FaPlus />}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
            className={`overflow-hidden ${contentClassName}`}
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotionAccordion;

{
  /* <Accordion
  title="Industry-Level Accordion"
  defaultOpen
  openIcon={<span>➕</span>}
  closeIcon={<span>➖</span>}
  onToggle={(open) => console.log('Accordion is now:', open)}
>
  <p>This is the content inside the accordion. You can put anything here.</p>
</Accordion> */
}
