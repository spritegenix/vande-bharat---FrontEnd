import Logo from "@/components/elements/Logo";
import Wrapper from "@/components/elements/Wrappers";
import React from "react";
import GlobalSearch from "@/components/elements/globalSearch/GlobalSearch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import AuthButton from "./AuthButton";
import Notification from "./Notification";
import { AlignJustify, Search } from "lucide-react";

export default function Header({ setIsLeftMenuOpen, isSearchOpen = false, setSearchOpen }: any) {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background dark:bg-background sm:h-14">
      <Wrapper className="my-auto p-1">
        {/* Desktop Mode  */}
        <nav className="hidden w-full justify-between gap-2 lg:flex">
          <Logo className="my-auto" />
          <GlobalSearch />
          <TooltipProvider delayDuration={0}>
            <div className="flex items-center gap-2 sm:gap-5">
              {/* Donation  */}
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/donation" className="cursor-pointer">
                    <SvgIcon svgPath={donationIcon} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="px-2 py-1 text-xs">
                  Donation
                </TooltipContent>
              </Tooltip> */}
              {/* Notification  */}
              {/* <Notification /> */}
              {/* Auth Button  */}
              <AuthButton />
            </div>
          </TooltipProvider>
        </nav>
        {/* Mobile Mode  */}
        <nav className="w-full lg:hidden">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <button onClick={() => setIsLeftMenuOpen((pre: any) => !pre)}>
                <AlignJustify />
              </button>
              <Logo className="my-auto" />
            </div>
            <div className="flex items-center gap-2 sm:gap-5">
              {/* Search Button  */}
              <button onClick={() => setSearchOpen((pre: any) => !pre)}>
                <Search />
              </button>
              {/* Donation  */}
              {/* <Link href="/donation" className="cursor-pointer">
                <SvgIcon svgPath={donationIcon} />
              </Link> */}
              {/* Notification  */}
              {/* <Notification /> */}
              {/* Auth Button  */}
              <AuthButton />
            </div>
          </div>

          {isSearchOpen && (
            <div className="left-[160px] top-[10px] mx-auto md:absolute">
              <GlobalSearch />
            </div>
          )}
        </nav>
      </Wrapper>
    </header>
  );
}

const SvgIcon = ({ svgPath, className }: { svgPath: any; className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`svgFill h-9 w-9 ${className}`}
      data-name="Layer 1"
      id="Layer_1"
      viewBox="0 0 64 64"
    >
      {svgPath}
    </svg>
  );
};

