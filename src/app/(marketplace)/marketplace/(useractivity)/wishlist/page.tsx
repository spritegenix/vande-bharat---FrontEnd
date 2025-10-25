"use client";
import { useGetWishlist } from "@/queries/wishlist/wishlist.queries";
import { useRemoveItemFromWishlist } from "@/queries/wishlist/wishlist.mutation";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { NumberComma } from "@/utils/NumberComma";

const MarketplaceItemSkeleton = () => (
  <div className="product-card duration-600 animate-none cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg">
    <div className="relative">
      <div className="h-48 w-full bg-gray-200"></div>
      <div className="absolute right-3 top-3 h-9 w-9 rounded-full bg-gray-300 p-2 shadow-md"></div>
    </div>
    <div className="flex flex-col p-4">
      <div className="mb-2 h-5 w-3/4 rounded-md bg-gray-200"></div>
      <div className="mb-3 h-4 w-full rounded-md bg-gray-200"></div>
      <div className="mb-3 h-4 w-2/3 rounded-md bg-gray-200"></div>
      <div className="flex items-center justify-between">
        <div className="h-6 w-1/4 rounded-md bg-gray-200"></div>
      </div>
    </div>
  </div>
);

export default function Page() {
  const {
    data: wishlistData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetWishlist();
  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  const wishlistItems = wishlistData?.pages.flatMap((page) => page.items) || [];
  const lastItemRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [lastItemRef, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading]);

  return (
    <div id="main-container" className="flex">
      <main id="main-content" className="flex-1">
        <div id="marketplace-header" className="border-b p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold dark:text-white">My Wishlist</h1>
          </div>
        </div>

        <div id="products-grid" className="p-6">
          {wishlistItems.length === 0 && !isLoading && (
            <div className="col-span-full flex h-64 items-center justify-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">No items in wishlist.</p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems?.map((item: any, index: number) => (
              <Link
                href={`/marketplace/wishlist/${item?.marketplaceItemId?.slug}`}
                key={item?._id}
                ref={index === wishlistItems.length - 1 ? lastItemRef : null}
              >
                <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
                  <div className="relative">
                    <img
                      className="h-48 w-full object-cover"
                      src={item?.marketplaceItemId?.attachments[0]?.url}
                      alt={item?.marketplaceItemId?.title}
                    />
                    <button
                      className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50"
                      onClick={(e) => {
                        e.preventDefault();
                        removeItemFromWishlist(item?.marketplaceItemId?._id);
                      }}
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {item?.marketplaceItemId?.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">
                      {item?.marketplaceItemId?.description.substring(0, 100) + "..."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {item?.marketplaceItemId?.currency}{" "}
                        {NumberComma(item?.marketplaceItemId?.price || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: 8 }).map((_, index) => <MarketplaceItemSkeleton key={index} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
