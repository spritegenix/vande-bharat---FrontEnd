// api/posts.api.ts

import axios from "@/lib/axios";
import { CreatePostPayload, Post } from "@/types/post";
import { li } from "framer-motion/m";

// POST /api/v1/posts/create-post
export const createPost = async (payload: CreatePostPayload) => {
  const response = await axios.post("/posts/create-post", payload, { withCredentials: true });
  return response.data;
};
export type AllPosts = {
  success: boolean;
  data: Post[];
  nextCursor: string | null;
  sort?: string;
  limit?: number;
}
// GET /api/v1/posts
export const fetchPosts = async({ pageParam = null }: { pageParam?: string | null })  => {
  const response = await axios.get<AllPosts>("/posts/all-posts", {
    params: {
      isLiked:true,
      isBookmarked:true,
      cursor:pageParam,
  limit: 3   
    },
    withCredentials: true,
  });
  return {
    posts: response.data.data,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};

export const userPosts = async ({ pageParam = null, slug }: { pageParam?: string | null; slug:string }) => {
  const response = await axios.get(`/posts/my-posts/${slug}`, { withCredentials: true, params:{
    cursor: pageParam,
    limit: 3
  } });
  return {
    posts: response.data.data,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};

//bookmark posts
export const fetchBookmarkedPosts = async ({ pageParam = null }: { pageParam?: string | null }) => {
  const response = await axios.get("/posts/bookmarks/my-bookmarks", {
    params: { isLiked: true, isBookmarked: true,cursor:pageParam, limit: 3 },
    withCredentials: true,
  });
   return {
    posts: response.data.bookmarks,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};

interface UpdateCommentPayload {
  commentId: string;
  content: string;
}
export const updateComment = async ({ commentId, content }: UpdateCommentPayload) => {
  const res = await axios.patch(
    `/posts/comments/${commentId}`,
    { content },
    { withCredentials: true },
  );
  return res.data.data;
};

export const createComment = async ({ postId, content }: { postId: string; content: string }) => {
  const res = await axios.post(`/posts/${postId}/comments/create-comment`, {
    content,
  }, { withCredentials: true });
  return res.data;
};


export const deleteComment = async (commentId: string) => {
  const res = await axios.delete(`/posts/comments/${commentId}`);
  return res.data;
};



export async function getPostById(postId: string) {
  const res = await axios.get(`/posts/${postId}`, {params: {isLiked:true,isBookmarked: true}, withCredentials:true });
  return res.data.data
}


export const fetchPopularPosts = async({ pageParam = null }: { pageParam?: string | null })  => {
  const response = await axios.get<AllPosts>("/posts/all-posts", {
    params: {
      isLiked:true,
      isBookmarked:true,
      sort:"popular",
      cursor:pageParam,
  limit: 3   
    },
    withCredentials: true,
  });
  return {
    posts: response.data.data,
    nextCursor: response.data.nextCursor ?? undefined,
  };
};