import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex items-center gap-3 rounded-md border border-gray-500 shadow-sm md:flex-col">
      {" "}
      <div className="flex h-full w-fit items-center justify-center md:w-full">
        <Skeleton className="h-24 w-24 rounded-full bg-gray-200 object-cover md:aspect-square md:h-full md:w-full md:rounded-none md:rounded-t-md" />
      </div>
      <Skeleton className="hidden h-4 w-3/4 bg-gray-200 px-3 md:flex" />
      <div className="flex w-full flex-col justify-between gap-2 p-3">
        <Skeleton className="flex h-4 w-full bg-gray-200 px-3 md:hidden" />
        <div className="flex w-full justify-between gap-2 p-3">
          <Skeleton className="h-8 w-16 rounded bg-gray-200" />
          <Skeleton className="h-8 w-8 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
