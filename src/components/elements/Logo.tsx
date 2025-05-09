// import { logoDark, logoWhite } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({
  mode = "dark",
  className = "",
}: {
  mode?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link href="/" className={`cursor-pointer ${className}`}>
      {/* <Image
        src={mode === "light" ? logoWhite : logoDark}
        alt="logo"
        height={300}
        width={500}
        className="max-h-14 w-min object-contain"
      /> */}
      <h1 className="cursor-pointer text-lg font-medium lg:text-3xl">Vande Bharat</h1>
    </Link>
  );
}
