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
import { useAboutStore } from "@/stores/AboutStore";
import { Edit, Trash2 } from "lucide-react";
import Linkify from "@/components/Linkify";
import { extractHashtags } from "@/utils/HashTagExtractor";

const formSchema = z.object({
  about: z.string().min(20, "Please add little more about you."),
});

export default function AboutUsForm() {
  const { description, deletedDescription, addDescription } = useAboutStore();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (description) {
      form.reset({ about: description });
    } else {
      form.reset({ about: "" });
    }
  }, [description, form]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const hashtags = extractHashtags(values.about);
      addDescription(values.about);
      const payload = {
        description: values.about,
        hashtags,
      };
      console.log(payload);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-black">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  const handleDelete = () => {
    deletedDescription();
    setIsEditing(true);
    toast.success("About section deleted.");
  };
  return (
    <>
      {!description || isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-8 py-10"
          >
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="About"
                      className="resize-none border-2 border-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Describe about you (you can add #hashtags also)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start gap-2 lg:justify-end">
              {description && (
                <Button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300">
                  Cancel
                </Button>
              )}
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex justify-between py-6 leading-tight">
          <div>
            <Linkify>
              <p className="whitespace-pre-line text-sm text-gray-500">{description}</p>
            </Linkify>
          </div>
          <div className="flex gap-3">
            <div className="cursor-pointer text-gray-500" onClick={() => setIsEditing(true)}>
              <Edit size={17} />
            </div>
            <div className="cursor-pointer text-gray-500" onClick={handleDelete}>
              <Trash2 size={17} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
