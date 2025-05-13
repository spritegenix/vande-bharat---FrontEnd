import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Button from "@/components/elements/Button";
import Link from "next/link";
import UserProfile from "./UserButton";
import { UserButton, useUser } from "@clerk/nextjs";

export default function AuthButton() {
  const { user } = useUser();
  return (
    <>
      {!user ? (
        <Button as={Link} href="/login" prefetch={true}>
          Log In
        </Button>
      ) : (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <UserProfile className="sm:ms-auto" />
                {/* <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-10 w-10",
                    },
                  }}
                /> */}
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
