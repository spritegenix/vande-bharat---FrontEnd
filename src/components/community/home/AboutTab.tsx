"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutSchema, AboutSchema } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, Plus, X } from "lucide-react";
import { useState } from "react";

type Props = {
  aboutContent?: AboutSchema;
  onSubmit: (data: AboutSchema) => void;
};

export default function AboutTabEditor({ aboutContent, onSubmit }: Props) {
  const [isEditing, setIsEditing] = useState(!aboutContent);

  const form = useForm<AboutSchema>({
    resolver: zodResolver(aboutSchema),
    defaultValues: aboutContent || {
      vision: "",
      mission: "",
      objectives: "",
    },
  });

  const handleFormSubmit = (values: AboutSchema) => {
    onSubmit(values);
    setIsEditing(false);
  };

  return (
    <Card className="rounded-lg border bg-background shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="mb-1 text-2xl text-foreground">About This Community</CardTitle>
        </div>

        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="mt-6 space-y-6">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vision</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Our long-term vision..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mission</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Our daily mission..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objectives</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Our key objectives..." rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-1 h-4 w-4" />
                  Save
                </Button>
              </div>
            </form>
          </Form>
        ) : aboutContent ? (
          <>
            <section>
              <h3 className="mb-1 text-lg font-semibold text-foreground">Vision</h3>
              <p className="text-muted-foreground">{aboutContent.vision}</p>
            </section>
            <section>
              <h3 className="mb-1 text-lg font-semibold text-foreground">Mission</h3>
              <p className="text-muted-foreground">{aboutContent.mission}</p>
            </section>
            <section>
              <h3 className="mb-1 text-lg font-semibold text-foreground">Objectives</h3>
              <p className="whitespace-pre-line text-muted-foreground">{aboutContent.objectives}</p>
            </section>
          </>
        ) : (
          <p className="italic text-muted-foreground">No about info has been added yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
