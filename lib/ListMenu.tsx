import {
  Boxes,
  Building,
  Building2,
  CalendarCheck,
  CalendarCheck2Icon,
  CalendarClock,
  CalendarPlus2,
  CircleX,
  Clock1,
  FilePenLine,
  FileUser,
  Home,
  ListOrdered,
  Pin,
  ScrollText,
} from "lucide-react";
import { TItemLink } from "@/components/app-sidebar";

// ! Employee Link Item
export const employeesLink: TItemLink[] = [
  {
    name: "Employee Information",
    href: "/dashboard/employee/information",
    icon: <FileUser className="w-4 h-4 text-primary" />,
  },
  //   {
  //     title: "Employee Requests",
  //     href: "/dashboard/employee/requests",
  //     icon: <CalendarCog className="w-4 h-4 text-primary" />,
  //   },
  {
    name: "Employee Report",
    href: "/dashboard/employee/report",
    icon: <ScrollText className="w-4 h-4 text-primary" />,
  },
];

// ! Time Management Link Item
export const timeManagements: TItemLink[] = [
  {
    name: "Attendance Entry Form",
    href: "/dashboard/attendance/entry-form",
    icon: <CalendarPlus2 className="w-4 h-4 text-primary" />,
  },
  {
    name: "Attendance List",
    href: "/dashboard/attendance/list",
    icon: <ListOrdered className="w-4 h-4 text-primary" />,
  },
  //   {
  //     title: "Attendance Correction Requests",
  //     href: "/dashboard/attendance/correction-requests",
  //     icon: <CalendarCog className="w-4 h-4 text-primary" />,
  //   },
  {
    name: "Attendance Edit",
    href: "/dashboard/attendance/edit",
    icon: <FilePenLine className="w-4 h-4 text-primary" />,
  },
  //   {
  //     title: "Attendance Data",
  //     href: "/dashboard/attendance/data",
  //     icon: <BoxIcon className="w-4 h-4 text-primary" />,
  //   },

  {
    name: "Overtime List",
    href: "/dashboard/overtime",
    icon: <ListOrdered className="w-4 h-4 text-primary" />,
  },
  {
    name: "Overtime Request",
    href: "/dashboard/overtime/request",
    icon: <CalendarPlus2 className="w-4 h-4 text-primary" />,
  },
  {
    name: "Overtime Cacellation",
    href: "/dashboard/overtime/cancellation",
    icon: <CircleX className="w-4 h-4 text-primary" />,
  },

  {
    name: "Leave List",
    href: "/dashboard/leaves",
    icon: <ListOrdered className="w-4 h-4 text-primary" />,
  },
  {
    name: "Leave Request",
    href: "/dashboard/leaves/request",
    icon: <CalendarPlus2 className="w-4 h-4 text-primary" />,
  },
  {
    name: "Leave Cacellation",
    href: "/dashboard/leaves/cancellation",
    icon: <CircleX className="w-4 h-4 text-primary" />,
  },

  {
    name: "Employee Shifts",
    href: "/dashboard/attendance/shifts",
    icon: <CalendarClock className="w-4 h-4 text-primary" />,
  },
  {
    name: "Employee Group Shifts",
    href: "/dashboard/attendance/group-shifts",
    icon: <Boxes className="w-4 h-4 text-primary" />,
  },
];

// ! Organization Link Item
export const organizationsLink: TItemLink[] = [
  {
    name: "Organization",
    href: "/dashboard/organization",
    icon: <Building className="w-4 h-4 text-primary" />,
  },
  {
    name: "Organization Structure",
    href: "/dashboard/organization/structure",
    icon: <Building2 className="w-4 h-4 text-primary" />,
  },
  {
    name: "Organization Shifts",
    href: "/dashboard/organization/shifts",
    icon: <Boxes className="w-4 h-4 text-primary" />,
  },
];

// ! Organization Link Item
export const organizationLinks: TItemLink[] = [
  {
    name: "Branches",
    href: "/dashboard/organization/branches",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    name: "Departements",
    href: "/dashboard/organization/departements",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Office location",
    href: "/dashboard/organization/office-location",
    icon: <Pin className="h-4 w-4" />,
  },
];

// ! Setting Link Item
export const settingLink: TItemLink[] = [
  {
    name: "Shift Daily",
    href: "/dashboard/setting/shift",
    icon: <CalendarCheck className="h-4 w-4" />,
  },
  {
    name: "Shift Group",
    href: "/dashboard/setting/shift-group",
    icon: <CalendarCheck2Icon className="h-4 w-4" />,
  },
  {
    name: "Overtime Reaseon",
    href: "/dashboard/setting/overtime-reason",
    icon: <Clock1 className="h-4 w-4" />,
  },
];
