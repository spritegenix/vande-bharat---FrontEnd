
import page from '@/app/(Main)/bookmarks/page';
import axios from '@/lib/axios';
import { toast } from 'sonner';

export const fetchCurrentUser = async (query?: Record<string, any>) => {
  const res = await axios.get('/users/me', {
    withCredentials: true,
    params: query, 
  });
  return res.data.data;
};

export const fetchUserById = async (slug?:string) => {
  const res = await axios.get(`/users/${slug}/single`, {
    withCredentials: true,
  });
  return res.data.data;
};

// export const fetchFollowingProfiles = async()=>{
//   const res = await axios.get("/users/followed", {withCredentials:true})
//   console.log("users",res)
//   return res.data
// }

export const fetchSuggestions = async(pageParam = "")=> {
  const res = await axios.get("/users/suggestions",  {params:{
    cursor: pageParam,
    limit:3
  }, withCredentials:true})
 
  return res.data
}


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

export const updateUserProfile = async (payload: unknown) => {
  return await axios.patch("/users/me", {
    payload
  });
};
export const updateUserProfilePic = async (imageUrl: string) => {
  return await axios.patch("/users/me", {
    avatar: imageUrl,
  });
};

export const sendFollowRequest = async(id:string)=>{
  const response = await axios.post(`users/follow-request/${id}/send`)
  return response.data
}

export const allSentRequests = async(pageParam = "")=> {
  const res = await axios.get("users/sent-requests", {params:{
    limit:3,
    cursor: pageParam,
  } , withCredentials:true})
  return res.data
}

export const cancelRequest = async(toUserId:string)=> {
  const res = await axios.patch(`users/follow-request/${toUserId}/cancel`)
  return res.data
}

export const removeSuggestion = async(toUserId:string)=> {
  const res = await axios.patch(`users/suggestions/${toUserId}/delete`)
  return res.data
}

export const acceptFollowRequest = async(fromUserId:string)=> {
  const res = await axios.patch(`users/follow-request/${fromUserId}/accept`)
  return res.data
}

export const allFollowRequests = async(pageParam = "")=>{
  const res = await axios.get("users/recieved-requests",  {params:{
    limit:3,
    cursor: pageParam,
  } , withCredentials:true})
  return res.data
}


// export const followingUsers = async(pageParam = "") => {
//   const res = await axios.get("users/following", {params:{
//     limit:3,
//     cursor: pageParam,
//   } , withCredentials:true})
//   return res.data
// }

export const Usersfollowers = async(slug: string,pageParam = "") => {
  if (!slug) throw new Error("Slug is required for fetching followed users");
  const res = await axios.get(`users/followers/${slug}`, {params:{
    limit:3,
    cursor: pageParam,
  } , withCredentials:true})
  
  return res.data
}
export const followingUsers = async (slug: string, pageParam = "") => {
  if (!slug) throw new Error("Slug is required for fetching followed users");
  console.log(slug)
  const res = await axios.get(`users/following/${slug}`, {
    params: {  limit:3,
    cursor: pageParam},
    withCredentials: true,
  });
  return res.data;
};
export const unfriendUser = async(toUserId:string) => {
  const res = await axios.patch(`users/following/${toUserId}/unfriend`)
  return res.data
}

