import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCommuntiy,
  createDiscussion,
  deleteCommunity,
  joinCommunity,
  joinPrivateCommunity,
  leaveCommunity,
  removeMember,
  respondToJoinRequest,
  toggleAdmin,
  updateCommunityInfo,
} from "./community.api";
import { CommunityDiscussionType, communityPost, updateCommunityInfoType } from "@/types/community";
import { toast } from "sonner";
import { useAuthAxios } from "@/lib/axios";
import { CommunityFormValues } from "@/app/(Main)/community/create/page";

export const useCreateCommunity = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CommunityFormValues) => createCommuntiy(payload, axios),
    onSuccess: () => {
      toast.success("Community post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-discussions"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create post: " + (error?.response?.data?.message || error.message));
    },
  });
};

export const useCreateDiscussion = (communitySlug: string) => {
  const axios = useAuthAxios();
  return useMutation({
    mutationFn: (payload: CommunityDiscussionType) =>
      createDiscussion(axios, { communitySlug, payload }),
    onSuccess: () => {
      toast.success("Discussion Created");
    },
    onError: (error: any) => {
      toast.error(
        "Failed to create Discussion" + (error?.response?.data?.message || error.message),
      );
    },
  });
};

export const useUpdateCommunity = (communitySlug: string) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: updateCommunityInfoType) =>
      updateCommunityInfo(axios, { communitySlug, payload }),
    onSuccess: () => {
      toast.success("Community post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-about"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create post: " + (error?.response?.data?.message || error.message));
    },
  });
};

export const useJoinCommunity = (communitySlug: string) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => joinCommunity(axios, communitySlug),
    onSuccess: () => {
      toast.success("Joined Community successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-about"] });
      queryClient.invalidateQueries({ queryKey: ["community-members"] });
      queryClient.invalidateQueries({ queryKey: ["community-suggestions"] });
    },
    onError: (error: any) => {
      toast.error("Failed to join Community: " + (error?.response?.data?.message || error.message));
    },
  });
};

export const useLeaveCommunity = (communitySlug: string) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => leaveCommunity(axios, communitySlug),
    onSuccess: () => {
      toast.error("Left Community successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-about"] });
      queryClient.invalidateQueries({ queryKey: ["community-members"] });
    },
    onError: (error: any) => {
      toast.error(
        "Failed to leave Community: " + (error?.response?.data?.message || error.message),
      );
    },
  });
};

export const useDeleteCommunity = (communitySlug: string) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCommunity(axios, communitySlug),
    onSuccess: () => {
      toast.error("Community Deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-communities"] });
    },
    onError: (error: any) => {
      toast.error(
        "Failed to delete Community: " + (error?.response?.data?.message || error.message),
      );
    },
  });
};

export const useToggleAdmin = (communitySlug: string) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => toggleAdmin(axios, { communitySlug, memberId }),
    onSuccess: () => {
      toast.success("Role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-members"] });
    },
    onError: (error: any) => {
      toast.error("Failed to update role: " + (error?.response?.data?.message || error.message));
    },
  });
};

export const useRemoveMember = (communitySlug: string) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => removeMember(axios, { communitySlug, memberId }),
    onSuccess: () => {
      toast.success("Member removed successfully!");
      queryClient.invalidateQueries({ queryKey: ["community-members"] });
      queryClient.invalidateQueries({ queryKey: ["community-about"] });
    },
    onError: (error: any) => {
      toast.error("Failed to remove member: " + (error?.response?.data?.message || error.message));
    },
  });
};

export const useJoinPrivateCommunity = ({
  onSuccess,
  slug,
}: {
  onSuccess?: (data: any) => void;
  slug: string;
}) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => joinPrivateCommunity(axios, { communitySlug: slug }),
    onSuccess: (data) => {
      toast.success("Joined Community Request Sent!");
      queryClient.invalidateQueries({ queryKey: ["community-about"] });
      queryClient.invalidateQueries({ queryKey: ["community-suggestions"] });
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      toast.error(
        "Failed to send Community Request: " + (error?.response?.data?.message || error.message),
      );
    },
  });
};
type RespondToJoinRequestType = {
  fromUserId: string;
  action: "ACCEPTED" | "REJECTED";
};
export const useRespondtoJoinRequest = (communitySlug: string) => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (response: RespondToJoinRequestType) =>
      respondToJoinRequest(axios, {
        communitySlug,
        fromUserId: response.fromUserId,
        action: response.action,
      }),
    onSuccess: () => {
      toast.success("Responded to Join Request!");
      queryClient.invalidateQueries({ queryKey: ["community-join-requests"] });
      queryClient.invalidateQueries({ queryKey: ["community-members"] });
      queryClient.invalidateQueries({ queryKey: ["community-about"] });
    },
    onError: (error: any) => {
      toast.error(
        "Failed to respond to Join Request: " + (error?.response?.data?.message || error.message),
      );
    },
  });
};
