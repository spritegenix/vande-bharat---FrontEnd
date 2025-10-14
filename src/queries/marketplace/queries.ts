import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMarketplaceItems,
  getMarketplaceItem,
  getMyMarketplaceItems,
  getMarketplaceCategories,
} from "./marketplace.api";
import { useAuthAxios } from "@/lib/axios";

export const useGetMarketplaceItems = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["marketplace-items"],
    queryFn: ({ pageParam = null }) => getMarketplaceItems(axios, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    initialPageParam: null,
  });
};

export const useGetMarketplaceItem = (itemSlug: string) => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ["marketplace-item", itemSlug],
    queryFn: () => getMarketplaceItem(axios, itemSlug),
    enabled: !!itemSlug,
  });
};

export const useGetMyMarketplaceItems = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["my-marketplace-items"],
    queryFn: ({ pageParam = null }) => getMyMarketplaceItems(axios, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    initialPageParam: null,
  });
};

export const useGetMarketplaceCategories = () => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ["marketplace-categories"],
    queryFn: () => getMarketplaceCategories(axios),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
