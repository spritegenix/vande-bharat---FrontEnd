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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMarketplaceCategories } from "@/queries/marketplace/queries";
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
  marketplaceCategoryId: z.string(),
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
  const { data: categories } = useGetMarketplaceCategories();

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
        name="marketplaceCategoryId"
        render={({ field }) => {
          const selectedCategory = categories?.find(
            (category: { _id: string; name: string }) => category._id === field.value,
          );
          const displayValue = selectedCategory ? selectedCategory.name : field.value;

          return (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{displayValue || "Select a category"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((category: { _id: string; name: string }) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
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
