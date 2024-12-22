"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  Boxes,
  BoxIcon,
  Building,
  Building2,
  CalendarClock,
  CalendarCog,
  CalendarPlus2,
  CircleX,
  FilePenLine,
  FileUser,
  Hourglass,
  LayoutDashboardIcon,
  ListOrdered,
  LogOut,
  Network,
  ScrollText,
  Settings,
  SquareMenu,
  User,
  UsersRound,
} from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { removeSession } from "@/lib/auth/sessions";

const employees = [
  {
    id: "emp-info",
    title: "Employee Information",
    href: "/dashboard/employee/information",
    icon: <FileUser className="w-4 h-4 text-primary" />,
  },
  {
    id: "emp-report",
    title: "Employee Report",
    href: "/dashboard/employee/report",
    icon: <ScrollText className="w-4 h-4 text-primary" />,
  },
];

const timeManagements = [
  {
    id: "attendance-entry",
    title: "Attendance Entry Form",
    href: "/dashboard/attendance/entry-form",
    icon: <CalendarPlus2 className="w-4 h-4 text-primary" />,
  },
  {
    id: "attendance-list",
    title: "Attendance List",
    href: "/dashboard/attendance/list",
    icon: <ListOrdered className="w-4 h-4 text-primary" />,
  },
  {
    id: "attendance-edit",
    title: "Attendance Edit",
    href: "/dashboard/attendance/edit",
    icon: <FilePenLine className="w-4 h-4 text-primary" />,
  },
  {
    id: "overtime",
    title: "Overtime",
    href: "#",
    icon: <Hourglass className="w-4 h-4 text-primary" />,
    sub: [
      {
        id: "overtime-list",
        title: "Overtime List",
        href: "/dashboard/overtime",
        icon: <ListOrdered className="w-4 h-4 text-primary" />,
      },
      {
        id: "overtime-request",
        title: "Overtime Request",
        href: "/dashboard/overtime/request",
        icon: <CalendarPlus2 className="w-4 h-4 text-primary" />,
      },
      {
        id: "overtime-cancel",
        title: "Overtime Cancellation",
        href: "/dashboard/overtime/cancellation",
        icon: <CircleX className="w-4 h-4 text-primary" />,
      },
    ],
  },
  {
    id: "leave",
    title: "Leave",
    href: "#",
    icon: <CalendarClock className="w-4 h-4 text-primary" />,
    sub: [
      {
        id: "leave-list",
        title: "Leave List",
        href: "/dashboard/leaves",
        icon: <ListOrdered className="w-4 h-4 text-primary" />,
      },
      {
        id: "leave-request",
        title: "Leave Request",
        href: "/dashboard/leaves/request",
        icon: <CalendarPlus2 className="w-4 h-4 text-primary" />,
      },
      {
        id: "leave-cancel",
        title: "Leave Cancellation",
        href: "/dashboard/leaves/cancellation",
        icon: <CircleX className="w-4 h-4 text-primary" />,
      },
    ],
  },
  {
    id: "emp-shifts",
    title: "Employee Shifts",
    href: "/dashboard/attendance/shifts",
    icon: <CalendarClock className="w-4 h-4 text-primary" />,
  },
  {
    id: "emp-group-shifts",
    title: "Employee Group Shifts",
    href: "/dashboard/attendance/group-shifts",
    icon: <Boxes className="w-4 h-4 text-primary" />,
  },
];

const organizations = [
  {
    id: "org",
    title: "Organization",
    href: "/dashboard/organization",
    icon: <Building className="w-4 h-4 text-primary" />,
  },
  {
    id: "org-structure",
    title: "Organization Structure",
    href: "/dashboard/organization/structure",
    icon: <Building2 className="w-4 h-4 text-primary" />,
  },
  {
    id: "org-shifts",
    title: "Organization Shifts",
    href: "/dashboard/organization/shifts",
    icon: <Boxes className="w-4 h-4 text-primary" />,
  },
];

export function MenuBarNav() {
  const handleLogout = async () => {
    await removeSession();
  };
  return (
    <div className="sticky top-0 z-10">
      <header className="gap-4 bg-background w-full flex px-4 z-10 items-center text-foreground border-b">
        <Menubar className="border-none gap-4">
          <MenubarMenu>
            <MenubarTrigger>
              <SquareMenu className="w-4 h-4 text-primary mr-2" />
              <span>Menu</span>
            </MenubarTrigger>
            <MenubarContent>
              <Link href="/dashboard">
                <MenubarItem>
                  Dashboard
                  <LayoutDashboardIcon className="w-4 h-4 text-primary ml-2" />
                </MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <UsersRound className="w-4 h-4 text-primary mr-2" />
              Employees{" "}
            </MenubarTrigger>
            <MenubarContent>
              {employees.map((employee) => (
                <Link key={employee.id} href={employee.href}>
                  <MenubarItem>
                    {employee.title}
                    {employee.icon}
                  </MenubarItem>
                </Link>
              ))}
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>
              <Hourglass className="w-4 h-4 text-primary mr-2" />
              Time Management
            </MenubarTrigger>
            <MenubarContent>
              {timeManagements.map((item) => (
                <React.Fragment key={item.id}>
                  {item.sub ? (
                    <MenubarSub>
                      <MenubarSubTrigger>
                        {item.title}
                        {/* {item.icon} */}
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        {item.sub.map((subItem) => (
                          <Link key={subItem.id} href={subItem.href}>
                            <MenubarItem>
                              {subItem.title}
                              {/* {subItem.icon} */}
                            </MenubarItem>
                          </Link>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                  ) : (
                    <Link href={item.href}>
                      <MenubarItem>
                        {item.title}
                        {/* {item.icon} */}
                      </MenubarItem>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <Link href="/dashboard/organization">
              <Button variant="outline" className="border-none">
                <Network className="w-4 h-4 text-primary mr-2" />
                Organization
              </Button>
            </Link>
          </MenubarMenu>

          <MenubarMenu>
            <Link href="/dashboard/setting">
              <Button variant="outline" className="border-none">
                <Settings className="w-4 h-4 text-primary mr-2" />
                Setting
              </Button>
            </Link>
          </MenubarMenu>
        </Menubar>

        <div className="ml-auto">
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>
                <User className="w-4 h-4 text-primary mr-2" />
              </MenubarTrigger>
              <MenubarContent>
                <button onClick={handleLogout} className="flex w-full">
                  <MenubarItem className="text-destructive w-full flex-1 cursor-pointer">
                    Logout
                    <LogOut className="w-4 h-4 text-destructive ml-2" />
                  </MenubarItem>
                </button>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </header>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
