// components/ProfileHeader.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import ProfileNameSection from "./ProfileNameSection";
import { Camera } from "lucide-react";
import CoverImage from "./main/CoverImage";
import { useUserStore } from "@/stores/userStore";
import { useParams } from "next/navigation";
export interface ProfileHeaderProps {
  coverImage?: string;
  profileImage?: string;
  name: string;
  followStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | null;
  profileId: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverImage,
  profileImage,
  name,
  followStatus,
  profileId,
}) => {
  const { user } = useUserStore();
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="relative w-full pb-56 md:pb-36 lg:pb-24">
      {/* Cover Image */}
      <CoverImage coverImage={coverImage} canEdit={user?.slug === slug} entityType="user" />

      <ProfileNameSection
        profileImage={profileImage || "/images/profile/profileplaceholder.jpg"}
        name={name}
        canEdit={user?.slug === slug}
        followStatus={followStatus}
        profileId={profileId}
      />
    </div>
  );
};

export default ProfileHeader;
