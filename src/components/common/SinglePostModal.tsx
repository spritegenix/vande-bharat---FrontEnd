"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ThumbsUp, ThumbsUpIcon } from "lucide-react";
import { Post } from "@/types/post";
import { getPostById } from "@/queries/posts/posts.api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
};

export default function SinglePostModal({ isOpen, onClose, postId }: Props) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postId && isOpen) {
      getPostById(postId).then((data) => {
        setPost(data);
      });
    }
  }, [postId, isOpen]);

  if (!post) return null;

  const attachments = post.attachments || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] w-full max-w-6xl overflow-hidden p-0">
        <div className="flex h-full flex-col md:flex-row">
          {/* Left: Media Preview */}
          <div className="relative my-auto flex w-full items-center justify-center bg-black md:w-1/2">
            {attachments.length > 0 && (
              <Carousel className="h-full w-full">
                <CarouselContent className="h-full">
                  {attachments.map((att, idx) => (
                    <CarouselItem key={idx} className="flex h-full items-center justify-center">
                      {att.type === "IMAGE" ? (
                        <img
                          src={att.url}
                          alt={att.fileName}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <video
                          src={att.url}
                          controls
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {attachments.length > 1 && (
                  <>
                    <CarouselPrevious className="absolute left-2 top-1/2 z-10 -translate-y-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2 z-10 -translate-y-1/2" />
                  </>
                )}
              </Carousel>
            )}
          </div>

          {/* Right: Post Info */}
          <div className="flex w-full flex-col p-4 md:w-1/2">
            <DialogHeader className="flex items-center justify-between border-b pb-2">
              <DialogTitle>Post Details</DialogTitle>
              {/* <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button> */}
            </DialogHeader>

            <ScrollArea className="mt-4 flex-1">
              <div className="mb-4">
                <p className="whitespace-pre-line text-sm text-gray-600 dark:text-white">
                  {post.content}
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                {/* <p className="text-sm font-semibold text-gray-800">Likes</p> */}
                <ThumbsUp
                  className={`h-5 w-5 ${post.likeCount ? "fill-blue-600 text-blue-600" : "text-gray-400"}`}
                />
                <p className="text-sm text-gray-500">{post.likeCount || 0}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Comments</p>
                {post.comments?.length ? (
                  <ul className="space-y-1 text-sm text-gray-700">
                    {post.comments.map((c) => (
                      <li key={c._id}>{c.content}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
