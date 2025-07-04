import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const discussions = [
  {
    name: "Dr. Rajesh Gupta",
    seed: "456",
    badge: "Expert",
    time: "2h ago",
    title: "Preservation techniques for ancient stone carvings",
    content:
      "What are the most effective modern preservation methods for protecting ancient stone carvings from environmental damage? Looking for insights from conservationists and archaeologists.",
    replies: 23,
    likes: 45,
    views: 234,
  },
  {
    name: "Priya Sharma",
    seed: "789",
    time: "4h ago",
    title: "Differences between North and South Indian temple architecture",
    content:
      "Can someone explain the key architectural differences between Nagara and Dravidian styles? Working on my research paper and would appreciate expert insights.",
    replies: 15,
    likes: 28,
    views: 156,
  },
];

export function DiscussionTab() {
  return (
    <Card className="bg-background">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-2xl">Discussion</CardTitle>
        <p className="text-muted-foreground">
          Engage in meaningful conversations about architecture and heritage
        </p>
      </CardHeader>

      <CardContent className="border-b border-border">
        <div className="mb-4 flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=123" alt="You" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Input className="flex-1" placeholder="Start a new discussion..." />
          <Button>Post</Button>
        </div>
      </CardContent>

      <CardContent className="divide-y divide-border">
        {discussions.map((d, i) => (
          <div key={i} className="py-6">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${d.seed}`}
                  alt={d.name}
                />
                <AvatarFallback>{d.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="mb-2 flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">{d.name}</h4>
                  {d.badge && (
                    <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {d.badge}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">• {d.time}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{d.title}</h3>
                <p className="mb-3 text-muted-foreground">{d.content}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>💬 {d.replies} replies</span>
                  <span>👍 {d.likes} likes</span>
                  <span>👁️ {d.views} views</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
