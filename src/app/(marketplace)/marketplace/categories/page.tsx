"use client";
import React from "react";
import { useGetMarketplaceCategories } from "@/queries/marketplace/queries";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useRef } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
}

const CategorySkeleton = () => (
  <div className="product-card max-h-64 animate-none cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
    <div className="p-4">
      <div className="mb-2 h-6 w-3/4 rounded-md bg-gray-200"></div>
    </div>
  </div>
);

export default function Page() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMarketplaceCategories();

  const categories = data?.pages.flatMap((page) => page.items) || [];
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

  if (isError) {
    return <div>Error fetching categories</div>;
  }

  return (
    <main id="main-content" className="flex-1">
      <div id="marketplace-header" className="border-b p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Categories</h1>
        </div>
      </div>

      <div id="categories-grid" className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories?.map((category: Category, index: number) => (
            <Link
              href={`/marketplace/products?category=${category.slug}`}
              key={category._id}
              className="product-card max-h-64 cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-lg"
              ref={index === categories.length - 1 ? lastItemRef : null}
            >
              <div className="p-4">
                <h3 className="mb-2 font-semibold text-gray-900">{category.name}</h3>
              </div>
            </Link>
          ))}
          {(isLoading || isFetchingNextPage) &&
            Array.from({ length: 8 }).map((_, index) => <CategorySkeleton key={index} />)}
        </div>
      </div>
    </main>
  );
}
