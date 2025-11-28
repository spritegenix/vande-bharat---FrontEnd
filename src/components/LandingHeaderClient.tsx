"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import AuthButton from "./layout/header/AuthButton";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LandingHeaderClient() {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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

  // Close menu when route changes or screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine header style based on route and scroll state
  const isHeaderTransparent = isHomePage && isTransparent && !isMenuOpen;
  const headerClass = `fixed z-50 w-full transition-colors duration-300 ${
    isHeaderTransparent ? "bg-transparent text-white" : "bg-white text-neutral-900 shadow-md"
  }`;

  const linkClass = (isActive: boolean) =>
    `cursor-pointer ${
      isHeaderTransparent ? "text-white" : "text-neutral-700 hover:text-neutral-900"
    }`;

  return (
    <header className={headerClass}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logoBlack.png"
              alt="Logo"
              width={250}
              height={100}
              className="h-auto w-40 md:w-60"
            />
          </Link>
          <nav className="hidden items-center space-x-8 md:flex">
            <Link href="/community">
              <span className={linkClass(pathname === "/community")}>Communities</span>
            </Link>
            <Link href="/events">
              <span className={linkClass(pathname === "/events")}>Events</span>
            </Link>
            <Link href="/resources">
              <span className={linkClass(pathname === "/resources")}>Resources</span>
            </Link>
            <Link href="/forums">
              <span className={linkClass(pathname === "/forums")}>Forums</span>
            </Link>
            <AuthButton />
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <AuthButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${isHeaderTransparent ? "text-white" : "text-neutral-900"}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-16 w-full bg-white shadow-lg md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link href="/community" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-lg font-medium text-neutral-700 hover:text-neutral-900">
                Communities
              </span>
            </Link>
            <Link href="/events" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-lg font-medium text-neutral-700 hover:text-neutral-900">
                Events
              </span>
            </Link>
            <Link href="/resources" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-lg font-medium text-neutral-700 hover:text-neutral-900">
                Resources
              </span>
            </Link>
            <Link href="/forums" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-lg font-medium text-neutral-700 hover:text-neutral-900">
                Forums
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
