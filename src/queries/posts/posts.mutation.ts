import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Post } from "@/types/post";
import { uploadMediaFiles } from "@/stores/editorStore";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      newText,
      newFiles,
      existingAttachments,
    }: {
      postId: string;
      newText: string;
      newFiles: File[];
      existingAttachments: any[];
    }) => {
      // your existing upload + patch logic
      const uploaded = await uploadMediaFiles(newFiles);
      const finalAttachments = [...existingAttachments, ...uploaded];

      const payload = {
        content: newText,
        attachments: finalAttachments,
      };

      await axios.patch(`/posts/${postId}`, payload);
      return { postId, updated: payload }; // return useful info
    },

    // ✅ Optimistic update
  onMutate: async ({ postId, newText }) => {
  await queryClient.cancelQueries({ queryKey: ['user-posts'] });

  const previous = queryClient.getQueryData<Post[]>(['user-posts']); // ✅ this stays array-based

  queryClient.setQueryData<Post[]>(['user-posts'], (old) =>
    old?.map((p) =>
      p._id === postId ? { ...p, content: newText } : p
    ) ?? []
  );

  return { previous };
},

    // ❌ Rollback on error
    onError: (err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user-posts"], context.previous);
      }
    },

    // ✅ Invalidate cache on success
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] }); // or refetch specific post
    },
  });
};









// hooks/posts/useCreatePost.ts
import { useEditorStore } from "@/stores/editorStore";
import { CreatePostPayload } from "@/types/post";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const {clearEditorState} = useEditorStore();

  return useMutation({
    mutationFn: async (payload: CreatePostPayload) => {
 
      const res = await axios.post("/posts/create-post", payload);

      return res.data.data;
    },

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["fetch-posts"] });

      const previousPosts = queryClient.getQueryData<any[]>(["fetch-posts"]);

      queryClient.setQueryData<any[]>(["fetch-posts"], (old) => [
        {
          ...newPost,
          _id: "temp-id-" + Date.now(),
          createdAt: new Date().toISOString(),
          likeCount: 0,
          userId: {}, // or your current logged-in user info
        },
        ...(old || []),
      ]);

      return { previousPosts };
    },

    onError: (_err, _newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["fetch-posts"], context.previousPosts);
      }
    },

    onSuccess: () => {
       
        queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-posts"] });
      clearEditorState();
    },
  });
};


export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axios.delete(`/posts/${postId}`);
      return response.data.data;
    },

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["user-posts"] });

      const previousPosts = queryClient.getQueryData<Post[]>(["user-posts"]);

      queryClient.setQueryData<Post[]>(["user-posts"], (old) =>
        old?.filter((p) => p._id !== postId) ?? []
      );

      return { previousPosts };
    },

    onError: (err, _vars, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["user-posts"], context.previousPosts);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
}