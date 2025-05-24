"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage"; // canvas logic
import { Button } from "@/components/ui/button";

interface ImageCropperProps {
  imageSrc: string;
  aspect?: number;
  outputSize?: { width: number; height: number };
  onComplete: (croppedBlob: Blob) => void;
  onCancel?: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  aspect = 820 / 312,
  outputSize = { width: 820, height: 312 },
  onComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleCropComplete = useCallback((_: any, croppedArea: any) => {
    setCroppedAreaPixels(croppedArea);
  }, []);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels, outputSize);
      onComplete(cropped);
    } catch (e) {
      console.error("Cropping failed", e);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative h-[300px] w-full bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div className="flex justify-between gap-4">
        <Button type="button" onClick={handleDone}>
          Crop
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;
