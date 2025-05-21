"use client";

import React from "react";
import Box from "./elements/Box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Bookmark, MessageCircle, Share2, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import { useEditorStore } from "@/stores/editorStore";
import Linkify from "./Linkify";
import { useFetchPosts } from "@/queries/posts/posts.queries";
import { formatPublishedDate } from "@/utils/dateSorter";

export default function FeedsSection() {
  const { data: posts, isLoading, isError } = useFetchPosts();
  if (isError) return;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mb-2">
      {posts.map((post) => (
        <Box key={post._id} className="m-2 my-6 pb-2 md:mx-auto">
          <div className="flex items-start justify-between gap-x-2 p-3 pb-0">
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
                  {formatPublishedDate(post.createdAt)}
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="text-xs">
              Follow
            </Button>
          </div>

          <div className="mt-2 whitespace-pre-line px-3">
            <Linkify>
              <div>{post.content}</div>
            </Linkify>
          </div>

          {post.attachments && post.attachments.length > 0 && (
            <div className="mt-3 px-3">
              <div
                className={`grid gap-2 ${
                  post.attachments.length === 1
                    ? "grid-cols-1"
                    : post.attachments.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-2"
                }`}
              >
                {post.attachments.slice(0, 4).map((file, index) => (
                  <div key={index} className="relative w-full overflow-hidden rounded">
                    {file.type === "IMAGE" ? (
                      <Image
                        src={file.url}
                        alt={`attachment-${index}`}
                        width={500}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <video
                        src={file.url}
                        controls
                        className="h-full w-full rounded object-cover"
                      />
                    )}

                    {/* Overlay for additional items */}
                    {index === 3 && post.attachments.length > 4 && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-xl font-bold text-white">
                        +{post.attachments.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
