"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/common/SkeletonCard";
import { useSuggestions } from "@/queries/user/user.queries";
import Link from "next/link";
import { useRemoveSuggestion, useSendRequest } from "@/queries/user/user.mutation";
import { useQueryClient } from "@tanstack/react-query";
type ProfileSuggestion = {
  avatar?: string;
  name: string;
  slug: string;
  _id: string;
};
export default function PeopleYouMayKnowPage() {
  const { data: suggestions, isLoading, isError } = useSuggestions();
  const { mutate: sendFriendRequest, isPending } = useSendRequest();
  const { mutate: removeSuggested } = useRemoveSuggestion();
  const [sentIds, setSentIds] = useState<string>("");
  const queryClient = useQueryClient();
  const handleAddFriend = (toUserId: string) => {
    sendFriendRequest(
      { toUserId },
      {
        onSuccess: () => {
          setSentIds(toUserId);
          toast.success(`Friend request sent`);
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
    removeSuggested(
      {
        toUserId,
      },
      {
        onSuccess: () => {
          toast.error(`Removed from suggestions.`);
          queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to remove suggested");
        },
      },
    );
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">People You May Know</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index: number) => <SkeletonCard key={index} />)
        ) : suggestions && suggestions.length > 0 ? (
          suggestions.map((profile: ProfileSuggestion) => {
            return (
              <div
                key={profile._id}
                className="flex gap-3 border-b-2 border-gray-500 pb-2 shadow-sm transition hover:shadow-md md:flex-col md:rounded-md md:border md:pb-0"
              >
                <div className="h-full md:w-full">
                  <img
                    src={
                      profile?.avatar?.includes("amazonaws")
                        ? profile.avatar
                        : "/images/profile/profileplaceholder.jpg"
                    }
                    alt={profile.name}
                    className="w-full rounded-full object-cover md:rounded-none md:rounded-t-md"
                  />
                </div>

                <Link href={profile.slug}>
                  <p className="hidden px-3 text-base font-semibold md:flex">{profile.name}</p>
                </Link>

                <div className="flex w-full flex-col justify-between p-3 md:mt-auto">
                  <p className="flex px-3 text-base font-semibold md:hidden">{profile.name}</p>

                  <div className="flex w-full items-center justify-between gap-x-3 md:flex-col md:space-y-2">
                    <Button
                      variant={sentIds === profile._id ? "default" : "outline"}
                      className={`${
                        sentIds === profile._id
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "dark:bg-slate-600"
                      } px-3 py-2 text-sm md:mx-2 md:w-full md:px-5 md:py-3 md:text-base`}
                      onClick={() => handleAddFriend(profile._id)}
                      disabled={sentIds === profile._id || isPending}
                    >
                      {sentIds === profile._id ? "Request Sent" : "Add Friend"}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(profile._id)}
                      className="w-full px-3 py-2 text-sm md:w-full md:px-5 md:py-3 md:text-base"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No more Suggestions</p>
        )}
      </div>
    </div>
  );
}
