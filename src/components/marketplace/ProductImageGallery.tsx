"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import React, { useRef, useState } from "react";
import Modal from "@/components/elements/Modal";

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  isEditing: boolean;
  handleRemoveImage: (index: number) => void;
  handleAddNewImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductImageGallery({
  images,
  selectedImage,
  setSelectedImage,
  isEditing,
  handleRemoveImage,
  handleAddNewImage,
}: ProductImageGalleryProps) {
  const [showLightbox, setShowLightbox] = useState(false);
  const ImageOpenRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div
        className="mb-4 flex h-96 cursor-pointer items-center justify-center rounded-lg bg-neutral-300"
        onClick={() => setShowLightbox(true)}
      >
        <img
          src={selectedImage || "/images/profile/profileplaceholder.jpg"}
          alt="Selected product image"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <div
                className={`relative flex h-20 items-center justify-center rounded bg-neutral-200 ${
                  selectedImage === image ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image || "/images/profile/profileplaceholder.jpg"}
                  alt={`Product image ${index + 1}`}
                  className="relative h-full w-full cursor-pointer rounded object-cover"
                />
                {isEditing && (
                  <button
                    className="absolute -right-1 -top-1 z-20 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white"
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                )}
              </div>
            </CarouselItem>
          ))}
          {isEditing && (
            <CarouselItem>
              <div
                className={`flex h-20 w-32 items-center justify-center rounded bg-neutral-200`}
                onClick={() => ImageOpenRef.current?.click()}
              >
                <ImagePlus className="w-fit text-neutral-900" />
                <Input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleAddNewImage(e)}
                  ref={ImageOpenRef}
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-white p-2 text-black" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-white p-2 text-black" />
      </Carousel>

      {/* Lightbox Modal */}
      {showLightbox && (
        <Modal onClose={() => setShowLightbox(false)}>
          <img
            src={selectedImage || "/images/profile/profileplaceholder.jpg"}
            alt="Product in lightbox"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </Modal>
      )}
    </div>
  );
}
