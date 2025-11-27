export interface INotification {
  // Changed to interface and INotification
  _id: string;
  recipientId: string;
  senderId: {
    _id: string;
    name: string;
    avatar: string;
    slug?: string;
  };
  type: "friend_request" | "like" | "comment" | "mention" | "community_invite";
  title: string;
  message: string;
  isRead: boolean;
  postId?: string; // Changed to string for better type safety
  commentId?: string; // Changed to string for better type safety
  communityId?: string; // Changed to string for better type safety
  requestId?: string; // Changed to string for better type safety
  createdAt: string;
}

export type PaginatedResponse = {
  notifications: INotification[]; // Updated to INotification
  pagination: {
    currentPage: number;
    totalPages: number;
    totalNotifications: number;
  };
};

export type NotificationFilter = "all" | "read" | "unread";
