import type { Metadata } from "next";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSideBar } from "@/components/app-sidebars";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Portal admin Niceday",
  applicationName: "Niceday",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <SidebarProvider>
        <AppSideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}
