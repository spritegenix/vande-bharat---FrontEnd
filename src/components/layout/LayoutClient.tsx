"use client";

import { useEffect } from "react";
import ScrollToTopButton from "../elements/ScrollToTopButton";
import Header from "./header/Header";

export default function LayoutClient({ children }: any) {
  useEffect(() => {
    import("@/app/(UserAuth)/_sections/AuthModal");
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <ScrollToTopButton />
    </>
  );
}
