export type NotificationType = {
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
  postId?: any;
  commentId?: any;
  communityId?: any;
  requestId?: any;
  createdAt: string;
};

export type PaginatedResponse = {
  notifications: NotificationType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalNotifications: number;
  };
};

export type NotificationFilter = "all" | "read" | "unread";
