"use client";
import SkeletonCard from "@/components/common/SkeletonCard";
import CommunityCard from "@/components/community/CommunityCard";
import { useCommunitySuggestions } from "@/queries/community/community.queries";

export default function CommunityListPage() {
  const { data, isLoading, isError } = useCommunitySuggestions();
  const suggestions = data?.pages?.flatMap((page) => page) ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Communities You Might Like</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {suggestions.map((community, i) => (
            <CommunityCard
              key={i}
              slug={community.slug}
              id={community._id}
              name={community.name}
              description={community.description}
              imageUrl={community.banner}
              membersCount={community.followingCount}
              isPrivate={community.isPrivate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
