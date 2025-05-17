"use client";
import React from "react";
import Box from "./elements/Box";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Editor from "./Editor";
import { useUser } from "@clerk/nextjs";

export default function Feed() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return null;
  return (
    <Box className="m-2 px-3 pb-3 pt-2 md:mx-auto">
      <div className="flex gap-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            <Image
              src="/images/profile/profileplaceholder.jpg"
              alt="image"
              height={50}
              width={50}
            />
          </AvatarFallback>
        </Avatar>
        <Editor />
      </div>
    </Box>
  );
}
