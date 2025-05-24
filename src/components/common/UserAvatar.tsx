import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
export default function UserAvatar({ avatar }: { avatar?: string }) {
  return (
    <Avatar>
      <AvatarImage src={avatar} />
      <AvatarFallback>
        <Image src="/images/profile/profileplaceholder.jpg" alt="image" height={50} width={50} />
      </AvatarFallback>
    </Avatar>
  );
}
