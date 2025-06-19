export interface Attachment {
  url: string;
  type: "IMAGE" | "VIDEO";
  fileName: string;
  mimeType: string;
  size?: number;
  width?: number;
  height?: number;
  duration?: number;
  uploadedAt?: string;
}

export interface CreatePostPayload {
  content: string;
  attachments: Attachment[];
  tags?: string[];
  pageId?: string | null;
  communityId?: string | null;
  isHidden?: boolean;
}




export type PostUser = {
  _id: string;
  userId: string;
  slug: string;
  name: string;
  avatar: string;
};

interface UserInfo {
  
  slug: string;
  name: string;
  avatar: string;
}

interface CommunityInfo {
  name: string;
  slug: string;
  avatar: string;
}


export interface Comment {
   _id: string;
  userId: UserInfo;
  content: string;
  createdAt: string;
}
export interface Post {
  imageUrl?: string | undefined;
  _id: string;
  content: string;
  tags?: string[];
  userId: UserInfo
  communityId?: CommunityInfo | null;
  pageId?: string | null;
  attachments: Attachment[];

  createdAt: string;
  updatedAt?: string;

  likeCount: number;
  commentCount?: number;
  comments?: Comment[]; // If available, otherwise you can replace with your actual Comment[] type

  score?: number;
  isDeleted?: boolean;
  deletedAt?: string | null;
  isHidden?: boolean;
  linkedNotifications?: string[];
  isLiked?: boolean;         
  isBookmarked?: boolean;    
  // Add any other fields dynamically returned by your backend if needed
}




