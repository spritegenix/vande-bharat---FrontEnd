// components/Discussion.tsx

"use client";

import { Button } from "@/components/ui/button";

interface Discussion {
  _id: string;
  title: string;
  slug: string;
  content: string;
  commentCount: number;
}

interface Props {
  discussion: Discussion;
  onRepliesClick: (slug: string) => void;
}

export function Discussion({ discussion, onRepliesClick }: Props) {
  return (
    <div className="mb-4 rounded-lg border p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">{discussion.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{discussion.content}</p>

      {discussion.commentCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRepliesClick(discussion.slug)}
          className="mt-2 text-xs text-muted-foreground"
        >
          View {discussion.commentCount} {discussion.commentCount === 1 ? "Reply" : "Replies"}
        </Button>
      )}
    </div>
  );
}
