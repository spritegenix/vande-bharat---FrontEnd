import Feed from "@/components/Feed";
import FeedsSection from "@/components/FeedsSection";
import CoverImage from "@/components/profile/CoverImage";
import ProfileCategory from "@/components/profile/ProfileCategory";
import React from "react";

export default function IndividualProfilePage() {
  return (
    <div>
      <CoverImage
        coverImage={"/images/profile/profile-cover.jpg"}
        profileImage={"/images/profile/profile-img.webp"}
        name={"ash"}
      />
      <ProfileCategory />
      <Feed />
      <FeedsSection />
    </div>
  );
}
