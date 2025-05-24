// api/posts.api.ts

import axios from '@/lib/axios';
import { CreatePostPayload } from "@/types/post";

// POST /api/v1/posts/create-post
export const createPost = async (payload: CreatePostPayload) => {
  const response = await axios.post("/posts/create-post", payload, {withCredentials: true});
  return response.data;
};


// GET /api/v1/posts
export const fetchPosts = async () => {
  const response = await axios.get("/posts/all-posts", {withCredentials: true});
  return response.data.data;
};

export const userPosts = async () => {
  const response = await axios.get("/posts/my-posts", {withCredentials: true});
  return response.data.data;
};