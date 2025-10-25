"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical, UserPlus, UserX2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFollowerUsers } from "@/queries/user/user.queries";
import { ImageChecker } from "@/lib/ImagesChecker";
import { useInView } from "react-intersection-observer";
import SkeletonCard from "../common/SkeletonCard";
import { useUnfriend } from "@/queries/user/user.mutation";

export default function FollowersProfileList({ slug }: { slug?: string }) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useFollowerUsers(slug);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { mutate: unfriend, isPending } = useUnfriend();

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handleUnfriend = (toUserId: string) => {
    unfriend({ toUserId });
  };

  const allProfiles = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Followers</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These users are following you. Stay connected or manage your connections.
          </p>
        </div>
        <Button asChild variant="default">
          <Link href="/profile">
            <UserPlus className="mr-1 h-4 w-4" /> Add Saathis
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : allProfiles.length > 0 ? (
          allProfiles.map((profile, i) => (
            <div
              key={profile._id}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 dark:border-gray-700 dark:bg-slate-900 dark:shadow-md"
              ref={i === allProfiles.length - 1 ? ref : null}
            >
              {/* Mobile-specific layout */}
              <div className="flex items-center p-3 sm:hidden">
                <Link href={`/profile/${profile.slug}`} className="mr-3">
                  <img
                    src={ImageChecker(profile.avatar)}
                    alt={profile.name}
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
                      disabled
                      variant="outline"
                      className="flex-1 bg-blue-200 dark:bg-blue-800"
                    >
                      Follower
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleUnfriend(profile._id)}
                      disabled={isPending}
                      className="flex-1"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet layout (original design) */}
              <div className="hidden sm:block">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={ImageChecker(profile.avatar)}
                    alt={profile.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="truncate text-lg font-semibold text-gray-800 dark:text-white">
                    <Link href={`/profile/${profile.slug}`}>{profile.name}</Link>
                  </h3>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                      Follower
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleUnfriend(profile._id)}
                          className="text-red-600 dark:text-red-400"
                        >
                          <UserX2 className="mr-2 h-4 w-4" /> Unfriend
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-gray-500 dark:text-gray-400">
            No followers yet. Your Saathi list is empty.
          </p>
        )}
      </div>

      {isFetchingNextPage && (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      )}
    </section>
  );
}
