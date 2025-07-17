import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommuntiy, createDiscussion } from "./community.api";
import { CommunityDiscussionType, communityPost } from "@/types/community";
import { toast } from "sonner";
import { useAuthAxios } from "@/lib/axios";

export const useCreateCommunityPosts = () => {
  const axios = useAuthAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: communityPost) => createCommuntiy(payload, axios),
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
