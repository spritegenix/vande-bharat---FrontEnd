import React from "react";
import Box from "./elements/Box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { MessageCircle, Share2, ThumbsUp, X } from "lucide-react";
import Image from "next/image";

export default function FeedsSection() {
  return (
    <>
      <Box className="m-2 my-8 md:mx-auto">
        <div className="mb-2 flex gap-x-2 p-3 pb-0">
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
          <div className="flex w-full flex-col text-sm font-semibold">
            <p>Ashik Shetty</p>
            <p>35 minutes ago</p>
          </div>
          <div className="flex">
            <Button variant="outline" className="bg-blue-600 dark:border-offwhite">
              Follow
            </Button>
            <Button variant="ghost">
              <X />
            </Button>
          </div>
        </div>
        <div>
          <p className="px-3">Hello World</p>
          {/* <Image src=""/> */}
        </div>
        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
          {/* Blurred Background */}
          <Image
            src="/images/feed/1.jpg"
            alt="feed blur"
            fill
            className="absolute inset-0 z-0 scale-110 object-cover blur-lg"
          />

          {/* Main Image (sharp) */}
          <Image
            src="/images/feed/1.jpg"
            alt="feed image"
            width={400}
            height={100}
            className="relative z-10 h-full w-auto"
          />
        </div>

        <div className="mt-4 border-t border-gray-600 px-4 py-4 text-sm text-gray-500">
          <div className="flex items-center justify-between px-2">
            {/* Likes */}
            <div className="flex items-center space-x-1">
              <ThumbsUp size={16} className="text-blue-600" />
              <span>225</span>
            </div>

            {/* Comments and Shares */}
            <div className="flex items-center gap-x-4">
              <div className="flex items-center space-x-1">
                <MessageCircle size={16} />
                <span>4 comments</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 size={16} />
                <span>22 shares</span>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
