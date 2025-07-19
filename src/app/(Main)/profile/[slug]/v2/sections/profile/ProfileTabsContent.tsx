"use client";

import { TabsContent } from "@/components/ui/tabs";
import AboutSection from "../about";
import ResearchPublications from "../research";
import FollowingSection from "../following";
import FollowerSection from "../followers";
import PostCard from "../post";

export default function ProfileTabsContent({ posts, isPostLoading }: any) {
  return (
    <div className="mt-6">
      <TabsContent value="feed">
        {isPostLoading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post: any) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </TabsContent>

      <TabsContent value="about">
        <AboutSection />
      </TabsContent>

      {/* <TabsContent value="research">
        <ResearchPublications />
      </TabsContent> */}

      <TabsContent value="following">
        <FollowingSection />
      </TabsContent>

      <TabsContent value="followers">
        <FollowerSection />
      </TabsContent>

      <TabsContent value="communities">
        <p className="text-center text-gray-500 dark:text-foreground">Coming soon...</p>
      </TabsContent>
    </div>
  );
}
