import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePost } from "@/queries/posts/posts.mutation";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Post } from "@/types/post";
export default function PostUpdateButton({
  setEditingPostId,
  post,
}: {
  setEditingPostId: React.Dispatch<React.SetStateAction<string | null>>;
  post: Post;
}) {
  const { mutate: deletePost } = useDeletePost();
  const handleDelete = (postId: string) => {
    deletePost(postId, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting post:", error);
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => setEditingPostId(post._id)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(post._id)} className="text-red-500">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
