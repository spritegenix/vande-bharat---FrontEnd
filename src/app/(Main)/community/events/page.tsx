"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState } from "react";
import { format } from "date-fns";

const eventFormSchema = z
  .object({
    title: z.string().min(3),
    description: z.string().min(10),
    category: z.string(),
    eventType: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    startTime: z.string(),
    endTime: z.string().optional(),
    isMultiDay: z.boolean().optional(),
    isRecurring: z.boolean().optional(),
    venue: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pin: z.string().optional(),
    attendees: z.coerce.number().optional(),
    entryFee: z.coerce.number().optional(),
    contactName: z.string().optional(),
    contactPhone: z.string().optional(),
    tags: z.string().optional(),
    specialInstructions: z.string().optional(),
    allowComments: z.boolean(),
    allowSharing: z.boolean(),
    requireRSVP: z.boolean().optional(),
    sendReminders: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.isMultiDay) {
        return data.date && data.endDate && data.endDate >= data.date;
      }
      return true;
    },
    {
      message: "End date must be after start date for multi-day events.",
      path: ["endDate"],
    },
  );

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function EventForm() {
  const [showEndDate, setShowEndDate] = useState(false);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      eventType: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      isMultiDay: false,
      isRecurring: false,
      venue: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      attendees: 0,
      entryFee: 0,
      contactName: "",
      contactPhone: "",
      tags: "",
      specialInstructions: "",
      allowComments: true,
      allowSharing: true,
      requireRSVP: false,
      sendReminders: false,
    },
  });
  const isMultiDay = form.watch("isMultiDay");
  const onSubmit = (data: EventFormValues) => {
    console.log("Submitted Event Data:", data);
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-900 dark:bg-neutral-900 dark:text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Post New Event</h1>
        </div>

        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Diwali Festival" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Describe the event..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="festival">Cultural Festival</SelectItem>
                          <SelectItem value="ceremony">Religious Ceremony</SelectItem>
                          <SelectItem value="walk">Heritage Walk</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="community">Community Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{isMultiDay ? "Start Date" : "Event Date"}</FormLabel>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isMultiDay && (
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <FormField
                  control={form.control}
                  name={"isMultiDay"}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel className="!m-0 text-sm capitalize">isMultiDay</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {["venue", "address", "city", "state", "pin"].map((key) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key as keyof EventFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{key}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value !== undefined ? String(field.value) : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {["attendees", "entryFee", "contactName", "contactPhone"].map((key) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key as keyof EventFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{key}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value !== undefined ? String(field.value) : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. heritage, diwali, music" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Any dress code, items to carry etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" type="button">
                  Save as Draft
                </Button>
                <Button type="submit">Post Event</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
