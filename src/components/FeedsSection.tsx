"use client";

import React, { useEffect, useState } from "react";
import Box from "./elements/Box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Bookmark, MessageCircle, MoreHorizontal, Share2, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import Linkify from "./Linkify";
import { formatPublishedDate } from "@/utils/dateSorter";
import LoadingSpinner from "./common/LoadingSpinner";
import Link from "next/link";
import { Post } from "@/types/post";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InlineEditorWithMedia from "./InlineEditorWithMedia";
import { useDeletePost, useUpdatePost } from "@/queries/posts/posts.mutation";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface FeedsSectionProps {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  showOwnPostsOnly?: boolean;
}
export default function FeedsSection({
  posts,
  isLoading,
  isError,
  showOwnPostsOnly = false,
}: FeedsSectionProps) {
  const [editingPostId, setEditingPostId] = React.useState<string | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();
  const { user } = useUserStore();

  useEffect(() => {
    if (!posts) return;
    const initialLiked: Record<string, boolean> = {};
    const initialCounts: Record<string, number> = {};
    posts.forEach((post) => {
      initialLiked[post._id] = post.isLiked ?? false;
      initialCounts[post._id] = post.likeCount ?? 0;
    });
    setLiked(initialLiked);
    setLikeCounts(initialCounts);
  }, [posts]);

  const handleDelete = (postId: string) => {
    deletePost(postId, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting post:", error);
      },
    });
  };
  const { mutate: toggleLikeMutation } = useMutation({
    mutationFn: (postId: string) =>
      axios.post(`/posts/likes/${postId}/toggle`).then((res) => res.data),

    onMutate: async (postId) => {
      setLiked((prev) => ({ ...prev, [postId]: !prev[postId] }));
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: prev[postId] + (liked[postId] ? -1 : 1),
      }));
    },

    onError: (_err, postId) => {
      // rollback
      setLiked((prev) => ({ ...prev, [postId]: !prev[postId] }));
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: prev[postId] + (liked[postId] ? 1 : -1),
      }));
    },

    onSuccess: (data, postId) => {
      // Optional: if the response contains `liked`, you can correct state with it
      setLiked((prev) => ({ ...prev, [postId]: data.liked }));
    },
  });

  const toggleLike = (id: string) => {
    toggleLikeMutation(id);
  };

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
    // TODO: call backend mutation to sync
  };
  const handleFollow = () => {
    if (!user) redirect("/login");
  };
  if (isLoading || !posts) return <LoadingSpinner />;
  if (isError) return <p>Error loading posts.</p>;
  console.log(posts);
  return (
    <div className="mb-2">
      {posts.map((post: Post) => (
        <React.Fragment key={post._id}>
          {editingPostId === post._id ? (
            <Box className="m-2 my-6 pb-2 md:mx-auto">
              <InlineEditorWithMedia
                initialText={post.content}
                initialFiles={post.attachments}
                onCancel={() => setEditingPostId(null)}
                onSave={(text, newFiles, existingAttachments) => {
                  updatePost({ postId: post._id, newText: text, newFiles, existingAttachments });
                  setEditingPostId(null);
                }}
              />
            </Box>
          ) : (
            <Box key={post._id} className="m-2 my-6 pb-2 md:mx-auto">
              <div className="flex items-start justify-between gap-x-2 p-3 pb-0">
                {!showOwnPostsOnly && (
                  <div className="flex gap-x-2">
                    <Avatar>
                      <AvatarImage src={post?.userId?.avatar} />
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
                      <Link href={`/profile/${post?.userId?.slug}`}>
                        <p>{post?.userId?.name}</p>
                      </Link>
                      <p className="text-xs font-normal text-gray-500">
                        {formatPublishedDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {!showOwnPostsOnly && (
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleFollow}>
                      Follow
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-2 whitespace-pre-line px-3">
                  <Linkify>
                    <div>{post.content}</div>
                  </Linkify>
                </div>

                {showOwnPostsOnly && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem onClick={() => setEditingPostId(post._id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(post._id)}
                        className="text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
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
                    <Button
                      variant={"ghost"}
                      onClick={() => toggleLike(post._id)}
                      className={`flex items-center gap-1 ${post?.isLiked ? "text-blue-600" : ""}`}
                    >
                      <ThumbsUp size={16} />
                      {post?.likeCount > 0 && <span className="text-sm">{post.likeCount}</span>}
                      <span className="hidden md:flex">Like</span>
                    </Button>

                    <div className="flex items-center justify-center gap-x-4">
                      <Button
                        variant={"ghost"}
                        className="flex items-center gap-1 hover:text-blue-600"
                      >
                        <MessageCircle size={16} />
                        {/* {post?.commentCount && post?.commentCount > 0 && (
                          <span className="text-sm text-gray-600">{post?.commentCount}</span>
                        )} */}
                        <span className="hidden md:flex">Comment</span>
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="flex items-center gap-1 hover:text-blue-600"
                      >
                        <Share2 size={16} />
                        <span className="hidden md:flex">Share</span>
                      </Button>
                      <Button
                        variant={"ghost"}
                        onClick={toggleBookmark}
                        className={`flex items-center gap-1 ${bookmarked ? "text-blue-600" : ""} `}
                      >
                        <Bookmark size={16} />
                        <span className="hidden md:flex">Bookmark</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
