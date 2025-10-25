"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/common/SkeletonCard";
import { useSuggestions } from "@/queries/user/user.queries";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useRemoveSuggestion, useSendRequest } from "@/queries/user/user.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { ImageChecker } from "@/lib/ImagesChecker";

type ProfileSuggestion = {
  avatar?: string;
  name: string;
  slug: string;
  _id: string;
};

export default function PeopleYouMayKnowPage() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuggestions();

  const queryClient = useQueryClient();
  const { mutate: sendFriendRequest, isPending } = useSendRequest();
  const { mutate: removeSuggested } = useRemoveSuggestion();
  const [sentIds, setSentIds] = useState<string>("");

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handleAddFriend = (toUserId: string) => {
    sendFriendRequest(
      { toUserId },
      {
        onSuccess: () => {
          setSentIds(toUserId);
          toast.success("Friend request sent");
          queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
          queryClient.invalidateQueries({ queryKey: ["allSent-requests"] });
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to send request");
        },
      },
    );
  };

  const handleRemove = (toUserId: string) => {
    removeSuggested({ toUserId });
  };

  const allProfiles = data?.pages.flatMap((page) => page.data) || [];

  return (
    <section className="p-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">People You May Know</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        ) : allProfiles.length > 0 ? (
          allProfiles.map((profile: ProfileSuggestion, i: number) => (
            <div
              key={profile._id}
              ref={i === allProfiles.length - 1 ? ref : null}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-slate-900"
            >
              {/* Mobile-specific layout */}
              <div className="flex items-center p-3 sm:hidden">
                <Link href={`/profile/${profile.slug}`} className="mr-3">
                  <img
                    src={ImageChecker(profile?.avatar)}
                    alt={profile?.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <Link href={`/profile/${profile.slug}`}>
                    <h3 className="truncate text-base font-semibold text-gray-800 hover:underline dark:text-white">
                      {profile.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex flex-row gap-2">
                    <Button
                      variant={sentIds === profile._id ? "default" : "outline"}
                      className={`flex-1 ${
                        sentIds === profile._id
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "dark:bg-slate-700"
                      }`}
                      onClick={() => handleAddFriend(profile._id)}
                      disabled={sentIds === profile._id || isPending}
                    >
                      {sentIds === profile._id ? "Request Sent" : "Add Friend"}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(profile._id)}
                      className="flex-1"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet layout (original design) */}
              <div className="hidden sm:block">
                <div className="aspect-w-16 aspect-h-9 relative w-full overflow-hidden sm:h-48">
                  <img
                    src={ImageChecker(profile?.avatar)}
                    alt={profile?.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="space-y-4 p-4">
                  <Link href={`/profile/${profile.slug}`}>
                    <h3 className="truncate text-lg font-semibold text-gray-800 hover:underline dark:text-white">
                      {profile.name}
                    </h3>
                  </Link>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant={sentIds === profile._id ? "default" : "outline"}
                      className={`w-full ${
                        sentIds === profile._id
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "dark:bg-slate-700"
                      }`}
                      onClick={() => handleAddFriend(profile._id)}
                      disabled={sentIds === profile._id || isPending}
                    >
                      {sentIds === profile._id ? "Request Sent" : "Add Friend"}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(profile._id)}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            No more suggestions.
          </p>
        )}
      </div>

      {isFetchingNextPage &&
        Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
    </section>
  );
}
