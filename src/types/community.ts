export interface communityPost {
    name:string,
    description:string,
    banner:string,
    isPrivate:boolean
     tags?:string[],
    rules?:string[],
    location?:string,
    category?:string,
}

export interface CommunityDiscussionType {
    title:string,
    content:string
}


export interface updateCommunityInfoType {
    name?:string,
    description?:string,
    isPrivate?:boolean,
    tags?:string[],
    rules?:string[],
    location?:string,
    category?:string,
    banner?:string,
}



export type admin = {
  _id: string;
  slug: string;
};
export type aboutContentType = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  avatar: string;
  banner: string;
  rules: string[];
  category: string;
  location: string;
  owner: admin;
  admins: admin[];
  isprivate?: boolean;
  createdAt?: string;
  totalMemberCount?: number;  
  isMember?: boolean;

};

export interface AboutTabProps {
  aboutContent: aboutContentType;
  isLoading: boolean;
  isFetching: boolean;
}