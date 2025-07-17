// components/ReplyCard.tsx

"use client";

import { useState } from "react";
import { useFetchReplies } from "@/queries/community/community.queries";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommentCard } from "./CommentCard";
import { CustomTextarea } from "@/components/CustomTextArea";
import { SendHorizonal } from "lucide-react";

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
  const handleSave = () => {
    console.log("hello");
  };
  return (
    <div className="mt-4 border-t pt-4">
      {/* Always show text area */}
      <div className="mx-2 my-4 mt-2 flex gap-2">
        <CustomTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-300 text-sm text-black ring-2 ring-gray-600 dark:bg-gray-900 dark:text-white"
          // disabled={isPending}
          rows={1}
        />
        <Button
          size="sm"
          className="text-black"
          onClick={handleSave}
          // disabled={isPending}
        >
          <SendHorizonal />
        </Button>
      </div>

      {/* Toggle button */}
      {
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleReplies}
          className="mb-2 text-xs text-muted-foreground"
        >
          {isFetching ? "Loading..." : showReplies ? "Hide Replies" : "View Replies"}
        </Button>
      }

      {/* Reply list */}
      {showReplies && replies && (
        <div className="space-y-4">
          {replies.length === 0 ? (
            <p className="text-sm italic text-muted-foreground">No replies yet.</p>
          ) : (
            replies.map((comment: any) => <CommentCard key={comment._id} comment={comment} />)
          )}
        </div>
      )}
    </div>
  );
}
