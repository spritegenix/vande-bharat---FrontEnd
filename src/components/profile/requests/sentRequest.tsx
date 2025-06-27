"use client";

import { useAllsentRequest } from "@/queries/user/user.queries";
import { useCancelRequest } from "@/queries/user/user.mutation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import SkeletonCard from "@/components/common/SkeletonCard";
import { ImageChecker } from "@/lib/ImagesChecker";

type User = {
  name: string;
  slug: string;
  avatar: string;
};

type SentRequest = {
  _id: string;
  toUser: User;
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

  const allSentRequests = sentRequests?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="mt-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sent Requests</h2>

      {isLoading ? (
        <SkeletonCard />
      ) : isError ? (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      ) : allSentRequests.length === 0 ? (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">No sent requests.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allSentRequests.map((req: SentRequest, i: number) => (
            <div
              key={req._id}
              ref={i === allSentRequests.length - 1 ? ref : undefined}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-slate-900"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={ImageChecker(req.toUser.avatar)}
                  alt={req.toUser.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 p-4">
                <Link href={`/profile/${req.toUser.slug}`}>
                  <h3 className="truncate text-lg font-semibold text-gray-800 hover:underline dark:text-white">
                    {req.toUser.name}
                  </h3>
                </Link>

                <div className="flex flex-col gap-2">
                  <Button disabled variant="outline" className="bg-gray-200 dark:bg-slate-800">
                    Request Sent
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancel(req.toUserId)}
                    disabled={isPending}
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
