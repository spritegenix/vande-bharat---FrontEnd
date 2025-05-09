import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Camera, Pencil } from "lucide-react";

export default function ProfileNameSection({
  profileImage,
  name,
}: {
  profileImage: string;
  name: string;
}) {
  return (
    <div className="absolute bottom-6 w-full md:-bottom-4 lg:-bottom-0">
      <div className="relative flex w-full flex-col items-center justify-between md:flex-row md:items-end">
        <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4">
          {/* Profile Image */}

          <div className="relative h-40 w-40 md:left-1/3 md:h-44 md:w-44 lg:left-4">
            <Image
              src={profileImage}
              alt="Profile"
              width={128}
              height={128}
              className="h-full w-full rounded-full border-4 border-white object-cover shadow-lg dark:border-black"
            />
            <div className="bg-offwhite absolute bottom-5 right-2 rounded-full p-1 dark:bg-gray-900">
              <Camera />
            </div>
          </div>

          {/* Name */}
          <div className="m-5 text-center">
            <h2 className="text-xl font-semibold text-black drop-shadow-md dark:text-white md:text-2xl">
              {name}
            </h2>
          </div>
        </div>
        <div className="md:m-5 md:mr-9">
          <Button className="bg-offwhite px-4 py-2 text-gray-900">
            <Pencil />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
