"use client";
import { useGetMarketplaceItems } from "@/queries/marketplace/queries";
import {
  useAddItemToWishlist,
  useRemoveItemFromWishlist,
} from "@/queries/wishlist/wishlist.mutation";
import { NumberComma } from "@/utils/NumberComma";
import { Heart, LayoutGrid, List, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

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
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMarketplaceItems({ category });
  const { mutate: addItemToWishlist } = useAddItemToWishlist();
  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  const marketplaceItems = data?.pages.flatMap((page) => page.items) || [];
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
            <h1 className="text-2xl font-bold dark:text-white">Marketplace</h1>
            {/* <div className="flex items-center space-x-4">
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <div className="flex overflow-hidden rounded-lg border border-gray-300">
                <button className="bg-primary p-2 text-white">
                  <LayoutGrid />
                </button>
                <button className="p-2 dark:hover:bg-gray-600">
                  <List />
                </button>
              </div>
            </div> */}
          </div>
          {/* <div className="flex space-x-4">
            <span className="rounded-full bg-primary px-3 py-1 text-sm text-white">
              All Products
            </span>
            <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-primary hover:text-white">
              Featured
            </span>
            <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-primary hover:text-white">
              New Arrivals
            </span>
            <span className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-primary hover:text-white">
              Best Sellers
            </span>
          </div> */}
        </div>

        <div id="products-grid" className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {marketplaceItems?.map((item: any, index: number) => (
              <Link
                href={`/marketplace/products/${item.slug}`}
                key={item._id}
                ref={index === marketplaceItems.length - 1 ? lastItemRef : null}
              >
                <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
                  <div className="relative">
                    <img
                      className="h-48 w-full object-cover"
                      src={item.attachments[0]?.url}
                      alt={item.title}
                    />
                    <button
                      className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.isInWishlist) {
                          removeItemFromWishlist(item._id);
                        } else {
                          addItemToWishlist(item._id);
                        }
                      }}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          item.isInWishlist
                            ? "fill-red-500 text-red-500"
                            : "hover:fill-red-500 hover:text-red-500"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex flex-col p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                    <p className="mb-3 text-sm text-gray-600">
                      {item.description.substring(0, 100) + "..."}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {item.currency} {NumberComma(item?.price)}
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
