"use client";

import React from "react";
import Box from "./elements/Box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Bookmark, MessageCircle, Share2, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import { useEditorStore } from "@/stores/editorStore";
import Linkify from "./Linkify";

export default function FeedsSection() {
  const { posts } = useEditorStore();

  return (
    <div className="mb-2">
      {posts.map((post) => (
        <Box key={post.id} className="m-2 my-6 pb-2 md:mx-auto">
          <div className="flex items-start justify-between gap-x-2 p-3 pb-0">
            {/* Avatar + Name/Time */}
            <div className="flex gap-x-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <Image
                    src="/images/profile/profileplaceholder.jpg"
                    alt="fallback"
                    height={50}
                    width={50}
                  />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm font-semibold">
                <p>Ashik Shetty</p>
                <p className="text-xs font-normal text-gray-500">
                  {post.createdAt.toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Follow Button */}
            <Button variant="outline" size="sm" className="text-xs">
              Follow
            </Button>
          </div>

          <div className="mt-2 whitespace-pre-line px-3">
            <Linkify>
              <div>{post.textContent}</div>
            </Linkify>
          </div>

          {(post.images.length > 0 || post.videos?.length > 0) && (
            <div className="mt-3 grid grid-cols-1 gap-4 px-3 md:grid-cols-2">
              {post.images.map((file, index) => (
                <Image
                  key={`img-${index}`}
                  src={URL.createObjectURL(file)}
                  alt={`feed-image-${index}`}
                  width={400}
                  height={300}
                  className="rounded"
                />
              ))}

              {post.videos?.map((file, index) => (
                <video
                  key={`vid-${index}`}
                  src={URL.createObjectURL(file)}
                  controls
                  className="w-full rounded shadow"
                />
              ))}
            </div>
          )}

          {/* Like / Comment / Share Section */}
          <div className="mx-4 mt-4 border-t border-gray-400 px-3 pt-4 text-sm text-gray-500">
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-between gap-x-4">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ThumbsUp size={16} />
                  Like
                </button>
                <div className="flex items-center justify-center gap-x-4">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <MessageCircle size={16} />
                    Comment
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <Bookmark size={16} />
                    Bookmark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      ))}
    </div>
  );
}
