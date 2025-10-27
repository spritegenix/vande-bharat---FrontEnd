import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomTextarea } from "@/components/CustomTextArea";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { useCommentStore } from "@/stores/CommentStore";
import { useState } from "react";
import { nanoid } from "nanoid"; // for temporary ID
import { createComment } from "@/queries/posts/posts.api";
import { useUserStore } from "@/stores/userStore";
import { useAuthAxios } from "@/lib/axios";

interface CreateCommentProps {
  postId: string;
  parentCommentId?: string;
  onCommentCreated?: () => void;
}

export default function CreateComment({
  postId,
  parentCommentId,
  onCommentCreated,
}: CreateCommentProps) {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const axios = useAuthAxios();

  const queryKey = parentCommentId ? ["replies", parentCommentId] : ["comments", postId];

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { postId: string; content: string; parentCommentId?: string }) =>
      createComment(axios, data),

    onMutate: async ({ postId, content, parentCommentId }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<any>(["comments", postId]);

      const optimisticComment = {
        _id: `temp-${nanoid()}`,
        content,
        createdAt: new Date().toISOString(),
        userId: user,
        replies: [], // Initialize replies for optimistic update
      };

      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old?.comments) return { comments: [optimisticComment] };

        if (parentCommentId) {
          // For replies, find the parent comment and add the optimistic reply to its replies array
          const updatedComments = old.comments.map((comment: any) => {
            if (comment._id === parentCommentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), optimisticComment],
              };
            }
            return comment;
          });
          return { ...old, comments: updatedComments };
        } else {
          // For top-level comments
          return {
            ...old,
            comments: [optimisticComment, ...old.comments],
          };
        }
      });

      return { previousData };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousData) {
        queryClient.setQueryData(["comments", postId], ctx.previousData);
      }
    },

    onSuccess: () => {
      // Invalidate the main comments query to refetch and display nested replies correctly
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      if (onCommentCreated) {
        onCommentCreated();
      }
    },
  });

  const handleSave = () => {
    if (!comment.trim()) return;
    mutate({ postId, content: comment, parentCommentId });
    setComment("");
  };

  return (
    <div className="mx-2 my-4 mt-2 flex gap-2">
      <CustomTextarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="bg-gray-300 text-sm text-black ring-2 ring-gray-600 dark:bg-gray-900 dark:text-white"
        disabled={isPending}
        rows={1}
      />
      <Button size="sm" className="text-black" onClick={handleSave} disabled={isPending}>
        <SendHorizonal />
      </Button>
    </div>
  );
}
