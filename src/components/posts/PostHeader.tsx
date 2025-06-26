import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { formatPublishedDate } from "@/utils/dateSorter";

import { Post } from "@/types/post";
export default function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex gap-x-2">
      <Avatar>
        <AvatarImage src={post?.userId?.avatar} />
        <AvatarFallback>
          <Image
            src="/images/profile/profileplaceholder.jpg"
            alt="fallback"
            height={50}
            width={50}
          />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm font-semibold">
        <Link href={`/profile/${post?.userId?.slug}`}>
          <p>{post?.userId?.name}</p>
        </Link>
        <p className="text-xs font-normal text-gray-500">{formatPublishedDate(post?.createdAt)}</p>
      </div>
    </div>
  );
}
