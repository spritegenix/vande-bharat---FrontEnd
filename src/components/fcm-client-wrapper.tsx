"use client";

import React from "react";
import { useFcmToken } from "@/customHooks/useFcmToken";

export function FcmClientWrapper({ children }: { children: React.ReactNode }) {
  useFcmToken(); // Call the hook here
  return <>{children}</>;
}
