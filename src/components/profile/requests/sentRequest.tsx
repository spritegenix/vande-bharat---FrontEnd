"use client";

import { useAllsentRequest } from "@/queries/user/user.queries";
// import { useCancelSentRequest } from "@/queries/user/user.queries";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCancelRequest } from "@/queries/user/user.mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import SkeletonCard from "@/components/common/SkeletonCard";
import { ImageChecker } from "@/lib/ImagesChecker";
type user = {
  name: string;
  slug: string;
  avatar: string;
};
type SentRequest = {
  _id: string;
  toUser: user;
  toUserId: string;
};
export default function SentRequest() {
  const {
    data: sentRequests,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAllsentRequest();
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const queryClient = useQueryClient();
  const { mutate: cancelRequest, isPending } = useCancelRequest();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  const handleCancel = (toUserId: string) => {
    cancelRequest(
      { toUserId },
      {
        onSuccess: () => {
          toast.success("Request Cancelled");
          queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
          queryClient.invalidateQueries({ queryKey: ["allSent-requests"] });
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Refresh and Try again");
        },
      },
    );
  };

  const allsentRequests = sentRequests?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="mt-4 space-y-4">
      {allsentRequests?.length === 0 ? (
        <p>No sent requests</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3 lg:grid-cols-4">
          {allsentRequests.map((req: SentRequest, i: number) => (
            <div
              key={req._id}
              className="flex gap-2 border-b-2 border-gray-500 pb-2 shadow-sm transition hover:shadow-md md:flex-col md:rounded-md md:border md:pb-0"
              ref={i === allsentRequests.length - 1 ? ref : undefined}
            >
              <div className="md:w-full">
                <Image
                  src={ImageChecker(req?.toUser.avatar)}
                  alt={req.toUser.name}
                  className="w-full rounded-full object-cover md:rounded-none md:rounded-t-md"
                  width={200}
                  height={200}
                />
              </div>

              <Link href={req.toUser.slug}>
                <p className="hidden px-3 text-base font-semibold md:flex">{req.toUser.name}</p>
              </Link>

              <div className="flex w-full flex-col justify-between p-3 md:mt-auto">
                <p className="flex px-3 text-base font-semibold md:hidden">{req.toUser.name}</p>

                <div className="flex w-full items-center justify-between gap-x-3 md:flex-col md:space-y-2">
                  <Button
                    disabled
                    variant="outline"
                    //   onClick={() => handleRemove(profile._id)}
                    className="w-full bg-gray-600 px-3 py-2 text-sm md:w-full md:px-5 md:py-3 md:text-base"
                  >
                    Request Sent
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleCancel(req.toUserId)}
                    className="w-full px-3 py-2 text-sm md:w-full md:px-5 md:py-3 md:text-base"
                  >
                    Cancel Request
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
