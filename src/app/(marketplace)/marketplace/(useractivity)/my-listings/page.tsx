"use client";
import { useGetMyMarketplaceItems } from "@/queries/marketplace/queries";
import { NumberComma } from "@/utils/NumberComma";
import Link from "next/link";
import React from "react";

export default function page() {
  const { data, isLoading } = useGetMyMarketplaceItems();
  const mylist = data?.pages?.flatMap((page) => page.items) ?? [];

  return (
    <main id="main-content" className="flex-1">
      <div id="marketplace-header" className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Marketplace</h1>
        </div>
      </div>

      <div id="products-grid" className="p-6">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mylist.map((item) => (
              <div
                key={item._id}
                className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg"
              >
                <Link href={`/marketplace/my-listings/${item.slug}`}>
                  <div className="relative">
                    <img
                      className="h-48 w-full object-cover"
                      src={item.attachments[0]}
                      alt={item.title}
                    />
                    <button className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-900 shadow-md hover:bg-red-50">
                      Edit
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                  <p className="mb-3 text-sm text-gray-600">{item.marketplaceCategoryId.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {item.currency}
                      {NumberComma(item?.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
