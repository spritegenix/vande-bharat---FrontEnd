import { useQuery } from "@tanstack/react-query";
import { getMarketplaceItems, getMarketplaceItem } from "./marketplace.api";
import { useAuthAxios } from "@/lib/axios";

export const useGetMarketplaceItems = () => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ["marketplace-items"],
    queryFn: () => getMarketplaceItems(axios),
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
