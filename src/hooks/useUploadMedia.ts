// hooks/useUploadMedia.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UploadUrlResponse {
  url: string;
  key: string;
}

export const useUploadMedia = (folder: "posts" | "avatars" | "covers") => {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const { data } = await axios.post<UploadUrlResponse>("http://localhost:4000/api/v1/media/upload-url", {
        fileName: file.name,
        fileType: file.type,
        folder,
      }, {withCredentials: true});

      await axios.put(data.url, file, {
        headers: { "Content-Type": file.type },
      });

      return data.key; // Final public S3 URL
    },
  });
};
