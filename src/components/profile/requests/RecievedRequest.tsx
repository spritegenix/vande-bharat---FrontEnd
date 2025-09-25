"use client";

import ReceivedRequestList from "@/components/common/ReceivedRequestList";
import SkeletonCard from "@/components/common/SkeletonCard";
import { Button } from "@/components/ui/button";
import { ImageChecker } from "@/lib/ImagesChecker";
import { useAcceptRequest, useRejectRecievedRequest } from "@/queries/user/user.mutation";
import { useFollowRequests } from "@/queries/user/user.queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";

type user = {
  name: string;
  slug: string;
  avatar: string;
};
type RecievedRequest = {
  _id: string;
  fromUser: user;
  fromUserId: string;
};

export default function RecievedRequest() {
  const {
    data: recievedRequests,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFollowRequests();

  const { mutate: removeSuggested } = useRejectRecievedRequest();
  const handleReject = (fromUserId: string) => {
    removeSuggested({ fromUserId });
  };

  const { mutate: acceptRequest } = useAcceptRequest();
  const handleAccept = (toUserId: string) => {
    acceptRequest({ toUserId });
  };

  const allRecievedRequests = recievedRequests?.pages.flatMap((page) => page.data) || [];

  return (
    <ReceivedRequestList
      requests={allRecievedRequests}
      getAcceptId={(req) => req.fromUserId}
      getAvatar={(req) => ImageChecker(req.fromUser.avatar)}
      getLink={(req) => `/${req.fromUser.slug}`}
      getName={(req) => req.fromUser.name}
      getRejectId={(req) => req.fromUserId}
      title="Recieved Requests"
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
}
