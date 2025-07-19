"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoverImage from "@/components/profile/main/CoverImage";
import ImageCropperModal from "@/components/common/ImageCropperModal";
import EditProfileModal from "../../modals/editModal";
import ProfileAvatarEditor from "./ProfileAvatarEditor";
import ProfileFollowButton from "./ProfileFollowButton";
import TabStatsGrid from "./TabStatsGrid";
import ProfileTabsContent from "./ProfileTabsContent";

export default function ProfileHeaderLayout({ user, posts, isPostLoading, currentUser }: any) {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(user?.avatar || "/profile.jpg");
  const [openModal, setOpenModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <CoverImage coverImage={user?.banner || "/images/banner.jpg"} />

      <div className="mx-auto w-full max-w-6xl rounded-lg">
        <Tabs defaultValue="feed" className="w-full">
          <Card className="border border-gray-300 p-6 pb-0 dark:border-border dark:bg-card">
            <div className="flex flex-col items-center text-center">
              {/* Avatar upload */}
              <ProfileAvatarEditor
                user={user}
                currentUser={currentUser}
                inputRef={inputRef}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
                croppedImage={croppedImage}
                setOpenModal={setOpenModal}
              />

              {/* Name & Designation */}
              <h2 className="mt-2 text-xl font-semibold text-black dark:text-foreground sm:text-2xl">
                {user?.name || "Unnamed"}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground sm:text-base">
                {user?.designation || "Researcher"} <br />
                {user?.location || "India"}
              </p>

              {/* Stats */}
              <TabStatsGrid user={user} post={{ postCount: posts.length }} />

              {/* Follow/Edit buttons */}
              <ProfileFollowButton
                user={user}
                currentUser={currentUser}
                onEditClick={() => setIsEditOpen(true)}
              />

              {/* Tabs */}
              <div className="mt-6 w-full max-w-4xl px-4">
                {/* The grid classes are replaced with flex */}
                <TabsList className="flex w-full">
                  {/* Each trigger gets 'flex-1' to evenly distribute space */}
                  <TabsTrigger value="feed" className="flex-1 dark:text-offwhite">
                    Feed
                  </TabsTrigger>
                  <TabsTrigger value="about" className="flex-1 dark:text-offwhite">
                    About
                  </TabsTrigger>
                  {/* <TabsTrigger value="following" className="flex-1 dark:text-offwhite">
                    Research
                  </TabsTrigger> */}
                  <TabsTrigger value="following" className="flex-1 dark:text-offwhite">
                    Following
                  </TabsTrigger>
                  <TabsTrigger value="followers" className="flex-1 dark:text-offwhite">
                    Followers
                  </TabsTrigger>
                  <TabsTrigger value="communities" className="flex-1 dark:text-offwhite">
                    Communities
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </Card>

          <ProfileTabsContent posts={posts} isPostLoading={isPostLoading} />
        </Tabs>
      </div>

      {/* Modals */}
      <EditProfileModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialValues={{
          name: user.name || "",
          designation: user.designation || "",
          location: user.location || "",
        }}
        refetchUser={() => {}}
      />

      {openModal && (
        <ImageCropperModal
          imageSrc={imageSrc}
          open={openModal}
          onClose={() => setOpenModal(false)}
          aspect={1 / 1}
          onCropped={(blob) => {
            setOpenModal(false);
            const url = URL.createObjectURL(blob);
            setCroppedImage(url);
          }}
        />
      )}
    </>
  );
}
