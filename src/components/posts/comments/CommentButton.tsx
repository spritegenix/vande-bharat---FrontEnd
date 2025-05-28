import { Button } from "@/components/ui/button";
import { useCommentStore } from "@/stores/CommentStore";
import { MessageCircle } from "lucide-react";
import React from "react";
interface PostCommentSectionProps {
  postId: string;
}
export default function CommentButton({ postId }: PostCommentSectionProps) {
  const { open, setOpen, setCommentId } = useCommentStore();
  const isActive = open === postId;
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-1 hover:text-blue-600"
      onClick={() => {
        setOpen(isActive ? undefined : postId);
        setCommentId(postId);
      }}
    >
      <MessageCircle size={16} />
      <span className="hidden md:flex">Comment</span>
      {/* {comments?.count > 0 && (
          <span className="ml-1 text-sm text-muted-foreground">({comments.length})</span>
        )} */}
    </Button>
  );
}
