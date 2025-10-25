import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMarketplaceItems,
  getMarketplaceItem,
  getMyMarketplaceItems,
  getMarketplaceCategories,
} from "./marketplace.api";
import { useAuthAxios } from "@/lib/axios";

export const useGetMarketplaceItems = ({ category }: { category: string | null }) => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["marketplace-items", category],
    queryFn: ({ pageParam = null }) => getMarketplaceItems(axios, pageParam, category),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    initialPageParam: null,
  });
};

export const useGetMarketplaceItem = (itemSlug: string) => {
  const axios = useAuthAxios();
  const isEnabled = !!itemSlug;
  const queryKey = ["marketplace-item", itemSlug];
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getMarketplaceItem(axios, itemSlug),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
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
  return useInfiniteQuery({
    queryKey: ["marketplace-categories"],
    queryFn: async ({ pageParam = null }) => {
      const response = await getMarketplaceCategories(axios, pageParam, 10); // Pass pageParam and limit
      return response.data; // Assuming the controller now returns { items, nextCursor } directly
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: null,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
