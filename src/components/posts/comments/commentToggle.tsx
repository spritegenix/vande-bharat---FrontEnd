import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPublishedDate } from "@/utils/dateSorter";
import axios from "@/lib/axios";
import { useDeleteComment, useUpdateComment } from "@/queries/posts/posts.mutation";
import { useUserStore } from "@/stores/userStore";
import { CustomTextarea } from "@/components/CustomTextArea";
import { ConfirmDeleteDialog } from "@/components/common/ConfirmDeleteModal";
interface UpdateCommentPayload {
  commentId: string;
  content: string;
}
export default function CommentItem({ c }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(c.content);
  const { mutate: updateCommentMutate, isPending } = useUpdateComment();
  const { mutate: deleteCommentMutate, isPending: isDeleting } = useDeleteComment();
  const { user } = useUserStore();
  const handleEdit = () => {
    //axios post
    updateCommentMutate({
      commentId: c._id,
      content: editValue,
    });

    setIsEditing(false);
  };

  return (
    <div className="flex items-start gap-3 border-b pb-4">
      <Link href={`/profile/${c.userId.slug}`}>
        <Avatar className="h-10 w-10">
          <AvatarImage src={c?.userId?.avatar} />
          <AvatarFallback>
            <Image
              src="/images/profile/profileplaceholder.jpg"
              alt="fallback"
              height={40}
              width={40}
              className="rounded-full"
            />
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="rounded-lg bg-gray-300 p-2 text-black dark:bg-gray-900 dark:text-white">
        <div className="flex items-center justify-between gap-x-5">
          <Link href={`/profile/${c.userId.slug}`} className="font-medium text-primary">
            {c.userId.name}
          </Link>
          {c.userId._id === user._id && (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-blue-600"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                <Pencil size={14} />
              </Button>
              <ConfirmDeleteDialog
                onConfirm={() => deleteCommentMutate(c._id)}
                loading={isDeleting}
                trigger={
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-red-600"
                    disabled={isDeleting}
                  >
                    <Trash2 size={14} />
                  </Button>
                }
              />
            </div>
          )}
        </div>

        {!isEditing ? (
          <p className="mt-1 whitespace-break-spaces text-sm">{c.content}</p>
        ) : (
          <div className="mt-2 flex gap-2">
            <CustomTextarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="bg-gray-300 text-sm text-black ring-2 ring-gray-600 dark:bg-gray-900 dark:text-white"
            />
            <Button size="sm" className="text-black" onClick={handleEdit}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}

        <p className="mt-1 text-xs text-muted-foreground">{formatPublishedDate(c.createdAt)}</p>
      </div>
    </div>
  );
}
