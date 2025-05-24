// components/ProfileHeader.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import ProfileNameSection from "./ProfileNameSection";
import { Camera } from "lucide-react";
import CoverImage from "./main/CoverImage";
export interface ProfileHeaderProps {
  coverImage?: string;
  profileImage?: string;
  name: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ coverImage, profileImage, name }) => {
  return (
    <div className="relative w-full pb-56 md:pb-36 lg:pb-24">
      {/* Cover Image */}
      <CoverImage coverImage={coverImage} />

      <ProfileNameSection
        profileImage={profileImage || "/images/profile/profileplaceholder.jpg"}
        name={name}
      />
    </div>
  );
};

export default ProfileHeader;
