"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScroll();
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative w-full py-3">
      <ul
        className="no-scrollbar flex gap-x-5 overflow-x-auto"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {children}
      </ul>
      {showLeftButton && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-bg1 p-1 opacity-60 hover:opacity-100"
          onClick={handleScrollLeft}
        >
          <FaAngleLeft className="text-3xl text-white" />
        </button>
      )}
      {showRightButton && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-bg1 p-1 opacity-60 hover:opacity-100"
          onClick={handleScrollRight}
        >
          <FaAngleRight className="text-3xl text-white" />
        </button>
      )}
    </nav>
  );
}
