"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserProfile } from "@/queries/user/user.api";
import { useAuthAxios } from "@/lib/axios";


interface Props {
  open: boolean;
  onClose: () => void;
  initialValues: {
    name: string;
    designation: string;
    location: string;
  };
  refetchUser: () => void; // optional to refetch updated user
}

export default function EditProfileModal({
  open,
  onClose,
  initialValues,
  refetchUser,
}: Props) {
  const axios = useAuthAxios();
  const [name, setName] = useState(initialValues.name);
  const [designation, setDesignation] = useState(initialValues.designation);
  const [location, setLocation] = useState(initialValues.location);

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async () =>
      updateUserProfile(axios, {
        name,
        designation,
        location,
      }),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      onClose();
      refetchUser?.(); // optional
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
          />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <Button onClick={() => updateProfile()} disabled={isPending} className="w-full">
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
