import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useFollowerUsers } from "@/queries/user/user.queries";

export function useFollowersSection(slug?: string) {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useFollowerUsers(slug);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const allFollowers = data?.pages?.flatMap((page) => page.data) || [];

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return {
    allFollowers,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    selectedUserId,
    setSelectedUserId,
    ref,
    isError,
  };
}
