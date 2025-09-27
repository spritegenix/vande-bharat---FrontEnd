import ReceivedRequestList from "@/components/common/ReceivedRequestList";
import { ImageChecker } from "@/lib/ImagesChecker";
import { useRespondtoJoinRequest } from "@/queries/community/community.mutation";
import { useFetchJoinRequests } from "@/queries/community/community.queries";
import React from "react";

export default function RecievedRequest({ communitySlug }: { communitySlug: string }) {
  const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchJoinRequests(communitySlug);
  const { mutate } = useRespondtoJoinRequest(communitySlug);
  const handleAccept = (id: string) => {
    mutate({ fromUserId: id, action: "ACCEPTED" });
  };

  const handleReject = (id: string) => {
    mutate({ fromUserId: id, action: "REJECTED" });
  };
  const allRecievedRequests = data?.pages.flatMap((page) => page) || [];

  return (
    <ReceivedRequestList
      requests={allRecievedRequests}
      getAcceptId={(req) => req.fromUserId._id}
      getAvatar={(req) => ImageChecker(req.fromUserId.avatar)}
      getLink={(req) => `/${req.fromUserId.slug}`}
      getName={(req) => req.fromUserId.name}
      getRejectId={(req) => req.fromUserId._id}
      title="Recieved Requests"
      isError={isError}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
}
