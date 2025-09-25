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
  );
}
