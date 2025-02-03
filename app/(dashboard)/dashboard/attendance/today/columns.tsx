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
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";

import { format } from "date-fns";

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  role: "EMPLOYEE" | "ADMIN";
  departmentId: number;
  department: string;
  branchId: number;
  branch: string;
  createdAt: string;
  updatedAt: string;
};

export type Shift = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

// export type Attendance = {
//     id: string;
//     userId: string;
//     user: User;
//     attendanceDate: string;
//     checkInTime: string;
//     checkOutTime: string;
//     checkInPhotoUrl: string;
//     checkOutPhotoUrl: string;
//     inLatitude: number;
//     inLongitude: number;
//     outLatitude: number;
//     outLongitude: number;
//     isLate: boolean;
//     workHours: number;
// overtimeId: item.overtimeRecord?.id ?? null,
//       overtimeStart: item.overtimeRecord?.startTime ?? null,
//       overtimeEnd: item.overtimeRecord?.endTime ?? null,
//       overtimeActualMinutes: item.overtimeRecord?.actualMinutes ?? null,
//       overtimeMultipliedMinutes: item.overtimeRecord?.multipliedMinutes ?? null,
//       overtimeTotalHours: item.overtimeRecord?.totalHours ?? null,
//       overtimeTotalMinutes: item.overtimeRecord?.totalMinutes ?? null,
//       overtimeBilled: item.overtimeRecord?.billed?.name ?? null,
//       overtimeBilledAs: item.overtimeRecord?.billed?.as ?? null,
//       overtimeNotes: item.overtimeRecord?.notes ?? null,
//       overtimeStatus: item.overtimeRecord?.status ?? null,
//     officeLocationId: string;
//     shiftId: string;
//     shift: Shift;
//     createdAt: string;
//     updatedAt: string;
// };
export type Attendance = {
  id: string;
  attendanceDate: string;
  checkInTime: string;
  checkOutTime: string;
  checkInPhotoUrl: string;
  checkOutPhotoUrl: string;
  inLatitude: number;
  inLongitude: number;
  outLatitude: number;
  outLongitude: number;
  isLate: boolean;
  workHours: number;
  shiftName: string;
  shiftStart: string;
  shiftEnd: string;
  fullName: string;
  username: string;
  officeLocationName: string;

  userId: string;
  shiftId: string;
  officeLocationId: string;

  department: string;
  branch: string;

  overtime: string;
  overtimeId: string;
  overtimeStart: string;
  overtimeEnd: string;
  overtimeActualMinutes: number;
  overtimeMultipliedMinutes: number;
  overtimeTotalHours: number;
  overtimeTotalMinutes: number;
  overtimeBilled: string;
  overtimeBilledAs: string;
  overtimeNotes: string;
  overtimeStatus: string;
  overtimeRejectedReason: string;
  overtimeCreatedAt: string;
  overtimeUpdatedAt: string;
  overtimeDeletedAt: string;

  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("fullName")}</div>;
    },
  },

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
    accessorKey: "attendanceDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Attd Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const attendanceDates = row.getValue("attendanceDate");
      const parsedDate = parseInt(attendanceDates as string);

      if (isNaN(parsedDate)) {
        return <div>Invalid date</div>;
      }

      const date = format(new Date(parsedDate), "dd/MM/yyyy");
      return <div className="ml-4">{date}</div>;
    },
  },
  {
    accessorKey: "shiftStart",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Shift Start
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const shiftStartTime = row.getValue("shiftStart");
      const parsedDate = parseInt(shiftStartTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm:ss");
      return <div className="ml-4 text-destructive">{date}</div>;
    },
  },
  {
    accessorKey: "shiftEnd",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Shift End
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const shiftEndTime = row.getValue("shiftEnd");
      const parsedDate = parseInt(shiftEndTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm:ss");
      return <div className="ml-4 text-destructive">{date}</div>;
    },
  },
  {
    accessorKey: "checkInTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Check In
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const checkInTime = row.getValue("checkInTime");
      const parsedDate = parseInt(checkInTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm");
      return <div className="ml-4">{date}</div>;
    },
  },
  {
    accessorKey: "checkOutTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Check Out
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const checkOutTime = row.getValue("checkOutTime");
      const parsedDate = parseInt(checkOutTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm");
      return <div className="ml-4">{date}</div>;
    },
  },
  {
    accessorKey: "isLate",
    header: "Late",
    cell: ({ row }) => {
      const isLate = row.getValue("isLate");
      return <div className="ml-2">{isLate ? "Late" : null}</div>;
    },
  },
  {
    accessorKey: "workHours",
    header: "Work Hours",
    cell: ({ row }) => {
      const workHours = row.getValue("workHours") as number;
      if (isNaN(workHours)) {
        return <div className="ml-4">--:--:--</div>;
      }
      return <div className="ml-4">{workHours} Minutes</div>;
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
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      return <div className="ml-4">{row.getValue("department")}</div>;
    },
  },
  {
    accessorKey: "shiftName",
    header: "Shift Name",
    cell: ({ row }) => {
      return <div className="ml-4">{row.getValue("shiftName")}</div>;
    },
  },
];
