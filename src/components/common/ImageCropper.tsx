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
  aspect = 16 / 9,
  outputSize = { width: 1920, height: 1080 },
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
    <div className="relative flex min-h-[300px] w-full items-center justify-center bg-black">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        // The Cropper component itself should fill its parent
        // No direct style needed here if parent is correctly sized and Cropper handles its own absolute positioning
      />
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 justify-between gap-4">
        <Button type="button" onClick={handleDone}>
          Crop
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;
