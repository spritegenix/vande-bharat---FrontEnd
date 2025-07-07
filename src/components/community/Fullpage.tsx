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
export default function Fullpage() {
  const user = useUserStore();
  const slug = "ashik-shetty";
  const tabOptions = ["Feed", "Discussion", "Members", "Events", "About"];
  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchUserPosts(slug);
  return (
    <main id="main-content" className="bg-neutral-50">
      <div className="mx-auto max-w-6xl">
        {/* <!-- Community Banner --> */}
        <div
          id="community-banner"
          className="overflow-hidden border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
        >
          {/* Cover Image */}
          <div className="relative h-40 w-full bg-neutral-200 dark:bg-neutral-800 sm:h-52 md:h-64">
            <img
              src="/images/profile/coverplaceholder.jpg"
              alt="Community Cover"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 right-3">
              <button className="rounded bg-white bg-opacity-80 px-3 py-1 text-sm text-neutral-700 hover:bg-opacity-100 dark:bg-black/50 dark:text-white dark:hover:bg-black/70">
                📷 Edit Cover
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="px-4 pb-6 sm:px-6">
            <div className="mb-4 mt-12 flex flex-col space-y-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4">
                {/* Info */}
                <div className="pb-2">
                  <h1 className="mb-1 text-xl font-semibold text-neutral-900 dark:text-white sm:text-2xl">
                    Ancient Architecture Society
                  </h1>
                  <p className="mb-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
                    Preserving and celebrating India's architectural heritage
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>👥 12.5k members</span>
                    <span>👁️ Public</span>
                    <span>📅 Created March 2020</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-0 sm:space-x-3">
                <button className="w-full rounded-lg bg-neutral-900 px-6 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:w-auto">
                  ➕ Join Community
                </button>
                <button className="w-full rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 sm:w-auto">
                  🔗 Share
                </button>
                <button className="w-full rounded-lg border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800 sm:w-auto">
                  ⋯
                </button>
              </div>
            </div>
          </div>
        </div>

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
                  {/* {user && user?.slug === slug && <Feed user={user} />} */}
                  <FeedsSection
                    isLoading={isLoading}
                    isError={isError}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    posts={data?.pages.flatMap((page) => page.posts) || []}
                    showOwnPostsOnly={true}
                    slug={slug}
                  />
                </div>
                <div id="community-sidebar" className="col-span-4">
                  <div className="sticky top-24 space-y-6">
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
