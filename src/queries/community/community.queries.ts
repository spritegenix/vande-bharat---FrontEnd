//community/

import { useAuthAxios } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCommunityPosts } from "./community.api";

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
