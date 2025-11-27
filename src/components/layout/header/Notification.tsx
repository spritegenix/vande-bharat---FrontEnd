"use client";
import React, { useEffect } from "react"; // Removed useState as it's not needed with react-query
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dot } from "lucide-react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthAxios } from "@/lib/axios";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/queries/notifications/notifications.api";
import { INotification } from "@/types/notification"; // INotification is now correctly exported
import { userAvatar } from "@/app/assets"; // Assuming userAvatar is an asset
import { messagingInstance } from "@/customHooks/useFcmToken"; // Import the shared messaging instance
import { onMessage } from "firebase/messaging"; // Only onMessage is needed here

function NotificationTooltipWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" className="px-2 py-1 text-xs">
          Notifications
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Notification() {
  const axiosAuth = useAuthAxios();
  const queryClient = useQueryClient();

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(axiosAuth, { page: 1, filter: "all" }),
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!axiosAuth, // Only fetch if axiosAuth is ready
    select: (data) => data.notifications,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) => markNotificationAsRead(axiosAuth, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(axiosAuth),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const unreadCount = notificationsData?.filter((n: INotification) => !n.isRead).length || 0;

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleNotificationClick = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
    // Optionally navigate to notification.clickAction if available
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && messagingInstance) {
      // Set up onMessage listener for foreground notifications
      const unsubscribe = onMessage(messagingInstance, (payload) => {
        console.log("Foreground FCM message received in Notification component:", payload);
        // Invalidate queries to re-fetch notifications from backend
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        // Optionally display a toast for foreground notifications
        // toast({ title: payload.notification?.title, description: payload.notification?.body });
      });

      return () => unsubscribe(); // Clean up the listener on component unmount
    }
  }, [queryClient]);

  // Helper to format timestamp (you might have a global utility for this)
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  if (isLoading) {
    return (
      <NotificationTooltipWrapper>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <IoMdNotificationsOutline className="animate-pulse text-3xl" />
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-1">
              <div className="flex items-baseline justify-between gap-4 px-3 py-2">
                <div className="text-sm font-semibold">Notifications</div>
              </div>
              <div
                role="separator"
                aria-orientation="horizontal"
                className="-mx-1 my-1 h-px bg-border"
              ></div>
              <p className="px-3 py-2 text-sm text-muted-foreground">Loading notifications...</p>
            </PopoverContent>
          </Popover>
        </div>
      </NotificationTooltipWrapper>
    );
  }

  return (
    <NotificationTooltipWrapper>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 left-full size-4 -translate-x-4 rounded-full border-background p-1 text-white">
                  {unreadCount}
                </Badge>
              )}
              <IoMdNotificationsOutline className="text-3xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-1">
            <div className="flex items-baseline justify-between gap-4 px-3 py-2">
              <div className="text-sm font-semibold">Notifications</div>
              {unreadCount > 0 && (
                <p
                  className="cursor-pointer text-xs font-medium hover:underline"
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </p>
              )}
            </div>
            <div
              role="separator"
              aria-orientation="horizontal"
              className="-mx-1 my-1 h-px bg-border"
            ></div>
            {notificationsData && notificationsData.length > 0 ? (
              notificationsData.map((notification: INotification) => (
                <div
                  key={notification._id}
                  className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                >
                  <div className="relative flex items-start gap-3 pe-3">
                    <Image
                      src={notification.senderId?.avatar || userAvatar} // Use sender's avatar or default
                      className="size-9 rounded-md"
                      width={32}
                      height={32}
                      alt={notification.senderId?.name || "User"}
                    />
                    <div className="flex-1 space-y-1">
                      <p
                        className="text-foreground/80 cursor-pointer text-left after:absolute after:inset-0"
                        onClick={() => handleNotificationClick(notification._id)}
                      >
                        <span className="font-medium text-foreground hover:underline">
                          {notification.senderId?.name || "Someone"}
                        </span>{" "}
                        {notification.message}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.createdAt)}
                      </div>
                    </div>
                    {!notification.isRead && (
                      <div className="absolute end-0 self-center">
                        <Dot className="size-4 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="px-3 py-2 text-sm text-muted-foreground">No new notifications.</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </NotificationTooltipWrapper>
  );
}
