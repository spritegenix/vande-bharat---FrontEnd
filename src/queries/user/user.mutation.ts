import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptFollowRequest,
  cancelRequest,
  getPresignedUrl,
  removeSuggestion,
  sendFollowRequest,
  unfriendUser,
  updateUserCover,
  updateUserProfile,
  uploadToS3,
} from "./user.api";
import { toast } from "sonner";
import { User } from "@/types/user";
import { useAuthAxios } from "@/lib/axios";

export const useUpdateProfile = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: User) => updateUserProfile(axios, payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-by-id"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    },
  });
};

export const useSendRequest = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toUserId }: { toUserId: string }) =>
      sendFollowRequest(axios, toUserId),
    onSuccess: () => {
      toast.success("Friend request sent");
      queryClient.invalidateQueries({ queryKey: ["fetch-posts"] });
      queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarked-posts"] });
      queryClient.invalidateQueries({ queryKey: ["allSent-requests"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to send request");
    },
  });
};

export const useCancelRequest = () => {
  const axios = useAuthAxios();

  return useMutation({
    mutationFn: ({ toUserId }: { toUserId: string }) =>
      cancelRequest(axios, toUserId),
  });
};

export const useRemoveSuggestion = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toUserId }: { toUserId: string }) =>
      removeSuggestion(axios, toUserId),
    onSuccess: () => {
      toast.error(`Removed from suggestions.`);
      queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to remove suggestion");
    },
  });
};

export const useAcceptRequest = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toUserId }: { toUserId: string }) =>
      acceptFollowRequest(axios, toUserId),
    onSuccess: () => {
      toast.success("Request accepted successfully");
      queryClient.invalidateQueries({ queryKey: ["recieved-requests"] });
    },
    onError: () => {
      toast.error("Failed to accept request");
    },
  });
};

export const useRejectRecievedRequest = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fromUserId }: { fromUserId: string }) =>
      removeSuggestion(axios, fromUserId),
    onSuccess: () => {
      toast.error(`Removed from requests.`);
      queryClient.invalidateQueries({ queryKey: ["recieved-requests"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to remove request");
    },
  });
};

export const useUnfriend = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toUserId }: { toUserId: string }) =>
      unfriendUser(axios, toUserId),
    onSuccess: () => {
      toast.error("Unfriended successfully.");
      queryClient.invalidateQueries({ queryKey: ["following-Users"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarked-posts"] });
      queryClient.invalidateQueries({ queryKey: ["fetch-posts"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to unfriend user");
    },
  });
};


