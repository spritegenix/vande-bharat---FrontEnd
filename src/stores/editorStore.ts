import { create } from "zustand";
import axios from "@/lib/axios";
import { CreatePostPayload } from "@/types/post";
import { isAxiosError } from "axios";
import { extractHashtags } from "@/utils/HashTagExtractor";
// Utility: Get image dimensions
const getImageMetadata = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = URL.createObjectURL(file);
  });
};

// Utility: Get video duration
const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => resolve(video.duration);
    video.src = URL.createObjectURL(file);
  });
};

interface EditorStore {
  draftText: string;
  tags:string[]
  draftFiles: File[];
  uploading: boolean;
// setTags:(text:string[])=>void
  setDraftText: (text: string) => void;
  setDraftFiles: (files: File[]) => void;
  removeDraftFile: (index: number) => void;
  setUploading: (uploading: boolean) => void;
  clearEditorState: () => void;

  submitPost: () => Promise<void>;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  draftText: "",
  draftFiles: [],
  tags:[],
  uploading: false,

  setDraftText: (text) => set({ draftText: text }),
  setDraftFiles: (files) => set({ draftFiles: files }),
  removeDraftFile: (index) =>
    set((state) => ({
      draftFiles: state.draftFiles.filter((_, i) => i !== index),
    })),
  setUploading: (uploading) => set({ uploading }),
  clearEditorState: () =>
    set({
      draftText: "",
      draftFiles: [],
      uploading: false,
    }),
 

  submitPost: async () => {
  const { draftText, draftFiles } = get();
  if (!draftText.trim() && draftFiles.length === 0) return;

  try {
    set({ uploading: true });

    const extractedTags = extractHashtags(draftText);
    set({ tags: extractedTags });

    const attachments: any[] = [];

    for (const file of draftFiles) {
      try {
  const { data: response } = await axios.post("/media/upload-url", {
    fileName: file.name,
    fileType: file.type,
    folder: "posts",
  });

  const uploadUrl = response?.data?.uploadUrl;
  const fileUrl = response?.data?.fileUrl;

  if (!uploadUrl || !fileUrl) {
    console.error("❌ Missing S3 URL in upload-url response", response);
    throw new Error(`Missing uploadUrl or fileUrl for ${file.name}`);
  }

  const uploadRes = await axios.put(uploadUrl, file, {
    headers: { "Content-Type": file.type },
  });

  if (uploadRes.status !== 200) {
    console.error("❌ Upload to S3 failed", uploadRes);
    throw new Error(`S3 upload failed for file: ${file.name}`);
  }

  const attachment: any = {
    url: fileUrl,
    type: file.type.startsWith("image/") ? "IMAGE" : "VIDEO",
    fileName: file.name,
    mimeType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };

  if (file.type.startsWith("image/")) {
    const { width, height } = await getImageMetadata(file);
    attachment.width = width;
    attachment.height = height;
  }

  if (file.type.startsWith("video/")) {
    const duration = await getVideoDuration(file);
    attachment.duration = duration;
  }

  attachments.push(attachment);
}  catch (uploadErr) {
        console.error(`❌ Failed to process file: ${file.name}`, uploadErr);
        continue; // move on to the next file
      }
    }

    const payload: CreatePostPayload = {
      content: draftText.trim(),
      tags: get().tags,
      isHidden: false,
      attachments,
    };

   

    const res = await axios.post("/posts/create-post", payload);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("❌ Post creation failed at backend");
    }

    get().clearEditorState();
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error("❌ Validation Error:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
      });
    } else {
      console.error("❌ Unexpected Error:", error);
    }
  } finally {
    set({ uploading: false });
  }
},

}));
