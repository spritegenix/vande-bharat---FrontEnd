"use client";

import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useUserStore } from "@/stores/userStore";
import { useUserById } from "@/queries/user/user.queries";
import { useFetchUserPosts } from "@/queries/posts/posts.queries";
import ProfileHeaderLayout from "./ProfileHeaderLayout";
import ProfileSkeleton from "./ProfileSkeleton";

export default function ProfileHeader() {
  const { slug } = useParams();
  const { user: currentUser } = useUserStore();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserById(slug as string);

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useFetchUserPosts(slug as string);

  const posts = postData?.pages?.flatMap((page) => page.posts) || [];

  if (isUserLoading) return <ProfileSkeleton />;
  if (isUserError || !user) {
    return <p className="mt-4 text-center text-red-500">Failed to load user.</p>;
  }

  return (
    <ProfileHeaderLayout
      user={user}
      posts={posts}
      isPostLoading={isPostLoading}
      currentUser={currentUser}
    />
  );
}
