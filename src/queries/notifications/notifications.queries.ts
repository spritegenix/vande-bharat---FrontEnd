import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "./notifications.api";
import { useAuthAxios } from "@/lib/axios";
import { NotificationFilter } from "@/types/notification";

export const useFetchNotifications = (page: number, filter: NotificationFilter) => {
  const axios = useAuthAxios();
  return useQuery({
    queryKey: ["notifications", page, filter],
    queryFn: () => fetchNotifications(axios, { page, filter }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
