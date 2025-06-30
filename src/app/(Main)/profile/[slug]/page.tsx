"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CoverImage from "@/components/profile/CoverImage";
import ProfileCategory from "@/components/profile/ProfileCategory";
import { useCurrentUser, useUserById } from "@/queries/user/user.queries";
import { useUserStore } from "@/stores/userStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function IndividualProfilePage() {
  const params = useParams();
  const usersSlug = params.slug as string;

  // const { data, isLoading, isError } = useCurrentUser({ fields: "banner,name,avatar,slug" });
  const { data: user, isLoading, isError } = useUserById(usersSlug);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Failed to load user.</p>;
  return (
    <div>
      <CoverImage
        coverImage={user?.banner}
        profileImage={user?.avatar}
        name={user?.name}
        followStatus={user?.followStatus}
      />
      <ProfileCategory slug={usersSlug} />
    </div>
  );
}
