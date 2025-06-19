"use client";
import Feed from "@/components/Feed";
import FeedsSection from "@/components/FeedsSection";
import { useFetchPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";
export default function HomePage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchPosts();
  const { user } = useUserStore();
  // const { getToken } = useAuth();

  // useEffect(() => {
  //   async function fetchToken() {
  //     const token = await getToken();
  //     console.log("Clerk JWT:", token);
  //   }
  //   fetchToken();
  // }, []);
  // console.log("hasNextPage:", hasNextPage);
  // console.log("nextCursor:", data?.pages.at(-1)?.nextCursor);
  // console.log(data?.pages, "pages");
  return (
    <>
      <Feed user={user} />
      <FeedsSection
        posts={data?.pages.flatMap((page) => page.posts) ?? []}
        isLoading={isLoading}
        isError={isError}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
