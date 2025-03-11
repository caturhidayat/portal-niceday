"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";

export type Attendance = {
  userIds: string;
  username: string;
  fullName: string;
  attendanceDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  lateMinutes: number | null;
  workHours: number | null;
  departmentId: string | null;
  department: string | null
  shiftId: string | null;
  shiftName: string | null;
  startShift: string | null;
  endShift: string | null;
  shiftGroup: string | null;
  overtime: string | null;
  overtimeId: string | null;
  overtimeStart: string | null;
  overtimeEnd: string | null;
  overtimeActualMinutes: number | null;
  overtimeActualHours: number | null;
  overtimeMultiplicationHours: number | null;
  overtimeCreatedAt: string | null;
  overtimeUpdatedAt: string | null;
  overtimeDeletedAt: string | null;
};

const columnHelper = createColumnHelper<Attendance>();

export const columnsToolbar: ColumnDef<Attendance, any>[] = [
  // Username Column
  columnHelper.accessor("username", {
    id: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NIK
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="pl-2">{info.getValue()}</div>,
  }),

  // Name Column
  columnHelper.accessor("fullName", {
    id: "fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="pl-2">{info.getValue()}</div>,
  }),

  // Date Column
  columnHelper.accessor("attendanceDate", {
    id: "attendanceDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => (
      <span className="p-2">
        {format(new Date(Number(info.getValue())), "dd-MMM-yyyy")}
      </span>
    ),
    filterFn: (row, id, filterValue) => {
      const date = new Date(Number(row.getValue(id)));
      const searchDate = new Date(filterValue);

      // Compare only the date part (ignore time)
      return (
        date.getFullYear() === searchDate.getFullYear() &&
        date.getMonth() === searchDate.getMonth() &&
        date.getDate() === searchDate.getDate()
      );
    },
  }),

  // Grouping columns - Actual Time
  columnHelper.group({
    id: "actualTime",
    header: () => (
      <div className="text-center font-semibold">
        Actual Time
      </div>
    ),
    columns: [
      // Check In Column
      columnHelper.accessor("checkInTime", {
        id: "checkInTime",
        header: () => (
          <div className="text-center font-semibold">Check In</div>
        ),
        cell: (info) => (
          <div className="text-center p-2">
            {info.getValue() 
              ? format(new Date(Number(info.getValue())), "HH:mm") 
              : "-"}
          </div>
        ),
      }),
      // Check Out Column
      columnHelper.accessor("checkOutTime", {
        id: "checkOutTime",
        header: () => (
          <div className="text-center font-semibold">Check Out</div>
        ),
        cell: (info) => (
          <div className="text-center p-2">
            {info.getValue() 
              ? format(new Date(Number(info.getValue())), "HH:mm") 
              : "-"}
          </div>
        ),
      }),
    ],
  }),

  // Grouping columns - Shift Schedule
  columnHelper.group({
    id: "shiftSchedule",
    header: () => (
      <div className="text-center font-semibold">
        Shift
      </div>
    ),
    columns: [
      // Start Shift Column
      columnHelper.accessor("startShift", {
        id: "startShift",
        header: () => (
          <div className="text-center font-semibold">Start</div>
        ),
        cell: (info) => (
          <div className="text-center p-2">
            {info.getValue() || "-"}
          </div>
        ),
      }),
      // End Shift Column
      columnHelper.accessor("endShift", {
        id: "endShift",
        header: () => (
          <div className="text-center font-semibold">End</div>
        ),
        cell: (info) => (
          <div className="text-center p-2">
            {info.getValue() || "-"}
          </div>
        ),
      }),
    ],
  }),
  
  // Department Column
  columnHelper.accessor("department", {
    id: "department",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Departemen
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="pl-2">{info.getValue() || "-"}</div>,
  }),
  
  // Shift Group Column
  columnHelper.accessor("shiftGroup", {
    id: "shiftGroup",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Grup Shift
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => <div className="pl-2">{info.getValue() || "-"}</div>,
  }),
];
