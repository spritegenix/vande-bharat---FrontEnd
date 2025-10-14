import { AxiosInstance } from "axios";

export const getMarketplaceItems = async (axios: AxiosInstance, pageParam: string | null) => {
  const response = await axios.get("/marketplace/products", {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });

  return response.data;
};

export const createMarketplaceItem = async (axios: AxiosInstance, itemData: any) => {
  const response = await axios.post("/marketplace/product/create", itemData);
  return response.data;
};

export const getMarketplaceItem = async (axios: AxiosInstance, itemSlug: string) => {
  const response = await axios.get(`/marketplace/product/${itemSlug}`);
  return response.data;
};

export const updateMarketplaceItem = async (
  axios: AxiosInstance,
  itemSlug: string,
  updateData: any,
) => {
  const response = await axios.patch(`/marketplace/product/${itemSlug}`, updateData);
  return response.data;
};

export const deleteMarketplaceItem = async (axios: AxiosInstance, itemSlug: string) => {
  const response = await axios.patch(`/marketplace/product/${itemSlug}/delete`);
  return response.data;
};

export const getMyMarketplaceItems = async (axios: AxiosInstance, pageParam: string | null) => {
  const response = await axios.get("/marketplace/mylistings", {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });
  return response.data;
};

export const getMarketplaceCategories = async (axios: AxiosInstance) => {
  const response = await axios.get("/marketplace-categories/all-categories");
  return response.data;
};
