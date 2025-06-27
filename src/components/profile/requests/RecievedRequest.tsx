"use client";

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

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

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
    <div className="mt-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Received Requests</h2>

      {allRecievedRequests?.length === 0 ? (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          You have no received requests.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allRecievedRequests.map((req: RecievedRequest, i: number) => (
            <div
              key={req._id}
              ref={i === allRecievedRequests.length - 1 ? ref : undefined}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-slate-900"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={ImageChecker(req?.fromUser.avatar)}
                  alt={req.fromUser.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 p-4">
                <Link href={`/profile/${req.fromUser.slug}`}>
                  <h3 className="truncate text-lg font-semibold text-gray-800 hover:underline dark:text-white">
                    {req.fromUser.name}
                  </h3>
                </Link>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleAccept(req.fromUserId)}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Accept Request
                  </Button>
                  <Button variant="destructive" onClick={() => handleReject(req.fromUserId)}>
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFetchingNextPage && <SkeletonCard />}
    </div>
  );
}
