//community/

import { useAuthAxios } from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchCommunityPosts, getDiscussions, getReplies } from "./community.api";

export const useFetchCommunityPosts = (slug:string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["community-posts"],
    queryFn: ({ pageParam = null }) => fetchCommunityPosts(axios, {slug,pageParam}),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};


export const useFetchDiscussions = (communitySlug:string)=> {
  const axios = useAuthAxios()
  return useInfiniteQuery({
    queryKey:["community-discussions"],
    queryFn:({pageParam = null})=> getDiscussions(axios,{communitySlug,pageParam}),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    retry: 1,
    staleTime: 1000 * 60 * 5
  })
}
export const useFetchReplies = (discussionSlug:string)=>{
  const axios = useAuthAxios()
  return useQuery({
    queryKey:["community-replies"],
    queryFn:()=> getReplies(axios,{discussionSlug}),
    enabled:false,
    refetchOnWindowFocus:false,
    retry: 1,
    staleTime: 1000 * 60 * 5
  })
}