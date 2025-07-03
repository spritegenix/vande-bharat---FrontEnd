"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { notFound } from "next/navigation";
import Feed from "@/components/Feed";
import { toast } from "sonner";
import Fullpage from "@/components/community/Fullpage";

// Simulated static data
const mockCommunity = {
  id: "1",
  name: "Tech Minds",
  description:
    "Tech Minds is a community where developers, designers, and innovators come together to share ideas, collaborate on projects, and grow their skills. Join us to be a part of the future.",
  coverUrl:
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80",
  membersCount: 2543,
};

export default function IndividualCommunityPage() {
  const [joined, setJoined] = useState(false);

  const handleToggle = () => {
    setJoined((prev) => !prev);
    if (joined) {
      toast.success("You have joined the Group");
    }

    // TODO: Connect to API
  };

  if (!mockCommunity) return notFound();

  return (
    <>
      <Fullpage />
      {/* <div className="mx-auto max-w-5xl">
      
        <div className="relative h-60 w-full overflow-hidden rounded-b-lg md:h-72">
          <img
            src={mockCommunity.coverUrl}
            alt="Community cover"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{mockCommunity.name}</h1>
                <p className="text-sm text-white/80">
                  {mockCommunity.membersCount.toLocaleString()} members
                </p>
              </div>

              <Button
                size="sm"
                variant={joined ? "secondary" : "default"}
                onClick={handleToggle}
                className="w-full bg-offwhite text-black sm:w-auto"
              >
                {joined ? "Leave Group" : "Join Group"}
              </Button>
            </div>
          </div>
        </div>

        
        <div className="mt-6 px-4 sm:px-0">
          <Card className="p-5">
            <h2 className="mb-2 text-lg font-semibold">About this community</h2>
            <p className="text-sm text-muted-foreground">{mockCommunity.description}</p>
          </Card>
        </div>
      </div> */}
      <Feed />
    </>
  );
}
