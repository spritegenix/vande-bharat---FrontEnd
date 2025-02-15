"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Badge } from "@/components/ui/badge";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dot } from "lucide-react";
import { userAvatar } from "@/app/assets";
import Image from "next/image";

function NotificationTooltipWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" className="px-2 py-1 text-xs" showArrow={true}>
          Inbox
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    );
  };

  return (
    <NotificationTooltipWrapper>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Badge className="absolute -top-1 left-full size-4 -translate-x-4 rounded-full border-background p-1 text-white">
                6
              </Badge>
              <IoMdNotificationsOutline className="text-3xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-1">
            <div className="flex items-baseline justify-between gap-4 px-3 py-2">
              <div className="text-sm font-semibold">Notifications</div>
              {unreadCount > 0 && (
                <p className="text-xs font-medium hover:underline" onClick={handleMarkAllAsRead}>
                  Mark all as read
                </p>
              )}
            </div>
            <div
              role="separator"
              aria-orientation="horizontal"
              className="-mx-1 my-1 h-px bg-border"
            ></div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                <div className="relative flex items-start gap-3 pe-3">
                  <Image
                    src={notification.image.userAvatar}
                    className="size-9 rounded-md"
                    width={32}
                    height={32}
                    alt={notification.user}
                  />
                  <div className="flex-1 space-y-1">
                    <p
                      className="text-left text-foreground/80 after:absolute after:inset-0"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <span className="font-medium text-foreground hover:underline">
                        {notification.user}
                      </span>{" "}
                      {notification.action}{" "}
                      <span className="font-medium text-foreground hover:underline">
                        {notification.target}
                      </span>
                      .
                    </p>
                    <div className="text-xs text-muted-foreground">{notification.timestamp}</div>
                  </div>
                  {notification.unread && (
                    <div className="absolute end-0 self-center">
                      <Dot />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </NotificationTooltipWrapper>
  );
}

const initialNotifications = [
  {
    id: 1,
    image: { userAvatar },
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    image: { userAvatar },
    user: "Emma Davis",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    image: { userAvatar },
    user: "James Wilson",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    image: { userAvatar },
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    image: { userAvatar },
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    image: { userAvatar },
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    unread: false,
  },
];
