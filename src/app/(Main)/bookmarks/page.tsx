// page.tsx
"use client";
import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useFetchBookmarkedPosts } from "@/queries/posts/posts.queries";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Box from "@/components/elements/Box";
import Linkify from "@/components/Linkify";
import BookmarkButton from "@/components/posts/BookmarkButton";
import CommentButton from "@/components/posts/comments/CommentButton";
import { PostCommentSection } from "@/components/posts/comments/PostCommentSection";
import LikeButton from "@/components/posts/like/LikeButton";
import PostAttachment from "@/components/posts/PostAttachment";
import PostHeader from "@/components/posts/PostHeader";
import ShareMenu from "@/components/posts/ShareMenu";
import { Button } from "@/components/ui/button";
import FollowButton from "./FollowButton";

export default function BookmarksPage() {
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchBookmarkedPosts();

  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const handleFollow = () => {};
  const allBookmarks = useMemo(() => {
    return data?.pages.flatMap((page) => page.posts) || [];
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-center text-red-500">Failed to load bookmarks.</p>;
  if (!allBookmarks.length)
    return <p className="mt-10 text-center text-gray-500">No bookmarks found.</p>;
  console.log(data);
  return (
    <>
      {allBookmarks.map(({ _id, postId }) => (
        <Box key={_id} className="m-2 my-6 pb-2 md:mx-auto">
          <div className="flex items-start justify-between gap-x-2 p-3 pb-0">
            <PostHeader post={postId} />
            <div className="flex items-center gap-2">
              <FollowButton
                toUserId={postId.userId._id}
                requestStatus={postId.userId.requestStatus}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="mt-2 whitespace-pre-line px-3">
              <Linkify>
                <div>{postId?.content}</div>
              </Linkify>
            </div>
          </div>

          <PostAttachment post={postId} />

          <div className="mx-4 mt-4 border-t border-gray-400 px-3 pt-4 text-sm text-gray-500">
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-between gap-x-4">
                <LikeButton posts={allBookmarks.map((b) => b.postId)} post={postId} />

                <div className="flex items-center gap-x-4">
                  <CommentButton postId={postId?._id} />
                  <ShareMenu postUrl={`/posts/${postId?._id}`} />
                  <BookmarkButton posts={allBookmarks.map((b) => b.postId)} post={postId} />
                </div>
              </div>
            </div>
            <PostCommentSection postId={postId?._id} />
          </div>
        </Box>
      ))}

      {hasNextPage && <div ref={ref} className="h-8" />}
      {isFetchingNextPage && (
        <div className="my-4 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
