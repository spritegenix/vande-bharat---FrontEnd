"use client";
import Feed from "@/components/Feed";
import FeedsSection from "@/components/FeedsSection";
import Layout from "@/components/layout/Layout";
import { useFetchPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";
import React, { useEffect } from "react";

export default function HomePage() {
  const { data, isLoading, isError } = useFetchPosts();

  return (
    <>
      <Feed />
      <FeedsSection posts={data} isLoading={isLoading} isError={isError} />
    </>
  );
}
