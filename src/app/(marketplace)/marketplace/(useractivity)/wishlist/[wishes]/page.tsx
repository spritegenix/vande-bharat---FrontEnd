"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetMarketplaceItem } from "@/queries/marketplace/queries";
import ProductImageGallery from "@/components/marketplace/ProductImageGallery";
import {
  useAddItemToWishlist,
  useRemoveItemFromWishlist,
} from "@/queries/wishlist/wishlist.mutation";
import { useGetWishlist } from "@/queries/wishlist/wishlist.queries";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberComma } from "@/utils/NumberComma";
import { formatPublishedDate } from "@/utils/dateSorter";

export default function Page() {
  const params = useParams();
  const itemSlug = params.wishes as string;

  const { data: marketplaceItem, isLoading } = useGetMarketplaceItem(itemSlug);
  const { data: wishlistData } = useGetWishlist();
  const { mutate: addItemToWishlist } = useAddItemToWishlist();
  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  const flattenedWishlistItems = wishlistData?.pages.flatMap((page) => page.items) || [];
  const isWishlisted = flattenedWishlistItems.some(
    (item: any) => item.marketplaceItemId._id === marketplaceItem?._id,
  );

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!marketplaceItem) {
    return <div className="p-6 text-center">Item not found.</div>;
  }
  const imageUrls = marketplaceItem.attachments.map((attachment: any) => attachment.url);
  const selectedImageUrl = imageUrls[0]; // Assuming the first image is the selected one for display
  console.log(marketplaceItem);
  return (
    <section id="product-detail" className="mb-12">
      <div className="p-6">
        <div className="grid-cols-2 gap-8 md:grid">
          <ProductImageGallery
            images={imageUrls}
            selectedImage={selectedImageUrl}
            setSelectedImage={() => {}} // No interactive image selection on this page
            isEditing={false}
            handleRemoveImage={() => {}}
            handleAddNewImage={() => {}}
          />

          <div>
            <h1 className="mb-4 text-3xl dark:text-white">{marketplaceItem.title}</h1>

            <div className="mb-4 flex items-center">
              <span className="text-3xl dark:text-white">
                ₹{NumberComma(marketplaceItem.price)}
              </span>
              <span className="ml-4 text-sm text-neutral-500">
                {formatPublishedDate(marketplaceItem.createdAt)}
              </span>
            </div>

            <div className="mb-6 flex space-x-4">
              <Button className="flex-1">Message Seller</Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => {
                  if (isWishlisted) {
                    removeItemFromWishlist(marketplaceItem._id);
                  } else {
                    addItemToWishlist(marketplaceItem._id);
                  }
                }}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-500"
                  }`}
                />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <span className="w-24 text-sm text-neutral-400">Condition:</span>
                <span className="text-sm text-neutral-500">{marketplaceItem.condition}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-neutral-400">Location:</span>
                <span className="text-sm text-neutral-500">{marketplaceItem.location}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-neutral-400">Category:</span>
                <span className="text-sm text-neutral-500">
                  {marketplaceItem.marketplaceCategoryId.name}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg dark:text-white">Description</h3>
              <p className="leading-relaxed text-neutral-500">{marketplaceItem.description}</p>
            </div>

            <h3 className="mb-3 text-lg dark:text-white">Seller Details</h3>
            <div className="mb-6 flex items-center">
              <img
                src={marketplaceItem?.seller?.avatar}
                alt="Seller"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="dark:text-white">{marketplaceItem?.seller?.name}</h4>
                {/* <p className="text-sm text-neutral-500">Cultural Researcher • Member since 2023</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
