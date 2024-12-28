"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { format } from "date-fns";

// model Department {
//   id    Int    @id @default(autoincrement())
//   name  String
//   Users User[]

//   createdAt BigInt @default(0)
//   updatedAt BigInt @default(0)

//   @@index([name])
//   @@map("departments")
// }

// model Branch {
//   id       Int     @id @default(autoincrement())
//   name     String
//   location String? // Optional: To store the location/address of the branch
//   Users    User[]

//   createdAt BigInt @default(0)
//   updatedAt BigInt @default(0)

//   @@index([name])
//   @@map("branches")
// }

export type Departments = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type Branches = {
  id: number;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export type User = {
  id: string;
  name: string;
  username: string;
  // password: string;
  role: "EMPLOYEE" | "ADMIN";
  departmentId: number;
  department: string;
  branchId: number;
  branch: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<User>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          NIK
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      return <div className="ml-4">{row.getValue("branch")}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <div className="ml-4">{row.getValue("role")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const parsedDate = parseInt(createdAt as string);

      if (isNaN(parsedDate)) {
        return <div>Invalid date</div>;
      }

      const date = format(new Date(parsedDate), "dd/MM/yy - HH:mm");
      return <div className="ml-4">{date}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const attendance = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-bold">Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(attendance.id)}
            >
              Copy Attendance ID
            </DropdownMenuItem>
            <DropdownMenuItem>View user</DropdownMenuItem>
            <DropdownMenuItem>View attendance details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
