import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { CreatePostPayload } from "@/types/post";
import { createPost, fetchBookmarkedPosts, fetchPosts, userPosts } from "./posts.api";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
  });
};

export const useFetchPosts = () => {
  return useInfiniteQuery({
    queryKey: ['fetch-posts'],
    queryFn: fetchPosts,
  initialPageParam:null,
  getNextPageParam:(lastPage)=>{
    return lastPage?.nextCursor?? undefined
  }
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