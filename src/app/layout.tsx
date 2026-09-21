import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderData from "@/components/Header/HeaderData";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "تهمتن شاپ | فروشگاه اینترنتی",
  description: "خرید آنلاین کالای دیجیتال، لوازم تحریر، کتاب و بیش از هزاران محصول",
};

/* چیدمان ریشه: هدر ثابت بالا و نوار ناوبری پایین در موبایل */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HeaderData />
        <main className="flex flex-col min-h-screen grow pb-16 lg:pb-0 pt-12 md:pt-12 lg:pt-33">
          {children}
        </main>
        <Footer/>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}