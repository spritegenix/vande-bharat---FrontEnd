import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptFollowRequest,
  cancelRequest,
  getPresignedUrl,
  removeSuggestion,
  sendFollowRequest,
  unfriendUser,
  updateUserCover,
  uploadToS3,
} from "./user.api";
import { toast } from "sonner";

export const useSendRequest = () => {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ toUserId }: { toUserId: string }) => {
      return sendFollowRequest(toUserId);
    },
     
        onSuccess: () => {
        
          toast.success("Friend request sent");
          queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
          queryClient.invalidateQueries({ queryKey: ["allSent-requests"] });
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to send request");
        },
      
  });
};

export const useCancelRequest = () => {
  return useMutation({
    mutationFn: async ({ toUserId }: { toUserId: string }) => {
      return cancelRequest(toUserId);
    },
  });
};

export const useRemoveSuggestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ toUserId }: { toUserId: string }) => {
      return removeSuggestion(toUserId);
    },

    onSuccess: () => {
      toast.error(`Removed from suggestions.`);
      queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to remove suggested");
    },
  });
};

export const useAcceptRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ toUserId }: { toUserId: string }) => {
      return acceptFollowRequest(toUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recieved-requests"] });
      toast.success("Request accepted successfully");
    },
    onError: () => {
      toast.error("Failed to accept request");
    },
  });
};

export const useRejectRecievedRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ fromUserId }: { fromUserId: string }) => {
      return removeSuggestion(fromUserId);
    },

    onSuccess: () => {
      toast.error(`Removed from requests.`);
      queryClient.invalidateQueries({ queryKey: ["recieved-requests"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to remove request");
    },
  });
};


export const useUnfriend = ()=> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:async({toUserId}:{toUserId:string})=>{
      return unfriendUser(toUserId)
    },
    onSuccess:()=> {
      queryClient.invalidateQueries({queryKey:["following-Users"]})
      toast.error("unfriended successfully.")
    },
    onError:(err:any)=>{
      toast.error(err?.response?.data?.message || "Failed to unfriend user");
    }
  })
}