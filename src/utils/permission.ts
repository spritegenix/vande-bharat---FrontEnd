import { UserInfo } from "@/stores/userStore";
import { aboutContentType } from "@/types/community";

export const canManageContent = ({
  user,
  content,
}: {
  user: UserInfo;
  content: aboutContentType;
}) => {
  return user?._id === content?.owner._id || content?.admins?.some((admin) => admin === user?._id);
};
