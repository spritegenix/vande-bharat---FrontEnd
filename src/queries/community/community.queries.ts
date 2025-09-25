//community/

import { useAuthAxios } from "@/lib/axios";
import { useInfiniteQuery, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  communitySuggestions,
  fetchCommunityMembers,
  fetchCommunityPosts,
  getCommunityInfo,
  getDiscussions,
  getJoinRequests,
  getReplies,
} from "./community.api";

export const useFetchCommunityPosts = (slug: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["community-posts"],
    queryFn: ({ pageParam = null }) => fetchCommunityPosts(axios, { slug, pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchDiscussions = (communitySlug: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["community-discussions"],
    queryFn: ({ pageParam = null }) => getDiscussions(axios, { communitySlug, pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
interface RepliesQueryOptions extends Partial<UseQueryOptions<any, Error>> {
  enabled?: boolean;
}

export const useFetchReplies = (discussionSlug: string, options?: RepliesQueryOptions) => {
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

export const useFetchCommunityMembers = (communitySlug: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["community-members", communitySlug],
    queryFn: ({ pageParam = null }) => fetchCommunityMembers(axios, { communitySlug, pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,

    retry: 1,
  });
};

export const useFetchCommunityabout = (communitySlug: string) => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ["community-about", communitySlug],
    queryFn: () => getCommunityInfo(axios, communitySlug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useFetchJoinRequests = (communitySlug: string) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["community-join-requests", communitySlug],
    queryFn: () => getJoinRequests(axios, communitySlug),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCommunitySuggestions = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["community-suggestions"],
    queryFn: ({ pageParam = null }) => communitySuggestions(axios, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
