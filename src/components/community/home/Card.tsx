import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const members = [
  {
    name: "Dr. Rajesh Gupta",
    role: "Architecture Historian",
    joined: "March 2020",
    posts: 234,
    type: "Admin",
    seed: "111",
  },
  {
    name: "Priya Sharma",
    role: "Architecture Student",
    joined: "January 2025",
    posts: 45,
    type: "Member",
    seed: "222",
  },
  {
    name: "Amit Kumar",
    role: "Heritage Photographer",
    joined: "December 2024",
    posts: 67,
    type: "Member",
    seed: "333",
  },
];

export function MembersTab() {
  return (
    <Card className="bg-background">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Members</CardTitle>
            <p className="text-sm text-muted-foreground">12,547 community members</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* <Input placeholder="Search members..." className="w-48" /> */}
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="admins">Admins</SelectItem>
                {/* <SelectItem value="moderators">Moderators</SelectItem> */}
                <SelectItem value="new">New Members</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.seed} className="border border-border">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.seed}`}
                      alt={member.name}
                    />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <span className="mt-1 inline-block rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {member.type}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Joined {member.joined}</span>
                  <span>{member.posts} posts</span>
                </div>

                <Button className="w-full" variant="default">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
