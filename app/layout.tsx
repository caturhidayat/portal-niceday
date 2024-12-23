import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Sarala } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  employeesLink,
  organizationLinks,
  settingLink,
  organizationsLink,
  timeManagements,
} from "@/lib/ListMenu";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        className={`${sarala.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <SidebarProvider>
          <AppSidebar
            employeesLinks={employeesLink}
            organizationsLinks={organizationsLink}
            organizationLinks={organizationLinks}
            settingLinks={settingLink}
            timeManagementsLinks={timeManagements}
          />
          <section>
            <div className="p-4">
              <SidebarTrigger />
            </div>
            <section className="p-4">{children}</section>
          </section>
        </SidebarProvider>
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
