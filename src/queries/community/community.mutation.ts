import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommuntiy, createDiscussion, joinCommunity, updateCommunityInfo } from "./community.api";
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


export const useUpdateCommunity = (communitySlug:string)=> {
  const axios = useAuthAxios()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: updateCommunityInfoType) => updateCommunityInfo(axios,{communitySlug,payload}),
    onSuccess: () => {
      toast.success("Community post created successfully!");
       queryClient.invalidateQueries({ queryKey: ["community-about"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create post: " + (error?.response?.data?.message || error.message));
    },
  })
}


export const useJoinCommunity = (communitySlug:string) => {
  const axios = useAuthAxios()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => joinCommunity(axios,communitySlug),
    onSuccess: () => {
      toast.success("Joined Community successfully!");
       queryClient.invalidateQueries({ queryKey: ["community-about"] });
    },
    onError: (error: any) => {
      toast.error("Failed to join Community: " + (error?.response?.data?.message || error.message));
    },
  })
}