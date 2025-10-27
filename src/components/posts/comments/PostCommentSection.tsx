"use client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthAxios } from "@/lib/axios";
import { useCommentStore } from "@/stores/CommentStore";
import CommentItem from "./commentToggle";
import CreateComment from "./CreateComment";
import { fetchComments } from "@/queries/posts/posts.api";

interface PostCommentSectionProps {
  postId: string;
}
interface UserInfo {
  _id: string;
  slug: string;
  name: string;
  avatar: string;
}
interface Comment {
  _id: string;
  userId: UserInfo;
  content: string;
  createdAt: string;
  replies: Comment[]; // Add replies array for nested comments
}

export const PostCommentSection = ({ postId }: PostCommentSectionProps) => {
  const { open, commentId } = useCommentStore();
  const axios = useAuthAxios();
  const isOpen = open === postId;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", commentId],
    queryFn: () => fetchComments(axios, commentId),
    enabled: isOpen, // only fetch when open
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
              <CreateComment postId={postId} />
              {isLoading && <p>Loading comments...</p>}
              {isError && <p>Failed to load comments.</p>}

              {!isLoading &&
                !isError &&
                comments?.map((c: Comment) => (
                  <CommentItem c={c} key={c._id} postId={postId} depth={0} />
                  // <div key={c._id} className="mb-4 flex items-start gap-3">
                  //   {/* Avatar */}
                  //   <Link href={`/${c.userId.slug}`}>
                  //     <Avatar className="h-10 w-10">
                  //       <AvatarImage src={c?.userId?.avatar} />
                  //       <AvatarFallback>
                  //         <Image
                  //           src="/images/profile/profileplaceholder.jpg"
                  //           alt="fallback"
                  //           height={40}
                  //           width={40}
                  //           className="rounded-full"
                  //         />
                  //       </AvatarFallback>
                  //     </Avatar>
                  //   </Link>

                  //   {/* Comment Bubble */}
                  //   <div className="flex-1">
                  //     <div className="w-fit max-w-full rounded-xl bg-muted px-4 py-2 shadow-sm dark:bg-gray-900">
                  //       <Link
                  //         href={`/${c.userId.slug}`}
                  //         className="text-sm font-semibold text-primary hover:underline"
                  //       >
                  //         {c.userId.name}
                  //       </Link>
                  //       <p className="mt-1 text-sm text-foreground">{c.content}</p>
                  //     </div>

                  //     <p className="mt-1 pl-1 text-xs text-muted-foreground">
                  //       {formatPublishedDate(c.createdAt)}
                  //     </p>
                  //   </div>
                  // </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
