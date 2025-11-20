"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareDot, User, ThumbsUp, MessageCircle, Users, Zap, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useFetchNotifications } from "@/queries/notifications/notifications.queries";
import {
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "@/queries/notifications/notifications.mutation";
import type { NotificationFilter, NotificationType } from "@/types/notification";

export default function NotificationPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const { data, isLoading, error, refetch } = useFetchNotifications(page, filter);
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const notifications = data?.notifications || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalNotifications = data?.pagination?.totalNotifications || 0;

  // Mark single notification as read
  const handleMarkAsRead = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  // Filter notifications locally (since we already have the data)
  const filteredNotifications = notifications.filter((n: NotificationType) => {
    if (filter === "read") return n.isRead;
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "friend_request":
        return <User className="h-4 w-4 text-blue-500" />;
      case "like":
        return <ThumbsUp className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-green-500" />;
      case "mention":
        return <MessageSquareDot className="h-4 w-4 text-purple-500" />;
      case "community_invite":
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return <MessageSquareDot className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Notifications</h1>
        {markAllAsReadMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={!notifications.length}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All ({totalNotifications})
        </Button>
        <Button
          variant={filter === "read" ? "default" : "outline"}
          onClick={() => setFilter("read")}
        >
          Read
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          onClick={() => setFilter("unread")}
        >
          Unread
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">
            <p>{error.message || "Failed to load notifications"}</p>
            <Button variant="outline" className="mt-2" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((n: NotificationType) => (
            <div
              key={n._id}
              className={`rounded-md border p-4 text-sm transition-colors hover:bg-gray-50 ${
                n.isRead ? "bg-gray-50" : "bg-white font-medium shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-1 items-start gap-3">
                  {getNotificationIcon(n.type)}
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-gray-900">{n.message}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </span>
                      {!n.isRead && <MessageSquareDot size={16} className="text-primary" />}
                    </div>
                  </div>
                </div>
                {!n.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(n._id!)}
                    className="text-xs"
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <MessageSquareDot className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="mb-2 text-gray-500">No notifications found.</p>
            <p className="text-xs text-gray-400">
              {filter === "unread"
                ? "You have no unread notifications."
                : "Start connecting to receive notifications!"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <span className="flex items-center px-3 text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
