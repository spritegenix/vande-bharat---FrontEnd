"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form"; // Import UseFormReturn
import * as z from "zod";
import { NumberComma } from "@/utils/NumberComma";
import { useGetWishlist } from "@/queries/wishlist/wishlist.queries";
import { formatPublishedDate } from "@/utils/dateSorter";
import { formSchema } from "@/types/post";

interface ProductDetailsDisplayProps {
  isEditing: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>; // Accept form as prop
  marketplaceItemId: string;
  publishedAt: string;
  categoryName: string;
}

export default function ProductDetailsDisplay({
  isEditing,
  form,
  marketplaceItemId,
  publishedAt,
  categoryName,
}: ProductDetailsDisplayProps) {
  const { data: wishlistData } = useGetWishlist();

  if (isEditing) {
    return null; // This component only displays when not editing
  }

  return (
    <>
      <h1 className="mb-4 text-3xl dark:text-white">{form.getValues("title")}</h1>

      <div className="mb-4 flex items-center">
        <span className="text-3xl dark:text-white">
          {form.getValues("currency")} {NumberComma(form.getValues("price"))}
        </span>
        <span className="ml-4 text-sm text-neutral-500">{formatPublishedDate(publishedAt)}</span>
      </div>

      {/* <div className="mb-6 flex space-x-4">
        <Button className="flex-1">Message Seller</Button>
        <Button
          className="flex-1"
          variant="outline"
          onClick={() => {
            if (isWishlisted) {
              removeItemFromWishlist(marketplaceItemId);
            } else {
              addItemToWishlist(marketplaceItemId);
            }
          }}
        >
          <Heart
            className={`mr-2 h-5 w-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-500'
            }`}
          />
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
      </div> */}

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
          <span className="w-24 text-sm text-neutral-400">Phone Number:</span>
          <span className="text-sm text-neutral-500">{form.getValues("phoneNumber")}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 text-sm text-neutral-400">Category:</span>
          <span className="text-sm text-neutral-500">{categoryName}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-lg dark:text-white">Description</h3>
        <p className="leading-relaxed text-neutral-500">{form.getValues("description")}</p>
      </div>
    </>
  );
}
