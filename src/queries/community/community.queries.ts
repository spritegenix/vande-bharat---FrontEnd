//community/

import { useAuthAxios } from "@/lib/axios";
import { useInfiniteQuery, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchCommunityMembers, fetchCommunityPosts, getCommunityInfo, getDiscussions, getReplies } from "./community.api";

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
interface RepliesQueryOptions extends Partial<UseQueryOptions<any, Error>> {
  enabled?: boolean;
}

export const useFetchReplies = (
  discussionSlug: string,
  options?: RepliesQueryOptions
) => {
  const axios = useAuthAxios();

  return useQuery({
    queryKey: ["community-replies", discussionSlug],
    queryFn: () => getReplies(axios, { discussionSlug }),
    enabled: options?.enabled ?? false,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useFetchCommunityMembers = (communitySlug:string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ['community-members', communitySlug],
    queryFn: ({pageParam= null}) => fetchCommunityMembers(axios, {communitySlug, pageParam}),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}


export const useFetchCommunityabout = (communitySlug:string) => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ['community-about', communitySlug],
    queryFn: () => getCommunityInfo(axios, communitySlug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}