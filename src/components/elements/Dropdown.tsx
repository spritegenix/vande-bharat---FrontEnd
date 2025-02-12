"use client";
import React, { useState, ReactNode, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";

interface DropdownProps {
  className?: string;
  buttonVarient?: string;
  text?: string;
  leftIcon?: ReactNode;
  children: ReactNode;
  handleApply?: () => void;
  isRelative?: boolean;
  isHandleApplyVisible?: boolean;
}

export default function Dropdown({
  className,
  buttonVarient = "white",
  text = "Dropdown",
  leftIcon,
  children,
  handleApply,
  isRelative = true,
  isHandleApplyVisible = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  // Close dropdown if click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown with 300ms delay if mouse leaves the dropdown area
  useEffect(() => {
    const handleMouseLeave = () => {
      closeTimeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 300); // 300ms delay
    };

    const handleMouseEnter = () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };

    const dropdownElement = dropdownRef.current;

    if (dropdownElement) {
      dropdownElement.addEventListener("mouseleave", handleMouseLeave);
      dropdownElement.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      if (dropdownElement) {
        dropdownElement.removeEventListener("mouseleave", handleMouseLeave);
        dropdownElement.removeEventListener("mouseenter", handleMouseEnter);
      }

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={dropdownRef} className={`${isRelative && "relative"}`}>
      <Button
        variant={buttonVarient}
        id="dropdownButton"
        onClick={toggleDropdown}
        className={`${className}`}
        type="button"
        leftIcon={leftIcon}
        rightIcon={
          <IoIosArrowDown
            className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-270"}`}
          />
        }
      >
        <span>{text}</span>
      </Button>
      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownDefault"
          className="absolute z-50 mt-2 w-48 space-y-4 divide-y divide-gray-100 rounded-lg bg-white shadow"
        >
          <ul
            className="max-h-56 overflow-y-auto text-sm text-black"
            aria-labelledby="dropdownButton"
          >
            {children}
          </ul>
          <div className="flex gap-x-2 border-t border-zinc-500 p-2">
            {isHandleApplyVisible && (
              <Button className="!w-full" onClick={handleApply}>
                Apply
              </Button>
            )}
            <Button className="!w-full" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, ...props }: any) {
  return (
    <li className={`w-full cursor-pointer px-3 py-2 hover:bg-zinc-200`} {...props}>
      {children}
    </li>
  );
}
