import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMarketplaceItem,
  updateMarketplaceItem,
  deleteMarketplaceItem,
} from "./marketplace.api";
import { useAuthAxios } from "@/lib/axios";

export const useCreateMarketplaceItem = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: (itemData: any) => createMarketplaceItem(axios, itemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-items"] });
    },
  });
};

export const useUpdateMarketplaceItem = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: ({ itemSlug, updateData }: { itemSlug: string; updateData: any }) =>
      updateMarketplaceItem(axios, itemSlug, updateData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-items"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-item", variables.itemSlug] });
    },
  });
};

export const useDeleteMarketplaceItem = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: (itemSlug: string) => deleteMarketplaceItem(axios, itemSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplace-items"] });
    },
  });
};
