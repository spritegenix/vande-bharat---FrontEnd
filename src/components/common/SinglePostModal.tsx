"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Post } from "@/types/post";
import { getPostById } from "@/queries/posts/posts.api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PostHeader from "../posts/PostHeader";
import LikeButton from "../posts/like/LikeButton";
import CommentButton from "../posts/comments/CommentButton";
import ShareMenu from "../posts/ShareMenu";
import BookmarkButton from "../posts/BookmarkButton";
import { PostCommentSection } from "../posts/comments/PostCommentSection";
import { useAuthAxios } from "@/lib/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
};

export default function SinglePostModal({ isOpen, onClose, postId }: Props) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const axios = useAuthAxios();
    if (postId && isOpen) {
      getPostById(axios, postId).then((data) => {
        setPost(data);
      });
    }
  }, [postId, isOpen]);

  if (!post) return null;
  const attachments = post.attachments || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg border bg-white p-0 shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <div className="flex h-full flex-col md:flex-row">
          {/* Left: Media Preview */}
          <div className="relative my-auto flex h-full w-full items-center justify-center rounded-lg border-r bg-black dark:border-gray-700 md:w-1/2">
            {attachments.length > 0 && (
              <Carousel className="my-auto flex h-full w-full">
                <CarouselContent className="h-full">
                  {attachments.map((att, idx) => (
                    <CarouselItem key={idx} className="flex h-full items-center justify-center">
                      {att.type === "IMAGE" ? (
                        <img
                          src={att.url}
                          alt={att.fileName}
                          className="max-h-full max-w-full rounded-lg object-contain"
                        />
                      ) : (
                        <video
                          src={att.url}
                          controls
                          className="max-h-full max-w-full rounded-lg object-contain"
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
          <div className="flex w-full flex-col bg-white p-4 dark:bg-gray-900 md:w-1/2">
            <DialogHeader className="border-b pb-2 dark:border-gray-700">
              <DialogTitle>
                <PostHeader post={post} />
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="mt-4 flex-1 pr-2">
              <div className="mb-4 px-2">
                <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                  {post.content}
                </p>
              </div>

              <div className="mx-2 mt-4 border-t border-gray-200 pt-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <div className="flex w-full items-center justify-between gap-x-4">
                    <LikeButton post={post} />
                    <div className="flex items-center justify-center gap-x-4">
                      <CommentButton postId={post._id} />
                      <ShareMenu postUrl={`/posts/${post._id}`} />
                      <BookmarkButton post={post} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 mt-2 px-2">
                <PostCommentSection postId={post._id} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
