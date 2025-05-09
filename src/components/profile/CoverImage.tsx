// components/ProfileHeader.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import ProfileNameSection from "./ProfileNameSection";
import { Camera } from "lucide-react";
export interface ProfileHeaderProps {
  coverImage?: string;
  profileImage?: string;
  name: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ coverImage, profileImage, name }) => {
  return (
    <div className="relative w-full pb-56 md:pb-36 lg:pb-24">
      {/* Cover Image */}
      <div className="relative h-[150px] w-full md:h-[350px] lg:h-[400px]">
        <Image
          src={coverImage || "/images/profile/coverplaceholder.jpg"}
          alt="Cover"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute bottom-0 right-0 z-20 m-5">
          <Button className="bg-offwhite text-gray-900">
            <Camera />
            <span className="hidden md:flex">Add cover photo</span>
          </Button>
        </div>
      </div>

      <ProfileNameSection
        profileImage={profileImage || "/images/profile/profileplaceholder.jpg"}
        name={name}
      />
    </div>
  );
};

export default ProfileHeader;
