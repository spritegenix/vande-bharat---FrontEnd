"use client";

import React, { useState } from "react";
import LikeButton from "@/components/posts/like/LikeButton";
import BookmarkButton from "@/components/posts/BookmarkButton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Box from "@/components/elements/Box";
import ShareMenu from "@/components/posts/ShareMenu";
import CommentButton from "@/components/posts/comments/CommentButton";
import { PostCommentSection } from "@/components/posts/comments/PostCommentSection";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/types/post";
import PostAttachment from "@/components/posts/PostAttachment"; 

interface PostCardProps {
  post: Post;
  currentUserId?: string;
}

export default function PostCard({ post, currentUserId }: PostCardProps) {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  return (
    <Box className="dark:bg-card border dark:border">
      <Card className="rounded-lg dark:bg-card">
        <CardContent className="space-y-5 p-5">
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
          </div>

          {/* Content */}
          <p className="text-sm text-gray-900 dark:text-muted-foreground">{post.content}</p>

          {/* ✅ Attachment support (Images/Videos modal-ready) */}
          <PostAttachment post={post} />

          <Separator />

          {/* Interaction Buttons */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-muted-foreground">
            <LikeButton post={{ _id: post._id }} posts={[post]} />
            <CommentButton postId={post._id} />
            <ShareMenu postUrl={`https://yourapp.com/posts/${post._id}`} />
            <BookmarkButton
              post={{ _id: post._id}}
              posts={[post]}
            />
          </div>

          {/* Comments */}
          <PostCommentSection postId={post._id} />
        </CardContent>
      </Card>
    </Box>
  );
}
