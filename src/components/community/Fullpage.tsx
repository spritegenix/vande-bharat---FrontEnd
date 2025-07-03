import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Feed from "../Feed";
import FeedsSection from "../FeedsSection";
import { useFetchUserPosts } from "@/queries/posts/posts.queries";
import { useUserStore } from "@/stores/userStore";

export default function Fullpage() {
  const user = useUserStore();
  const slug = "ashik-shetty";
  const tabOptions = ["Feed", "Discussion", "Members", "Events", "Resources", "About"];
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
          <div className="relative h-52 w-full bg-neutral-200 dark:bg-neutral-800">
            <img
              src="/images/profile/coverplaceholder.jpg"
              alt="Community Cover"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 right-4">
              <button className="rounded bg-white bg-opacity-80 px-3 py-1 text-sm text-neutral-700 hover:bg-opacity-100 dark:bg-black/50 dark:text-white dark:hover:bg-black/70">
                📷 Edit Cover
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="px-6 pb-6">
            <div className="mb-4 mt-14 flex items-end justify-between">
              <div className="flex items-end space-x-4">
                {/* Info */}
                <div className="pb-2">
                  <h1 className="mb-1 text-2xl font-semibold text-neutral-900 dark:text-white">
                    Ancient Architecture Society
                  </h1>
                  <p className="mb-2 text-neutral-600 dark:text-neutral-400">
                    Preserving and celebrating India's architectural heritage
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span>👥 12.5k members</span>
                    <span>👁️ Public</span>
                    <span>📅 Created March 2020</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pb-2">
                <button className="rounded-lg bg-neutral-900 px-6 py-2 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                  ➕ Join Community
                </button>
                <button className="rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800">
                  🔗 Share
                </button>
                <button className="rounded-lg border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-transparent dark:text-white dark:hover:bg-neutral-800">
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
                <div className="col-span-8 px-6">
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
                    {/* <!-- Community Stats --> */}
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                      <h4 className="mb-4 text-neutral-900">Community Stats</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600">Total Members</span>
                          <span className="text-neutral-900">12,547</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600">Posts This Week</span>
                          <span className="text-neutral-900">89</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600">Active Today</span>
                          <span className="text-neutral-900">234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-600">Growth Rate</span>
                          <span className="text-neutral-600">+12%</span>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Community Rules --> */}
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                      <h4 className="mb-4 text-neutral-900">Community Guidelines</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start space-x-2">
                          <span className="text-neutral-400">1.</span>
                          <span className="text-neutral-600">
                            Share authentic architectural content
                          </span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-neutral-400">2.</span>
                          <span className="text-neutral-600">Respect all community members</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-neutral-400">3.</span>
                          <span className="text-neutral-600">No spam or promotional content</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-neutral-400">4.</span>
                          <span className="text-neutral-600">Credit sources and authors</span>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Recent Members --> */}
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                      <h4 className="mb-4 text-neutral-900">New Members</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=111"
                            alt="Member"
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-neutral-900">Amit Kumar</p>
                            <p className="text-xs text-neutral-500">Joined today</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=222"
                            alt="Member"
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-neutral-900">Sarah Patel</p>
                            <p className="text-xs text-neutral-500">Joined yesterday</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=333"
                            alt="Member"
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-neutral-900">Ravi Joshi</p>
                            <p className="text-xs text-neutral-500">Joined 2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Upcoming Events --> */}
                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                      <h4 className="mb-4 text-neutral-900">Upcoming Events</h4>
                      <div className="space-y-3">
                        <div className="rounded border border-neutral-200 p-3">
                          <h5 className="mb-1 text-sm text-neutral-900">
                            Temple Architecture Workshop
                          </h5>
                          <p className="mb-2 text-xs text-neutral-500">March 25, 2025 • 2:00 PM</p>
                          <button className="w-full rounded bg-neutral-900 px-3 py-1 text-xs text-white">
                            Join Event
                          </button>
                        </div>
                        <div className="rounded border border-neutral-200 p-3">
                          <h5 className="mb-1 text-sm text-neutral-900">Heritage Site Visit</h5>
                          <p className="mb-2 text-xs text-neutral-500">April 2, 2025 • 9:00 AM</p>
                          <button className="w-full rounded bg-neutral-900 px-3 py-1 text-xs text-white">
                            Join Event
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
