import { ImageChecker } from "@/lib/ImagesChecker";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
interface RequestCardProps {
  avatar: string;
  name: string;
  slug: string;
  onAccept: () => void;
  onReject: () => void;
}
export default function RequestCard({ avatar, name, slug, onAccept, onReject }: RequestCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-slate-900">
      {/* Mobile-specific layout */}
      <div className="flex items-center p-2 sm:hidden">
        <Link href={`/profile/${slug}`} className="mr-3">
          <Image
            src={ImageChecker(avatar)}
            alt={name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1">
          <Link href={`/profile/${slug}`}>
            <h3 className="truncate text-base font-semibold text-gray-800 hover:underline dark:text-white">
              {name}
            </h3>
          </Link>
          <div className="mt-2 flex flex-row gap-2">
            <Button
              onClick={onAccept}
              className="flex-1 bg-green-600 text-white hover:bg-green-700"
            >
              Accept Request
            </Button>
            <Button variant="destructive" onClick={onReject} className="flex-1">
              Reject
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet layout (original design) */}
      <div className="hidden sm:block">
        <div className="relative h-48 w-full">
          <Image src={ImageChecker(avatar)} alt={name} fill className="object-cover" />
        </div>

        <div className="space-y-3 p-4">
          <Link href={`/profile/${slug}`}>
            <h3 className="truncate text-lg font-semibold text-gray-800 hover:underline dark:text-white">
              {name}
            </h3>
          </Link>

          <div className="flex flex-col gap-2">
            <Button onClick={onAccept} className="bg-green-600 text-white hover:bg-green-700">
              Accept Request
            </Button>
            <Button variant="destructive" onClick={onReject}>
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
