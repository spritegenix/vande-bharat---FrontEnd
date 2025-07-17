// components/ReplyCard.tsx

"use client";

import { useState } from "react";
import { useFetchReplies } from "@/queries/community/community.queries";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommentCard } from "./CommentCard";
import { CustomTextarea } from "@/components/CustomTextArea";

interface Props {
  discussionSlug: string;
}

export function ReplyCard({ discussionSlug }: Props) {
  const [showReplies, setShowReplies] = useState(false);
  const [input, setInput] = useState("");

  const { data: replies, isFetching, refetch, isFetched } = useFetchReplies(discussionSlug);

  const toggleReplies = async () => {
    if (!showReplies && !isFetched) {
      await refetch();
    }
    setShowReplies((prev) => !prev);
  };

  return (
    <div className="mt-4 border-t pt-4">
      {/* Always show text area */}
      <div className="mb-4">
        <CustomTextarea
          placeholder="Write your reply..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="mt-2" size="sm">
          Post Reply
        </Button>
      </div>

      {/* Toggle button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleReplies}
        className="mb-2 text-xs text-muted-foreground"
      >
        {isFetching ? "Loading..." : showReplies ? "Hide Replies" : "View Replies"}
      </Button>

      {/* Reply list */}
      {showReplies && replies && (
        <div className="space-y-4">
          {replies.length === 0 ? (
            <p className="text-sm italic text-muted-foreground">No replies yet.</p>
          ) : (
            replies.map((comment) => <CommentCard key={comment._id} comment={comment} />)
          )}
        </div>
      )}
    </div>
  );
}
