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


export const useFetchUserPosts = (slug: string) => {
  return useInfiniteQuery({
    queryKey: ['user-posts', slug],
    queryFn: ({ pageParam = null }) => userPosts({ pageParam, slug }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: null,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};



export const useFetchBookmarkedPosts = ()=> {
  return useInfiniteQuery({
    queryKey:['bookmarked-posts'],
    queryFn:fetchBookmarkedPosts,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor ?? undefined;
    },
    initialPageParam:null,
    staleTime: 1000 * 60 * 5,
     retry: 1,
    refetchOnWindowFocus: false,
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
      staleTime: 1000 * 60 * 5,
     retry: 1,
     refetchOnWindowFocus: false,
  });
};