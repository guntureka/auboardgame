import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "AU BOARD GAME",
  description: "Discover the captivating world of AU Board Game, where strategy meets excitement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <Suspense fallback={<Loading />}>
            <main className="container">{children}</main>
          </Suspense>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
