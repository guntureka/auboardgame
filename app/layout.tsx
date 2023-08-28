import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import type { Metadata } from "next";

import { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/footer";
import { Poppins } from "next/font/google";
import ThemeProviders from "@/components/theme-providers";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "AU BOARD GAME",
  description:
    "Discover the captivating world of AU Board Game, where strategy meets excitement.",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <ThemeProviders attribute={"class"}>
            <Suspense fallback={<Loading />}>
              <Navbar />
              <main className="container">{children}</main>
              <Footer />
              <Toaster />
            </Suspense>
          </ThemeProviders>
        </Providers>
      </body>
    </html>
  );
}
