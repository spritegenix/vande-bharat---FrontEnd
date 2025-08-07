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
import { useFetchCommunityMembers } from "@/queries/community/community.queries";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export function MembersTab() {
  const slug = useParams().slug as string;
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useFetchCommunityMembers(slug);
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  const members = data?.pages.flatMap((page) => page.data) || [];
  const totalMembers = data?.pages?.[0]?.count ?? 0;
  return (
    <Card className="bg-background">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Members</CardTitle>
            <p className="text-sm text-muted-foreground">{totalMembers} community members</p>
          </div>
          <div className="flex items-center space-x-3">
            {/* <Input placeholder="Search members..." className="w-48" /> */}
            {/* <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="admins">Admins</SelectItem>
             
                <SelectItem value="new">New Members</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {members &&
            members?.map((member) => (
              <Card key={member._id} className="border border-border">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      {/* <span className="mt-1 inline-block rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                        {member.type}
                      </span> */}
                    </div>
                  </div>

                  {/* <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>Joined {member.joined}</span>
                    <span>{member.posts} posts</span>
                  </div> */}

                  <Button asChild className="w-full" variant="default">
                    <Link href={`/profile/${member.slug}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </CardContent>
      {hasNextPage && <div ref={ref} className="h-8" />}

      {isFetchingNextPage && (
        <div className="my-4 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </Card>
  );
}
