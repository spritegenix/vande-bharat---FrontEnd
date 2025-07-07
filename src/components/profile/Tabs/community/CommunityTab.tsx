import { useMyCommunities } from "@/queries/user/user.queries";
import Link from "next/link";
import React from "react";
import { Loader } from "lucide-react"; // Optional: any spinner icon
import SkeletonCard from "@/components/common/SkeletonCard";

export default function CommunityTab({ slug }: { slug: string }) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useMyCommunities(slug);

  const myCommunities = data?.pages.flatMap((page) => page.communities) ?? [];

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex h-64 items-center justify-center text-gray-500">
          <Loader className="mr-2 animate-spin" /> Loading communities...
        </div>
      ) : myCommunities.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          You haven’t created any communities yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myCommunities.map((community) => (
            <div
              key={community._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <img
                src={community.banner}
                alt={community.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <Link
                  href={`/communities/${community.slug}`}
                  className="block text-xl font-semibold hover:underline"
                >
                  {community.name}
                </Link>

                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {community.category && (
                    <p className="mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Category:
                      </span>{" "}
                      {community.category}
                    </p>
                  )}
                  <p>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Members:</span>{" "}
                    {community.members?.length ?? 0}
                  </p>
                </div>

                <div className="mt-4">
                  {community.isPrivate ? (
                    <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                      Private
                    </span>
                  ) : (
                    <button className="rounded-full bg-blue-600 px-4 py-1 text-sm text-white transition hover:bg-blue-700">
                      Send Join Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFetchingNextPage && (
        <div className="mt-4">
          <SkeletonCard />
        </div>
      )}
    </div>
  );
}
