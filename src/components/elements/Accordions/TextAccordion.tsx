"use client";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

// Define types for accordion items
interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  className?: string;
}

export const TextAccordion: React.FC<{ items: AccordionItemProps[] }> = ({
  items,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <button
            onClick={() => handleToggle(index)}
            className={`${item.className} item-center flex`}
          >
            <FaAngleRight
              className={`mt-0.5 transition-transform duration-300 ease-in-out ${openIndex === index ? "rotate-90" : "rotate-0"}`}
            />
            <span>{item.title}</span>
          </button>
          <div
            className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="pl-5">{item.content}</div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
