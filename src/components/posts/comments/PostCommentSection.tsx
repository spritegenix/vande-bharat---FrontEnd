"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useCommentStore } from "@/stores/CommentStore";
import { formatPublishedDate } from "@/utils/dateSorter";
import Link from "next/link";
import Image from "next/image";
import { a } from "framer-motion/m";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomInput } from "@/components/CustomInput";

interface PostCommentSectionProps {
  postId: string;
}

interface Comment {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
}
interface UserInfo {
  slug: string;
  name: string;
  avatar: string;
}

const fetchComments = async (postId: string) => {
  const res = await axios.get(`/posts/${postId}/comments`);
  return res.data.data || [];
};

export const PostCommentSection = ({ postId }: PostCommentSectionProps) => {
  const { open, commentId } = useCommentStore();
  const isOpen = open === postId;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", commentId],
    queryFn: () => fetchComments(commentId),
    enabled: !!open, // only fetch when open
  });
  const comments = data?.comments || [];
  return (
    <div className="">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 border-l pl-4 text-sm text-muted-foreground">
              {isLoading && <p>Loading comments...</p>}
              {isError && <p>Failed to load comments.</p>}
              {!isLoading && !isError && comments?.length === 0 && <CustomInput />}
              {!isLoading &&
                !isError &&
                comments?.map((c: Comment & { userId: UserInfo }) => (
                  <Link href={c.userId.slug} key={c._id} className="mb-2 flex border-b pb-1">
                    <div>
                      <Avatar>
                        <AvatarImage src={c?.userId?.avatar} />
                        <AvatarFallback>
                          <Image
                            src="/images/profile/profileplaceholder.jpg"
                            alt="fallback"
                            height={50}
                            width={50}
                          />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-primary">{c.userId.name}</p>
                      <p>{c.content}</p>
                      <p className="text-xs text-gray-400">{formatPublishedDate(c.createdAt)}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
