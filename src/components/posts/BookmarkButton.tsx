"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
export default function BookmarkButton({ posts, post }: { posts?: Post[]; post: { _id: string } }) {
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!posts) return;
    const initialBookmarks: Record<string, boolean> = {};
    posts.forEach((post: Post) => {
      initialBookmarks[post?._id] = post?.isBookmarked ?? false;
      setBookmarked(initialBookmarks);
    });
  }, [posts]);
  const { mutate: toggleBookmarkMutation } = useMutation({
    mutationFn: (postId: string) =>
      axios.post("/posts/bookmarks/toggle", { postId }).then((res) => {
        return res.data;
      }),
    onMutate: async (postId: string) => {
      setBookmarked((prev) => ({ ...prev, [postId]: !prev[postId] }));
    },
    onError: (_err, postId: string) => {
      setBookmarked((prev) => ({ ...prev, [postId]: !prev[postId] }));
      console.error("Error toggling bookmark for post:", postId);
    },
    onSuccess: (data, postId: string) => {
      setBookmarked((prev) => ({ ...prev, [postId]: data.isBookmarked }));
      queryClient.invalidateQueries({ queryKey: ["bookmarked-posts"] });
    },
  });
  const toggleBookmark = (id: string) => {
    if (!user) return null;
    toggleBookmarkMutation(id);
  };

  return (
    <Button
      variant={"ghost"}
      onClick={() => toggleBookmark(post?._id)}
      className={`flex items-center gap-1 ${bookmarked[post?._id] ? "text-blue-600 hover:text-blue-600" : "hover:text-gray-600"} focus:outline-none`}
    >
      {bookmarked[post?._id] ? (
        <Bookmark size={16} className="fill-blue-600" />
      ) : (
        <Bookmark size={16} />
      )}
      <span className="hidden md:flex">Bookmark</span>
    </Button>
  );
}
