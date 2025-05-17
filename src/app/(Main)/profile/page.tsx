"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from "@/components/common/SkeletonCard";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  requestSent?: boolean;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Aarav Patel",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Meera Sharma",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Kunal Verma",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function PeopleYouMayKnowPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProfiles(mockProfiles);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const handleAddFriend = (id: string) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, requestSent: true } : p)));
    const user = profiles.find((p) => p.id === id);
    toast.success(`Friend request sent to ${user?.name}`);
  };

  const handleRemove = (id: string) => {
    const removed = profiles.find((p) => p.id === id);
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    toast.error(`Removed ${removed?.name} from suggestions.`);
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">People You May Know</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
          : profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex gap-3 border-b-2 border-gray-500 pb-2 shadow-sm transition hover:shadow-md md:flex-col md:rounded-md md:border md:pb-0"
              >
                <div className="h-full md:w-full">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full rounded-full object-cover md:rounded-none md:rounded-t-md"
                  />
                </div>

                <p className="hidden px-3 text-base font-semibold md:flex">{profile.name}</p>

                <div className="flex w-full flex-col justify-between p-3 md:mt-auto">
                  <p className="flex px-3 text-base font-semibold md:hidden">{profile.name}</p>

                  <div className="flex w-full items-center justify-between gap-x-3 md:flex-col md:space-y-2">
                    <Button
                      variant={profile.requestSent ? "default" : "outline"}
                      className={` ${
                        profile.requestSent
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "dark:bg-slate-600"
                      } px-3 py-2 text-sm md:mx-2 md:w-full md:px-5 md:py-3 md:text-base`}
                      onClick={() => handleAddFriend(profile.id)}
                      disabled={profile.requestSent}
                    >
                      {profile.requestSent ? "Request Sent" : "Add Friend"}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(profile.id)}
                      className="w-full px-3 py-2 text-sm md:w-full md:px-5 md:py-3 md:text-base"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
