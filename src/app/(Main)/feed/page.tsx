"use client";
import Feed from "@/components/Feed";
import FeedsSection from "@/components/FeedsSection";
import { useFetchPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";

/**
 * The main homepage component.
 *
 * This component displays the user's feed and a section of other posts.
 * It fetches post data using the `useFetchPosts` hook and renders the `Feed` and `FeedsSection` components.
 *
 * @returns The rendered homepage.
 */
export default function HomePage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchPosts();
  const { user } = useUserStore();

  return (
    <>
      {user && <Feed user={user} />}
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
