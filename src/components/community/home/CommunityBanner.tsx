"use client";
import ShareMenu from "@/components/posts/ShareMenu";
import CoverImage from "@/components/profile/main/CoverImage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteCommunity,
  useJoinCommunity,
  useJoinPrivateCommunity,
  useLeaveCommunity,
} from "@/queries/community/community.mutation";
import { useUserStore } from "@/stores/userStore";
import { aboutContentType } from "@/types/community";
import { useRouter } from "next/navigation";
import React from "react";
function dates(date: string) {
  let createdAtDate = new Date(date);
  const formatted = createdAtDate.toLocaleString("default", { month: "long", year: "numeric" });
  return formatted;
}

export default function CommunityBanner({ aboutContent }: { aboutContent: aboutContentType }) {
  const router = useRouter();

  const { mutate: joinCommunity } = useJoinCommunity(aboutContent?.slug as string);
  const {
    mutate: leaveCommunity,
    error,
    isSuccess,
  } = useLeaveCommunity(aboutContent?.slug as string);
  const { mutate: removeCommunity } = useDeleteCommunity(aboutContent?.slug as string);
  const { mutate: joinPrivateCommunity } = useJoinPrivateCommunity(aboutContent?.slug as string);
  const handleJoin = () => {
    aboutContent?.isPrivate ? joinPrivateCommunity() : joinCommunity();
  };

  const handleLeave = () => {
    leaveCommunity();
  };
  const handleDelete = () => {
    removeCommunity();
    router.push("/community");
  };
  const { user } = useUserStore();
  return (
    <div
      id="community-banner"
      className="overflow-hidden border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
    >
      <CoverImage
        coverImage={aboutContent?.banner}
        canEdit={
          aboutContent?.owner._id === user?._id ||
          aboutContent?.admins.some((admin) => admin === user?._id)
        }
        entityType="community"
      />

      {/* Cover Image */}
      {/* <div className="relative h-40 w-full bg-neutral-200 dark:bg-neutral-800 sm:h-52 md:h-64">
        <img
          src={aboutContent?.banner ? aboutContent.banner : "/images/profile/coverplaceholder.jpg"}
          alt="Community Cover"
          className="aspect-video h-full w-full object-cover"
        />
        <div className="absolute bottom-3 right-3">
          <button className="rounded bg-white bg-opacity-80 px-3 py-1 text-sm text-neutral-700 hover:bg-opacity-100 dark:bg-black/50 dark:text-white dark:hover:bg-black/70">
            📷 Edit Cover
          </button>
        </div>
      </div> */}

      {/* Main content */}
      <div className="px-4 pb-6 sm:px-6">
        <div className="mb-4 mt-12 flex flex-col space-y-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4">
            {/* Info */}
            <div className="pb-2">
              <h1 className="mb-1 text-xl font-semibold text-neutral-900 dark:text-white sm:text-2xl">
                {aboutContent?.name}
              </h1>
              <p className="mb-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
                {aboutContent?.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                <span>👥 {aboutContent?.totalMemberCount} members</span>
                <span>👁️ {aboutContent?.isPrivate ? "Private" : "Public"}</span>
                <span>📅 Created {aboutContent?.createdAt && dates(aboutContent?.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-0 sm:space-x-3">
            {!aboutContent?.isMember && (
              <button
                onClick={handleJoin}
                disabled={aboutContent?.requestStatus === "PENDING"}
                className="w-full rounded-lg bg-neutral-900 px-6 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:w-auto"
              >
                {aboutContent?.requestStatus === null && aboutContent?.isPrivate
                  ? "➕ Send Request to Join"
                  : aboutContent?.requestStatus === "PENDING"
                    ? "Request Sent"
                    : aboutContent?.requestStatus === "REJECTED"
                      ? "➕ Join Community"
                      : "➕ Join Community"}
              </button>
            )}
            <ShareMenu
              postUrl={`${aboutContent?.slug}`}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 sm:w-auto"
            />

            {aboutContent?.isMember && (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full rounded-lg border border-neutral-300 px-3 py-1 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 sm:w-auto">
                  ⋯
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user?._id !== aboutContent?.owner?._id && (
                    <DropdownMenuItem onClick={handleLeave}>Leave</DropdownMenuItem>
                  )}
                  {user?._id === aboutContent?.owner?._id && (
                    <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
