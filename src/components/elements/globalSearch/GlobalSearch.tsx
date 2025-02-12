"use client";
import { IoIosSearch } from "react-icons/io";
import GlobalTypeHead from "./GlobalTypeHead";

export default function GlobalSearch() {
  return (
    <div className="flex w-full max-w-md items-center space-x-1 rounded-full border bg-zinc-50 dark:bg-zinc-800 px-2 md:col-span-7">
      <GlobalTypeHead />
      <IoIosSearch className="w-7 text-lg" />
    </div>
  );
}
