"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface CommunityCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  membersCount: number;
  loading?: boolean;
}

export default function CommunityCard({
  id,
  name,
  slug,
  description,
  imageUrl,
  membersCount,
}: CommunityCardProps) {
  const [joined, setJoined] = useState(false);

  const handleToggle = () => {
    setJoined(!joined);
    // TODO: Connect to API
  };

  return (
    <Card className="flex flex-col items-start justify-between gap-4 transition hover:shadow-md md:items-center">
      <div className="flex w-full flex-col">
        <div className="h-48 w-full">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full rounded-full object-cover md:rounded-none md:rounded-t-md"
          />
        </div>

        <div className="flex w-full flex-col p-2">
          <Link href={`/community/${slug}`} className="text-lg font-semibold hover:underline">
            {name}
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
          <p className="mt-1 text-xs text-zinc-500">{membersCount} members</p>
        </div>
      </div>
      <div className="w-full p-5">
        <Button
          variant={joined ? "secondary" : "default"}
          onClick={handleToggle}
          className="w-full px-3 py-2 text-sm md:w-full md:px-5 md:py-3 md:text-base"
        >
          {joined ? "Leave" : "Join"}
        </Button>
      </div>
    </Card>
  );
}
