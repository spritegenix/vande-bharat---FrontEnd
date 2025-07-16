"use client";
import React from "react";
import Box from "./elements/Box";

import Editor from "./Editor";
import UserAvatar from "./common/UserAvatar";

export default function Feed({ user, communitySlug }: { user?: any; communitySlug?: string }) {
  return (
    <>
      {user && (
        <Box className="m-2 px-3 pb-3 pt-2 md:mx-auto">
          <div className="flex gap-x-4">
            <UserAvatar avatar={user?.avatar} />
            <Editor communitySlug={communitySlug} />
          </div>
        </Box>
      )}
    </>
  );
}
