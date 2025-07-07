import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Box from "@/components/elements/Box";


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

export default function FollowerSection() {
  return (
    <>
      <Box>
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 dark:bg-muted">
            {followingUsers.map((user, index) => (
              <Card
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-card p-3 transition hover:shadow-sm dark:border-border dark:bg-card"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 dark:bg-card">
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

                <Button
                  variant="outline"
                  className="h-auto w-auto rounded-md border border-gray-300 bg-white px-4 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:border-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80"
                >
                  Follow back
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Box>
    </>
  );
}
