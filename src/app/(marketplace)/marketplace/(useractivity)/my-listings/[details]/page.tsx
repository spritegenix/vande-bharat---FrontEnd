"use client";
import { SquarePen } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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
import { useGetMarketplaceItem } from "@/queries/marketplace/queries";
import { useParams } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  condition: z.string(),
  location: z.string(),
  marketplaceCategoryId: z.string(),
  description: z.string(),
  images: z.array(z.string()),
});

export default function Page() {
  const params = useParams();
  const detail = params.details as string;
  const { data: singleItem, isLoading } = useGetMarketplaceItem(detail);
  const { mutate: updateItem, isSuccess, isPending } = useUpdateMarketplaceItem();
  const [selectedImage, setSelectedImage] = useState("");
  const [editableImages, setEditableImages] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const ImageOpenRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      condition: "",
      location: "",
      marketplaceCategoryId: "",
      images: [],
      description: "",
    },
  });

  useEffect(() => {
    if (singleItem) {
      form.reset({
        title: singleItem.title,
        price: singleItem.price,
        condition: "Excellent", // Assuming this is static for now
        location: "Mumbai, Maharashtra", // Assuming this is static for now
        marketplaceCategoryId: singleItem.marketplaceCategoryId.name,
        images: singleItem.attachments,
        description: singleItem.description,
      });
      setSelectedImage(singleItem.attachments[0]);
      setEditableImages(singleItem.attachments);
    }
  }, [singleItem, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateItem({ itemSlug: detail, updateData: values });
    console.log(values);
    setIsEditing(false);
  }

  const handleAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = reader.result as string;
        setEditableImages([...editableImages, newImage]);
        form.setValue("images", [...editableImages, newImage]); // Update form state
      };
      reader.readAsDataURL(file[0]);
    }
    if (ImageOpenRef.current) {
      ImageOpenRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...editableImages];
    updatedImages.splice(index, 1);
    setEditableImages(updatedImages);
    form.setValue("images", updatedImages); // Update form state
  };

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
            images={editableImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isEditing={isEditing}
            handleRemoveImage={handleRemoveImage}
            handleAddNewImage={handleAddNewImage}
          />

          <div>
            <Form {...form}>
              <ProductDetailsDisplay isEditing={isEditing} form={form} />{" "}
              {/* Use new component and pass form */}
              <ProductEditForm
                form={form}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onSubmit={onSubmit}
              />
            </Form>
            {/* <SellerInfoCard /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
