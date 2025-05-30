// api/posts.api.ts

import axios from "@/lib/axios";
import { CreatePostPayload } from "@/types/post";

// POST /api/v1/posts/create-post
export const createPost = async (payload: CreatePostPayload) => {
  const response = await axios.post("/posts/create-post", payload, { withCredentials: true });
  return response.data;
};

// GET /api/v1/posts
export const fetchPosts = async () => {
  const response = await axios.get("/posts/all-posts", {
    params: {
      isLiked: true,
      isBookmarked: true,
    },
    withCredentials: true,
  });
  return response.data.data;
};

export const userPosts = async () => {
  const response = await axios.get("/posts/my-posts", { withCredentials: true });
  return response.data.data;
};

//bookmark posts
export const fetchBookmarkedPosts = async () => {
  const response = await axios.get("/posts/bookmarks/my-bookmarks", {
    params: { isLiked: true, isBookmarked: true },
    withCredentials: true,
  });
  return response.data.bookmarks;
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