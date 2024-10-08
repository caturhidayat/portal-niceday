"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Boxes,
    BoxIcon,
    Building,
    Building2,
    CalendarClock,
    CalendarCog,
    FilePenLine,
    FileUser,
    Hourglass,
    LayoutDashboardIcon,
    ListOrdered,
    LogOut,
    ScrollText,
    Settings,
    SquareMenu,
    User,
    UsersRound,
} from "lucide-react";

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { removeSession } from "@/lib/auth/sessions";
import { useRouter } from "next/navigation";

const employees: { title: string; href: string; icon?: JSX.Element }[] = [
    {
        title: "Employee Information",
        href: "/dashboard/employee/information",
        icon: <FileUser className="w-4 h-4 text-primary" />,
    },
    {
        title: "Employee Requests",
        href: "/dashboard/employee/requests",
        icon: <CalendarCog className="w-4 h-4 text-primary" />,
    },
    {
        title: "Employee Report",
        href: "/dashboard/employee/report",
        icon: <ScrollText className="w-4 h-4 text-primary" />,
    },
    {
        title: "Employee Shifts",
        href: "/dashboard/employee/shifts",
        icon: <CalendarClock className="w-4 h-4 text-primary" />,
    },
    {
        title: "Employee Group Shifts",
        href: "/dashboard/employee/group-shifts",
        icon: <Boxes className="w-4 h-4 text-primary" />,
    },
];

const timeManagements: { title: string; href: string; icon: JSX.Element }[] = [
    {
        title: "Attendance List",
        href: "/dashboard/attendance/list",
        icon: <ListOrdered className="w-4 h-4 text-primary" />,
    },
    {
        title: "Attendance Correction Requests",
        href: "/dashboard/attendance/correction-requests",
        icon: <CalendarCog className="w-4 h-4 text-primary" />,
    },
    {
        title: "Attendance Edit",
        href: "/dashboard/attendance/edit",
        icon: <FilePenLine className="w-4 h-4 text-primary" />,
    },
    {
        title: "Attendance Data",
        href: "/dashboard/attendance/data",
        icon: <BoxIcon className="w-4 h-4 text-primary" />,
    },
];

const organizations: { title: string; href: string; icon: JSX.Element }[] = [
    {
        title: "Organization",
        href: "/dashboard/organization",
        icon: <Building className="w-4 h-4 text-primary" />,
    },
    {
        title: "Organization Structure",
        href: "/dashboard/organization/structure",
        icon: <Building2 className="w-4 h-4 text-primary" />,
    },
    {
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
        <header className="sticky top-0  gap-4 border-b bg-background w-full flex px-4 z-10 items-center">
            <Menubar className="border-none gap-4">
                <MenubarMenu>
                    <MenubarTrigger>
                        <SquareMenu className="w-6 h-6 text-primary mr-2" />
                        <span>Menu</span>
                    </MenubarTrigger>
                    <MenubarContent>
                        <Link href="/dashboard">
                            <MenubarItem>
                                Dashboard
                                <MenubarShortcut>
                                    <LayoutDashboardIcon className="w-4 h-4 text-primary" />
                                </MenubarShortcut>
                            </MenubarItem>
                        </Link>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <UsersRound className="w-6 h-6 text-primary mr-2" />
                        Employees{" "}
                    </MenubarTrigger>
                    <MenubarContent>
                        {employees.map((employee) => (
                            <Link key={employee.href} href={employee.href}>
                                <MenubarItem>
                                    {employee.title}
                                    <MenubarShortcut>
                                        {employee.icon}
                                    </MenubarShortcut>
                                </MenubarItem>
                            </Link>
                        ))}
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Hourglass className="w-6 h-6 text-primary mr-2" />
                        Time Management
                    </MenubarTrigger>
                    <MenubarContent>
                        {timeManagements.map((timeManagement) => (
                            <Link
                                key={timeManagement.href}
                                href={timeManagement.href}
                            >
                                <MenubarItem>
                                    {timeManagement.title}
                                    <MenubarShortcut>
                                        {timeManagement.icon}
                                    </MenubarShortcut>
                                </MenubarItem>
                            </Link>
                        ))}
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    {/* <MenubarTrigger>
                        <Building2 className="w-6 h-6 text-primary mr-2" />
                        Organization
                    </MenubarTrigger>
                    <MenubarContent>
                        {organizations.map((org) => (
                            <Link key={org.href} href={org.href}>
                                <MenubarItem>
                                    {org.title}
                                    <MenubarShortcut>
                                        {org.icon}
                                    </MenubarShortcut>
                                </MenubarItem>
                            </Link>
                        ))}
                    </MenubarContent> */}
                    <Link href="/dashboard/organization">
                        <Button variant="outline" className="border-none">
                            Organization
                        </Button>
                    </Link>
                </MenubarMenu>
            </Menubar>
            <div className="ml-auto">
                <Menubar className="border-none">
                    <MenubarMenu>
                        <MenubarTrigger>
                            <User className="w-6 h-6 text-primary mr-2" />
                        </MenubarTrigger>
                        <MenubarContent>
                            <Link href="/dashboard/setting">
                                <MenubarItem>
                                    Settings
                                    <MenubarShortcut>
                                        <Settings className="w-4 h-4 text-primary" />
                                    </MenubarShortcut>
                                </MenubarItem>
                            </Link>

                            <button onClick={handleLogout} className="flex w-full">
                                <MenubarItem className="text-destructive w-full flex-1 cursor-pointer">
                                    Logout
                                    <MenubarShortcut>
                                        <LogOut className="w-4 h-4 text-destructive" />
                                    </MenubarShortcut>
                                </MenubarItem>
                            </button>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </header>
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
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
