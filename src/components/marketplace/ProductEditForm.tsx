"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Define the form schema again or import it if it's in a shared file
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  condition: z.string(),
  location: z.string(),
  category: z.string(),
  description: z.string(),
  images: z.array(z.string()),
});

interface ProductEditFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function ProductEditForm({
  form,
  isEditing,
  setIsEditing,
  onSubmit,
}: ProductEditFormProps) {
  if (!isEditing) {
    return null; // This component only displays when editing
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Product Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="condition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condition</FormLabel>
            <FormControl>
              <Input placeholder="Condition" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input placeholder="Category" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mb-6">
        <h3 className="mb-3 text-lg dark:text-white">Description</h3>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex space-x-4">
        <Button type="submit">Save</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
            setIsEditing(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
