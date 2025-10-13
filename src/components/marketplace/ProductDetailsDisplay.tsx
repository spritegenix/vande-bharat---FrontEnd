"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form"; // Import UseFormReturn
import * as z from "zod";
import { Button } from "@/components/ui/button"; // Import Button component

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

interface ProductDetailsDisplayProps {
  isEditing: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>; // Accept form as prop
}

export default function ProductDetailsDisplay({ isEditing, form }: ProductDetailsDisplayProps) {
  if (isEditing) {
    return null; // This component only displays when not editing
  }

  return (
    <>
      <h1 className="mb-4 text-3xl dark:text-white">{form.getValues("title")}</h1>

      <div className="mb-4 flex items-center">
        <span className="text-3xl dark:text-white">₹{form.getValues("price")}</span>
        <span className="ml-4 text-sm text-neutral-500">Listed 2 days ago</span>
      </div>

      <div className="mb-6 flex space-x-4">
        <Button className="flex-1">Message Seller</Button>
        <Button className="flex-1" variant="outline">
          Share
        </Button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <span className="w-24 text-sm text-neutral-400">Condition:</span>
          <span className="text-sm text-neutral-500">{form.getValues("condition")}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 text-sm text-neutral-400">Location:</span>
          <span className="text-sm text-neutral-500">{form.getValues("location")}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 text-sm text-neutral-400">Category:</span>
          <span className="text-sm text-neutral-500">{form.getValues("category")}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-lg dark:text-white">Description</h3>
        <p className="leading-relaxed text-neutral-500">{form.getValues("description")}</p>
      </div>
    </>
  );
}
