"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomInput } from "@/components/CustomInput";
import { CustomTextarea } from "@/components/CustomTextArea";

const formSchema = z.object({
  Company: z.string().min(1).max(120),
  position: z.string().min(1),
  city: z.string().min(1).optional(),
  description: z.string().optional(),
  timestart: z.coerce.date(),
  timeend: z.union([z.coerce.date(), z.literal("Present")]),
});

export default function Workplace({ setFormOpen }: { setFormOpen: (value: boolean) => void }) {
  const [isPresent, setIsPresent] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Company: "",
      position: "",
      city: "",
      description: "",
      timestart: new Date(),
      timeend: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-4">
        <FormField
          control={form.control}
          name="Company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <CustomInput placeholder="Company" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <CustomInput placeholder="Position" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/Town</FormLabel>
              <FormControl>
                <CustomInput placeholder="City/Town" type="text" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <CustomTextarea placeholder="Description" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="timestart"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>From</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="w-fit"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        captionLayout="dropdown"
                        fromMonth={new Date(1997, 0)}
                        toMonth={new Date()}
                        required
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="timeend"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  {/* <FormLabel>To</FormLabel> */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="present"
                      className="h-3.5 w-3.5"
                      checked={isPresent}
                      onCheckedChange={(checked: boolean) => {
                        setIsPresent(checked);
                        if (checked) {
                          form.setValue("timeend", "Present");
                        } else {
                          form.setValue("timeend", new Date());
                        }
                      }}
                    />
                    <label htmlFor="present" className="text-sm leading-none">
                      Present
                    </label>
                  </div>
                  {!isPresent && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value as Date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as Date}
                          onSelect={field.onChange}
                          initialFocus
                          captionLayout="dropdown"
                          fromMonth={new Date(1997, 0)}
                          toMonth={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-start gap-2 lg:justify-end">
          <Button type="button" onClick={() => setFormOpen(false)} className="bg-gray-300">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
