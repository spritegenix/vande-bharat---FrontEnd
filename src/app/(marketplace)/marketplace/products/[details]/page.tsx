"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetMarketplaceItem } from "@/queries/marketplace/queries";
import { formatPublishedDate } from "@/utils/dateSorter";
import { NumberComma } from "@/utils/NumberComma";

import { Heart, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const params = useParams();
  const detail = params.details;
  const { data: singleItem } = useGetMarketplaceItem(detail as string);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section id="product-detail" className="mb-12">
      <h2 className="p-6 text-2xl dark:text-white">Product Details</h2>

      <div className="p-6">
        <div className="grid-cols-2 gap-8 md:grid">
          <div>
            <div className="mb-4 flex h-96 items-center justify-center rounded-lg bg-neutral-300">
              <img
                src={singleItem?.attachments[selectedImage]}
                alt="Selected product image"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <Carousel>
              <CarouselContent>
                {singleItem?.attachments.map((image: string, index: number) => (
                  <CarouselItem key={index} className="basis-1/4">
                    <div
                      className={`flex h-20 items-center justify-center rounded bg-neutral-200 ${
                        selectedImage === index ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="h-full w-full cursor-pointer rounded object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-white p-2 text-black" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-white p-2 text-black" />
            </Carousel>
          </div>

          <div>
            <h1 className="mb-4 text-3xl dark:text-white">{singleItem?.title}</h1>
            <div className="mb-4 flex items-center">
              <span className="text-3xl dark:text-white">
                {singleItem?.currency}
                {NumberComma(singleItem?.price)}
              </span>
              <span className="ml-4 text-sm text-neutral-500">
                {formatPublishedDate(singleItem?.updatedAt)}
              </span>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex items-center">
                <span className="w-24 text-sm text-neutral-400">Condition:</span>
                <span className="text-sm text-neutral-500">Excellent</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-neutral-400">Location:</span>
                <span className="text-sm text-neutral-500">Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm text-neutral-400">Category:</span>
                <span className="text-sm text-neutral-500">
                  {singleItem?.marketplaceCategoryId?.name}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg dark:text-white">Description</h3>
              <p className="leading-relaxed text-neutral-500">{singleItem?.description}</p>
            </div>

            <div className="mb-6 flex items-center">
              <img
                src={singleItem?.seller?.avatar}
                alt="Seller"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="dark:text-white">{singleItem?.seller?.name}</h4>
                {/* <p className="text-sm text-neutral-500">Cultural Researcher • Member since 2023</p> */}
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex flex-1 items-center justify-center gap-4 rounded-md bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800">
                <MessageCircle fill="#fff" />
                Contact Seller
              </button>
              <button className="flex gap-2 self-center rounded-md border border-neutral-300 px-5 py-3 text-center text-neutral-400 hover:bg-neutral-50">
                <Heart />
                <span> Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
