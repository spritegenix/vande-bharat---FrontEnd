import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePostPayload } from "@/types/post";
import { createPost, fetchPosts, userPosts } from "./posts.api";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
  });
};

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['fetch-posts'],
    queryFn: fetchPosts,
       staleTime: 1000 * 60 * 5, 
    retry: 1,
  });
};


export const useFetchUserPosts = () => {
  return useQuery({
    queryKey: ['user-posts'],
    queryFn: userPosts,
       staleTime: 1000 * 60 * 5, 
    retry: 1,
  });
};
