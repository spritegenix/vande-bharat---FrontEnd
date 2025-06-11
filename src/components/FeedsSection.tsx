"use client";

import React from "react";
import Box from "./elements/Box";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Linkify from "./Linkify";
import LoadingSpinner from "./common/LoadingSpinner";
import { Post } from "@/types/post";
import InlineEditorWithMedia from "./InlineEditorWithMedia";
import { useUpdatePost } from "@/queries/posts/posts.mutation";
import { useUserStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import LikeButton from "./posts/like/LikeButton";
import PostHeader from "./posts/PostHeader";
import PostUpdateButton from "./posts/dropdown/PostUpdateButton";
import ShareMenu from "./posts/ShareMenu";
import BookmarkButton from "./posts/BookmarkButton";
import { PostCommentSection } from "./posts/comments/PostCommentSection";
import CommentButton from "./posts/comments/CommentButton";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import SinglePostModal from "./common/SinglePostModal";

interface FeedsSectionProps {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  showOwnPostsOnly?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: Boolean;
}
export default function FeedsSection({
  posts,
  isLoading,
  isError,
  showOwnPostsOnly = false,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: FeedsSectionProps) {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const { mutate: updatePost } = useUpdatePost();
  const { user } = useUserStore();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFollow = () => {
    if (!user) redirect("/login");
  };

  if (isLoading || !posts) return <LoadingSpinner />;
  if (isError) return <p>Error loading posts.</p>;
  return (
    <div className="mb-2">
      {posts.map((post: Post, index) => (
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
                {!showOwnPostsOnly && <PostHeader post={post} />}
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
                  <PostUpdateButton post={post} setEditingPostId={setEditingPostId} />
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
                    {post.attachments.slice(0, 4).map((file, fileIndex) => (
                      <div
                        key={fileIndex}
                        className="relative w-full cursor-pointer overflow-hidden rounded"
                        onClick={() => {
                          setCurrentIndex(index);
                          setSelectedPostId(post._id);
                          setModalOpen(true);
                        }}
                      >
                        {file.type === "IMAGE" ? (
                          <Image
                            src={file.url}
                            alt={`attachment-${fileIndex}`}
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
                        {fileIndex === 3 && post.attachments.length > 4 && (
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
                    <LikeButton posts={posts} post={post} />
                    <div className="flex items-center justify-center gap-x-4">
                      <CommentButton postId={post._id} />
                      <ShareMenu postUrl={`/posts/${post._id}`} />
                      <BookmarkButton posts={posts} post={post} />
                    </div>
                  </div>
                </div>
              </div>
              <PostCommentSection postId={post._id} />
            </Box>
          )}
        </React.Fragment>
      ))}

      {/* 👇 Modal for single post view */}
      {modalOpen && selectedPostId && (
        <SinglePostModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          postId={selectedPostId}
        />
      )}

      <div ref={ref} className="h-8"></div>
      {isFetchingNextPage && (
        <div className="my-4 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
