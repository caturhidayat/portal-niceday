import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Sarala } from "next/font/google";

export const metadata: Metadata = {
  title: "Portal Niceday",
  description: "Portal Niceday",
};

const sarala = Sarala({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sarala",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sarala.variable} font-sans antialiased`} suppressHydrationWarning>
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
