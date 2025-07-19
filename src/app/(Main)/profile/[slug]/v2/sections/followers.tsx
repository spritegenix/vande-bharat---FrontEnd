"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Box from "@/components/elements/Box";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageChecker } from "@/lib/ImagesChecker";

// Dummy followers
const dummyFollowers = [
  {
    _id: "1",
    name: "Aarav Sharma",
    username: "aarav_99",
    avatar: "",
    bio: "Full Stack Developer",
  },
  {
    _id: "2",
    name: "Diya Mehta",
    username: "diya_dev",
    avatar: "",
    bio: "UI/UX Designer",
  },
  {
    _id: "3",
    name: "Kabir Khanna",
    username: "kabir.js",
    avatar: "",
    bio: "Frontend Engineer",
  },
  {
    _id: "4",
    name: "Rhea Singh",
    username: "rhea_codes",
    avatar: "",
    bio: "",
  },
];

// Skeleton Card
const FollowerCardSkeleton = () => (
  <Card className="flex items-center justify-between rounded-lg border border-gray-200 bg-card p-3 dark:border-border dark:bg-muted">
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <Skeleton className="h-6 w-20 rounded-md" />
  </Card>
);

export default function FollowerSection({ slug }: { slug?: string }) {
  const isLoading = false;
  const isFetchingNextPage = false;
  const allFollowers = dummyFollowers;

  return (
    <Box className="dark:bg-card">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <FollowerCardSkeleton key={idx} />
            ))}
          </div>
        ) : allFollowers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {allFollowers.map((user) => (
              <Card
                key={user._id}
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
                  className="h-auto w-auto rounded-md border border-gray-300 bg-white px-4 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-muted dark:bg-card dark:text-muted-foreground dark:hover:bg-muted/80"
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
            <FollowerCardSkeleton />
          </div>
        )}
      </div>
    </Box>
  );
}
