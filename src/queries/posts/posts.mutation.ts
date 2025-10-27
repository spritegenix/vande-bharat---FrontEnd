import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMediaFiles, useEditorStore } from "@/stores/editorStore";
import { useAuthAxios } from "@/lib/axios";
import { CreatePostPayload, Post } from "@/types/post";
import {
  updateComment as updateCommentAPI,
  deleteComment as deleteCommentAPI,
  createPost as createPostAPI,
  deletePost as deletePostAPI,
  updatePost as updatePostAPI,
} from "@/queries/posts/posts.api";
import { toast } from "sonner";

export type AllPosts = {
  success: boolean;
  posts: Post[];
  nextCursor: string | null;
  sort?: string;
  limit?: number;
};
interface UpdateCommentPayload {
  commentId: string;
  content: string;
}
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();

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
      const uploaded = await uploadMediaFiles(axios, newFiles);
      const finalAttachments = [...existingAttachments, ...uploaded];
      const payload = { content: newText, attachments: finalAttachments };

      await updatePostAPI(axios, postId, payload);
      return { postId, updated: payload };
    },
    onMutate: async ({ postId, newText }) => {
      await queryClient.cancelQueries({ queryKey: ["user-posts"] });
      const previous = queryClient.getQueryData<Post[]>(["user-posts"]);
      queryClient.setQueryData<Post[]>(
        ["user-posts"],
        (old) => old?.map((p) => (p._id === postId ? { ...p, content: newText } : p)) ?? [],
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user-posts"], context.previous);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();
  const { clearEditorState } = useEditorStore();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPostAPI(axios, payload),

    onMutate: async (newPost) => {
      const previousFetchPosts = queryClient.getQueryData<InfiniteData<AllPosts>>(["fetch-posts"]);
      const previousCommunityPosts = queryClient.getQueryData<InfiniteData<AllPosts>>([
        "community-posts",
      ]);

      const optimisticPost: Post = {
        ...newPost,
        _id: "temp-id-" + Date.now(),
        createdAt: new Date().toISOString(),
        likeCount: 0,
        isLiked: false,
        isBookmarked: false,
        userId: { _id: "", slug: "", name: "", avatar: "" },
        communitySlug: newPost?.communitySlug ? { slug: "", name: "", avatar: "" } : null,
        requestStatus: "",
      };

      // Update ["fetch-posts"]
      queryClient.setQueryData<InfiniteData<AllPosts>>(["fetch-posts"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              posts: [optimisticPost, ...(old.pages?.[0]?.posts ?? [])],
            },
            ...old.pages.slice(1),
          ],
        };
      });

      // Update ["community-posts"]
      queryClient.setQueryData<InfiniteData<AllPosts>>(["community-posts"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: [
            {
              ...old.pages[0],
              posts: [optimisticPost, ...(old.pages?.[0]?.posts ?? [])],
            },
            ...old.pages.slice(1),
          ],
        };
      });

      return { previousFetchPosts, previousCommunityPosts };
    },

    onError: (_err, _newPost, context) => {
      if (context?.previousFetchPosts) {
        queryClient.setQueryData(["fetch-posts"], context.previousFetchPosts);
      }
      if (context?.previousCommunityPosts) {
        queryClient.setQueryData(["community-posts"], context.previousCommunityPosts);
      }
      toast.error("Failed to create post.");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["community-posts"] }); // ✅ Invalidate community posts
      queryClient.invalidateQueries({ queryKey: ["fetch-posts"] });
      clearEditorState();
      toast.success("Post created successfully.");
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation({
    mutationFn: (postId: string) => deletePostAPI(axios, postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["user-posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["user-posts"]);
      queryClient.setQueryData<Post[]>(
        ["user-posts"],
        (old) => old?.filter((p) => p._id !== postId) ?? [],
      );
      return { previousPosts };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["user-posts"], context.previousPosts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation({
    mutationFn: (vars: UpdateCommentPayload) => updateCommentAPI(axios, vars),
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });
      const previousComments = queryClient.getQueryData<any>(["comments"]);
      queryClient.setQueryData(["comments"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          comments: oldData.comments.map((c: any) => (c._id === commentId ? { ...c, content } : c)),
        };
      });
      return { previousComments };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["comments"], context.previousComments);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation({
    mutationFn: (commentId: string) => deleteCommentAPI(axios, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
