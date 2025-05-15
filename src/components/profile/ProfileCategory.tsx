import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Feed from "../Feed";
import FeedsSection from "../FeedsSection";
import About from "./about/About";
import FollowingProfileList from "./FollowingProfile";

export default function ProfileCategory() {
  return (
    <>
      <Tabs defaultValue="posts" className="mt-5 border-t-2">
        <TabsList className="flex justify-start bg-transparent md:gap-6">
          {["posts", "about", "Following Profiles", "Communities"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="px-2 py-1 transition data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:shadow-none"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="posts">
          <Feed />
          <FeedsSection />
        </TabsContent>
        <TabsContent value="about">
          <About />
        </TabsContent>
        <TabsContent value="Following Profiles">
          <FollowingProfileList />
        </TabsContent>
        <TabsContent value="Communities">
          <About />
        </TabsContent>
      </Tabs>
    </>
  );
}
