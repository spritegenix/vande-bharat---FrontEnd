"use client";
import { useGetMyMarketplaceItems } from "@/queries/marketplace/queries";
import { NumberComma } from "@/utils/NumberComma";
import Link from "next/link";
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
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyMarketplaceItems();
  const mylist = data?.pages?.flatMap((page) => page.items) ?? [];
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
    <main id="main-content" className="flex-1">
      <div id="marketplace-header" className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Marketplace</h1>
        </div>
      </div>

      <div id="products-grid" className="p-6">
        {mylist.length === 0 && !isLoading && (
          <div className="col-span-full flex h-64 items-center justify-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">No listings found.</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mylist.map((item, index) => (
            <div
              key={item?._id}
              className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg"
              ref={index === mylist.length - 1 ? lastItemRef : null}
            >
              <Link href={`/marketplace/my-listings/${item?.slug}`}>
                <div className="relative">
                  <img
                    className="h-48 w-full object-cover"
                    src={item?.attachments[0]?.url}
                    alt={item?.title}
                  />
                  <button className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-900 shadow-md hover:bg-red-50">
                    Edit
                  </button>
                </div>
              </Link>
              <div className="p-4">
                <h3 className="mb-2 font-semibold text-gray-900">{item?.title}</h3>
                <p className="mb-3 text-sm text-gray-600">{item?.marketplaceCategoryId?.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {item?.currency} {NumberComma(item?.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {(isLoading || isFetchingNextPage) &&
            Array.from({ length: 8 }).map((_, index) => <MarketplaceItemSkeleton key={index} />)}
        </div>
      </div>
    </main>
  );
}
