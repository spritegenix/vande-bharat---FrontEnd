import SkeletonCard from "@/components/common/SkeletonCard";
import { Button } from "@/components/ui/button";
import { ImageChecker } from "@/lib/ImagesChecker";
import {
  useAcceptRequest,
  useRejectRecievedRequest,
  useRemoveSuggestion,
} from "@/queries/user/user.mutation";
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
    removeSuggested({
      fromUserId,
    });
  };
  const { mutate: acceptRequest } = useAcceptRequest();
  const handleAccept = (toUserId: string) => {
    acceptRequest({ toUserId });
  };
  const allRecievedRequests = recievedRequests?.pages.flatMap((page) => page.data) || [];
  return (
    <div className="mt-4 space-y-4">
      {allRecievedRequests?.length === 0 ? (
        <div className="mt-4">You have no received requests.</div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3 lg:grid-cols-4">
          {allRecievedRequests?.map((req: RecievedRequest, i: number) => (
            <div
              key={req._id}
              className="flex gap-2 border-b-2 border-gray-500 pb-2 shadow-sm transition hover:shadow-md md:flex-col md:rounded-md md:border md:pb-0"
              ref={i === allRecievedRequests.length - 1 ? ref : undefined}
            >
              <div className="md:w-full">
                <Image
                  src={ImageChecker(req?.fromUser.avatar)}
                  alt={req.fromUser.name}
                  className="w-full rounded-full object-cover md:rounded-none md:rounded-t-md"
                  width={200}
                  height={200}
                />
              </div>

              <Link href={req.fromUser.slug}>
                <p className="hidden px-3 text-base font-semibold md:flex">{req.fromUser.name}</p>
              </Link>

              <div className="flex w-full flex-col justify-between p-3 md:mt-auto">
                <p className="flex px-3 text-base font-semibold md:hidden">{req.fromUser.name}</p>

                <div className="flex w-full items-center justify-between gap-x-3 md:flex-col md:space-y-2">
                  <Button
                    variant="default"
                    onClick={() => handleAccept(req.fromUserId)}
                    className="w-full bg-green-600 px-3 py-2 text-sm md:w-full md:px-5 md:py-3 md:text-base"
                  >
                    Accept Request
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleReject(req.fromUserId)}
                    className="w-full px-3 py-2 text-sm md:w-full md:px-5 md:py-3 md:text-base"
                  >
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
