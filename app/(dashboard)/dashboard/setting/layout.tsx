import { CalendarCheck, CalendarCheck2Icon, Clock1 } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const settingLink = [
  {
    name: "Shift Daily",
    href: "setting/shift",
    icon: <CalendarCheck className="h-4 w-4" />,
  },
  {
    name: "Shift Group",
    href: "setting/shift-group",
    icon: <CalendarCheck2Icon className="h-4 w-4" />,
  },
  {
    name: "Overtime Reaseon",
    href: "setting/overtime-reason",
    icon: <Clock1 className="h-4 w-4" />,
  },
];

export default function settingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar items={settingLink} />
      <section>
        <div className="p-4">
          <SidebarTrigger />
        </div>
        <section className="p-4">{children}</section>
      </section>
    </SidebarProvider>
  );
}
