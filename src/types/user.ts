export interface User {
  _id?: string;
  userId?: string;
  slug?: string;
  email?: string;
  name?: string;
  role?: 'user' | 'admin' | string;
  bio?: string;
  interest?: string[];
  avatar?: string;
  banner?: string;
  mobileNumber?: string;
  countryCode?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  socialLinks?: any[]; // Or define a SocialLink[] interface if structured
  posts?: any[];       // Or Post[]
  likes?: any[];
  comments?: any[];
  followers?: any[];
  following?: any[];
  pages?: any[];
  communities?: any[];
  likeCount?: number;
  followerCount?: number;
  followingCount?: number;
  commentCount?: number;
  isVerified?: boolean;
  isHidden?: boolean;
  isBlocked?: boolean;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
