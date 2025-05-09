import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function Box({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto my-10 max-w-[500px] rounded-lg bg-white shadow-lg dark:bg-[#252728] xl:max-w-[680px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
