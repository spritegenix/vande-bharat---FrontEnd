"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/elements/Modal";
import AuthButton from "./AuthButton";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
import Logo from "@/components/elements/Logo";
import { Input } from "@/components/ui/input";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    <div className="relative m-2 flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg md:mx-auto">
      {/* Left side: Login form */}
      <div className="w-full max-w-md p-10 md:w-1/2">
        <div className="mb-6 flex w-full justify-center">
          <Logo />
        </div>

        <LoginForm />

        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">
            Register Now
          </Link>
          <Link href="/" className="hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="mx-3 text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <div className="space-y-2">
          <AuthButton text="Sign in with Google" href="/api/google" icon={<FcGoogle />} />
          <AuthButton
            text="Sign in with Facebook"
            href="/api/facebook"
            icon={<TiSocialFacebook />}
          />
          <AuthButton text="Sign in with Twitter" href="/api/twitter" icon={<BsTwitterX />} />
        </div>
      </div>

      {/* Right side: Image */}
      <div className="relative hidden w-1/2 md:block">
        <Image
          src="/images/login.jpg"
          alt="Login illustration"
          layout="fill"
          objectFit="cover"
          className="rounded-r-lg"
        />
      </div>
    </div>
  );
}
