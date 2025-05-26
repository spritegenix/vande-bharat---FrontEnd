"use client";
import Feed from "@/components/Feed";
import FeedsSection from "@/components/FeedsSection";
import { useFetchPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";
import React from "react";
export default function HomePage() {
  const { data, isLoading, isError } = useFetchPosts();
  const { user } = useUserStore();
  return (
    <>
      <Feed user={user} />
      <FeedsSection posts={data} isLoading={isLoading} isError={isError} />
    </>
  );
}
