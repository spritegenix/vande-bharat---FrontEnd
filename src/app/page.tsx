import { Button } from "@/components/ui/button";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function page() {
  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-primary">Button</Button>
          </TooltipTrigger>
          <TooltipContent className="dark px-2 py-1 text-xs" showArrow={true}>
            Account
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
