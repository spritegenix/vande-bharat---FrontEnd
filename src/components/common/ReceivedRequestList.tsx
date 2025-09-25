import React from "react";
import { useInView } from "react-intersection-observer";
import SkeletonCard from "./SkeletonCard";
import RequestCard from "./RequestCard";
interface ReceivedRequestListProps<T> {
  title: string;
  requests: T[];
  isError?: boolean;
  getAvatar: (req: T) => string;
  getName: (req: T) => string;
  getLink: (req: T) => string;
  getAcceptId: (req: T) => string;
  getRejectId: (req: T) => string;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
}
export default function ReceivedRequestList<T>({
  title,
  requests,
  getAvatar,
  getName,
  getLink,
  getAcceptId,
  getRejectId,
  onAccept,
  onReject,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: ReceivedRequestListProps<T>) {
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage?.();
      }
    },
  });
  return (
    <div className="mt-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      {requests.length === 0 ? (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          No received requests.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {requests.map((req, i) => (
            <div key={getAcceptId(req)} ref={i === requests.length - 1 ? ref : undefined}>
              <RequestCard
                avatar={getAvatar(req)}
                name={getName(req)}
                slug={getLink(req)}
                onAccept={() => onAccept(getAcceptId(req))}
                onReject={() => onReject(getRejectId(req))}
              />
            </div>
          ))}
        </div>
      )}
      {isFetchingNextPage && <SkeletonCard />}
    </div>
  );
}
