import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function page() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignIn />
    </main>
  );
}
