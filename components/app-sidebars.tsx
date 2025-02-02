"use client";

import * as React from "react";
import {
  Building,
  CalendarClock,
  CircleArrowOutUpRight,
  FileUser,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Sheet,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarSwitch } from "./SIdebarSwitch";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { NavReports } from "./nav-project";

// This is sample data.
const data = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  teams: [
    {
      name: "Portal Niceday",
      logo: GalleryVerticalEnd,
      plan: "Attendance",
    },
  ],
  //   navMain: [
  //     {
  //         title: "Employees",
  //         icon: UsersRound,
  //         items: [
  //           {
  //             title: "Employee Information",
  //             href: "/dashboard/employee/information",

  //           },
  //           {
  //             title: "Employee Report",
  //             href: "/dashboard/employee/report",

  //           },
  //         ],
  //       },
  //       {
  //         title: "Time Management",
  //         icon: Clock1,
  //         items: [
  //           {
  //             title: "Attendance Entry Form",
  //             href: "/dashboard/attendance/entry-form",

  //           },
  //           {
  //             title: "Attendance List",
  //             href: "/dashboard/attendance/list",

  //           },
  //           {
  //             title: "Attendance Edit",
  //             href: "/dashboard/attendance/edit",

  //           },
  //           {
  //             title: "Overtime",
  //             items: [
  //               {
  //                 title: "Overtime List",
  //                 href: "/dashboard/overtime",

  //               },
  //               {
  //                 title: "Overtime Request",
  //                 href: "/dashboard/overtime/request",

  //               },
  //               {
  //                 title: "Overtime Cancellation",
  //                 href: "/dashboard/overtime/cancellation",

  //               },
  //             ],
  //           },
  //           {
  //             title: "Leave",
  //             items: [
  //               {
  //                 title: "Leave List",
  //                 href: "/dashboard/leaves",

  //               },
  //               {
  //                 title: "Leave Request",
  //                 href: "/dashboard/leaves/request",

  //               },
  //               {
  //                 title: "Leave Cancellation",
  //                 href: "/dashboard/leaves/cancellation",

  //               },
  //             ],
  //           },
  //           {
  //             title: "Shifts",
  //             items: [
  //               {
  //                 title: "Employee Shifts",
  //                 href: "/dashboard/attendance/shifts",

  //               },
  //               {
  //                 title: "Employee Group Shifts",
  //                 href: "/dashboard/attendance/group-shifts",

  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         title: "Organization",
  //         icon: Building2,
  //         items: [
  //           {
  //             title: "Organization",
  //             href: "/dashboard/organization",

  //           },
  //           {
  //             title: "Organization Structure",
  //             href: "/dashboard/organization/structure",

  //           },
  //           {
  //             title: "Organization Shifts",
  //             href: "/dashboard/organization/shifts",

  //           },
  //           {
  //             title: "Branches",
  //             href: "/dashboard/organization/branches",

  //           },
  //           {
  //             title: "Departments",
  //             href: "/dashboard/organization/departements",

  //           },
  //           {
  //             title: "Office Location",
  //             href: "/dashboard/organization/office-location",

  //           },
  //         ],
  //       },
  //       {
  //         title: "Settings",
  //         icon: Settings2,
  //         items: [
  //           {
  //             title: "Shift Daily",
  //             href: "/dashboard/setting/shift",

  //           },
  //           {
  //             title: "Shift Group",
  //             href: "/dashboard/setting/shift-group",

  //           },
  //           {
  //             title: "Overtime Reason",
  //             href: "/dashboard/setting/overtime-reason",

  //           },
  //         ],
  //       },
  //     //
  //   ],
  navMain: [
    {
      title: "Employees",
      url: "#",
      icon: UsersRound,
      iconColor: "text-sky-500",
      items: [
        {
          title: "Add Employee",
          url: "/dashboard/employees",
        },
        // {
        //   title: "Employee Information",
        //   url: "/dashboard/employees/information",
        // },
        {
          title: "Employee List",
          url: "/dashboard/employees/list",
        },
        // {
        //   title: "Employee Report",
        //   url: "/dashboard/employees/report",
        // },
      ],
    },
    {
      title: "Time Management",
      url: "#",
      icon: CalendarClock,
      iconColor: "text-lime-500",
      items: [
        // {
        //   title: "Attendance",
        //   url: "/dashboard/attendance",
        // },
        // {
        //   title: "Attendance Entry Form",
        //   url: "/dashboard/attendance/entry-form",
        // },
        {
          title: "Attendance List",
          url: "/dashboard/attendance/list",
        },
        // {
        //   title: "Attendance Edit",
        //   url: "/dashboard/attendance/edit",
        // },

        {
          title: "Overtime List",
          url: "/dashboard/overtime",
        },
        {
          title: "Overtime Request",
          url: "/dashboard/overtime/request",
        },
        // {
        //   title: "Overtime Cancellation",
        //   url: "/dashboard/overtime/cancellation",
        // },

        {
          title: "Employee Shifts",
          url: "/dashboard/attendance/shifts",
        },
        {
          title: "Employee Group Shifts",
          url: "/dashboard/attendance/group-shifts",
        },
      ],
    },
    // {
    //   title: "Leave",
    //   url: "#",
    //   icon: CircleArrowOutUpRight,
    //   // iconColor: "text-rose-500",
    //   items: [
    //     {
    //       title: "Leave List",
    //       url: "/dashboard/leaves",
    //     },
    //     {
    //       title: "Leave Request",
    //       url: "/dashboard/leaves/request",
    //     },
    //     {
    //       title: "Leave Cancellation",
    //       url: "/dashboard/leaves/cancellation",
    //     },
    //   ],
    // },
    {
      title: "Organization",
      url: "#",
      icon: Building,
      iconColor: "text-violet-500",
      items: [
        // {
        //   title: "Organization",
        //   url: "/dashboard/organization",
        // },
        // {
        //   title: "Organization Structure",
        //   url: "/dashboard/organization/structure",
        // },
        // {
        //   title: "Organization Shifts",
        //   url: "/dashboard/organization/shifts",
        // },
        {
          title: "Branches",
          url: "/dashboard/organization/branches",
        },
        {
          title: "Departments",
          url: "/dashboard/organization/departments",
        },
        {
          title: "Vendor",
          url: "/dashboard/organization/vendor",
        },
        {
          title: "Office Location",
          url: "/dashboard/organization/office-location",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      iconColor: "text-amber-500",
      items: [
        {
          title: "Shift Daily",
          url: "/dashboard/setting/shift",
        },
        {
          title: "Shift Group",
          url: "/dashboard/setting/shift-group",
        },
        {
          title: "Shift Employee",
          url: "/dashboard/setting/shift-employee",
        },
        {
          title: "Overtime Cost Billed",
          url: "/dashboard/setting/overtime-billed",
        },
      ],
    },
  ],
  reports: [
    {
      name: "Report",
      url: "/dashboard/reports/attendance",
      icon: Sheet,
      iconColor: "text-teal-500",
    },
  ],
};

export function AppSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarSwitch teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavReports reports={data.reports} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
