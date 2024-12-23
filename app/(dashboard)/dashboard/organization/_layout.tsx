import { Building2, Home, Pin } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const organizationLinks = [
  {
    name: "Branches",
    href: "organization/branches",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    name: "Departements",
    href: "organization/departements",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Office location",
    href: "organization/office-location",
    icon: <Pin className="h-4 w-4" />,
  },
];

export default function settingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar items={organizationLinks} />
      <section>
        <SidebarTrigger />
        <section className="p-4">{children}</section>
      </section>
    </SidebarProvider>
  );
}
