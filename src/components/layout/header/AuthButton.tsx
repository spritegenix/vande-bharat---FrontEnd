import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Button from "@/components/elements/Button";
import UserButton from "./UserButton";

export default function AuthButton() {
  const isLogin = true;
  return (
    <>
      {!isLogin ? (
        <Button href="/login" prefetch={true}>
          Log In
        </Button>
      ) : (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <UserButton className="sm:ms-auto" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="px-2 py-1 text-xs" showArrow={true}>
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
