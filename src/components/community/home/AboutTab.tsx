"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { aboutItemSchema, AboutItem } from "@/lib/validations";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader, Plus, Save, X } from "lucide-react";
import { useFetchCommunityabout } from "@/queries/community/community.queries";
import { useParams } from "next/navigation";
import { useUpdateCommunity } from "@/queries/community/community.mutation";
import { useUserStore } from "@/stores/userStore";
import { AboutTabProps, admin } from "@/types/community";

export default function AboutTabEditor({ aboutContent, isLoading, isFetching }: AboutTabProps) {
  const slug = useParams();

  const { mutate } = useUpdateCommunity(slug.slug as string);

  const [isEditing, setIsEditing] = useState(false);
  const user = useUserStore((state) => state.user);

  const defaultFormValues: AboutItem = {
    name: "",
    description: "",
    rules: [""],
    category: "",
    location: "",
  };

  // Initialize form with default values first; use reset after data loaded
  const form = useForm<AboutItem>({
    resolver: zodResolver(aboutItemSchema),
    defaultValues: defaultFormValues,
    mode: "onTouched", // validate fields on blur & submit
  });

  const { control, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // UseFieldArray for rules
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "rules",
  });
  const handleFormSubmit = (values: AboutItem) => {
    mutate(values);
    setIsEditing(false);
  };

  // Reset form and field array when data loads
  useEffect(() => {
    if (aboutContent) {
      if (
        !aboutContent.rules ||
        !Array.isArray(aboutContent.rules) ||
        aboutContent.rules.length === 0
      ) {
        aboutContent.rules = [""];
      }
      reset(aboutContent);
      replace(aboutContent.rules);
      setIsEditing(false);
    } else {
      // If no aboutContent, start editing to create new info
      setIsEditing(true);
    }
  }, [aboutContent, reset, replace]);

  const handleCancel = () => {
    if (aboutContent) {
      reset(aboutContent);
      replace(aboutContent.rules || [""]);
      setIsEditing(false);
    } else {
      // No data to reset to, clear form and rules
      reset(defaultFormValues);
      replace([""]);
      setIsEditing(false);
    }
  };

  // Show spinner/loading while fetching
  if (isLoading || isFetching) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        <Loader className="mr-2 animate-spin" /> Loading about...
      </div>
    );
  }

  return (
    <Card className="rounded-lg border bg-background shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="mb-1 text-2xl text-foreground">About This Community</CardTitle>
        {}
        {user &&
          (user._id === aboutContent?.owner._id ||
            aboutContent?.admins.some((admin: admin) => admin._id === user._id)) &&
          !isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
      </CardHeader>

      <Separator />

      <CardContent className="mt-6 space-y-6">
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Name - required */}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" aria-invalid={!!errors.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description - required */}
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description"
                        rows={4}
                        aria-invalid={!!errors.description}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category - required */}
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Category" aria-invalid={!!errors.category} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location - optional */}
              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Location" aria-invalid={!!errors.location} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rules Array */}
              <div>
                <label className="mb-1 block font-semibold">Rules</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="mb-2 flex items-center space-x-2">
                    <FormField
                      control={control}
                      name={`rules.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Rule ${index + 1}`}
                              aria-invalid={!!errors.rules?.[index]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                        aria-label={`Remove Rule ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {fields.length < 4 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append("")}
                    className="mb-4"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Rule
                  </Button>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <X className="mr-1 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-1 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        ) : aboutContent ? (
          <>
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">{aboutContent.name}</h3>
              <p className="text-muted-foreground">{aboutContent.description}</p>
              <p>
                <strong>Category: </strong>
                {aboutContent.category}
              </p>
              <p>
                <strong>Location: </strong>
                {aboutContent.location}
              </p>
              {aboutContent.rules && aboutContent.rules.length > 0 && (
                <>
                  <h4 className="mt-2 font-semibold">Rules:</h4>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    {aboutContent.rules.map((rule: string, i: React.Key) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          </>
        ) : (
          <p className="italic text-muted-foreground">No information added yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
