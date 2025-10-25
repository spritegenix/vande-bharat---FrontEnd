"use client";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
import { formSchema } from "@/types/post";

interface ProductEditFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  handleGetLocation: (setIsLocating: (loading: boolean) => void) => void; // Modified handleGetLocation prop
}
export default function ProductEditForm({
  form,
  isEditing,
  setIsEditing,
  onSubmit,
  handleGetLocation,
}: ProductEditFormProps) {
  const [isLocating, setIsLocating] = useState(false); // State for location loading
  const { data: categories } = useGetMarketplaceCategories(); // Move hook call here

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

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{field.value || "Select a category"}</SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[180px] overflow-y-auto">
                  <SelectGroup>
                    {["INR", "USD", "EUR", "GBP", "JPY"]?.map(
                      (currencies: string, index: number) => (
                        <SelectItem key={index} value={currencies}>
                          {currencies}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
      </div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Condition </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    {/* Do NOT spread field here */}
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {["New", "Like New", "Good", "Fair"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Input placeholder="City, State" {...field} />
              </FormControl>
              <FormMessage />
              <Button
                type="button"
                onClick={() => handleGetLocation(setIsLocating)}
                className="mt-2"
                disabled={isLocating}
              >
                {isLocating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Get Current Location
              </Button>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="marketplaceCategoryId"
        render={({ field }) => {
          const allCategories = categories?.pages.flatMap((page) => page.items) || [];
          const selectedCategory = allCategories.find(
            (category: { _id: string; name: string }) => category._id === field.value,
          );
          const displayValue = selectedCategory ? selectedCategory?.name : field.value;

          return (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>{displayValue || "Select a category"}</SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[180px] overflow-y-auto">
                  <SelectGroup>
                    {allCategories.map((category: { _id: string; name: string }) => (
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
                <Textarea placeholder="Product description" {...field} rows={4} />
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
