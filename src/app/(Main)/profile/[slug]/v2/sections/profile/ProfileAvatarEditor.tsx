"use client";

import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfileAvatarEditor({
  user,
  inputRef,
  imageSrc,
  setImageSrc,
  croppedImage,
  setOpenModal,
}: any) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      setOpenModal(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative -mt-12">
      <Avatar className="h-24 w-24 border-4 border-white dark:border-black sm:h-28 sm:w-28">
        <AvatarImage src={croppedImage || user?.avatar || "/profile.jpg"} />
        <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <Button
        type="button"
        variant="ghost"
        className="absolute bottom-0 right-0 h-8 w-8 rounded-full border border-gray-300 bg-white p-1 dark:border-border dark:bg-muted"
        onClick={() => inputRef.current?.click()}
      >
        <Camera className="h-4 w-4 text-gray-600 dark:text-gray-300" />
      </Button>

      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
