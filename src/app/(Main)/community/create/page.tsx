"use client";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageCropperModal from "@/components/common/ImageCropperModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { getPresignedUrl, uploadToS3 } from "@/queries/user/user.api";
import { useAuthAxios } from "@/lib/axios";
import { useCreateCommunity } from "@/queries/community/community.mutation";

/* -------------------------------------------------------------------------- */
/*                                    Zod                                    */
/* -------------------------------------------------------------------------- */
const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
const communityFormSchema = z.object({
  name: z.string().min(1, "Community Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  isPrivate: z.boolean().default(false).optional(),
  location: z.string().optional(),
  banner: z
    .any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_IMAGE_SIZE), {
      message: "Image must be under 500KB",
    })
    .optional(),
  tags: z.array(z.string().min(1, "Tag cannot be empty")),
  rules: z.array(z.string().min(1, "Rule cannot be empty")),
});

export type CommunityFormValues = z.infer<typeof communityFormSchema>;

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */
export default function CommunityPage() {
  /* ------------------------------- Image state ------------------------------ */
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [openCropper, setOpenCropper] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const axios = useAuthAxios();
  const { mutate } = useCreateCommunity();

  /* ------------------------- React‑Hook‑Form setup -------------------------- */
  const form = useForm<CommunityFormValues>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      name: "",
      banner: null,
      category: "",
      description: "",
      isPrivate: false,
      location: "",
      tags: [""],
      rules: [""],
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const rules = watch("rules") ?? [];

  /* ---------------------- Tags input as comma-separated --------------------- */
  const tagsArray = watch("tags") ?? [];
  const [tagsInput, setTagsInput] = useState(tagsArray.join(", "));

  function handleTagsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setTagsInput(input);
    const tags = input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setValue("tags", tags, { shouldValidate: true, shouldDirty: true });
  }

  /* ------------------------- Rules add/update/remove ------------------------ */
  const addRule = () => setValue("rules", [...rules, ""]);

  const removeRule = (index: number) => {
    const updated = [...rules];
    updated.splice(index, 1);
    setValue("rules", updated);
  };

  const updateRule = (index: number, value: string) => {
    const updated = [...rules];
    updated[index] = value;
    setValue("rules", updated);
  };

  /* ---------------------------- Form Submission ----------------------------- */
  const onSubmit = async (data: CommunityFormValues) => {
    let bannerUrl = "";
    if (croppedImage) {
      const finalFile = new File([croppedImage], "cover.jpg", { type: croppedImage.type });
      const { uploadUrl, fileUrl } = await getPresignedUrl(axios, finalFile, "covers");
      await uploadToS3(axios, uploadUrl, finalFile);
      bannerUrl = fileUrl;
    }

    // Create payload with banner URL override
    const payloadToSend = {
      ...data,
      banner: bannerUrl,
    };

    mutate(payloadToSend);
  };

  /* ------------------------------- Render ----------------------------------- */
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <Tabs defaultValue="community" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="community">Create Community</TabsTrigger>
        </TabsList>

        <TabsContent value="community">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Community Name */}
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Community Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Ancient Architecture Society" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Cultural Heritage",
                                "Art and Literature",
                                "Technology and Innovation",
                                "Environmental Awareness",
                                "Education and Learning",
                                "Community Service",
                              ].map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
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

                {/* Description */}
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the purpose and goals of your community..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Privacy + Location */}
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* isPrivate */}
                  <FormField
                    control={control}
                    name="isPrivate"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Privacy Setting</FormLabel>
                          <FormDescription>
                            {field.value
                              ? "Private - Approval required"
                              : "Public - Anyone can join"}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Community Images */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Community Images</h3>

                <FormField
                  control={control}
                  name="banner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                            if (file) {
                              setImageFile(file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string);
                                setOpenCropper(true);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {imagePreview && (
                  <ImageCropperModal
                    imageSrc={imagePreview}
                    open={openCropper}
                    onClose={() => {
                      setOpenCropper(false);
                      // Optionally reset image states if you want:
                      // setImageFile(null);
                      // setImagePreview(null);
                      // setValue("banner", null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    onCropped={(blob) => {
                      setCroppedImage(blob);
                    }}
                  />
                )}
                {croppedImage && (
                  <img
                    src={URL.createObjectURL(croppedImage)}
                    alt="Cropped preview"
                    className="mt-4 w-full rounded border"
                  />
                )}
              </div>

              {/* Community Rules */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Community Rules</h3>
                <div className="space-y-3">
                  {rules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={rule}
                        onChange={(e) => updateRule(index, e.target.value)}
                        placeholder={`Rule ${index + 1}`}
                      />
                      <Button type="button" variant="ghost" onClick={() => removeRule(index)}>
                        🗑️
                      </Button>
                    </div>
                  ))}

                  {rules.length < 4 && (
                    <Button type="button" variant="outline" onClick={addRule}>
                      ➕ Add Another Rule
                    </Button>
                  )}
                </div>
              </div>

              {/* Tags input as comma-separated */}
              <FormField
                control={control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        value={tagsInput}
                        onChange={handleTagsChange}
                        placeholder="heritage, culture, history"
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.tags && (
                        <>
                          {Array.isArray(errors.tags)
                            ? errors.tags.map((e, i) => <div key={i}>{e?.message || null}</div>)
                            : errors.tags.message}
                        </>
                      )}
                    </FormMessage>
                    <FormDescription>
                      Separate tags with commas. At least one tag required.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Action Bar */}
              <div className="flex justify-between border-t pt-6">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Create Community</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </section>
  );
}
