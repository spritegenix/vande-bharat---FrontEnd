"use client";
import { useGetWishlist } from "@/queries/wishlist/queries";
import { useRemoveItemFromWishlist } from "@/queries/wishlist/mutations";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { data: wishlist, isLoading } = useGetWishlist();
  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="main-container" className="flex">
      <main id="main-content" className="flex-1">
        <div id="marketplace-header" className="border-b p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold dark:text-white">My Wishlist</h1>
          </div>
        </div>

        <div id="products-grid" className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist?.data.items.map((item: any) => (
              <Link href={`/marketplace/products/${item.marketplaceItem.slug}`} key={item._id}>
                <div className="product-card cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
                  <div className="relative">
                    <img
                      className="h-48 w-full object-cover"
                      src={item.marketplaceItem.images[0]}
                      alt={item.marketplaceItem.name}
                    />
                    <button
                      className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-red-50"
                      onClick={(e) => {
                        e.preventDefault();
                        removeItemFromWishlist(item.marketplaceItem._id);
                      }}
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {item.marketplaceItem.name}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">{item.marketplaceItem.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ₹{item.marketplaceItem.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
