import { Button } from "@/components/ui/button";
import React from "react";

type ButtonProps = {
  icon: React.ReactNode;
  text: string;
  href: string;
};

export default function AuthButton({ icon, text, href }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className="bg-white text-black hover:bg-gray-100 hover:text-black"
      asChild
    >
      <a href={href} className="flex w-full items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {text}
      </a>
    </Button>
  );
}
