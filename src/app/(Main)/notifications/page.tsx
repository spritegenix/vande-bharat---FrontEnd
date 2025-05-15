"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dot, MessageSquareDot } from "lucide-react";

type NotificationType = {
  id: string;
  message: string;
  isRead: boolean;
  date: string;
};

const mockNotifications: NotificationType[] = [
  { id: "1", message: "Welcome to Vande Bharat!", isRead: false, date: "2025-05-15" },
  { id: "2", message: "Your post got 5 likes.", isRead: true, date: "2025-05-14" },
  { id: "3", message: "New comment on your community.", isRead: false, date: "2025-05-13" },
];

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationType[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "read") return n.isRead;
    if (filter === "unread") return !n.isRead;
    return true;
  });

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Notifications</h1>
        <Button variant="outline" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All
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
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-md border px-4 py-3 text-sm text-gray-600 ${
                n.isRead ? "bg-gray-200" : "bg-white font-medium"
              }`}
            >
              <div className="flex justify-between">
                <p>{n.message}</p>
                {!n.isRead && <MessageSquareDot size={20} className="text-primary" />}
              </div>
              <span className="text-xs text-gray-400">{n.date}</span>
            </div>
          ))
        ) : (
          <p className="mt-10 text-center text-gray-500">No notifications found.</p>
        )}
      </div>
    </div>
  );
}
