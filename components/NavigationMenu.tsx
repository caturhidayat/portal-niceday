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
import { BoxIcon } from "lucide-react";

// import {
//     DropdownMenuLabel,
//     DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";
// import { Button } from "./ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
// } from "./ui/dropdown-menu";

const employees: { title: string; href: string }[] = [
    {
        title: "Employee Information",
        href: "/dashboard/employee/information",
    },
    {
        title: "Employee Requests",
        href: "/dashboard/employee/requests",
    },
    {
        title: "Employee Report",
        href: "/dashboard/employee/report",
    },
    {
        title: "Employee Shifts",
        href: "/dashboard/employee/shifts",
    },
    {
        title: "Employee Group Shifts",
        href: "/dashboard/employee/group-shifts",
    },
];

const timeManagements: { title: string; href: string }[] = [
    {
        title: "Attendance List",
        href: "/dashboard/attendance/list",
    },
    {
        title: "Attendance Correction Requests",
        href: "/dashboard/attendance/correction-requests",
    },
    {
        title: "Attendance Edit",
        href: "/dashboard/attendance/edit",
    },
    {
        title: "Attendance Data",
        href: "/dashboard/attendance/data",
    },
];

export function NaviMenu() {
    return (
        <header className="sticky top-0 h-16 gap-4 border-b bg-background w-full flex px-4 z-10">
            <NavigationMenu>
                <BoxIcon className="w-6 h-6" />
                <NavigationMenuList className="pl-4">
                    <NavigationMenuItem>
                        <Link href="/dashboard" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Dashboard
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Emoloyee</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {employees.map((employee) => (
                                    <Link
                                        key={employee.title}
                                        href={employee.href}
                                    >
                                        <ListItem
                                            title={employee.title}
                                        ></ListItem>
                                    </Link>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="link">Employees</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {employees.map((employee) => (
                                <DropdownMenuItem key={employee.title}>
                                    <Link href={employee.href} passHref>
                                        {employee.title}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="link">Time & Attendance</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {attendances.map((attendance) => (
                                <DropdownMenuItem key={attendance.title}>
                                    <Link href={attendance.href} passHref>
                                        {attendance.title}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            Time & Attendance
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {timeManagements.map((timeManage) => (
                                    <Link
                                        key={timeManage.title}
                                        href={timeManage.href}
                                    >
                                        <ListItem
                                            title={timeManage.title}
                                        ></ListItem>
                                    </Link>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/dashboard/organization" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Organization
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/dashboard/setting" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                Setting
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
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
