import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Post } from "@/types/post";
import { uploadMediaFiles } from "@/stores/editorStore";
export type AllPosts = {
  success: boolean;
  posts: Post[];
  nextCursor: string | null;
  sort?: string;
  limit?: number;
}
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
import {  deleteComment, updateComment } from "./posts.api";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { clearEditorState } = useEditorStore();

  return useMutation({
    mutationFn: async (payload: CreatePostPayload) => {
      const res = await axios.post("/posts/create-post", payload);
      return res.data.data; // actual created post
    },

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["fetch-posts"] });

      const previousData = queryClient.getQueryData<InfiniteData<AllPosts>>(["fetch-posts"]);

      const optimisticPost: Post = {
        ...newPost,
        _id: "temp-id-" + Date.now(),
        createdAt: new Date().toISOString(),
        likeCount: 0,
        isLiked: false,
        isBookmarked: false,
        userId: {
          slug: "",
          name: "",
          avatar: ""
        },
          communityId: newPost.communityId
    ? {
        slug: "",
        name: "",
        avatar: "",
      }
    : null,
      };

      queryClient.setQueryData<InfiniteData<AllPosts>>(["fetch-posts"], (old) => {
        if (!old) return old;
console.log("old ",old)
        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              posts: [optimisticPost, ...old.pages?.[0]?.posts ?? []],
            },
            ...old.pages.slice(1),
          ],
        };
      });

      return { previousData };
    },

    onError: (_err, _newPost, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["fetch-posts"], context.previousData);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
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






export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,  

    // 👇 Optimistic Update
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const previousComments = queryClient.getQueryData<any>(["comments"]);

      queryClient.setQueryData(["comments"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          comments: oldData.comments.map((c: any) =>
            c._id === commentId ? { ...c, content } : c
          ),
        };
      });

      return { previousComments };
    },

    // 👇 Rollback on error
    onError: (err, _vars, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments"], context.previousComments);
      }
    },

    // 👇 Refetch on success
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};


export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),

    onSuccess: (_data, commentId, _context) => {
      // Invalidate the comments cache for any matching post
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};