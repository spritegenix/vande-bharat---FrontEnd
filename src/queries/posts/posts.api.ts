import { AxiosInstance } from "axios";
import { CreatePostPayload, Post } from "@/types/post";
import { useAuthAxios } from "@/lib/axios";

export const createPost = async (axios: AxiosInstance, payload: CreatePostPayload) => {
  const response = await axios.post("/posts/create-post", payload);
  return response.data;
};

export const updatePost = async (
  axios: AxiosInstance,
  postId: string,
  payload: CreatePostPayload,
) => {
  const response = await axios.patch(`/posts/${postId}`, payload);
  return response.data;
};
export type AllPosts = {
  success: boolean;
  data: Post[];
  nextCursor: string | null;
  sort?: string;
  limit?: number;
};

// posts.api.ts
export const fetchPosts = async (
  pageParam: string | null,
  axios: AxiosInstance
) => {
  const response = await axios.get("/posts/all-posts", {
    params: {
      isLiked: true,
      isBookmarked: true,
      cursor: pageParam,
      limit: 3,
    },
    withCredentials: true,
  });

  return {
    posts: response.data.data,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};

// posts.api.ts
export const fetchPopularPosts = async (
  axios: AxiosInstance,
  pageParam: string | null = null
) => {
  const response = await axios.get("/posts/all-posts", {
    params: {
      isLiked: true,
      isBookmarked: true,
      sort: "popular",
      cursor: pageParam,
      limit: 3,
    },
    withCredentials: true,
  });

  return {
    posts: response.data.data,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};


export const userPosts = async (
  axios: AxiosInstance,
  { pageParam = null, slug }: { pageParam?: string | null; slug: string },
) => {
  const response = await axios.get(`/posts/my-posts/${slug}`, {
    params: {
      cursor: pageParam,
      limit: 3,
    },
  });

  return {
    posts: response.data.data,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};

export const fetchBookmarkedPosts = async (
 axios: AxiosInstance,
  pageParam: string | null = null
) => {
  const response = await axios.get("/posts/bookmarks/my-bookmarks", {
    params: {
      isLiked: true,
      isBookmarked: true,
      cursor: pageParam,
      limit: 3,
    },
  });

  return {
    posts: response.data.bookmarks,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};

export const updateComment = async (
  axios: AxiosInstance,
  { commentId, content }: { commentId: string; content: string },
) => {
  const res = await axios.patch(`/posts/comments/${commentId}`, { content });
  return res.data.data;
};

export const createComment = async (
  axios: AxiosInstance,
  { postId, content }: { postId: string; content: string },
) => {
  const res = await axios.post(`/posts/${postId}/comments/create-comment`, {
    content,
  });
  return res.data;
};

export const deleteComment = async (axios: AxiosInstance, commentId: string) => {
  const res = await axios.delete(`/posts/comments/${commentId}`);
  return res.data;
};

export const getPostById = async (axios: AxiosInstance, postId: string) => {
  const res = await axios.get(`/posts/${postId}`, {
    params: {
      isLiked: true,
      isBookmarked: true,
    },
  });
  return res.data.data;
};

export const deletePost = async (axios: AxiosInstance, postId: string) => {
  const response = await axios.delete(`/posts/${postId}`);
  return response.data.data;
};

export const toggleBookmarkAPI = async (axios: AxiosInstance, postId: string) => {
  const response = await axios.post("/posts/bookmarks/toggle", { postId });
  return response.data;
};

export const fetchComments = async (axios: AxiosInstance, postId: string) => {
  const res = await axios.get(`/posts/${postId}/comments`);
  return res.data.data || [];
};

export const toggleLikeAPI = async (axios: AxiosInstance, postId: string) => {
  const response = await axios.post("/posts/likes/toggle", { postId });
  return response.data;
};