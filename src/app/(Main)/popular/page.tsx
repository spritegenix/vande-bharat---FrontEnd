"use client";
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
import { useFetchPopularPosts } from "@/queries/posts/posts.queries";
import { Post } from "@/types/post";
import Image from "next/image";
import React from "react";

export default function page() {
  const {
    data: popularPosts,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useFetchPopularPosts();

  const showOwnPostsOnly = false;
  const allPosts = popularPosts?.pages.flatMap((page) => page.posts);
  console.log("popularPOst", allPosts);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Fetching Bookmark failed</p>;
  return allPosts?.map((post: Post) => (
    <Box key={post._id} className="m-2 my-6 pb-2 md:mx-auto">
      <div className="flex items-start justify-between gap-x-2 p-3 pb-0">
        {!showOwnPostsOnly && <PostHeader post={post} />}

        {/* <div className="flex items-center gap-2">
                    {!showOwnPostsOnly && (
                      <Button variant="outline" size="sm" className="text-xs" onClick={handleFollow}>
                        Follow
                      </Button>
                    )}
                  </div> */}
      </div>
      <div className="flex items-center justify-between">
        <div className="mt-2 whitespace-pre-line px-3">
          <Linkify>
            <div>{post.content}</div>
          </Linkify>
        </div>
      </div>

      <PostAttachment post={post} />

      <div className="mx-4 mt-4 border-t border-gray-400 px-3 pt-4 text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center justify-between gap-x-4">
            <LikeButton post={post} posts={allPosts} />

            <div className="flex items-center justify-center gap-x-4">
              <CommentButton postId={post._id} />
              <ShareMenu postUrl={`/posts/${post._id}`} />
              <BookmarkButton posts={allPosts} post={post} />
            </div>
          </div>
        </div>
        <PostCommentSection postId={post._id} />
      </div>
    </Box>
  ));
}
