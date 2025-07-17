// components/CommentCard.tsx

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  _id: string;
  content: string;
  isDeleted: boolean;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  replies?: Comment[];
}

interface Props {
  comment: Comment;
  level?: number; // controls indentation
}

export function CommentCard({ comment, level = 0 }: Props) {
  return (
    <div className={`flex items-start gap-3 ${level > 0 ? "ml-6 border-l pl-4" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.userId.avatar} />
        <AvatarFallback>{comment.userId.name[0]}</AvatarFallback>
      </Avatar>

      <div>
        <p className="text-sm font-medium text-foreground">{comment.userId.name}</p>
        <p className="text-sm text-muted-foreground">
          {comment.isDeleted ? <em>[deleted]</em> : comment.content}
        </p>

        {comment.replies && comment?.replies?.length > 0 && (
          <div className="mt-2 space-y-4">
            {comment.replies.map((child) => (
              <CommentCard key={child._id} comment={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
