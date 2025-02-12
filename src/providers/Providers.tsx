import React from "react";
import ReactQueryProvider from "./QueryProvider";
import { ThemeProvider } from "next-themes";
import WebThemeProvider from "./WebThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <WebThemeProvider>{children}</WebThemeProvider>
    </ReactQueryProvider>
  );
}
