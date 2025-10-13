import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToWishlist, removeItemFromWishlist } from "./wishlist.api";
import { useAuthAxios } from "@/lib/axios";

export const useAddItemToWishlist = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: (marketplaceItemId: string) => addItemToWishlist(axios, marketplaceItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

export const useRemoveItemFromWishlist = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: (marketplaceItemId: string) => removeItemFromWishlist(axios, marketplaceItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
