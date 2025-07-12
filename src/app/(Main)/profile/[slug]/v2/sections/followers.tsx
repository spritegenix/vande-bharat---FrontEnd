"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Box from "@/components/elements/Box";
import SimpleSectionSkeleton from "../components/Skeleton";
import { ImageChecker } from "@/lib/ImagesChecker";
import { useFollowersSection } from "../CustomHooks/useFollowersSection";
export default function FollowerSection({ slug }: { slug?: string }) {
  const { allFollowers, isLoading, isFetchingNextPage, ref } = useFollowersSection(slug);

  return (
    <Box>
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        {isLoading ? (
          <div className="flex flex-col items-center gap-6">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <SimpleSectionSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : allFollowers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 dark:bg-muted sm:grid-cols-2">
            {allFollowers.map((user, index) => (
              <Card
                key={user._id}
                ref={index === allFollowers.length - 1 ? ref : null}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-card p-3 transition hover:shadow-sm dark:border-border dark:bg-card"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 dark:bg-card">
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

                <Button
                  variant="outline"
                  className="h-auto w-auto rounded-md border border-gray-300 bg-white px-4 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80"
                >
                  Follow back
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No followers yet. Your Saathi list is empty.
          </p>
        )}

        {isFetchingNextPage && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SimpleSectionSkeleton/>
          </div>
        )}
      </div>
    </Box>
  );
}


