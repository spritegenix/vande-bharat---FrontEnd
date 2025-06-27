"use client";

import React from "react";
import { useUserStore } from "@/stores/userStore";
import { redirect } from "next/navigation";
import { useSendRequest, useUnfriend } from "@/queries/user/user.mutation";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  toUserId: string;
  requestStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | null;
}

const FollowButton: React.FC<FollowButtonProps> = ({ toUserId, requestStatus }) => {
  const { user } = useUserStore();
  const { mutate: sendRequest } = useSendRequest();
  const { mutate: unfriend } = useUnfriend();

  const handleFollow = () => {
    if (!user) redirect("/login");
    sendRequest({ toUserId });
  };

  const handleUnFollow = () => {
    if (!user) redirect("/login");
    unfriend({ toUserId });
  };

  if (requestStatus === "ACCEPTED") {
    return (
      <Button variant="outline" size="sm" className="text-xs" onClick={handleUnFollow}>
        Unfollow
      </Button>
    );
  }

  if (requestStatus === "PENDING") {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        className="cursor-not-allowed bg-green-300 text-xs text-gray-800"
      >
        Request Sent
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" className="text-xs" onClick={handleFollow}>
      Follow
    </Button>
  );
};

export default FollowButton;
