import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { CreatePostPayload } from "@/types/post";
import { createPost, fetchBookmarkedPosts, fetchPopularPosts, fetchPosts, userPosts } from "./posts.api";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
  });
};

export const useFetchPosts = () => {
  return useInfiniteQuery({
    queryKey: ['fetch-posts'],
    queryFn: fetchPosts,
     getNextPageParam: (lastPage) => {
     
      return lastPage?.nextCursor ?? undefined;
    },
    initialPageParam: null,
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


export const useFetchBookmarkedPosts = ()=> {
  return useQuery({
    queryKey:['bookmarked-posts'],
    queryFn: fetchBookmarkedPosts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}

export const useFetchPopularPosts = () => {
  return useInfiniteQuery({
    queryKey: ['fetch-popularPosts'],
    queryFn: fetchPopularPosts,
     getNextPageParam: (lastPage) => {
     
      return lastPage?.nextCursor ?? undefined;
    },
    initialPageParam: null,
  });
};