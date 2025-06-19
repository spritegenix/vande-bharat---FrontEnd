import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPresignedUrl, sendFollowRequest, updateUserCover, uploadToS3 } from "./user.api";
import { toast } from "sonner";

export const useSendRequest = () => {

  return useMutation({
    mutationFn: async ({ toUserId }: { toUserId: string }) => {
          return sendFollowRequest(toUserId);
    },
  
  });
};