const donationIcon = (
  <>
    <path d="M3,51v2H7v1a3,3,0,0,0,3,3,3,3,0,0,0,2-.78A3,3,0,0,0,14,57a3,3,0,0,0,2.94-2.41L29,57.77a7.25,7.25,0,0,0,1.78.23H53a4,4,0,0,0,0-8H50.24A24.47,24.47,0,0,0,54,47a23.88,23.88,0,0,0,5.2-7.78,23.94,23.94,0,0,0,0-18.36,23.95,23.95,0,0,0-13-13,23.94,23.94,0,0,0-18.36,0,23.95,23.95,0,0,0-13,13,23.8,23.8,0,0,0-1.28,14.24,3,3,0,0,0-1.55.73A3,3,0,0,0,10,35a3,3,0,0,0-3,3H3v2H7V51Zm50,1a2,2,0,0,1,2,2,2,2,0,0,1-2,2H30.78a5.18,5.18,0,0,1-1.28-.17L17,52.54V40.05h1.52A11,11,0,0,1,27,43.73v0l0,0,1.22,1.51.16.16.43.34a1,1,0,0,0,.4.18l10.57,2.44A1.59,1.59,0,0,1,41,49.94a1.32,1.32,0,0,1,0,.3,1.29,1.29,0,0,1-.1.33h0a0,0,0,0,0,0,0,1.56,1.56,0,0,1-1.76.88L27.65,49l-.42,2,11.45,2.45A3.61,3.61,0,0,0,42.35,52ZM41.84,47.33c.38-.11.74-.22,1.1-.35l1.25,3H43s0,0,0-.06A3.55,3.55,0,0,0,41.84,47.33Zm4.48,2.58-1.53-3.7A18.46,18.46,0,0,0,49,43.4l2.82,2.83A21.82,21.82,0,0,1,46.32,49.91Zm6.91-5.1L50.4,42a17.73,17.73,0,0,0,2.8-4.19l3.7,1.53A22.27,22.27,0,0,1,53.23,44.81Zm4.44-7.32L54,36a17.35,17.35,0,0,0,1-5h4A21.94,21.94,0,0,1,57.67,37.49ZM59,29H55a17.69,17.69,0,0,0-1-4.94l3.7-1.53A21.93,21.93,0,0,1,59,29ZM56.9,20.69l-3.69,1.52A18.25,18.25,0,0,0,50.4,18l2.83-2.82A22,22,0,0,1,56.9,20.69ZM46.33,10.1a22.27,22.27,0,0,1,5.48,3.67L49,16.6a17.73,17.73,0,0,0-4.19-2.8ZM38,8.06a21.44,21.44,0,0,1,6.48,1.28L43,13a17.77,17.77,0,0,0-5-1Zm5.13,7.17a15.65,15.65,0,0,1,5.18,3.46,16,16,0,0,1-5.2,26.1,15.69,15.69,0,0,1-5,1.17l-8.18-1.88-1.31-1.56h0s0,0-.05-.05a11.66,11.66,0,0,0-4.65-3.34,16,16,0,0,1,7-23.92A16,16,0,0,1,43.13,15.23ZM36,8.06v4a17.81,17.81,0,0,0-4.94,1L29.53,9.34A21.74,21.74,0,0,1,36,8.06Zm-8.31,2,1.52,3.69A18.46,18.46,0,0,0,25,16.6l-2.82-2.83A22,22,0,0,1,27.69,10.1Zm-6.92,5.09L23.6,18a17.73,17.73,0,0,0-2.8,4.19l-3.7-1.53A22.27,22.27,0,0,1,20.77,15.19Zm-4.44,7.32L20,24.05a17.35,17.35,0,0,0-1,4.95h-4A21.94,21.94,0,0,1,16.33,22.51ZM19,31a17.65,17.65,0,0,0,2,7.31,14.81,14.81,0,0,0-2.5-.25H17v0a3,3,0,0,0-1.27-2.44A21.86,21.86,0,0,1,15,31Zm-6,7a1,1,0,0,1,2,0V54a1,1,0,0,1-2,0ZM9,38a1,1,0,0,1,2,0V54a1,1,0,0,1-2,0Z" />
    <path d="M35.17,33.11h.33A5.52,5.52,0,0,0,41,28.06h2V26H40.79a5.49,5.49,0,0,0-1-2H43V22H31v2h4.5a3.5,3.5,0,0,1,3.15,2H31v2h8a3.51,3.51,0,0,1-3.45,3H32a1,1,0,0,0-.95.71,1,1,0,0,0,.38,1.13l10,7.07,1.14-1.66Z" />
    <path d="M37,42h0a12.2,12.2,0,0,1-2.09-.18l-.35,2A14.33,14.33,0,0,0,37,44h0A13.91,13.91,0,0,0,39,43.87l-.28-2A13.06,13.06,0,0,1,37,42Z" />
    <path d="M27.25,20l1.39,1.43a12.3,12.3,0,0,1,3.08-2.16l-.89-1.79A14.21,14.21,0,0,0,27.25,20Z" />
    <path d="M23.22,27.51l0,.12,2,.29a12.26,12.26,0,0,1,1.21-3.54l-1.77-.93A14.08,14.08,0,0,0,23.22,27.51Z" />
    <path d="M39.05,18.18l.34-2A13.64,13.64,0,0,0,35,16.14l.28,2A11.8,11.8,0,0,1,39.05,18.18Z" />
    <path d="M23.14,32a13.71,13.71,0,0,0,1.29,4.18l1.79-.88a11.89,11.89,0,0,1-1.1-3.58Z" />
    <path d="M26.94,39.74a13.86,13.86,0,0,0,3.5,2.63l.94-1.77a11.57,11.57,0,0,1-3-2.25Z" />
    <path d="M50.79,32.41l-1-.2-1-.13a11.86,11.86,0,0,1-1.22,3.55l1.76.94A13.86,13.86,0,0,0,50.79,32.41Z" />
    <path d="M47,20.24a14,14,0,0,0-3.5-2.62l-.93,1.77a11.74,11.74,0,0,1,3,2.25Z" />
    <path d="M50.86,28a14.1,14.1,0,0,0-1.3-4.18l-1.79.89a11.83,11.83,0,0,1,1.11,3.58Z" />
    <path d="M42.27,40.79l.87,1.79a14.05,14.05,0,0,0,3.59-2.51l-1.39-1.44A12.43,12.43,0,0,1,42.27,40.79Z" />
  </>
);
