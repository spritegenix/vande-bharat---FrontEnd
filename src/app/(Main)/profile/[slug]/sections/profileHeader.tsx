import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostCard from "./post";
import AboutSection from "./about";
import ResearchPublications from "./research";
import FollowingSection from "./following";
import FollowerSection from "./followers";
import CoverImage from "@/components/profile/main/CoverImage";

export default function ProfileHeader() {
  return (
    <>
      {/* Profile Banner */}
      <CoverImage coverImage="/images/banner.jpg" />


      {/* Profile Info Card + Tabs */}
      <div className="mx-auto w-full max-w-6xl rounded-lg">
        <Tabs defaultValue="feed" className="w-full">
          {/* Profile Card */}
          <Card className="border border-gray-300 p-6 pb-0 dark:border-border dark:bg-card">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <Avatar className="relative -mt-12 h-24 w-24 border-2 border-white sm:h-28 sm:w-28">
                <AvatarImage src="/profile.jpg" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>

              {/* Name & Designation */}
              <h2 className="mt-2 text-xl font-semibold text-black dark:text-foreground sm:text-2xl">
                Dr. Priya Sharma
              </h2>
              {/* <ProfileNameSection
                profileImage="/profile.jpg"
                name="Dr. Priya Sharma"
                followStatus={user?.followStatus || null}
              /> */}
              <p className="mt-2 text-sm text-gray-600 dark:text-muted-foreground sm:text-base">
                Cultural Historian & Researcher <br />
                Temple Architecture Specialist • Mumbai, India
              </p>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
                {[
                  { label: "Posts", value: "156" },
                  { label: "Followers", value: "2.3k" },
                  { label: "Following", value: "892" },
                  { label: "Communities", value: "12" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-lg font-medium text-black dark:text-foreground">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
                <Button className="w-full bg-gray-800 text-white hover:bg-gray-900 sm:w-auto">
                  + Follow
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border border-gray-400 bg-white text-gray-600 hover:bg-gray-100 dark:border-muted dark:bg-muted dark:text-muted-foreground sm:w-auto"
                >
                  Edit
                </Button>
              </div>

              {/* Tabs */}
              <div className="mt-6 w-full max-w-4xl px-4">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
                  <TabsTrigger value="feed" className="dark:text-foreground">
                    Feed
                    
                  </TabsTrigger>
                  <TabsTrigger value="about" className="dark:text-foreground">
                    About
                  </TabsTrigger>
                  <TabsTrigger value="research" className="dark:text-foreground">
                    Research
                  </TabsTrigger>
                  <TabsTrigger value="following" className="dark:text-foreground">
                    Following
                  </TabsTrigger>
                  <TabsTrigger value="followers" className="dark:text-foreground">
                    Followers
                  </TabsTrigger>
                  <TabsTrigger value="communities" className="dark:text-foreground">
                    Communities
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </Card>

          {/* Tab Content - OUTSIDE Card */}
          <div className="mt-6">
            <TabsContent value="feed">
              <PostCard />
            </TabsContent>
            <TabsContent value="about">
              <AboutSection />
            </TabsContent>
            <TabsContent value="research">
              <ResearchPublications />
            </TabsContent>
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
        </Tabs>
      </div>
    </>
  );
}
