"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import FeedsSection from "../FeedsSection";
import Feed from "../Feed";
import FollowingProfileList from "./FollowingProfile";
import About from "./about/About";
import { useFetchUserPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";

const tabOptions = ["posts", "about", "Following Profiles", "Communities"];

export default function ProfileTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, isError } = useFetchUserPosts();
  const queryTab = searchParams.get("tab")?.toLowerCase() || "posts";
  const [selectedTab, setSelectedTab] = useState(queryTab);
  const { user } = useUserStore();
  useEffect(() => {
    setSelectedTab(queryTab);
  }, [queryTab]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value.toLowerCase());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={selectedTab} onValueChange={handleTabChange} className="mt-5 border-t-2">
      <TabsList className="flex justify-start bg-transparent md:gap-6">
        {tabOptions.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab.toLowerCase()}
            className="px-2 py-1 transition data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="posts">
        <Feed user={user} />
        <FeedsSection posts={data} isError={isError} isLoading={isLoading} showOwnPostsOnly />
      </TabsContent>

      <TabsContent value="about">
        <About />
      </TabsContent>

      <TabsContent value="following profiles">
        <FollowingProfileList />
      </TabsContent>

      <TabsContent value="communities">
        <About />
      </TabsContent>
    </Tabs>
  );
}
