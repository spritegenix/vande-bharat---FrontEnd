"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import Portal from "./Portal";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Portal>
      <button
        className="fixed bottom-20 right-5 z-[999999] rounded-full border border-white bg-bg1 bg-opacity-80 p-3 duration-300 hover:bg-opacity-100 md:right-10"
        onClick={scrollToTop}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <FaArrowUp className="text-white" />
      </button>
    </Portal>
  );
};

export default ScrollToTopButton;
