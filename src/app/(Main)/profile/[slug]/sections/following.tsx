import Box from "@/components/elements/Box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { UserMinus } from "lucide-react";

const followingUsers = [
  {
    name: "Prof. Rajesh Kumar",
    title: "Archaeological Researcher",
    followers: "2.1k followers",
    image: "/profile.jpg",
  },
  {
    name: "Shri Ram Temple Trust",
    title: "Temple Authority",
    followers: "15k followers",
    image: "/profile.jpg",
  },
  {
    name: "Dr. Meera Patel",
    title: "Art Historian",
    followers: "3.4k followers",
    image: "/profile.jpg",
  },
  {
    name: "Heritage Foundation",
    title: "Cultural Organization",
    followers: "8.9k followers",
    image: "/profile.jpg",
  },
];

export default function FollowingSection() {
  return (
    <>
      <Box>
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {followingUsers.map((user, index) => (
              <Card
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition hover:shadow-sm dark:border-muted dark:bg-card"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-black dark:text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-muted-foreground">{user.title}</p>
                    <p className="text-xs text-gray-400 dark:text-muted-foreground">
                      {user.followers}
                    </p>
                  </div>
                </div>

                <UserMinus className="h-5 w-5 cursor-pointer text-gray-400 dark:text-muted-foreground" />
              </Card>
            ))}
          </div>
        </div>
      </Box>
    </>
  );
}
