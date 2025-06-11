import { useMutation } from "@tanstack/react-query"
import { createCommuntiy } from "./community.api"
import { communityPost } from "@/types/community"
import { toast } from "sonner"


export const useCreateCommunityPosts = ()=> {
    return useMutation({
        mutationFn:(payload:communityPost)=> createCommuntiy(payload),
         onSuccess: () => {
      toast.success("Community post created successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to create post: " + (error?.response?.data?.message || error.message));
    },
    })
}