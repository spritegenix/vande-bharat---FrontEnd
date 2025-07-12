"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl p-4">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="mt-4 h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-56" />

          <div className="mt-4 flex gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="mt-6 h-10 w-32" />
          <Skeleton className="mt-6 h-10 w-full" />
        </div>
      </Card>
    </div>
  );
}
