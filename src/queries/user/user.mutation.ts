import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelRequest, getPresignedUrl, removeSuggestion, sendFollowRequest, updateUserCover, uploadToS3 } from "./user.api";
import { toast } from "sonner";

export const useSendRequest = () => {

  return useMutation({
    mutationFn: async ({ toUserId }: { toUserId: string }) => {
          return sendFollowRequest(toUserId);
    },
  
  });
};


export const useCancelRequest = () => {
  return useMutation({
    mutationFn: async({toUserId}: {toUserId:string})=> {
      return cancelRequest(toUserId)
    }
  })
}

export const useRemoveSuggestion = () => {
  return useMutation({
    mutationFn: async({toUserId}: {toUserId:string})=> {
      return removeSuggestion(toUserId)
    }
  })
}
 

  