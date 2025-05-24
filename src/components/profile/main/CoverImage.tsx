"use client";

import React, { useRef, useState } from "react";
import ImageCropperModal from "@/components/common/ImageCropperModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { getPresignedUrl, updateUserCover, uploadToS3 } from "@/queries/user/user.api";
import { toast } from "sonner";
export default function CoverImage({ coverImage }: { coverImage?: string }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(
    coverImage || "/images/profile/coverplaceholder.jpg",
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateCoverMutation = useMutation({
    mutationFn: async (blob: Blob) => {
      try {
        const file = new File([blob], "cover.jpg", { type: blob.type });

        const { uploadUrl, fileUrl } = await getPresignedUrl(file, "covers");

        if (!uploadUrl || !fileUrl) {
          throw new Error("2. Failed to get pre-signed URL from backend");
        }

        await uploadToS3(uploadUrl, file);

        await updateUserCover(fileUrl);

        return fileUrl;
      } catch (err) {
        console.error("❌ Mutation failed:", err);
        throw err; // rethrow so onError gets triggered
      }
    },
    onSuccess: (fileUrl) => {
      toast.success("Cover photo updated!");
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
      setImageSrc(reader.result as string);
      setModelOpen(true); // open crop modal after selecting
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative h-[150px] w-full md:h-[350px] lg:h-[400px]">
      <Image
        src={croppedImage || imageSrc}
        alt="Cover"
        fill
        className="object-cover object-center"
        priority
      />
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

      {modelOpen && (
        <ImageCropperModal
          imageSrc={imageSrc}
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
          onCropped={(blob) => {
            setModelOpen(false);
            const url = URL.createObjectURL(blob);
            setCroppedImage(url); // set preview
            updateCoverMutation.mutate(blob);
          }}
        />
      )}
    </div>
  );
}
