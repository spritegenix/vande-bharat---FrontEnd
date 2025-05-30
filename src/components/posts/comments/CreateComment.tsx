import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomTextarea } from "@/components/CustomTextArea";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { useCommentStore } from "@/stores/CommentStore";
import { useState } from "react";
import { nanoid } from "nanoid"; // for temporary ID
import { createComment } from "@/queries/posts/posts.api";
import { useUserStore } from "@/stores/userStore";

export default function CreateComment() {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { commentId: postId } = useCommentStore(); // active postId
  const { user } = useUserStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,

    // ✅ Optimistic Update
    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });

      const previousData = queryClient.getQueryData<any>(["comments", postId]);

      const optimisticComment = {
        _id: `temp-${nanoid()}`,
        content,
        createdAt: new Date().toISOString(),
        userId: user,
      };

      queryClient.setQueryData(["comments", postId], (old: any) => {
        if (!old?.comments) return { comments: [optimisticComment] };
        return {
          ...old,
          comments: [optimisticComment, ...old.comments],
        };
      });

      return { previousData };
    },

    // ❌ Rollback on error
    onError: (err, _newComment, ctx) => {
      if (ctx?.previousData) {
        queryClient.setQueryData(["comments", postId], ctx.previousData);
      }
    },

    // ✅ Refetch real data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleSave = () => {
    if (!postId || !comment.trim()) return;
    mutate({ postId, content: comment });
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
