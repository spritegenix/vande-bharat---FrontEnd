"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageCropper from "./ImageCropper";

interface ImageCropperModalProps {
  open: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropped: (blob: Blob) => void;
  aspect?: number;
  outputSize?: { width: number; height: number };
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  open,
  imageSrc,
  onClose,
  onCropped,
  aspect = 16 / 9, // Changed from 820 / 312 to a more common 16:9 aspect ratio
  outputSize = { width: 1280, height: 720 }, // Adjusted output size to match 16:9 ratio
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Crop Your Image</DialogTitle>
        </DialogHeader>

        <ImageCropper
          imageSrc={imageSrc}
          aspect={aspect}
          outputSize={outputSize}
          onComplete={(blob) => {
            onCropped(blob);
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperModal;
