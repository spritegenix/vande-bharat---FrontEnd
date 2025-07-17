// components/DiscussionCard.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserData {
  id: number;
  name: string;
  seed: string;
  time: string;
  title?: string;
  content: string;
  replies?: UserData[];
}

interface DiscussionCardProps {
  user: UserData;
  replies?: UserData[];
  showReplies: boolean;
  toggle: () => void;
}

export function DiscussionCard({ user, replies, showReplies, toggle }: DiscussionCardProps) {
  return (
    <>
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.seed}`} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="font-medium text-foreground">{user.name}</h4>
            <span className="text-xs text-muted-foreground">• {user.time}</span>
          </div>
          {user.title && <h3 className="text-base font-semibold text-foreground">{user.title}</h3>}
          <p className="text-sm text-muted-foreground">{user.content}</p>

          {replies?.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="mt-2 px-2 text-xs text-muted-foreground"
              onClick={toggle}
            >
              {showReplies ? "Hide Replies" : `View ${replies.length} Reply`}
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showReplies && replies && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="ml-6 mt-2 space-y-4 border-l border-muted pl-4"
          >
            {replies.map((reply) => (
              <DiscussionCard
                key={reply.id}
                user={reply}
                replies={reply.replies}
                showReplies={showReplies}
                toggle={toggle}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
