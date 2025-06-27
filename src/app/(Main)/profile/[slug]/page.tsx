"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CoverImage from "@/components/profile/CoverImage";
import ProfileCategory from "@/components/profile/ProfileCategory";
import { fetchFollowingProfiles } from "@/queries/user/user.api";
import { useCurrentUser } from "@/queries/user/user.queries";
import { useUserStore } from "@/stores/userStore";
import React, { useEffect } from "react";

export default function IndividualProfilePage() {
  const { data: user, isLoading, isError } = useCurrentUser({ fields: "banner,name,avatar,slug" });
  // const { setUser } = useUserStore();
  // useEffect(() => {
  //   if (user) {
  //     setUser(user);
  //   }
  // }, [user]);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Failed to load user.</p>;
  // fetchFollowingProfiles();
  return (
    <div>
      <CoverImage coverImage={user?.banner} profileImage={user?.avatar} name={user?.name} />
      <ProfileCategory />
    </div>
  );
}
