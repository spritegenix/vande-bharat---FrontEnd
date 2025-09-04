"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2 } from "lucide-react";
import Linkify from "@/components/Linkify";
import { extractHashtags } from "@/utils/HashTagExtractor";
import { useUpdateProfile } from "@/queries/user/user.mutation";
import { useUserStore } from "@/stores/userStore";

const formSchema = z.object({
  about: z.string().min(20, "Please add a little more about you."),
});

export default function AboutUsForm({
  userData,
  userId,
}: {
  userData: string | undefined;
  userId: string | undefined;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: bioUpdate } = useUpdateProfile();
  const { user } = useUserStore();

  useEffect(() => {
    form.reset({ about: userData || "" });
  }, [userData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const hashtags = extractHashtags(values.about);
    const payload = { bio: values.about, hashtags };
    bioUpdate(payload);
    setIsEditing(false);
  };

  const handleDelete = () => {
    bioUpdate({ bio: "" });
    setIsEditing(true);
    toast.success("About section deleted.");
  };

  const canEdit = user?._id === userId;

  return (
    <div className="rounded-xl border border-muted p-4 shadow-sm">
      {canEdit && isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write something about yourself..."
                      className="resize-none border-muted"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Add some description and #hashtags if you like.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              {userData && (
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="group relative">
          <div className="mb-2 whitespace-pre-wrap text-sm text-muted-foreground">
            {userData && userData.length > 0 ? (
              <Linkify>
                <p>{userData}</p>
              </Linkify>
            ) : (
              <p className="text-muted-foreground">Nothing described yet.</p>
            )}
          </div>

          {canEdit && (
            <div className="absolute right-0 top-0 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => setIsEditing(true)}
                className="text-muted-foreground hover:text-primary"
                title="Edit"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="text-muted-foreground hover:text-destructive"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
