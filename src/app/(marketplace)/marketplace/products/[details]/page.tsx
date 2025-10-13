"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, MessageCircle } from "lucide-react";
import React, { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1549122728-f5197094356a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519682337058-e9941a192e53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <section id="product-detail" className="mb-12">
      <h2 className="p-6 text-2xl dark:text-white">Product Details</h2>

      <div className="p-6">
        <div className="grid-cols-2 gap-8 md:grid">
          <div>
            <div className="mb-4 flex h-96 items-center justify-center rounded-lg bg-neutral-300">
              <img
                src={selectedImage}
                alt="Selected product image"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <Carousel>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index} className="basis-1/4">
                    <div
                      className={`flex h-20 items-center justify-center rounded bg-neutral-200 ${
                        selectedImage === image ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedImage(image)}
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
            <h1 className="mb-4 text-3xl dark:text-white">Rare Sanskrit Texts Collection</h1>
            <div className="mb-4 flex items-center">
              <span className="text-3xl dark:text-white">₹25,000</span>
              <span className="ml-4 text-sm text-neutral-500">Listed 2 days ago</span>
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
                <span className="text-sm text-neutral-500">Books & Research</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg dark:text-white">Description</h3>
              <p className="leading-relaxed text-neutral-500">
                A rare collection of Sanskrit manuscripts dating back to the 12th century. These
                texts contain valuable insights into ancient Indian philosophy, mathematics, and
                astronomy. The manuscripts are well-preserved and include original palm leaf
                writings with traditional ink. Perfect for researchers, historians, and cultural
                institutions.
              </p>
            </div>

            <div className="mb-6 flex items-center">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=789"
                alt="Seller"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="dark:text-white">Dr. Ramesh Sharma</h4>
                <p className="text-sm text-neutral-500">Cultural Researcher • Member since 2023</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex flex-1 items-center justify-center gap-4 rounded-md bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800">
                <MessageCircle fill="#fff" />
                Contact Seller
              </button>
              <button className="rounded-md border border-neutral-300 px-6 py-3 text-neutral-700 hover:bg-neutral-50">
                <Heart />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
