"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageCropperModal from "@/components/common/ImageCropperModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPresignedUrl, updateUserCover, uploadToS3 } from "@/queries/user/user.api";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useAuthAxios } from "@/lib/axios";
import { updateCommunityInfo } from "@/queries/community/community.api";
export default function CoverImage({
  coverImage,
  entityType,
  canEdit,
}: {
  coverImage?: string;
  entityType: string;
  canEdit: boolean;
}) {
  const [modelOpen, setModelOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(
    coverImage || "/images/profile/coverplaceholder.jpg",
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (coverImage) {
      setSelectedImage(coverImage);
    }
  }, [coverImage]);
  const axios = useAuthAxios();
  const slug = usePathname();
  const communitySlug = slug.startsWith("/community/") && slug.split("/community/")[1];

  const queryClient = useQueryClient();
  const updateCoverMutation = useMutation({
    mutationFn: async (blob: Blob) => {
      try {
        const file = new File([blob], "cover.jpg", { type: blob.type });

        const { uploadUrl, fileUrl } = await getPresignedUrl(axios, file, "covers");

        if (!uploadUrl || !fileUrl) {
          throw new Error("2. Failed to get pre-signed URL from backend");
        }

        await uploadToS3(axios, uploadUrl, file);

        // Use community update instead of user update
        if (entityType === "community" && communitySlug) {
          // Use your existing hook's mutation function directly
          await updateCommunityInfo(axios, {
            communitySlug,
            payload: { banner: fileUrl },
          });
        } else {
          await updateUserCover(axios, fileUrl);
        }
        return fileUrl;
      } catch (err) {
        console.error("❌ Mutation failed:", err);
        throw err; // rethrow so onError gets triggered
      }
    },
    onSuccess: (fileUrl) => {
      toast.success("Cover photo updated!");
      if (entityType === "community") {
        queryClient.invalidateQueries({ queryKey: ["community-by-slug"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["user-by-id"] });
      }
    },
    onError: (err: any) => {
      toast.error("Failed to update cover photo.");
      console.error("onError:", err?.message || err);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setModelOpen(true); // open crop modal after selecting
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative h-[150px] w-full md:h-[350px] lg:h-[400px]">
      <Image
        src={imageSrc || selectedImage}
        alt="Cover"
        fill
        className="object-cover object-center"
        priority
      />
      {canEdit && (
        <div className="absolute bottom-0 right-0 z-20 m-5">
          <Button
            type="button"
            className="bg-offwhite text-gray-900"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
                fileInputRef.current.click();
              }
            }}
          >
            <Camera className="mr-2 h-4 w-4" />
            <span className="hidden md:flex">Add cover photo</span>
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {modelOpen && (
        <ImageCropperModal
          imageSrc={selectedImage}
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
          onCropped={(blob) => {
            setModelOpen(false);
            const url = URL.createObjectURL(blob);
            setImageSrc(url); // set preview
            updateCoverMutation.mutate(blob);
          }}
        />
      )}
    </div>
  );
}
