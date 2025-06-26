import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useUserStore } from "@/stores/userStore";
import { Post } from "@/types/post";
import { useMutation } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function LikeButton({ post, posts }: { post: { _id: string }; posts?: Post[] }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const { user } = useUserStore();
  useEffect(() => {
    if (!posts) return;
    const initialLiked: Record<string, boolean> = {};
    const initialCounts: Record<string, number> = {};
    posts.forEach((post: Post) => {
      initialLiked[post?._id] = post?.isLiked ?? false;
      initialCounts[post?._id] = post?.likeCount ?? 0;
    });
    setLiked(initialLiked);
    setLikeCounts(initialCounts);
  }, [posts]);

  const { mutate: toggleLikeMutation } = useMutation({
    mutationFn: (postId: string) =>
      axios.post(`/posts/likes/toggle`, { postId }).then((res) => {
        return res.data;
      }),

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
      console.log("cannot like the post", _err);
    },

    onSuccess: (data, postId) => {
      setLiked((prev) => ({ ...prev, [postId]: data.isLiked }));
    },
  });

  const toggleLike = (id: string) => {
    if (!user) return;
    toggleLikeMutation(id);
  };

  return (
    <Button
      variant={"ghost"}
      onClick={() => toggleLike(post?._id)}
      className={`flex items-center gap-1 ${
        liked[post?._id] ? "text-blue-600 hover:text-blue-700" : "text-gray-600 hover:text-gray-600"
      } focus:outline-none`}
    >
      {liked[post?._id] ? (
        <ThumbsUp className="h-4 w-4 fill-blue-600" />
      ) : (
        <ThumbsUp className="h-4 w-4 text-gray-600" />
      )}
      {likeCounts[post?._id] > 0 && <span className="text-sm">{likeCounts[post?._id]}</span>}
      <span className="hidden md:flex">Like</span>
    </Button>
  );
}
