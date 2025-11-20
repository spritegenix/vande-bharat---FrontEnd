import { AxiosInstance } from "axios";
import { PaginatedResponse, NotificationFilter } from "@/types/notification";

export const fetchNotifications = async (
  axios: AxiosInstance,
  params: { page: number; filter: NotificationFilter },
): Promise<PaginatedResponse> => {
  const response = await axios.get("/notifications", { params });
  return response.data;
};

export const markNotificationAsRead = async (
  axios: AxiosInstance,
  notificationId: string,
): Promise<any> => {
  const response = await axios.put(`/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllNotificationsAsRead = async (axios: AxiosInstance): Promise<any> => {
  const response = await axios.put("/notifications/read-all");
  return response.data;
};
