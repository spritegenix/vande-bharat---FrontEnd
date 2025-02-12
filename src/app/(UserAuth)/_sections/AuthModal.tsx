"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/elements/Modal";
import AuthButton from "./AuthButton";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";

export default function AuthModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };
  return (
    <Modal onClose={handleClose}>
      <AuthModalCard />
    </Modal>
  );
}
export function AuthModalCard() {
  return (
    <div className="relative max-w-full space-y-4 overflow-hidden rounded-lg bg-white shadow-lg md:w-[678px]">
      <AuthButton text="Sign in with Google" href="/api/google" icon={<FcGoogle />} />
      <AuthButton text="Sign in with Facebook" href="/api/facebook" icon={<TiSocialFacebook />} />
      <AuthButton text="Sign in with Apple" href="/api/apple" icon={<TiSocialFacebook />} />
      <AuthButton text="Sign in with Twitter" href="/api/twitter" icon={<TiSocialFacebook />} />
      <AuthButton text="Sign in with LinkedIn" href="/api/linkedin" icon={<TiSocialFacebook />} />
      <AuthButton text="Sign in with Microsoft" href="/api/microsoft" icon={<TiSocialFacebook />} />
    </div>
  );
}
