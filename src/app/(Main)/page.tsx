"use client";
import Feed from "@/components/Feed";
import FeedsSection from "@/components/FeedsSection";
import { useFetchPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";
import React from "react";
export default function HomePage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchPosts();
  const { user } = useUserStore();
  console.log("hasNextPage:", hasNextPage);
  console.log("nextCursor:", data?.pages.at(-1)?.nextCursor);

  return (
    <>
      <Feed user={user} />
      <FeedsSection
        posts={data?.pages.flatMap((page) => page.data) ?? []}
        isLoading={isLoading}
        isError={isError}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
