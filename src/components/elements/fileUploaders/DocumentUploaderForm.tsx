"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "react-dropzone";
import { FiFileText, FiTrash2 } from "react-icons/fi";
import { Input } from "@/components/elements/Input";
import { ProgressBar } from "@/components/elements/ProgressBar";
import Button from "@/components/elements/Button";
import { getFileIcon } from "@/components/elements/GetFileTypeIcon";

// Types
interface CachedDocument {
  id: string | undefined;
  customName: string;
  url: string;
  file: File;
  order?: number;
  toDelete?: boolean;
  fileFormat?: string;
}

interface FormValues {
  documents: File[];
  fileNames: string[];
}

interface DocumentUploaderFormProps {
  defaultData?: CachedDocument[];
  maxFiles?: number;
  maxFileSize?: number;
  mutationHandler: any;
  loading?: boolean;
  error?: string;
  responseData?: any;
}

interface UploadProgressMap {
  [key: string]: number;
}

// Schema with validation
const createDocumentUploaderFormSchema = (maxFiles: number, maxFileSize: number) =>
  z.object({
    documents: z
      .custom<File[]>(
        (val): val is File[] => Array.isArray(val) && val.every((file) => file instanceof File),
      )
      .refine(
        (files) => files.every((file) => file.size <= maxFileSize),
        `Each file must be less than ${maxFileSize / (1024 * 1024)}MB`,
      )
      .refine((files) => files.length <= maxFiles, `You can upload up to ${maxFiles} files`),
    fileNames: z.array(z.string().min(1, "File name is required")),
  });

