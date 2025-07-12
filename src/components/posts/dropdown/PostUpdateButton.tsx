"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Post } from "@/types/post";
import { useDeletePost } from "@/queries/posts/posts.mutation";
import { ConfirmDeleteDialog } from "@/components/common/ConfirmDeleteModal";

export default function PostUpdateButton({
  setEditingPostId,
  post,
}: {
  setEditingPostId: React.Dispatch<React.SetStateAction<string | null>>;
  post: Post;
}) {
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (postId: string) => {
    deletePost(postId, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
        setDialogOpen(false);
      },
      onError: (error) => {
        console.error("Error deleting post:", error);
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => setEditingPostId(post._id)}>
            Edit
          </DropdownMenuItem>

          {/* Trigger Delete Dialog from here */}
          <ConfirmDeleteDialog
            onConfirm={() => handleDelete(post._id)}
            loading={isDeleting}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            trigger={
              <DropdownMenuItem className="text-red-500">
                Delete
              </DropdownMenuItem>
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
