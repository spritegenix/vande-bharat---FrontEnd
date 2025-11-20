"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUploadMedia } from "@/hooks/useUploadMedia";
import { useCreateMarketplaceItem } from "@/queries/marketplace/mutations"; // Assuming this mutation exists
import { useGetMarketplaceCategories } from "@/queries/marketplace/queries"; // Import useGetMarketplaceCategories
import { useAuthAxios } from "@/lib/axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { marketplaceMediaObjectSchema } from "@/types/post";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(30, "Description must be at least 30 characters long"),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  condition: z.string().min(1, "Condition is required"),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  currency: z.string().min(1, "Currency is required"),
  images: z
    .array(z.union([z.instanceof(File), marketplaceMediaObjectSchema]))
    .min(1, "At least one image is required")
    .max(10, "You can upload a maximum of 10 images.")
    .refine((files) => files.every((file) => !(file instanceof File) || file.size <= 1024 * 1024), {
      message: "Each image must be less than 1MB.",
    }),
});
export type ProductType = z.infer<typeof productSchema>;
export default function ListingForm() {
  const [isLocating, setIsLocating] = useState(false); // State for location loading
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      price: 0,
      condition: "New",
      location: "",
      phoneNumber: "",
      currency: "INR",
      images: [],
    },
  });
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false); // New state for drag-and-drop
  const { control, reset, handleSubmit, watch, setValue } = form;

  const currentImages = watch("images");
  const axios = useAuthAxios();
  const { data: categories } = useGetMarketplaceCategories(); // Fetch categories
  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const validFiles: File[] = [];
      const oversizedFiles: string[] = [];

      Array.from(files).forEach((file) => {
        if (file instanceof File && file.type.startsWith("image/")) {
          if (file.size <= 1024 * 1024) {
            // 1MB limit
            if (currentImages.length + validFiles.length < 10) {
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
        const updatedImages = [...currentImages, ...validFiles];
        setValue("images", updatedImages);
        setImagePreview(
          updatedImages.map((item) => {
            if (item instanceof File) {
              return URL.createObjectURL(item);
            } else if (typeof item === "object" && item !== null && "url" in item) {
              return item.url;
            }
            return ""; // Fallback for unexpected types
          }),
        );
      }
    },
    [currentImages, setValue],
  );

  const handleGetLocation = async () => {
    setIsLocating(true); // Start loading
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding using OpenStreetMap Nominatim
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const data = await response.json();
            if (data.address) {
              const city = data.address.city || data.address.town || data.address.village || "";
              const state = data.address.state || "";
              if (city && state) {
                setValue("location", `${city}, ${state}`);
              } else if (city) {
                setValue("location", city);
              } else if (state) {
                setValue("location", state);
              } else {
                setValue("location", "Location not found");
              }
            } else {
              setValue("location", "Location not found");
            }
          } catch (error) {
            console.error("Error during reverse geocoding:", error);
            alert("Error getting location details. Please try again.");
            setValue("location", ""); // Clear location on error
          } finally {
            setIsLocating(false); // End loading
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to retrieve your location. Please ensure location services are enabled and granted permission.",
          );
          setValue("location", ""); // Clear location on error
          setIsLocating(false); // End loading
        },
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setValue("location", ""); // Clear location if not supported
      setIsLocating(false); // End loading
    }
  };

  const { mutateAsync: uploadMedia } = useUploadMedia(axios, "products");
  const { mutateAsync: createMarketplaceItem } = useCreateMarketplaceItem();

  const handleRemoveImage = (index: number) => {
    const updatedImagePreviews = [...imagePreview];
    updatedImagePreviews.splice(index, 1);
    setImagePreview(updatedImagePreviews);

    const updatedFormImages = [...currentImages];
    updatedFormImages.splice(index, 1);
    setValue("images", updatedFormImages);
  };

  const onSubmit = async (values: ProductType) => {
    try {
      const uploadedAttachments = await Promise.all(
        values.images.map(async (image) => {
          if (image instanceof File) {
            const uploadedMediaObject = await uploadMedia(image);
            return uploadedMediaObject;
          }
          return image; // Should not happen for new listings, but for type safety
        }),
      );

      const createPayload = {
        title: values.productName,
        description: values.description,
        price: values.price,
        condition: values.condition,
        location: values.location,
        phoneNumber: values.phoneNumber,
        currency: values.currency,
        marketplaceCategoryId: values.category, // Assuming category is the ID
        attachments: uploadedAttachments,
      };
      await createMarketplaceItem(createPayload);
      reset(); // Clear form
      setImagePreview([]); // Clear image previews
      toast.success("Listing created successfully");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error("Failed to create listing. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Product Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Category *</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[180px] overflow-y-auto">
                        {categories?.pages
                          ?.flatMap((page) => page.items)
                          ?.map((category: { _id: string; name: string }) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Description *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your product" {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Price *</FormLabel>
                  <FormControl>
                    <Input placeholder="₹0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Condition *</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        {/* Do NOT spread field here */}
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {["New", "Like New", "Good", "Fair"].map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Currency *</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {["INR", "USD", "EUR", "GBP", "JPY"].map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={handleGetLocation}
              className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 md:text-base"
              disabled={isLocating}
            >
              {isLocating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Get Current Location
            </Button>
          </div>
          <div>
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={control}
            name="images"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem>
                <FormLabel> Product Images *</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        handleFiles(files);
                        onChange(files);
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={(e) => {
                        ref(e);
                        imageInputRef.current = e;
                      }}
                      className="z-10 hidden"
                    />
                    <div
                      className={`inset-0 z-0 rounded-lg border-2 border-dashed p-6 text-center ${
                        isDragging ? "border-blue-500 bg-blue-50" : "border-neutral-300"
                      }`}
                      onClick={() => imageInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragEnter={() => setIsDragging(true)}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const files = Array.from(e.dataTransfer.files);
                        handleFiles(files);
                        onChange(files); // Update react-hook-form field
                      }}
                    >
                      <i className="mx-auto mb-2 flex h-16 items-center justify-center text-neutral-400">
                        <svg
                          className="svg-inline--fa fa-cloud-arrow-up w-16"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="cloud-arrow-up"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="currentColor"
                            d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                          />
                        </svg>
                      </i>
                      <p className="text-neutral-600">Click to upload images</p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="image-previews mt-4 flex flex-wrap gap-2">
          {imagePreview.map((src, index) => (
            <div key={src} className="relative">
              <img
                src={src}
                alt={`preview ${index + 1}`}
                className="z-0 h-20 w-20 rounded border border-gray-300 object-cover"
              />
              <button
                className="absolute -right-1 -top-1 z-20 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <Button
          type="submit"
          className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 md:text-base"
        >
          Create Listing
        </Button>
      </form>
    </Form>
  );
}
