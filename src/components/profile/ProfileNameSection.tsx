import Image from "next/image";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Camera, Pencil } from "lucide-react";
import { Input } from "../ui/input";
import ImageCropperModal from "../common/ImageCropperModal";
import { useMutation } from "@tanstack/react-query";
import {
  getPresignedUrl,
  updateUserProfile,
  updateUserProfilePic,
  uploadToS3,
} from "@/queries/user/user.api";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import { useParams } from "next/navigation";

export default function ProfileNameSection({
  profileImage,
  name,
}: {
  profileImage: string;
  name: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    profileImage || "/images/profile/profile-img.webp",
  );
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const { user } = useUserStore();
  const slug = params.slug as string;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      setOpenModal(true);
    };
    reader.readAsDataURL(file);
  };
  const updateCoverMutation = useMutation({
    mutationFn: async (blob: Blob) => {
      try {
        const file = new File([blob], "profile.jpg", { type: blob.type });

        const { uploadUrl, fileUrl } = await getPresignedUrl(file, "avatars");

        if (!uploadUrl || !fileUrl) {
          throw new Error("2. Failed to get pre-signed URL from backend");
        }

        await uploadToS3(uploadUrl, file);

        await updateUserProfilePic(fileUrl);

        return fileUrl;
      } catch (err) {
        console.error("❌ Mutation failed:", err);
        throw err; // rethrow so onError gets triggered
      }
    },
    onSuccess: (fileUrl) => {
      toast.success("Profile photo updated!");
    },
    onError: (err: any) => {
      toast.error("Failed to update profile photo.");
      console.error("onError:", err?.message || err);
    },
  });

  return (
    <div className="absolute bottom-6 w-full md:-bottom-4 lg:-bottom-0">
      <div className="relative flex w-full flex-col items-center justify-between md:flex-row md:items-end">
        <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4">
          {/* Profile Image */}

          <div className="relative h-40 w-40 md:left-1/3 md:h-44 md:w-44 lg:left-4">
            <Image
              src={croppedImage || imageSrc}
              alt="Profile"
              fill
              className="aspect-square rounded-full border-4 border-white shadow-lg dark:border-black"
            />
            <div className="absolute bottom-5 right-2 rounded-full bg-offwhite p-1 dark:bg-gray-900">
              {user && slug && user.slug === slug && (
                <Button
                  type="button"
                  variant={"ghost"}
                  className="h-8 w-8 rounded-full p-0"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.value = ""; // ✅ reset before opening picker
                      inputRef.current.click();
                    }
                  }}
                >
                  <Camera />
                </Button>
              )}
              <Input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {openModal && (
              <ImageCropperModal
                imageSrc={imageSrc}
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                }}
                aspect={1 / 1}
                onCropped={(blob) => {
                  setOpenModal(false);
                  const url = URL.createObjectURL(blob);
                  setCroppedImage(url); // set preview
                  updateCoverMutation.mutate(blob);
                }}
              />
            )}
          </div>

          {/* Name */}
          <div className="m-5 text-center">
            <h2 className="text-xl font-semibold text-black drop-shadow-md dark:text-white md:text-2xl">
              {name}
            </h2>
          </div>
        </div>
        <div className="md:m-5 md:mr-9">
          <Button className="px-4 py-2 text-gray-900 dark:bg-offwhite">Follow</Button>
        </div>
      </div>
    </div>
  );
}
