"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";

type Profile = {
  id: string;
  name: string;
  avatar: string;
  friend: boolean;
};

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Aarav Patel",
    avatar: "https://i.pravatar.cc/150?img=1",
    friend: true,
  },
  {
    id: "2",
    name: "Meera Sharma",
    avatar: "https://i.pravatar.cc/150?img=2",
    friend: true,
  },
  {
    id: "3",
    name: "Kunal Verma",
    avatar: "https://i.pravatar.cc/150?img=3",
    friend: true,
  },
  {
    id: "4",
    name: "Riya Mehta",
    avatar: "https://i.pravatar.cc/150?img=4",
    friend: true,
  },
  {
    id: "5",
    name: "Dev Joshi",
    avatar: "https://i.pravatar.cc/150?img=5",
    friend: true,
  },
  {
    id: "6",
    name: "Ananya Desai",
    avatar: "https://i.pravatar.cc/150?img=6",
    friend: true,
  },
  {
    id: "7",
    name: "Ishaan Gupta",
    avatar: "https://i.pravatar.cc/150?img=7",
    friend: true,
  },
  {
    id: "8",
    name: "Tanya Reddy",
    avatar: "https://i.pravatar.cc/150?img=8",
    friend: true,
  },
  {
    id: "9",
    name: "Vivaan Bhatia",
    avatar: "https://i.pravatar.cc/150?img=9",
    friend: true,
  },
  {
    id: "10",
    name: "Sneha Kapoor",
    avatar: "https://i.pravatar.cc/150?img=10",
    friend: true,
  },
  {
    id: "11",
    name: "Raghav Singh",
    avatar: "https://i.pravatar.cc/150?img=11",
    friend: true,
  },
  {
    id: "12",
    name: "Kiara Nair",
    avatar: "https://i.pravatar.cc/150?img=12",
    friend: true,
  },
  {
    id: "13",
    name: "Ayaan Choudhary",
    avatar: "https://i.pravatar.cc/150?img=13",
    friend: true,
  },
  {
    id: "14",
    name: "Nisha Iyer",
    avatar: "https://i.pravatar.cc/150?img=14",
    friend: true,
  },
  {
    id: "15",
    name: "Yuvraj Kulkarni",
    avatar: "https://i.pravatar.cc/150?img=15",
    friend: true,
  },
  {
    id: "16",
    name: "Sanya Malhotra",
    avatar: "https://i.pravatar.cc/150?img=16",
    friend: true,
  },
  {
    id: "17",
    name: "Kartik Jain",
    avatar: "https://i.pravatar.cc/150?img=17",
    friend: true,
  },
  {
    id: "18",
    name: "Pooja Agarwal",
    avatar: "https://i.pravatar.cc/150?img=18",
    friend: true,
  },
  {
    id: "19",
    name: "Aditya Rana",
    avatar: "https://i.pravatar.cc/150?img=19",
    friend: true,
  },
  {
    id: "20",
    name: "Neha D’Souza",
    avatar: "https://i.pravatar.cc/150?img=20",
    friend: true,
  },
  {
    id: "21",
    name: "Siddharth Pillai",
    avatar: "https://i.pravatar.cc/150?img=21",
    friend: true,
  },
  {
    id: "22",
    name: "Avni Bhargava",
    avatar: "https://i.pravatar.cc/150?img=22",
    friend: true,
  },
  {
    id: "23",
    name: "Harsh Vardhan",
    avatar: "https://i.pravatar.cc/150?img=23",
    friend: true,
  },
];

export default function FollowingProfileList() {
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setProfiles(mockProfiles);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleUnfriend = (id: string) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, friend: false } : p)));
    toast.error("Unfriended successfully.");
  };

  return (
    <section className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="text-xl font-bold">Your Saathis</h2>
        <Button asChild variant={"default"}>
          <Link href={"/profile"}>
            {" "}
            <UserPlus /> Add Saathis
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 15 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-md border border-gray-500 shadow-sm md:flex-col"
            >
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
          ))
        ) : profiles.filter((p) => p.friend).length > 0 ? (
          profiles
            .filter((p) => p.friend)
            .map((profile) => (
              <div
                key={profile.id}
                className="flex gap-3 border-b-2 border-gray-500 shadow-sm transition hover:shadow-md md:flex-col md:rounded-md md:border"
              >
                <div className="h-full md:w-full">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full rounded-full object-cover md:rounded-none md:rounded-t-md"
                  />
                </div>

                <p className="hidden px-3 text-base font-semibold md:flex">{profile.name}</p>

                <div className="flex w-full flex-col space-y-5 p-3 md:mt-auto">
                  <p className="flex px-3 text-base font-semibold md:hidden">{profile.name}</p>
                  <div className="flex w-full justify-between">
                    <Button variant="outline" className="dark:bg-slate-600" size="sm">
                      Saathi
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUnfriend(profile.id)}>
                          Unfriend
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="col-span-full text-center text-sm text-gray-500">
            You're not following anyone yet.
          </p>
        )}
      </div>
    </section>
  );
}