export function DocumentUploaderForm({
  defaultData,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  mutationHandler,
  loading = false,
  error,
  responseData,
}: DocumentUploaderFormProps) {
  // Form setup
  const schema = useMemo(
    () => createDocumentUploaderFormSchema(maxFiles, maxFileSize),
    [maxFiles, maxFileSize],
  );

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      documents: [],
      fileNames: [],
    },
  });

  // State
  const [cachedDocuments, setCachedDocuments] = useState<CachedDocument[]>(defaultData || []);
  const [docObjectsToBeUpload, setDocObjectsToBeUpload] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgressMap>({});
  const [otherErrors, setOtherErrors] = useState<string[]>([]);
  useEffect(() => {
    // console.log(cachedDocuments, "cachedDocuments");
  }, [cachedDocuments]);
  // Watch form values
  const documents = watch("documents");
  const fileNames = watch("fileNames");

  // Update cached documents when files change
  //   useEffect(() => {
  //     if (!documents) return;

  //     const newCachedDocuments = documents.map((file, index) => ({
  //       id: undefined,
  //       customName: fileNames[index] || file.name,
  //       file,
  //     }));

  //     setCachedDocuments((pre) => [...pre, ...newCachedDocuments]);
  //   }, [documents]);

  // File handling callbacks
  const handleDrop = (acceptedFiles: File[]) => {
    setOtherErrors([]);
    try {
      const currentFiles = documents || [];
      const newFiles = [...currentFiles, ...acceptedFiles];
      const newFileNames = [...(fileNames || []), ...acceptedFiles.map((file) => file.name)];
      setValue("documents", newFiles);
      setValue("fileNames", newFileNames);
      const newCachedDocuments: CachedDocument[] = acceptedFiles?.map((file, index) => ({
        id: undefined,
        customName: file.name,
        url: URL.createObjectURL(file),
        file,
        order: index,
        toDelete: false,
        fileFormat: file.name.split(".").pop(),
      }));

      setCachedDocuments((prev) => [...prev, ...newCachedDocuments]);
    } catch (error) {
      console.error("Error handling file drop:", error);
      setError("documents", {
        type: "manual",
        message: "Error processing files",
      });
    }
  };

  const handleDelete = async (selectedItem: CachedDocument, index: number) => {
    if (selectedItem?.id !== undefined) {
      await mutationHandler([{ id: selectedItem?.id, toDelete: true }]);
      setCachedDocuments((prev) => prev.filter((item) => item?.id !== selectedItem?.id));
    } else {
      setCachedDocuments((prev) => prev.filter((_, i) => i !== index));
      const newFiles = documents.filter((item, i) => item.name === selectedItem.file.name);
      const newFileNames = fileNames.filter((item, i) => item === selectedItem.customName);
      setValue("documents", newFiles);
      setValue("fileNames", newFileNames);
    }
  };

  const handleFileNameChange = async (
    selectedItem: CachedDocument,
    index: number,
    newName: string,
  ) => {
    if (selectedItem?.id === undefined) {
      setCachedDocuments((prev) =>
        prev.map((item, i) => (i === index ? { ...item, customName: newName } : item)),
      );
      const selectedFile: any = documents.find((item, i) => item.name === selectedItem.file.name);
      const newFileNames = fileNames.map((item, i) =>
        selectedFile.name === selectedItem.file.name ? newName : item,
      );
      setValue("fileNames", newFileNames);
    }
  };

  // useEffect to handle uploads after state is updated
  useEffect(() => {
    const uploadDocs = async () => {
      try {
        await handleUpload(
          docObjectsToBeUpload.map((obj) => obj.file),
          docObjectsToBeUpload.map((obj) => obj.customName),
        );
        setDocObjectsToBeUpload([]);
      } catch (error) {
        setError("documents", {
          type: "manual",
          message: "Failed to upload files",
        });
      }
    };

    if (docObjectsToBeUpload.length > 0) {
      uploadDocs();
    }
  }, [docObjectsToBeUpload]);

  const handleUpload = async (files: File[], names: string[]) => {
    if (!files.length || !docObjectsToBeUpload.length) return;

    // Initialize progress for each file
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
      await mutationHandler(docObjectsToBeUpload);
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
        <FiFileText className="text-4xl text-blue-500" />
        <p className="text-sm text-gray-600">Drag and drop files here, or click to select</p>
        <p className="text-xs text-gray-500">
          Max {maxFiles} files, {maxFileSize / (1024 * 1024)}MB each
        </p>
      </div>
    ),
    [maxFiles, maxFileSize],
  );

  const onSubmit = async (data: FormValues) => {
    // console.log(data);
    setOtherErrors([]);
    const docObjects: any[] = [];
    for (let i = 0; i < data.documents.length; i++) {
      // Get the extension from the original file name
      const originalExtension = data.documents[i].name.split(".").pop();
      // Check if custom name has a valid extension
      const customName = data.fileNames[i];
      const hasExtension = /\.[0-9a-z]+$/i.test(customName); // regex to check if ends with . followed by characters

      docObjects.push({
        id: undefined,
        customName: hasExtension ? customName : `${customName}.${originalExtension}`,
        url: undefined,
        file: data.documents[i],
        toDelete: false,
        order: i,
      });
    }
    // Update state and wait for useEffect to trigger upload
    setDocObjectsToBeUpload((prev) => [...prev, ...docObjects]);
    setValue("documents", [] as any);
    setValue("fileNames", [] as any);
    try {
      await handleUpload(data.documents, data.fileNames);
    } catch (error) {
      setError("documents", {
        type: "manual",
        message: "Failed to upload files",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="documents"
        control={control}
        render={() => (
          <>
            <div className="space-y-4">
              {cachedDocuments.map((item: CachedDocument, index) => (
                <div key={item?.id || index} className="p-4">
                  <div className="flex items-center gap-4">
                    <p
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      onClick={() =>
                        window.open(
                          item?.url || URL.createObjectURL(item?.file),
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                    >
                      {getFileIcon(item?.file?.name || item?.customName || "")}
                    </p>
                    <div className="flex-grow">
                      <Input
                        type="text"
                        value={item?.customName || fileNames[index] || ""}
                        onChange={(e: any) => handleFileNameChange(item, index, e.target.value)}
                        label="Enter file name"
                        disabled={item.id && true}
                      />
                      <div className="text-xs text-gray-500">
                        Original: {item?.file.name || item?.customName}{" "}
                        {item?.file.name && `(${(item?.file.size / 1024).toFixed(1)} KB)`}
                      </div>
                      {uploadProgress[item?.file.name] !== undefined && (
                        <ProgressBar
                          progress={uploadProgress[item?.file.name]}
                          label={`Uploading: ${item?.file.name}`}
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(item, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
              {(!documents || documents.length < maxFiles) && (
                <Dropzone
                  onDrop={handleDrop}
                  maxSize={maxFileSize}
                  maxFiles={maxFiles - cachedDocuments?.length}
                  onDropRejected={(data) =>
                    data?.forEach((item) =>
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
            {errors.documents && <p className="text-xs text-red-500">{errors.documents.message}</p>}
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
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || loading || cachedDocuments.length === 0}
      >
        {isSubmitting || loading ? "Uploading..." : "Upload Files"}
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
  );
}
