// hooks/useUploadMedia.ts
import { useAuthAxios } from "@/lib/axios";
import Env from "@/lib/env";
import { getPresignedUrl, uploadToS3 } from "@/queries/user/user.api";
import { getImageMetadata, getVideoDuration } from "@/stores/editorStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

type MediaFolder = "posts" | "avatars" | "covers" | "products";

// Helper function to upload a single file and return the full media object
const uploadSingleMediaFile = async (
  axios: AxiosInstance,
  file: File,
  folder: MediaFolder,
): Promise<any> => {
  const { uploadUrl, fileUrl } = await getPresignedUrl(axios, file, folder);
  if (!uploadUrl || !fileUrl) throw new Error("Missing uploadUrl or fileUrl");
  await uploadToS3(axios, uploadUrl, file);

  const media: any = {
    url: fileUrl,
    type: file.type.startsWith("image/") ? "IMAGE" : "VIDEO",
    fileName: file.name,
    mimeType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };

  if (file.type.startsWith("image/")) {
    const { width, height } = await getImageMetadata(file);
    media.width = width;
    media.height = height;
  }

  if (file.type.startsWith("video/")) {
    const duration = await getVideoDuration(file);
    media.duration = duration;
  }

  return media;
};

export const useUploadMedia = (axios: AxiosInstance, folder: MediaFolder) => {
  return useMutation({
    mutationFn: async (filesToUpload: File | File[]): Promise<any | any[]> => {
      if (Array.isArray(filesToUpload)) {
        const uploadedMediaObjects = await Promise.all(
          filesToUpload.map((file) => uploadSingleMediaFile(axios, file, folder)),
        );
        return uploadedMediaObjects;
      } else {
        const uploadedMediaObject = await uploadSingleMediaFile(axios, filesToUpload, folder);
        return uploadedMediaObject;
      }
    },
  });
};
