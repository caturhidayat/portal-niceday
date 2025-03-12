import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Sarala } from "next/font/google";

export const Author = [{ name: "Catur Hidayat", url: "https://broky.homes" }];

export const metadata: Metadata = {
  title: "Home",
  description: "Portal admin Niceday",
  applicationName: "Niceday",
  authors: Author,
  generator: "NextJS, React",
  keywords: "HRIS",
};

const sarala = Sarala({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sarala.className} antialiased supressHydrationWarning`}
      >
        <main>{children}</main>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
