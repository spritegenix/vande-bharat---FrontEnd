"use client";
import CoverImage from "@/components/profile/CoverImage";
import ProfileCategory from "@/components/profile/ProfileCategory";
import { useCurrentUser } from "@/queries/user/user.queries";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

export default function IndividualProfilePage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load user.</p>;

  return (
    <div>
      <CoverImage
        coverImage={"/images/profile/profile-cover.jpg"}
        profileImage={"/images/profile/profile-img.webp"}
        name={user?.firstName}
      />
      <ProfileCategory />
    </div>
  );
}
