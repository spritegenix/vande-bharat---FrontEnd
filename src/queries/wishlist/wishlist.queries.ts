import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthAxios } from "@/lib/axios";

export interface WishlistItem {
  _id: string;
  userId: string;
  marketplaceItemId: {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    currency?: string;
    price: number;
    attachments: { url: string; publicId: string; uploadedAt: string }[];
  };
  addedAt: string;
  isRemoved: boolean;
  removedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const useGetWishlist = () => {
  const axios = useAuthAxios();
  return useInfiniteQuery({
    queryKey: ["wishlist"],
    queryFn: async ({ pageParam = null }) => {
      const response = await axios.get("/wishlist", {
        params: { lastItemId: pageParam, limit: 10 },
      });
      return response.data.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    initialPageParam: null,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
