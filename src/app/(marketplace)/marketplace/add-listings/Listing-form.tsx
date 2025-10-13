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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(30, "Description is required"),
  price: z.string().min(1, "Price is required"),
  condition: z.string().min(1, "Condition is required"),
  location: z.string().min(1, "Location is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
});
export type ProductType = z.infer<typeof productSchema>;
export default function ListingForm() {
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      price: "",
      condition: "New",
      location: "",
      images: [],
    },
  });
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
    setValue,
  } = form;
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...imagePreview];
    updatedImages.splice(index, 1);
    setImagePreview(updatedImages);
  };
  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
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
                      <SelectContent>
                        {["Books & Research", "Spiritual Items", "Cultural Artifacts"].map(
                          (item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ),
                        )}
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

        <div className="grid grid-cols-3 gap-6">
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
                        const file = Array.from(e.target.files ?? []);
                        onChange(file);
                        setImagePreview(file.map((file) => URL.createObjectURL(file)));
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
                      className="inset-0 z-0 rounded-lg border-2 border-dashed border-neutral-300 p-6 text-center"
                      onClick={() => imageInputRef.current?.click()}
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
        <div className="image-previews mt-4 flex gap-2">
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
        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-6 py-2 text-white hover:bg-neutral-800"
        >
          Create Listing
        </button>
      </form>
    </Form>
  );
}
