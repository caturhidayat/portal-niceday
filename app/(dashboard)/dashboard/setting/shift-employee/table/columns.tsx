"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

export type Departments = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Branches = {
  id: number;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  // password: string;
  role: "EMPLOYEE" | "ADMIN";
  departmentId: number;
  department: string;
  branchId: number;
  shiftName: string;
  shiftStartDate: string;
  branch: string;
  createdAt: string;
  updatedAt: string;
};

export type ShiftGroup = {
  id: string;
  name: string;
  startDate: string;
  description: string;
  cycleLength: number;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          NIK
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("username")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Department
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("department")}</div>;
    },
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("branch")}</div>;
    },
  },
  {
    accessorKey: "shiftStartDate",
    header: "Start Date",
    cell: ({ row }) => {
      const shiftStartDate = row.getValue("shiftStartDate");
      const parsedDate = parseInt(shiftStartDate as string);
      if (isNaN(parsedDate)) {
        return <div></div>;
      }

      const date = format(new Date(parsedDate), "dd/MM/yy");
      return <div className="ml-4 text-start">{date}</div>;
    },
  },
  {
    accessorKey: "shiftName",
    header: "Shift Name",
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("shiftName")}</div>;
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
  //       >
  //         Created At
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const createdAt = row.getValue("createdAt");
  //     const parsedDate = parseInt(createdAt as string);

  //     if (isNaN(parsedDate)) {
  //       return <div>Invalid date</div>;
  //     }

  //     const date = format(new Date(parsedDate), "dd/MM/yy - HH:mm");
  //     return <div className="ml-4">{date}</div>;
  //   },
  // },
];
