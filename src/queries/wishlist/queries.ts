import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "./wishlist.api";
import { useAuthAxios } from "@/lib/axios";

export const useGetWishlist = () => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(axios),
  });
};
