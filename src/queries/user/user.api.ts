
import axios from '@/lib/axios';
import { toast } from 'sonner';

export const fetchCurrentUser = async (query?: Record<string, any>) => {
  const res = await axios.get('/users/me', {
    withCredentials: true,
    params: query, // ✅ this appends query to the URL
  });
  return res.data.data;
};



 export const getPresignedUrl = async (file: File, folder:string) => {
  const extension = file.name.split('.').pop();
  const mime = file.type;

  const response = await axios.post("/media/upload-url", {
    fileName: file.name,
    fileType: mime,
    folder: folder, 
  });
  return response.data.data; // { uploadUrl, fileUrl }
};


export const uploadToS3 = async (uploadUrl: string, file: File | Blob) => {
  try {
    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (error: any) {
    toast.error("Image upload failed. Please try again.");
    throw new Error("Failed to upload file to S3");
  }
};

export const updateUserCover = async (imageUrl: string) => {
  return await axios.patch("/users/me", {
    banner: imageUrl,
  });
};


export const updateUserProfile = async (imageUrl: string) => {
  return await axios.patch("/users/me", {
    avatar: imageUrl,
  });
};