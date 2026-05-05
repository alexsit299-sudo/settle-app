import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "settle. — stop asking, start eating",
  description: "No more 'idk, what do you want?' — settle it in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#F8F8F8] text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
