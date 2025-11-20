import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead, markAllNotificationsAsRead } from "./notifications.api";
import { useAuthAxios } from "@/lib/axios";
import { NotificationFilter } from "@/types/notification";

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation({
    mutationFn: (notificationId: string) => markNotificationAsRead(axios, notificationId),
    onSuccess: () => {
      // Invalidate all notification queries to refetch and update unread counts
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const axios = useAuthAxios();

  return useMutation({
    mutationFn: () => markAllNotificationsAsRead(axios),
    onSuccess: () => {
      // Invalidate all notification queries to refetch
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
