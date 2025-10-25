import { z } from "zod";

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
  pageSlug?: string | null;
  communitySlug?: string | null | undefined;
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
  _id: string;
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
  requestStatus: string;
  imageUrl?: string | undefined;
  _id: string;
  isFollowed?: boolean;
  content: string;
  tags?: string[];
  userId: UserInfo;
  communitySlug?: CommunityInfo | null;
  pageSlug?: string | null;
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

export interface category {
  _id: string;
  name: string;
  description: string;
  order: number;
  slug: string;
}

export const marketplaceMediaObjectSchema = z.object({
  url: z.string().url("Attachment URL must be a valid URL"),
  type: z.enum(["IMAGE", "VIDEO"]), // Corrected to match IMedia
  fileName: z.string().min(1, "File name is required"),
  mimeType: z.string().min(1, "Mime type is required"),
  size: z.number().min(0, "Size cannot be negative"),
  width: z.number().optional(),
  height: z.number().optional(),
  duration: z.number().optional(),
  uploadedAt: z.string().optional(), // Corrected to z.string() to match ISO string from frontend
});
export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  condition: z.string(),
  location: z.string(),
  phoneNumber: z.string(),
  marketplaceCategoryId: z.string(),
  description: z.string(),
  images: z
    .array(z.union([z.instanceof(File), z.string(), marketplaceMediaObjectSchema])) // Allow existing string URLs, new File objects, or media objects
    .refine((files) => files.every((file) => !(file instanceof File) || file.size <= 1024 * 1024), {
      message: "Each image must be less than 1MB.",
    }),
  currency: z.string(),
});
