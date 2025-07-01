import { AxiosInstance } from "axios";
import { toast } from "sonner";

// ✔ Generic fetch
export const fetchCurrentUser = async (axios: AxiosInstance, query?: Record<string, any>) => {
  const res = await axios.get("/users/me", { params: query });
  return res.data.data;
};

export const fetchUserById = async (axios: AxiosInstance, slug?: string) => {
  const res = await axios.get(`/users/${slug}/single`);
  return res.data.data;
};

export const fetchSuggestions = async (axios: AxiosInstance, pageParam = "") => {
  const res = await axios.get("/users/suggestions", {
    params: { cursor: pageParam, limit: 3 },
  });
  return res.data;
};

export const getPresignedUrl = async (axios: AxiosInstance, file: File, folder: string) => {
  const mime = file.type;
  const response = await axios.post("/media/upload-url", {
    fileName: file.name,
    fileType: mime,
    folder,
  });
  return response.data.data; // { uploadUrl, fileUrl }
};

export const uploadToS3 = async (axios: AxiosInstance, uploadUrl: string, file: File | Blob) => {
  try {
    await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type },
    });
  } catch (error: any) {
    toast.error("Image upload failed. Please try again.");
    throw new Error("Failed to upload file to S3");
  }
};

export const updateUserCover = async (axios: AxiosInstance, imageUrl: string) => {
  const res = await axios.patch("/users/me", { banner: imageUrl });
  return res.data;
};

export const updateUserProfile = async (axios: AxiosInstance, payload: unknown) => {
  const res = await axios.patch("/users/me", payload);
  return res.data;
};

export const updateUserProfilePic = async (axios: AxiosInstance, imageUrl: string) => {
  const res = await axios.patch("/users/me", { avatar: imageUrl });
  return res.data;
};

export const sendFollowRequest = async (axios: AxiosInstance, id: string) => {
  const res = await axios.post(`/users/follow-request/${id}/send`);
  return res.data;
};

export const allSentRequests = async (axios: AxiosInstance, pageParam = "") => {
  const res = await axios.get("users/sent-requests", {
    params: { limit: 3, cursor: pageParam },
  });
  return res.data;
};

export const cancelRequest = async (axios: AxiosInstance, toUserId: string) => {
  const res = await axios.patch(`/users/follow-request/${toUserId}/cancel`);
  return res.data;
};

export const removeSuggestion = async (axios: AxiosInstance, toUserId: string) => {
  const res = await axios.patch(`/users/suggestions/${toUserId}/delete`);
  return res.data;
};

export const acceptFollowRequest = async (axios: AxiosInstance, fromUserId: string) => {
  const res = await axios.patch(`/users/follow-request/${fromUserId}/accept`);
  return res.data;
};

export const allFollowRequests = async (axios: AxiosInstance, pageParam = "") => {
  const res = await axios.get("/users/recieved-requests", {
    params: { limit: 3, cursor: pageParam },
  });
  return res.data;
};

export const Usersfollowers = async (axios: AxiosInstance, slug: string, pageParam = "") => {
  if (!slug) throw new Error("Slug is required for fetching followers");
  const res = await axios.get(`/users/followers/${slug}`, {
    params: { limit: 3, cursor: pageParam },
  });
  return res.data;
};

export const followingUsers = async (axios: AxiosInstance, slug: string, pageParam = "") => {
  if (!slug) throw new Error("Slug is required for fetching following users");
  const res = await axios.get(`/users/following/${slug}`, {
    params: { limit: 3, cursor: pageParam },
  });
  return res.data;
};

export const unfriendUser = async (axios: AxiosInstance, toUserId: string) => {
  const res = await axios.patch(`/users/following/${toUserId}/unfriend`);
  return res.data;
};
