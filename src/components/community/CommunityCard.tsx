"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useJoinCommunity, useJoinPrivateCommunity } from "@/queries/community/community.mutation";

interface CommunityCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  membersCount: number;
  loading?: boolean;
  isPrivate?: boolean;
}

export default function CommunityCard({
  id,
  name,
  slug,
  description,
  imageUrl,
  membersCount,
  isPrivate,
}: CommunityCardProps) {
  const [requestSent, setRequestSent] = useState<string | undefined>("");

  const { mutate: joinCommunity, status: joinStatus } = useJoinCommunity(slug);
  const { mutate: joinPrivateCommunity, status: joinPrivateStatus } = useJoinPrivateCommunity({
    onSuccess: (data) => {
      setRequestSent(data.data);
    },
    slug,
  });
  const handleToggle = () => {
    joinCommunity();
  };

  const handlePrivateRequest = () => {
    joinPrivateCommunity();
  };
  return (
    <Card className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <div className="relative h-48 w-full">
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <Link
          href={`/community/${slug}`}
          className="text-lg font-bold hover:text-primary hover:underline"
        >
          {name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">{membersCount} members</p>

        <div className="mt-4">
          {isPrivate ? (
            <Button
              onClick={handlePrivateRequest}
              variant="default"
              disabled={joinPrivateStatus === "pending"}
              className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 md:text-base ${
                requestSent === "PENDING"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "hover:bg-primary/90 bg-primary text-white"
              }`}
            >
              {joinPrivateStatus === "pending"
                ? "Sending..."
                : requestSent === "PENDING"
                  ? "Request Sent"
                  : "Send Join Request"}
            </Button>
          ) : (
            <Button
              variant={"default"}
              onClick={handleToggle}
              disabled={joinStatus === "pending"}
              className="hover:bg-primary/90 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 md:text-base"
            >
              {joinStatus === "pending" ? "Joining..." : "Join"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
