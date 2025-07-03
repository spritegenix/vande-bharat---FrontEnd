"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageCropperModal from "@/components/common/ImageCropperModal";
import { SetStateAction, useRef, useState } from "react";
const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
const communityFormSchema = z.object({
  communityName: z.string().min(1, "Community Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  privacy: z.string().min(1, "Privacy setting is required"),
  location: z.string().optional(),
  image: z.any().refine((file) => !file || (file instanceof File && file.size <= MAX_IMAGE_SIZE), {
    message: "Image must be under 500KB",
  }),
  tags: z.string().optional(),
  language: z.string().optional(),
  rules: z.array(z.string().min(1, "Rule cannot be empty")).optional(),
});

type CommunityFormValues = z.infer<typeof communityFormSchema>;

export default function page() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [openCropper, setOpenCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<CommunityFormValues>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      communityName: "",
      category: "",
      description: "",
      privacy: "Public - Anyone can join",
      location: "",
      tags: "",
      language: "English",
      rules: [""],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const rules = watch("rules") || [];

  const addRule = () => {
    setValue("rules", [...rules, ""]);
  };

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

  const onSubmit = (data: CommunityFormValues) => {
    console.log(data);
    // API logic here
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <Tabs defaultValue="community" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="community">Create Community</TabsTrigger>
          {/* <TabsTrigger value="event">Create Event</TabsTrigger> */}
        </TabsList>

        <TabsContent value="community">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Community Name *</Label>
                  <Input
                    {...register("communityName")}
                    placeholder="e.g., Ancient Architecture Society"
                  />
                  {errors.communityName && (
                    <p className="text-sm text-red-500">{errors.communityName.message}</p>
                  )}
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select onValueChange={(val) => setValue("category", val)} defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cultural Heritage">Cultural Heritage</SelectItem>
                      <SelectItem value="Art and Literature">Art and Literature</SelectItem>
                      <SelectItem value="Technology and Innovation">
                        Technology and Innovation
                      </SelectItem>
                      <SelectItem value="Environmental Awareness">
                        Environmental Awareness
                      </SelectItem>
                      <SelectItem value="Education and Learning">Education and Learning</SelectItem>
                      <SelectItem value="Community Service">Community Service</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Label>Description *</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Describe the purpose and goals of your community..."
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Privacy Setting *</Label>
                  <Select
                    onValueChange={(val) => setValue("privacy", val)}
                    defaultValue="Public - Anyone can join"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Privacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public - Anyone can join">
                        Public - Anyone can join
                      </SelectItem>
                      <SelectItem value="Private - Approval required">
                        Private - Approval required
                      </SelectItem>
                      {/* <SelectItem value="Secret - Invite only">Secret - Invite only</SelectItem> */}
                    </SelectContent>
                  </Select>
                  {errors.privacy && (
                    <p className="text-sm text-red-500">{errors.privacy.message}</p>
                  )}
                </div>
                <div>
                  <Label>Location</Label>
                  <Input {...register("location" as const)} placeholder="City, State" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Community Images</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* <div>
                  <Label>Logo Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log("Logo selected:", file);
                      }
                    }}
                  />
                </div> */}
                <div>
                  <Label>Cover Image</Label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setValue("image", file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                          setOpenCropper(true);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {imagePreview && (
                    <ImageCropperModal
                      imageSrc={imagePreview}
                      open={openCropper}
                      onClose={() => {
                        setOpenCropper(false);
                        setImageFile(null);
                        setValue("image", null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      onCropped={(blob: SetStateAction<Blob | null>) => setCroppedImage(blob)}
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
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Community Rules</h3>
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
                <Button type="button" variant="outline" onClick={addRule}>
                  ➕ Add Another Rule
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Tags and Language</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Tags</Label>
                  <Input {...register("tags" as const)} placeholder="heritage, culture, history" />
                </div>
                <div>
                  <Label>Language</Label>
                  <Select onValueChange={(val) => setValue("language", val)} defaultValue="English">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                      <SelectItem value="Multiple Languages">Multiple Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-between border-t pt-4">
              <Button variant="outline" type="button">
                Save as Draft
              </Button>
              <div className="space-x-2">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Create Community</Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="event">
          <div className="py-10 text-neutral-600">Event form coming soon...</div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
