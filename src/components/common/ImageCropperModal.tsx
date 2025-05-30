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
  aspect = 820 / 312,
  outputSize = { width: 820, height: 312 },
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
