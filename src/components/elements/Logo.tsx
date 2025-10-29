import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <Link href="/" className={`cursor-pointer ${className}`}>
      <Image
        src={`${theme === "light" ? "/logoBlack.png" : "/logoWhite.png"}`}
        alt="logo"
        height={300}
        width={500}
        className="max-h-14 w-min object-contain"
      />
      {/* <h1 className="cursor-pointer text-lg font-medium lg:text-3xl">Vande Bharat</h1> */}
    </Link>
  );
}
