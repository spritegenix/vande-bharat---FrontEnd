import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./css/globals.css";
import "./css/loader.css";
import "./css/typeHead.css";
import "./css/swiper.css";
import Env from "@/lib/env";
import Providers from "@/providers/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { FcmClientWrapper } from "@/components/fcm-client-wrapper";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const merriWeather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vande Bharat | Our Culture",
    template: "%s | Vande Bharat",
  },
  description: "Vande Bharat - Cultural social media app",
  metadataBase: new URL(Env.BASE_URL),

  twitter: {
    card: "summary_large_image",
    site: "vandebharat.com",
    title: "Vande Bharat | Our Culture",
    description: "Vande Bharat - Cultural media app",
    // images: ["screenshots/homePage.png"],
  },
  openGraph: {
    title: "Vande Bharat | Our Culture",
    type: "website",
    locale: "en_US",
    siteName: "Vande Bharat",
    description: "Vande Bharat - Cultural media app",
    images: [
      // {
      //   url: "screenshots/homePage.png",
      //   width: 1200,
      //   height: 600,
      //   alt: "Vande Bharat",
      // },
    ],
  },
  // icons: {
  //   shortcut: "/favicon.ico",
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriWeather.variable} relative scroll-smooth bg-offwhite antialiased transition-all duration-300 ease-in-out dark:bg-gray-900`}
      >
        {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" /> */}
        <ClerkProvider
        // publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        // proxyUrl={process.env.NEXT_PUBLIC_API_BASE_URL}
        >
          <Providers>
            <FcmClientWrapper>
              {" "}
              {/* Use the new client component here */}
              {/*  modal portal */}
              <div id="modal-portal" className="relative z-[999999] h-0" />
              {children}
            </FcmClientWrapper>
          </Providers>
          <Toaster richColors closeButton position="top-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}
