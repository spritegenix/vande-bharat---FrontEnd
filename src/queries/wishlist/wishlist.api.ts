import { AxiosInstance } from "axios";

export const getWishlist = async (axios: AxiosInstance) => {
  const response = await axios.get("/wishlist");
  return response.data;
};

export const addItemToWishlist = async (axios: AxiosInstance, marketplaceItemId: string) => {
  const response = await axios.post(`/wishlist/${marketplaceItemId}`);
  return response.data;
};

export const removeItemFromWishlist = async (axios: AxiosInstance, marketplaceItemId: string) => {
  const response = await axios.delete(`/wishlist/${marketplaceItemId}`);
  return response.data;
};
