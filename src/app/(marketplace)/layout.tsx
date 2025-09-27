import Layout from "@/components/layout/Layout";
import LayoutClient2 from "@/components/layout/LayoutClient2";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutClient2>{children}</LayoutClient2>
    </>
  );
}
