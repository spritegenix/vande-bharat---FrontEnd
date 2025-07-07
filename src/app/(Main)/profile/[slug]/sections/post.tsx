import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Box from "@/components/elements/Box";

export default function PostCard() {
  return (
    <>
      <Box className="p-5">
        <Card className="rounded-lg border border-gray-300 bg-white dark:border-border dark:bg-card">
          <CardContent className="space-y-4 p-5">
            {/* Header with Avatar and Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/profile.jpg" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <div className="mt-2 sm:mt-0">
                <p className="text-sm font-medium text-gray-700 dark:text-foreground">
                  Dr. Priya Sharma
                </p>
                <p className="text-xs text-gray-500 dark:text-muted-foreground">2 days ago</p>
              </div>
            </div>

            {/* Post content */}
            <p className="text-sm text-gray-900 dark:text-muted-foreground">
              Fascinating discovery during my recent visit to the Brihadeeswara Temple. The
              intricate stone carvings reveal advanced mathematical principles used in ancient
              architecture...
            </p>

            {/* Image section */}
            <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gray-300 dark:bg-muted">
              <span className="text-gray-600 dark:text-muted-foreground">
                Temple Architecture Image
              </span>
            </div>

            {/* Interaction icons */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> 47 likes
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> 12 comments
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" /> Share
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
