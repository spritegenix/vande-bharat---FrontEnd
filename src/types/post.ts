export interface Attachment {
  url: string;
  type: "IMAGE" | "VIDEO";
  fileName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  uploadedAt: string;
}

export interface CreatePostPayload {
  content: string;
  attachments: Attachment[];
  tags?: string[];
  pageId?: string | null;
  communityId?: string | null;
  isHidden?: boolean;
}
