"use client";

import { Button } from "@/components/ui/button";

export default function ProfileFollowButton({ user, currentUser, onEditClick }: any) {
  const isOwner = currentUser?.slug === user?.slug;

  if (isOwner) {
    return (
      <div className="mt-4 flex w-full justify-center px-4 sm:px-8">
        <Button
          variant="outline"
          className="border border-gray-300 text-sm dark:border-muted dark:bg-muted dark:text-offwhite"
          onClick={onEditClick}
        >
          Edit Profile
        </Button>
      </div>
    );
  }

  if (user?.followStatus === "REJECTED") return null;

  return (
    <div className="mt-4 flex w-full justify-center px-4 sm:px-8">
      <Button className="bg-gray-800 text-sm text-white hover:bg-gray-900">
        {user?.followStatus === "PENDING"
          ? "Requested"
          : user?.followStatus === "ACCEPTED"
          ? "Following"
          : "Follow"}
      </Button>
    </div>
  );
}
