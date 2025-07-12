"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import Box from "@/components/elements/Box";
import ShareMenu from "@/components/posts/ShareMenu";
import CommentButton from "@/components/posts/comments/CommentButton";
import { PostCommentSection } from "@/components/posts/comments/PostCommentSection";
import PostUpdateButton from "@/components/posts/dropdown/PostUpdateButton";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
}

export default function PostCard({ post, currentUserId }: PostCardProps) {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  return (
    <Box className="p-2">
      <Card className="rounded-lg border border-gray-300 bg-gray-200 dark:border-border dark:bg-card">
        <CardContent className="space-y-4 p-5">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.userId.avatar || "/profile.jpg"} />
                <AvatarFallback>
                  {(post.userId.name || "NA").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-black dark:text-foreground">
                  {post.userId.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {currentUserId === post.userId._id && (
              <PostUpdateButton post={post} setEditingPostId={setEditingPostId} />
            )}
          </div>

          {/* Content */}
          <p className="text-sm text-gray-900 dark:text-muted-foreground">
            {post.content}
          </p>

          {/* Optional Image */}
          {post.attachments?.[0]?.type === "IMAGE" && (
            <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-300 dark:bg-muted">
              <img
                src={post.attachments[0].url}
                alt="Post image"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Interaction */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {post.likeCount || 0} likes
            </div>
            <CommentButton postId={post._id} />
            <ShareMenu postUrl={`https://yourapp.com/posts/${post._id}`} />
          </div>

          {/* Comments */}
          <PostCommentSection postId={post._id} />
        </CardContent>
      </Card>
    </Box>
  );
}
