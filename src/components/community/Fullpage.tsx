import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Feed from "../Feed";
import FeedsSection from "../FeedsSection";
import { useFetchUserPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { MembersTab } from "./home/Card";
import { DiscussionTab } from "./home/DiscussionTab";
import EventsTab from "./home/EventsTab";
import AboutTab from "./home/AboutTab";
import AboutTabEditor from "./home/AboutTab";
import CommunityBanner from "./home/CommunityBanner";
import { useFetchCommunityPosts } from "@/queries/community/community.queries";
export default function Fullpage({ communitySlug }: { communitySlug: string }) {
  const { user } = useUserStore();

  const tabOptions = ["Feed", "Discussion", "Members", "Events", "About"];
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchCommunityPosts(communitySlug);
  // const allCommunityPosts = data?.pages.flatMap((page) => page.posts) ?? [];
  return (
    <main id="main-content" className="bg-neutral-50">
      <div className="mx-auto max-w-6xl">
        {/* <!-- Community Banner --> */}
        <CommunityBanner />
        {/* 
    <!-- Navigation Tabs --> */}

        <div
          id="community-tabs"
          className="sticky top-12 z-40 border-b border-neutral-200 bg-white py-4 dark:border-neutral-700 dark:bg-neutral-900"
        >
          <Tabs defaultValue="feed">
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
            {/* <TabsList className="w-full justify-start space-x-4 border-none bg-transparent p-0">
                <TabsTrigger
                  value="feed"
                  className="border-b-2 border-transparent px-1 text-sm text-neutral-500 hover:text-neutral-700 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 dark:text-neutral-400 dark:hover:text-white dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                >
                  Feed
                </TabsTrigger>
                <TabsTrigger
                  value="discussion"
                  className="border-b-2 border-transparent px-1 text-sm text-neutral-500 hover:text-neutral-700 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 dark:text-neutral-400 dark:hover:text-white dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                >
                  Discussion
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="border-b-2 border-transparent px-1 text-sm text-neutral-500 hover:text-neutral-700 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 dark:text-neutral-400 dark:hover:text-white dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                >
                  Members
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="border-b-2 border-transparent px-1 text-sm text-neutral-500 hover:text-neutral-700 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 dark:text-neutral-400 dark:hover:text-white dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="border-b-2 border-transparent px-1 text-sm text-neutral-500 hover:text-neutral-700 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 dark:text-neutral-400 dark:hover:text-white dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="border-b-2 border-transparent px-1 text-sm text-neutral-500 hover:text-neutral-700 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 dark:text-neutral-400 dark:hover:text-white dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                >
                  About
                </TabsTrigger>
              </TabsList> */}
            <TabsContent value="feed">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                  <Feed user={user} communitySlug={communitySlug} />
                  <FeedsSection
                    isLoading={isLoading}
                    isError={isError}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    posts={data?.pages.flatMap((page) => page.posts) || []}
                    showOwnPostsOnly={true}
                    slug={communitySlug}
                  />
                </div>
                <div id="community-sidebar" className="col-span-4">
                  <div className="space-y-6">
                    {/* Community Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Community Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Total Members</span>
                          <span className="font-medium text-foreground">12,547</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Posts This Week</span>
                          <span className="font-medium text-foreground">89</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Today</span>
                          <span className="font-medium text-foreground">234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Growth Rate</span>
                          <span className="text-green-600 dark:text-green-400">+12%</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Community Guidelines */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Community Guidelines</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>1. Share authentic architectural content</p>
                        <p>2. Respect all community members</p>
                        <p>3. No spam or promotional content</p>
                        <p>4. Credit sources and authors</p>
                      </CardContent>
                    </Card>

                    {/* New Members */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">New Members</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { name: "Amit Kumar", date: "Joined today", seed: "111" },
                          { name: "Sarah Patel", date: "Joined yesterday", seed: "222" },
                          { name: "Ravi Joshi", date: "Joined 2 days ago", seed: "333" },
                        ].map((member) => (
                          <div key={member.seed} className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.seed}`}
                                alt={member.name}
                              />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.date}</p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Upcoming Events */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Upcoming Events</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          {
                            title: "Temple Architecture Workshop",
                            date: "March 25, 2025 • 2:00 PM",
                          },
                          {
                            title: "Heritage Site Visit",
                            date: "April 2, 2025 • 9:00 AM",
                          },
                        ].map((event, idx) => (
                          <div key={idx} className="space-y-1 rounded border border-muted p-3">
                            <h5 className="text-sm font-medium text-foreground">{event.title}</h5>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                            <Button size="sm" className="w-full">
                              Join Event
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="discussion">
              <DiscussionTab />
            </TabsContent>
            <TabsContent value="members">
              <MembersTab />
            </TabsContent>
            <TabsContent value="events">
              <EventsTab />
            </TabsContent>
            <TabsContent value="about">
              <AboutTabEditor
                aboutContent={{
                  vision: "To preserve architectural heritage through education.",
                  mission: "Empower communities via awareness and collaboration.",
                  objectives: "• Organize events\n• Conduct tours\n• Publish research",
                }}
                onSubmit={(data) => {
                  // e.g. call mutation
                  console.log("Submitted:", data);
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
