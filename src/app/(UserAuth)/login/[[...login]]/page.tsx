"use client";
import { useCurrentUser } from "@/queries/user/user.queries";
import { useUserStore } from "@/stores/userStore";
import { SignIn } from "@clerk/nextjs";
import React, { useEffect } from "react";

export default function page() {
  const { data: user, isLoading, isError } = useCurrentUser({ fields: "banner,name,avatar,slug" });
  const { setUser } = useUserStore();
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignIn />
    </main>
  );
}
