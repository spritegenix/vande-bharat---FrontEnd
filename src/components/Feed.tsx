"use client";
import React from "react";
import Box from "./elements/Box";

import Editor from "./Editor";
import { useCurrentUser } from "@/queries/user/user.queries";
import LoadingSpinner from "./common/LoadingSpinner";
import UserAvatar from "./common/UserAvatar";

export default function Feed() {
  const { data: user, isError, isLoading } = useCurrentUser();
  if (isError) return <p>Error loading user.</p>;
  if (isLoading) return <LoadingSpinner />;
  return (
    <Box className="m-2 px-3 pb-3 pt-2 md:mx-auto">
      <div className="flex gap-x-4">
        <UserAvatar avatar={user?.avatar} />
        <Editor />
      </div>
    </Box>
  );
}
