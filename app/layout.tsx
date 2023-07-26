import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AU BOARD GAME",
  description: "Discover the captivating world of AU Board Game, where strategy meets excitement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <Navbar />
            <main className="container">{children}</main>
          </Suspense>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
