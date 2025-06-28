import React from "react";
import { AboutSidebar } from "./AboutSidebar";
import { AboutSection } from "./AboutSection";
import Box from "@/components/elements/Box";
import AboutUsForm from "./forms/AboutUsForm";
import { useUserById } from "@/queries/user/user.queries";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

export default function About({ slug }: { slug?: string }) {
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData(["user-by-id", slug]) as User;

  return (
    <Box className="mx-4 flex flex-col gap-6 md:max-w-screen-md md:flex-row xl:mx-auto xl:max-w-screen-md">
      {/* <aside className="w-full border-b-2 px-2 py-6 pr-3 md:w-64 md:border-b-0 md:border-r-2 md:border-gray-500">
        <AboutSidebar />
      </aside>
      <main className="flex-1 px-2 py-6 pr-3">
        <AboutSection />
      </main> */}
      <div className="flex-1 px-4">
        <AboutUsForm userData={cachedUser.bio} userId={cachedUser._id} />
      </div>
    </Box>
  );
}
