// "use client";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { SetStateAction, useRef, useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "@/lib/cropImage";
// import { toast } from "sonner";
// import ImageCropper from "../common/ImageCropper";
// import ImageCropperModal from "../common/ImageCropperModal";
// import { Switch } from "../ui/switch";
// // import GeneratedForm from "./GenerateForm";

// const MAX_IMAGE_SIZE = 500 * 1024; // 500KB

// const communitySchema = z.object({
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   image: z.any().refine((file) => !file || (file instanceof File && file.size <= MAX_IMAGE_SIZE), {
//     message: "Image must be under 500KB",
//   }),
//   isPrivate: z.boolean().default(false).optional(),
// });

// type CommunityFormData = z.infer<typeof communitySchema>;

// export default function CreateCommunityPage() {
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
//   const [openCropper, setOpenCropper] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//   }>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<CommunityFormData>({
//     resolver: zodResolver(communitySchema),
//   });

//   const createCommunityMutation = useMutation({
//     mutationFn: async (data: FormData) => {
//       return await axios.post("/api/communities", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     },
//     onSuccess: () => {
//       toast.success("Community created!");
//     },
//     onError: (error) => {
//       toast.error("Failed to create community:" + error.message);
//     },
//   });

//   const onCropComplete = (croppedPixels: any) => {
//     setCroppedAreaPixels(croppedPixels);
//   };

//   const showCroppedImage = async () => {
//     if (!imagePreview || !croppedAreaPixels) return;
//     try {
//       const cropped = await getCroppedImg(imagePreview, croppedAreaPixels, {
//         width: 820,
//         height: 312,
//       });
//       setCroppedImage(cropped);
//     } catch (error) {
//       console.error("Cropping failed", error);
//     }
//   };

//   const onSubmit = async (data: CommunityFormData) => {
//     const form = new FormData();
//     form.append("name", data.name);
//     form.append("description", data.description);
//     if (croppedImage) form.append("banner", croppedImage, imageFile?.name);
//     form.append("isPrivate", String(data.isPrivate ?? false));

//     createCommunityMutation.mutate(form);
//   };

//   return (
//     <div className="mx-auto max-w-xl px-4 py-12">
//       <h1 className="mb-6 text-2xl font-semibold">Create a Community</h1>
//       {/* <Card>
//         <CardContent className="space-y-6 p-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Community Name</Label>
//               <Input id="name" placeholder="e.g., Nature Lovers" {...register("name")} />
//               {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 placeholder="Describe your community..."
//                 {...register("description")}
//               />
//               {errors.description && (
//                 <p className="text-sm text-red-500">{errors.description.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="image">Community Image</Label>
//               <Input
//                 ref={fileInputRef}
//                 id="image"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) {
//                     setImageFile(file);
//                     setValue("image", file);
//                     const reader = new FileReader();
//                     reader.onloadend = () => {
//                       setImagePreview(reader.result as string);
//                       setOpenCropper(true);
//                     };
//                     reader.readAsDataURL(file);
//                   }
//                 }}
//               />
//               {errors.image && <p className="text-sm text-red-500">{errors?.description}</p>}

//               {imagePreview && (
//                 <ImageCropperModal
//                   imageSrc={imagePreview}
//                   open={openCropper}
//                   onClose={() => {
//                     setOpenCropper(false);
//                     setImageFile(null);
//                     setValue("image", null);
//                     if (fileInputRef.current) {
//                       fileInputRef.current.value = "";
//                     }
//                   }}
//                   onCropped={(blob: SetStateAction<Blob | null>) => setCroppedImage(blob)}
//                 />
//               )}

//               {croppedImage && (
//                 <img
//                   src={URL.createObjectURL(croppedImage)}
//                   alt="Cropped Preview"
//                   className="mt-2 w-full rounded border"
//                 />
//               )}
//             </div>
//             <div className="space-x-2 space-y-2">
//               <Switch id="private" />
//               <Label htmlFor="private">Private</Label>
//             </div>
//             <Button type="submit" className="w-full" disabled={createCommunityMutation.isPending}>
//               {createCommunityMutation.isPending ? "Creating..." : "Create Community"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card> */}
//       <Card>
//         <CardContent className="space-y-6 p-6">
//           <GeneratedForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
