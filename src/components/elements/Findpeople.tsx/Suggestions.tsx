"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const people = [
  { name: "Anita Desai", avatar: "" },
  { name: "Vikram Singh", avatar: "" },
  { name: "Meera Patel", avatar: "" },
];
const trending = [
  { id: "Technology", avatar: "" },
  { id: "Travel", avatar: "" },
  { id: "Food", avatar: "" },
  { id: "Health", avatar: "" },
  { id: "Education", avatar: "" },
];

export default function Suggestions() {
  return (
    <>
      <div className="mb-6 rounded-xl bg-white p-2 dark:bg-neutral-900">
        <h2 className="jstify-content mb-4 flex whitespace-nowrap text-lg font-semibold text-black">
          People You May Know
        </h2>
        <div className="space-y-4 whitespace-nowrap">
          {people.map((person, name) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{person.name}</p>
                </div>
              </div>
              <Button
                className="absolute right-1 bg-blue-400 text-white hover:bg-blue-200"
                size="sm"
              >
                Send Request
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 rounded-xl bg-white p-2 dark:bg-neutral-900">
        <h2 className="mb-4 whitespace-nowrap text-lg font-semibold text-black">
          Trending Communities
        </h2>
        <div className="flux jstify-content-center space-y-4 whitespace-nowrap">
          {trending.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <div className="flex items-center gap-3 p-1">
                <Avatar>
                  <AvatarImage src={tag.avatar} />
                  <AvatarFallback>{tag.id.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm font-medium text-gray-900">{tag.id}</p>
              <Button
                className="absolute right-2 bg-blue-400 text-white hover:bg-blue-200"
                size="sm"
              >
                +Join
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
