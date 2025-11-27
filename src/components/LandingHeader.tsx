import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import AuthButton from "./layout/header/AuthButton";

export default function LandingHeader() {
  const [isTransparent, setIsTransparent] = useState(true);
  const heroRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-50 w-full transition-colors duration-300 ${
        isTransparent ? "bg-transparent text-white" : "bg-white text-neutral-900 shadow-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/logoBlack.png"
              alt="Logo"
              width={250}
              height={100}
              className="h-auto w-40 md:w-60"
            />
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/community">
              <span
                className={`cursor-pointer ${
                  isTransparent ? "text-white" : "text-neutral-700 hover:text-neutral-900"
                }`}
              >
                Communities
              </span>
            </Link>
            <Link href="/events">
              <span
                className={`cursor-pointer ${
                  isTransparent ? "text-white" : "text-neutral-700 hover:text-neutral-900"
                }`}
              >
                Events
              </span>
            </Link>
            <Link href="/resources">
              <span
                className={`cursor-pointer ${
                  isTransparent ? "text-white" : "text-neutral-700 hover:text-neutral-900"
                }`}
              >
                Resources
              </span>
            </Link>
            <Link href="/forums">
              <span
                className={`cursor-pointer ${
                  isTransparent ? "text-white" : "text-neutral-700 hover:text-neutral-900"
                }`}
              >
                Forums
              </span>
            </Link>
            <AuthButton />
          </nav>
          {/* <div className="flex items-center space-x-4">
            <button
              className={`p-2 ${
                isTransparent ? "text-white" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <i data-fa-i2svg="">
                <svg
                  className="svg-inline--fa fa-bell"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="bell"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  data-fa-i2svg=""
                >
                  <path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path>
                </svg>
              </i>
            </button>
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
          </div> */}
        </div>
      </div>
    </header>
  );
}
