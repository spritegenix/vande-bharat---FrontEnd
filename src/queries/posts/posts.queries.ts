import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  createPost,
  fetchBookmarkedPosts,
  fetchPopularPosts,
  fetchPosts,
  userPosts,
} from "./posts.api";
import { CreatePostPayload } from "@/types/post";
import { useAuthAxios } from "@/lib/axios";

// Create post
export const useCreatePost = () => {
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(axios, payload),
  });
};

// All posts (infinite)
export const useFetchPosts = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["fetch-posts"],
    queryFn: ({ pageParam = null }) => fetchPosts(pageParam, axios), 
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// User-specific posts
export const useFetchUserPosts = (slug: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["user-posts", slug],
    queryFn: ({ pageParam = null }) => userPosts(axios, { slug, pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: null,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// Bookmarked posts
export const useFetchBookmarkedPosts = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["bookmarked-posts"],
    queryFn: ({ pageParam = null }) => fetchBookmarkedPosts(axios, pageParam),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// Popular posts
export const useFetchPopularPosts = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["fetch-popular-posts"],
    queryFn: ({ pageParam = null }) => fetchPopularPosts(axios,pageParam),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
