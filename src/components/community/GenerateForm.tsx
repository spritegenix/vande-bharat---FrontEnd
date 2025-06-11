"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SetStateAction, useRef, useState } from "react";
import ImageCropperModal from "../common/ImageCropperModal";
import getCroppedImg from "@/lib/cropImage";
import axios from "@/lib/axios";
import { uploadToS3 } from "@/queries/user/user.api";
import { useCreateCommunityPosts } from "@/queries/community/community.mutation";
import { communityPost } from "@/types/community";
const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
export default function GeneratedForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [openCropper, setOpenCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);
  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "This field is required" })
      .min(3, { message: "Must be at least 3 characters" }),
    description: z.string().min(10, { message: "Must be at least 10 characters" }),
    image: z
      .any()
      .refine((file) => !file || (file instanceof File && file.size <= MAX_IMAGE_SIZE), {
        message: "Image must be under 500KB",
      }),
    isPrivate: z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      isPrivate: false,
    },
  });
  const { mutate: createPost, isPending } = useCreateCommunityPosts();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const forms = new FormData();

    // use the actual croppedImage blob/file, not values.image
    if (croppedImage) {
      const file = new File([croppedImage], "cropped-image.jpg", { type: croppedImage.type });

      const uploadRes = await axios.post("/media/upload-url", {
        fileName: file.name,
        fileType: file.type,
        folder: "covers",
      });

      await uploadToS3(uploadRes.data.data.uploadUrl, file);

      forms.append("image", uploadRes.data.data.fileUrl); // URL of uploaded image
    }

    forms.append("name", values.name);
    forms.append("description", values.description);
    forms.append("isPrivate", values.isPrivate?.toString() || "false");
    const payload: communityPost = {
      name: values.name,
      description: values.description,
      image: values.image,
      isPrivate: values.isPrivate ?? false,
    };
    createPost(payload);

    form.reset();
    setCroppedImage(null);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }
  const onCropComplete = (croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const showCroppedImage = async () => {
    if (!imagePreview || !croppedAreaPixels) return;
    try {
      const cropped = await getCroppedImg(imagePreview, croppedAreaPixels, {
        width: 820,
        height: 312,
      });
      setCroppedImage(cropped);
    } catch (error) {
      console.error("Cropping failed", error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="@container space-y-8"
      >
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex flex-col items-start gap-2 space-y-0 self-end">
                <FormLabel className="flex shrink-0">Community Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="e.g., Nature Lovers"
                        type="text"
                        id="name"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex flex-col items-start gap-2 space-y-0 self-end">
                <FormLabel className="flex shrink-0">Description</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Textarea
                      key="textarea-0"
                      id="description"
                      placeholder="Describe your community..."
                      className=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex flex-col items-start gap-2 space-y-0 self-end">
                <FormLabel className="flex shrink-0">Community Image</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        ref={fileInputRef}
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setImageFile(file);
                            form.setValue("image", file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string);
                              setOpenCropper(true);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                  {imagePreview && (
                    <ImageCropperModal
                      imageSrc={imagePreview}
                      open={openCropper}
                      onClose={() => {
                        setOpenCropper(false);
                        setImageFile(null);

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      onCropped={(blob) => {
                        setCroppedImage(blob);
                        if (blob) {
                          const file = new File([blob], "cropped-image.jpg", { type: blob.type });
                          form.setValue("image", file, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }
                      }}
                    />
                  )}

                  {croppedImage && (
                    <img
                      src={URL.createObjectURL(croppedImage)}
                      alt="Cropped Preview"
                      className="mt-2 w-full rounded border"
                    />
                  )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="isPrivate">Private</FormLabel>
                  <FormControl>
                    <Switch id="isPrivate" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-12">
            <Button id="submit" className="w-full" type="submit" variant="default">
              {isPending ? "creating community" : "Create Community"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
