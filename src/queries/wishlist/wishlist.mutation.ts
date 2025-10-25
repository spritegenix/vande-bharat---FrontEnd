import { useAuthAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddItemToWishlist = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: async (marketplaceItemId: string) => {
      const response = await axios.post(`/wishlist/${marketplaceItemId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-items"] }); // Invalidate marketplace items to reflect wishlist status change
      toast.success("Item added to wishlist!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add item to wishlist");
    },
  });
};

export const useRemoveItemFromWishlist = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation({
    mutationFn: async (marketplaceItemId: string) => {
      const response = await axios.delete(`/wishlist/${marketplaceItemId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-items"] }); // Invalidate marketplace items to reflect wishlist status change
      toast.success("Item removed from wishlist!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to remove item from wishlist");
    },
  });
};
