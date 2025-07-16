"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Box from "./elements/Box";
import LoadingSpinner from "./common/LoadingSpinner";
import { useUserStore } from "@/stores/userStore";
import { useUpdatePost } from "@/queries/posts/posts.mutation";
import { Post } from "@/types/post";
import InlineEditorWithMedia from "./InlineEditorWithMedia";
import LikeButton from "./posts/like/LikeButton";
import PostHeader from "./posts/PostHeader";
import PostUpdateButton from "./posts/dropdown/PostUpdateButton";
import ShareMenu from "./posts/ShareMenu";
import BookmarkButton from "./posts/BookmarkButton";
import { PostCommentSection } from "./posts/comments/PostCommentSection";
import CommentButton from "./posts/comments/CommentButton";
import Linkify from "./Linkify";
import PostAttachment from "./posts/PostAttachment";
import { useInView } from "react-intersection-observer";
import { redirect } from "next/navigation";
import { useSendRequest, useUnfriend } from "@/queries/user/user.mutation";

interface FeedsSectionProps {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  showOwnPostsOnly?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  slug?: string;
}

const FeedsSection: React.FC<FeedsSectionProps> = ({
  posts,
  isLoading,
  isError,
  showOwnPostsOnly = false,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  slug,
}) => {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const { mutate: updatePost } = useUpdatePost();
  const { user } = useUserStore();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const { mutate: sendRequest } = useSendRequest();
  const { mutate: unfriend } = useUnfriend();
  const handleFollow = (toUserId: string) => {
    if (!user) redirect("/login");
    sendRequest({ toUserId });
  };

  const handleUnFollow = (toUserId: string) => {
    if (!user) redirect("/login");
    unfriend({ toUserId });
  };
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-center text-red-500">Error loading posts.</p>;

  return (
    <div className="mb-2">
      {posts.map((post) => (
        <React.Fragment key={post._id}>
          {editingPostId === post._id ? (
            <Box className="m-2 my-6 pb-2 md:mx-auto">
              <InlineEditorWithMedia
                initialText={post.content}
                initialFiles={post.attachments}
                onCancel={() => setEditingPostId(null)}
                onSave={(newText, newFiles, existingAttachments) => {
                  updatePost({
                    postId: post._id,
                    newText,
                    newFiles,
                    existingAttachments,
                  });
                  setEditingPostId(null);
                }}
              />
            </Box>
          ) : (
            <Box className="m-2 my-6 pb-2 md:mx-auto">
              <div className="flex items-start justify-between gap-x-2 p-3 pb-0">
                {<PostHeader post={post} />}

                {user &&
                  !showOwnPostsOnly &&
                  post.userId._id !== user._id &&
                  (!post.isFollowed && post.requestStatus !== "PENDING" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleFollow(post?.userId?._id)}
                    >
                      Follow
                    </Button>
                  ) : post.requestStatus === "PENDING" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-not-allowed bg-green-300 text-xs text-gray-800"
                      disabled
                    >
                      Request Sent
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleUnFollow(post?.userId?._id)}
                    >
                      Unfollow
                    </Button>
                  ))}
                {!user && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleFollow(post?.userId?._id)}
                  >
                    Follow
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="mt-2 whitespace-pre-line px-3">
                  <Linkify>
                    <div>{post.content}</div>
                  </Linkify>
                </div>
                {showOwnPostsOnly && user?.slug === slug && (
                  <PostUpdateButton post={post} setEditingPostId={setEditingPostId} />
                )}
              </div>

              <PostAttachment post={post} />

              <div className="mx-4 mt-4 border-t border-gray-400 px-3 pt-4 text-sm text-gray-500">
                <div className="flex w-full items-center justify-between gap-x-4">
                  <LikeButton posts={posts} post={post} />
                  <div className="flex items-center gap-x-4">
                    <CommentButton postId={post._id} />
                    <ShareMenu postUrl={`/posts/${post._id}`} />
                    <BookmarkButton posts={posts} post={post} />
                  </div>
                </div>
              </div>

              <PostCommentSection postId={post._id} />
            </Box>
          )}
        </React.Fragment>
      ))}

      {hasNextPage && <div ref={ref} className="h-8" />}

      {isFetchingNextPage && (
        <div className="my-4 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(FeedsSection);
