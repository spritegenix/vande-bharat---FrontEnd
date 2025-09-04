"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
// import { DiscussionCard } from "./DiscussionCard";
import { useCreateDiscussion } from "@/queries/community/community.mutation";
import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { useFetchDiscussions, useFetchReplies } from "@/queries/community/community.queries";
import { Discussion } from "../Discussion/Discussion";
import { ReplyCard } from "../Discussion/RepliesCard";
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(5, "Content must be at least 5 characters"),
});

export function DiscussionTab() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const params = useParams();
  const communityParams = String(params.slug);
  const [openReplies, setOpenReplies] = useState<{ [key: number]: boolean }>({});
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const { mutate: createDiscussion } = useCreateDiscussion(communityParams);
  const toggleReplyVisibility = (id: number) => {
    setOpenReplies((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const { user } = useUserStore();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createDiscussion(values);
    form.reset();
  };
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, isError } =
    useFetchDiscussions(communityParams);
  const [repliesSlug, setRepliesSlug] = useState("");
  const discussions = data?.pages.flatMap((page) => page.data) ?? [];

  const handleRepliesClick = (slug: string) => {
    setSelectedSlug(slug);
    setRepliesSlug(slug);
  };
  const { data: replies } = useFetchReplies(repliesSlug, {
    enabled: !!repliesSlug,
  });

  return (
    <Card className="bg-background">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-2xl">Discussion</CardTitle>
        <p className="text-muted-foreground">
          Engage in meaningful conversations about architecture and heritage
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              <Image
                src="/images/profile/profileplaceholder.jpg"
                alt="image"
                height={50}
                width={50}
              />
            </AvatarFallback>
          </Avatar>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your thoughts..."
                        rows={4}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>

      <CardContent className="divide-y divide-border">
        {discussions.map((discussion) => (
          <div key={discussion._id} className="space-y-4 py-6">
            <Discussion
              key={discussion._id}
              discussion={discussion}
              onRepliesClick={handleRepliesClick}
            />
            {selectedSlug === discussion.slug && <ReplyCard discussionSlug={discussion.slug} />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
