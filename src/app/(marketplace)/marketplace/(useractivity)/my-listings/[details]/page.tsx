"use client";
import { SquarePen } from "lucide-react";
import React, { useRef, useState } from "react";
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
import SellerInfoCard from "@/components/marketplace/SellerInfoCard"; // Import new component

const images = [
  "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1549122728-f5197094356a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519682337058-e9941a192e53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  condition: z.string(),
  location: z.string(),
  category: z.string(),
  description: z.string(),
  images: z.array(z.string()),
});

export default function Page() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [editableImages, setEditableImages] = useState(images);
  const [isEditing, setIsEditing] = useState(false);
  const ImageOpenRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Rare Sanskrit Texts Collection",
      price: 25000,
      condition: "Excellent",
      location: "Mumbai, Maharashtra",
      category: "Books & Research",
      images: images,
      description:
        "A rare collection of Sanskrit manuscripts dating back to the 12th century. These texts contain valuable insights into ancient Indian philosophy, mathematics, and astronomy. The manuscripts are well-preserved and include original palm leaf writings with traditional ink. Perfect for researchers, historians, and cultural institutions.",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
