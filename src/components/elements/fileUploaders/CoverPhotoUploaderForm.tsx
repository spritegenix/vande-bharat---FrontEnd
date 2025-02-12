"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "react-dropzone";
import Button from "@/components/elements/Button";
import Image from "next/image";
import { ProgressBar } from "@/components/elements/ProgressBar";
import { PiDropboxLogo, PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "@/components/elements/Modal";
import CroppingImageModal from "@/components/elements/CroppedImageUpload/CroppingImageModal";
import { TbReplace } from "react-icons/tb";

// Types
interface CachedImage {
  id: string | undefined;
  url: string;
  file: File;
  order?: number;
  toDelete?: boolean;
}

interface FormValues {
  coverPhotos: [File, ...File[]]; // At least one file required
}

interface CoverPhotoUploaderFormProps {
  maxFiles?: number;
  aspectRatio?: number;
  mutationHandler: any;
  loading?: boolean;
  error?: string;
  defaultData?: CachedImage[];
  responseData?: any;
}

interface UploadProgressMap {
  [key: string]: number;
}

// Convert base64 to File object
const base64ToFile = async (base64String: string): Promise<File> => {
  const response = await fetch(base64String);
  const blob = await response.blob();
  return new File([blob], "cropped-image.png", { type: "image/png" });
};

// Schema with additional validation
const createCoverPhotoUploaderFormSchema = (maxFiles: number, maxFileSize: number) =>
  z.object({
    coverPhotos: z
      .custom<[File, ...File[]]>(
        (val): val is [File, ...File[]] =>
          Array.isArray(val) && val.length > 0 && val.every((file) => file instanceof File),
      )
      .refine(
        (files) => files.every((file) => file.size <= maxFileSize),
        `Each file must be less than ${maxFileSize / (1024 * 1024)}MB`,
      )
      .refine((files) => files.length <= maxFiles, `You can upload up to ${maxFiles} photos`)
      .refine((files) => files.length > 0, "At least one photo is required"),
  });

export default function CoverPhotoUploaderForm({
  defaultData,
  maxFiles = 8,
  aspectRatio = 5 / 1,
  mutationHandler,
  loading = false,
  error,
  responseData,
}: CoverPhotoUploaderFormProps) {
  // Constants
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
  const schema = useMemo(
    () => createCoverPhotoUploaderFormSchema(maxFiles, MAX_FILE_SIZE),
    [maxFiles, MAX_FILE_SIZE],
  );

  // Form setup
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      coverPhotos: undefined,
    },
  });

  // State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cachedImages, setCachedImages] = useState<CachedImage[]>(defaultData || []);
  const [imageObjectsToBeUpload, setImageObjectsToBeUpload] = useState<any[]>([]);
  const [croppedImage, setCroppedImage] = useState<string>(""); // Final cropped image
  const [uploadProgress, setUploadProgress] = useState<UploadProgressMap>({});
  const [viewerModalState, setViewerModalState] = useState<{
    isOpen: boolean;
    selectedIndex: number | null;
  }>({ isOpen: false, selectedIndex: null });
  const [cropperModalState, setCropperModalState] = useState<{
    isOpen: boolean;
    selectedIndex: number | null;
  }>({ isOpen: false, selectedIndex: null });

  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const [otherErrors, setOtherErrors] = useState<string[]>([]);

  // Watch form values
  const coverPhotos = watch("coverPhotos");

  // File handling callbacks
  const handleDrop = (acceptedFiles: File[]) => {
    setOtherErrors([]);
    try {
      const currentFiles = coverPhotos || [];
      const newFiles = [...currentFiles, ...acceptedFiles];
      setValue("coverPhotos", newFiles as [File, ...File[]]);
      const newCachedImages = acceptedFiles?.map((file) => ({
        id: undefined,
        url: URL.createObjectURL(file),
        file: file,
        order: undefined,
        toDelete: false,
      }));

      setCachedImages((prev) => [...prev, ...newCachedImages]);
    } catch (error) {
      console.error("Error handling file drop:", error);
      setError("coverPhotos", {
        type: "manual",
        message: "Error processing files",
      });
    }
  };

  useEffect(() => {
    handleCroppedImage(croppedImage);
  }, [croppedImage]);

  const handleCroppedImage = async (croppedImageBase64: string) => {
    if (cropperModalState.selectedIndex === null) return;
    // console.log("croppedImageBase64", croppedImageBase64);
    try {
      const file = await base64ToFile(croppedImage); // Convert base64 to File
      const originalFile = cachedImages[cropperModalState.selectedIndex];
      if (originalFile.id !== undefined) {
        await mutationHandler([{ id: originalFile.id, file: file }]);
      } else {
        const newPhotos = [...coverPhotos];
        const selectedFileIndex = coverPhotos.findIndex(
          (item) => item.name === originalFile?.file.name,
        );
        newPhotos[selectedFileIndex] = file;
        setValue("coverPhotos", newPhotos as [File, ...File[]]);
      }
      setCachedImages((prev) =>
        prev.map((item, i) =>
          i === cropperModalState.selectedIndex
            ? { ...item, file, url: URL.createObjectURL(file) }
            : item,
        ),
      );
      // setCropperModalState({ isOpen: false, selectedIndex: null });
    } catch (error) {
      console.error("Error processing cropped image:", error);
      setError("coverPhotos", {
        type: "manual",
        message: "Failed to process cropped image",
      });
    }
  };

  // Handle image deletion
  const handleDelete = async (selectedItem: any, index: number) => {
    if (selectedItem?.id !== undefined) {
      await mutationHandler([{ id: selectedItem?.id, toDelete: true }]);
      setCachedImages((prev) => prev.filter((item) => item?.id !== selectedItem?.id));
    } else {
      setCachedImages((prev) => prev.filter((_, i) => i !== index));
      const newFiles = coverPhotos.filter((item, i) => item.name !== selectedItem.file.name);
      setValue("coverPhotos", newFiles as [File, ...File[]]);
    }
  };

  // Handle replace image click
  const handleReplaceClick = useCallback((item: any, index: number) => {
    setReplaceIndex(index);
    fileInputRef.current?.click();
  }, []);

  // Handle file replacement
  const handleFileReplacement = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || replaceIndex === null) return;
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("coverPhotos", {
        type: "manual",
        message: `File must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      });
      return;
    }
    const selectedCachedImage = cachedImages[replaceIndex];
    if (selectedCachedImage?.id !== undefined) {
      await mutationHandler([{ id: selectedCachedImage?.id, file: file }]);
      // Update the cached image in the local state to reflect the new file
      setCachedImages((prev) =>
        prev.map((item, i) =>
          i === replaceIndex ? { ...item, file: file, url: URL.createObjectURL(file) } : item,
        ),
      );
    } else {
      // Replace the file at the specified index
      const newFiles = [...coverPhotos];
      const selectedFileIndex = coverPhotos.findIndex(
        (item) => item.name === selectedCachedImage?.file.name,
      );
      // console.log("Replacing file at index:", replaceIndex, selectedFileIndex);
      newFiles[selectedFileIndex] = file;
      setValue("coverPhotos", newFiles as [File, ...File[]]);
      setCachedImages((prev) =>
        prev.map((item, i) =>
          i === replaceIndex ? { ...item, file: file, url: URL.createObjectURL(file) } : item,
        ),
      );
      // // Reset input and replace index
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

    // setReplaceIndex(null);
  };

  // useEffect to handle uploads after state is updated
  useEffect(() => {
    const uploadImages = async () => {
      try {
        await handleUpload(imageObjectsToBeUpload.map((obj) => obj.file));
        setImageObjectsToBeUpload([]);
      } catch (error) {
        setError("coverPhotos", {
          type: "manual",
          message: "Failed to upload files",
        });
      }
    };

    if (imageObjectsToBeUpload.length > 0) {
      uploadImages();
    }
  }, [imageObjectsToBeUpload]);

  const handleUpload = async (files: File[]) => {
    if (!files.length || !imageObjectsToBeUpload.length) return;

    const initialProgress = files.reduce((acc, file) => {
      acc[file.name] = 0;
      return acc;
    }, {} as UploadProgressMap);
    setUploadProgress(initialProgress);

    try {
      await Promise.all(
        files.map(async (file) => {
          for (let progress = 10; progress <= 90; progress += 10) {
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: progress,
            }));
            await new Promise((res) => setTimeout(res, 100));
          }
        }),
      );

      // console.log("Image objects to be uploaded:", imageObjectsToBeUpload);
      await mutationHandler(imageObjectsToBeUpload);
      setUploadProgress((prev) =>
        Object.keys(prev).reduce((acc, key) => {
          acc[key] = 100;
          return acc;
        }, {} as UploadProgressMap),
      );
    } catch (err) {
      throw new Error("Failed to upload images. Please try again.");
    } finally {
      setTimeout(() => setUploadProgress({}), 1000);
    }
  };

  // Memoized dropzone content
  const dropzoneContent = useMemo(
    () => (
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-5 text-center hover:bg-gray-50">
        <PiDropboxLogo className="text-4xl text-bg1" />
        <p className="text-sm text-gray-600">Drag and drop photos here, or click to select</p>
        <p className="text-xs text-gray-500">
          Max {maxFiles} photos, {MAX_FILE_SIZE / (1024 * 1024)}MB each
        </p>
      </div>
    ),
    [maxFiles, MAX_FILE_SIZE],
  );

  const onSubmit = async (data: FormValues) => {
    setOtherErrors([]);
    const imageObjects = data?.coverPhotos.map((file) => ({
      id: undefined,
      url: undefined,
      file,
      toDelete: false,
      order: undefined,
    }));

    // Update state and wait for useEffect to trigger upload
    setImageObjectsToBeUpload((prev) => [...prev, ...imageObjects]);
    setValue("coverPhotos", [] as any);
  };
  return (
    <>
      {/* Hidden file input for replacement */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileReplacement}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Controller
          name="coverPhotos"
          control={control}
          render={() => (
            <>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {cachedImages.map((item, index) => (
                  <div key={item.id || item.file.name || index} className="group relative">
                    <Image
                      src={item?.url}
                      alt={(item?.id as string) || index.toString()}
                      className="h-32 w-full rounded-md object-cover"
                      width={200}
                      height={200}
                      onClick={() =>
                        setViewerModalState({
                          isOpen: true,
                          selectedIndex: index,
                        })
                      }
                    />
                    {/* Replace image button  */}
                    <button
                      type="button"
                      className="absolute right-1 top-1 rounded-full bg-bg1 p-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleReplaceClick(item, index)}
                    >
                      <TbReplace className="text-lg" />
                    </button>
                    {/* Edit Button  */}
                    <button
                      type="button"
                      className="absolute right-1 top-8 rounded-full bg-bg1 p-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() =>
                        setCropperModalState({
                          isOpen: true,
                          selectedIndex: index,
                        })
                      }
                    >
                      <PiNotePencilDuotone className="text-lg" />
                    </button>
                    {/* Delete button  */}
                    <button
                      type="button"
                      className="absolute right-1 top-16 rounded-full bg-red-500 p-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleDelete(item, index)}
                    >
                      <RiDeleteBin6Line className="text-lg" />
                    </button>
                    {/* ProgressBar  */}
                    {item?.file && uploadProgress[item?.file.name] !== undefined && (
                      <ProgressBar
                        progress={uploadProgress[item?.file.name]}
                        label={`Uploading: ${item?.file.name}`}
                      />
                    )}
                  </div>
                ))}
                {/* Dropzone  */}
                {(!cachedImages || cachedImages.length < maxFiles) && (
                  <Dropzone
                    onDrop={handleDrop}
                    accept={{ "image/*": [] }}
                    maxSize={MAX_FILE_SIZE}
                    maxFiles={maxFiles - cachedImages?.length}
                    onDropRejected={(data) =>
                      data.forEach((item) =>
                        setOtherErrors((prev) => [
                          ...prev,
                          `${item.file.name} - ${item.errors[0].code}`,
                        ]),
                      )
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {dropzoneContent}
                      </div>
                    )}
                  </Dropzone>
                )}
              </div>
              {errors?.coverPhotos && (
                <p className="text-xs text-red-500">{errors?.coverPhotos.message}</p>
              )}
              {errors.root?.type === "manual" && (
                <p className="text-xs text-red-500">{errors.root.message}</p>
              )}
              {error && <p className="text-xs text-red-500">{error}</p>}
              {otherErrors && otherErrors.length > 0 && (
                <p className="text-xs text-red-500">{otherErrors.join(", ")}</p>
              )}
            </>
          )}
        />
        <Button type="submit" className="mt-5" disabled={isSubmitting || loading}>
          {isSubmitting || loading ? "Uploading..." : "Upload"}
        </Button>
        {responseData
          ? responseData.length > 0 &&
            responseData.map((item: string, index: number) => (
              <p key={index} className="text-xs text-green-500">
                {item}
              </p>
            ))
          : responseData && <p className="text-xs text-green-500">{responseData}</p>}
      </form>

      {viewerModalState.isOpen && viewerModalState.selectedIndex !== null && (
        <Modal
          handlePrevious={() =>
            setViewerModalState({
              ...viewerModalState,
              selectedIndex:
                (viewerModalState.selectedIndex! - 1 + cachedImages.length) % cachedImages.length,
            })
          }
          handleNext={() =>
            setViewerModalState({
              ...viewerModalState,
              selectedIndex: (viewerModalState.selectedIndex! + 1) % cachedImages.length,
            })
          }
          onClose={() => setViewerModalState({ isOpen: false, selectedIndex: null })}
        >
          <Image
            src={cachedImages[viewerModalState.selectedIndex]?.url}
            alt={cachedImages[viewerModalState.selectedIndex]?.id || "Selected image"}
            className="max-h-[90vh] w-auto rounded-md object-contain"
            width={800}
            height={800}
          />
        </Modal>
      )}

      {cropperModalState.isOpen && cropperModalState.selectedIndex !== null && (
        <CroppingImageModal
          imgSrc={cachedImages[cropperModalState.selectedIndex]?.url}
          scaleButton={false}
          setCroppedImage={setCroppedImage}
          isCircularCropBoolean={false}
          aspectButton={true}
          cropDownloadButton={true}
          enableCircleButton={true}
          defaultAspect={aspectRatio}
          handleClose={() =>
            setCropperModalState((prev) => ({ isOpen: false, selectedIndex: prev.selectedIndex }))
          }
        />
      )}
    </>
  );
}
