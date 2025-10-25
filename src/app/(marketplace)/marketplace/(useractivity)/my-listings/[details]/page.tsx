"use client";
import { SquarePen } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProductImageGallery from "@/components/marketplace/ProductImageGallery";
import ProductDetailsDisplay from "@/components/marketplace/ProductDetailsDisplay"; // Import new component
import ProductEditForm from "@/components/marketplace/ProductEditForm"; // Import new component
import { useUpdateMarketplaceItem } from "@/queries/marketplace/mutations";
import { useGetMarketplaceCategories, useGetMarketplaceItem } from "@/queries/marketplace/queries";
import { useParams } from "next/navigation";
import { useUploadMedia } from "@/hooks/useUploadMedia";
import { dataURLtoFile } from "@/lib/utils";
import { a } from "framer-motion/m";
import { useAuthAxios } from "@/lib/axios";

import { category, formSchema, marketplaceMediaObjectSchema } from "@/types/post";
// Assuming IMedia structure for attachments

export default function Page() {
  const params = useParams();
  const detail = params.details as string;
  const axios = useAuthAxios();
  const { data: singleItem, isLoading } = useGetMarketplaceItem(detail);
  const { mutate: updateItem, isSuccess, isPending } = useUpdateMarketplaceItem();
  const { mutateAsync: uploadMedia } = useUploadMedia(axios, "products");
  const [selectedImage, setSelectedImage] = useState<
    string | z.infer<typeof marketplaceMediaObjectSchema>
  >("");
  const [editableImages, setEditableImages] = useState<
    (string | z.infer<typeof marketplaceMediaObjectSchema>)[]
  >([]);
  const [isEditing, setIsEditing] = useState(false);
  const ImageOpenRef = useRef<HTMLInputElement>(null);
  // Derived state for ProductImageGallery
  const imageUrlsForGallery = editableImages.map((item) =>
    typeof item === "string" ? item : item.url,
  );
  const selectedImageUrlForGallery =
    typeof selectedImage === "string" ? selectedImage : selectedImage?.url;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      condition: "",
      location: "",
      phoneNumber: "",
      marketplaceCategoryId: "",
      images: [],
      description: "",
      currency: "",
    },
  });

  useEffect(() => {
    if (singleItem) {
      form.reset({
        title: singleItem?.title || "",
        price: singleItem?.price || 0,
        condition: singleItem?.condition || "",
        location: singleItem?.location ?? "",
        phoneNumber: singleItem?.phoneNumber || "",
        marketplaceCategoryId: singleItem?.marketplaceCategoryId?._id || "",
        images: singleItem?.attachments || [],
        description: singleItem?.description || "",
        currency: singleItem?.currency || "",
      });
      setSelectedImage(singleItem?.attachments[0]);
      setEditableImages(singleItem?.attachments);
    }
  }, [singleItem, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const processedAttachments = await Promise.all(
        values.images.map(async (image: z.infer<typeof formSchema>["images"][number]) => {
          if (typeof image === "string") {
            if (image.startsWith("data:image")) {
              // New image (data URL), upload it to S3 and get the full media object
              const file = dataURLtoFile(image, `product-image-${Date.now()}`);
              const uploadedMediaObject = await uploadMedia(file);
              return uploadedMediaObject;
            } else {
              // Existing image URL (string from backend), convert to a minimal media object
              // This ensures all attachments sent to backend conform to mediaObjectSchema
              // without re-uploading existing S3 images.
              return {
                url: image,
                type: "IMAGE", // Assuming existing URLs are images; adjust if video is possible
                fileName: image.substring(image.lastIndexOf("/") + 1), // Extract filename from URL
                mimeType: "image/jpeg", // Default mime type; ideally fetched from backend
                size: 0, // Placeholder size; ideally fetched from backend
                uploadedAt: new Date().toISOString(), // Placeholder date; ideally fetched from backend
              };
            }
          }
          // If 'image' is already a media object (from singleItem?.attachments or a recent upload), return it as is.
          return image;
        }),
      );

      const updatedValues = {
        ...values,
        attachments: processedAttachments,
        marketplaceCategoryId: values.marketplaceCategoryId,
      };
      console.log("updated", updatedValues);
      updateItem({ itemSlug: detail, updateData: updatedValues });
    } catch (error) {
      console.error("Error uploading images or updating item:", error);
    } finally {
      setIsEditing(false);
    }
  }

  const handleAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const validFiles: File[] = [];
    const oversizedFiles: string[] = [];
    const maxImages = 10;
    const currentTotalImages = editableImages.length;

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        if (file.size <= 1024 * 1024) {
          // 1MB limit
          if (currentTotalImages + validFiles.length < maxImages) {
            validFiles.push(file);
          } else {
            alert("You can upload a maximum of 10 images.");
          }
        } else {
          oversizedFiles.push(file.name);
        }
      }
    });

    if (oversizedFiles.length > 0) {
      alert(
        `The following images exceed the 1MB limit and were not added: ${oversizedFiles.join(", ")}`,
      );
    }

    if (validFiles.length > 0) {
      const newImagePromises = validFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(newImagePromises).then((newImageUrls) => {
        setEditableImages((prevImages) => [...prevImages, ...newImageUrls]);
        form.setValue("images", [...editableImages, ...newImageUrls]);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...editableImages];
    updatedImages.splice(index, 1);
    setEditableImages(updatedImages);
    form.setValue("images", updatedImages);
  };
  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding using OpenStreetMap Nominatim
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.address) {
                const city = data.address.city || data.address.town || data.address.village || "";
                const state = data.address.state || "";
                if (city && state) {
                  form.setValue("location", `${city}, ${state}`);
                } else if (city) {
                  form.setValue("location", city);
                } else if (state) {
                  form.setValue("location", state);
                } else {
                  form.setValue("location", "Location not found");
                }
              } else {
                form.setValue("location", "Location not found");
              }
            })
            .catch((error) => {
              console.error("Error during reverse geocoding:", error);
              alert("Error getting location details. Please try again.");
              form.setValue("location", ""); // Clear location on error
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to retrieve your location. Please ensure location services are enabled and granted permission.",
          );
          form.setValue("location", ""); // Clear location on error
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      form.setValue("location", ""); // Clear location if not supported
    }
  }, [form]); // Dependencies for useCallback

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <section id="product-detail" className="mb-12">
      <div className="flex items-center">
        <h2 className="p-6 text-2xl dark:text-white">Product Details</h2>
        {!isEditing && <SquarePen onClick={() => setIsEditing(true)} />}
      </div>

      <div className="p-6">
        <div className="grid-cols-2 gap-8 md:grid">
          <ProductImageGallery
            images={imageUrlsForGallery}
            selectedImage={selectedImageUrlForGallery}
            setSelectedImage={(url: string) => {
              // When an image is selected in the gallery, find the corresponding full object or string
              const originalImage = editableImages.find((item) =>
                typeof item === "string" ? item === url : item.url === url,
              );
              if (originalImage) {
                setSelectedImage(originalImage);
              } else {
                setSelectedImage(url); // Fallback if not found (shouldn't happen if logic is correct)
              }
            }}
            isEditing={isEditing}
            handleRemoveImage={handleRemoveImage}
            handleAddNewImage={handleAddNewImage}
          />

          <div>
            <Form {...form}>
              <ProductDetailsDisplay
                isEditing={isEditing}
                form={form}
                marketplaceItemId={singleItem?._id}
                publishedAt={singleItem?.createdAt}
                categoryName={singleItem?.marketplaceCategoryId?.name || ""}
              />{" "}
              {/* Use new component and pass form */}
              <ProductEditForm
                form={form}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSubmit={onSubmit}
                handleGetLocation={handleGetLocation} // Pass the function as a prop
              />
            </Form>
            {/* <SellerInfoCard /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
