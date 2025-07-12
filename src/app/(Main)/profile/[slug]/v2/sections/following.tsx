"use client";

import Box from "@/components/elements/Box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { UserMinus } from "lucide-react";
import { useFollowingUsers } from "@/queries/user/user.queries";
import { useUnfriend } from "@/queries/user/user.mutation";
import { ImageChecker } from "@/lib/ImagesChecker";
import SimpleSectionSkeleton from "../components/Skeleton";

export default function FollowingSection({ slug }: { slug?: string }) {
  const { data, isLoading, isFetchingNextPage } = useFollowingUsers(slug);
  const { mutate: unfriend, isPending } = useUnfriend();

  const handleUnfriend = (toUserId: string) => {
    unfriend({ toUserId });
  };

  const followingUsers = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <Box>
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SimpleSectionSkeleton key={idx} />
            ))}
          </div>
        ) : followingUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {followingUsers.map((user) => (
              <Card
                key={user._id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition hover:shadow-sm dark:border-muted dark:bg-card"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={ImageChecker(user.avatar)} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-black dark:text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-muted-foreground">
                      {user.bio || "No title provided"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <UserMinus
                  onClick={() => handleUnfriend(user._id)}
                  className="h-5 w-5 cursor-pointer text-gray-400 hover:text-red-500 dark:text-muted-foreground"
                />
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You're not following anyone yet.
          </p>
        )}

        {isFetchingNextPage && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SimpleSectionSkeleton />
          </div>
        )}
      </div>
    </Box>
  );
}
