import { Post } from "@/types/post";
import Image from "next/image";
import React, { useState } from "react";
import SinglePostModal from "../common/SinglePostModal";

export default function PostAttachment({ post }: { post: Post }) {
  const [currentIndex, setCurrentIndex] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  return (
    <>
      {" "}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mt-3 px-3">
          <div
            className={`grid gap-2 ${
              post.attachments.length === 1
                ? "grid-cols-1"
                : post.attachments.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2"
            }`}
          >
            {post.attachments.slice(0, 4).map((file, fileIndex) => (
              <div
                key={fileIndex}
                className="relative w-full cursor-pointer overflow-hidden rounded"
                onClick={() => {
                  setCurrentIndex(post._id);
                  setSelectedPostId(post._id);
                  setModalOpen(true);
                }}
              >
                {file.type === "IMAGE" ? (
                  <Image
                    src={file.url}
                    alt={`attachment-${fileIndex}`}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video src={file.url} controls className="h-full w-full rounded object-cover" />
                )}
                {fileIndex === 3 && post.attachments.length > 4 && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-xl font-bold text-white">
                    +{post.attachments.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {modalOpen && selectedPostId && (
        <SinglePostModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          postId={selectedPostId}
        />
      )}
    </>
  );
}
