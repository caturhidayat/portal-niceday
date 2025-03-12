"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  department: string | null;
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
      <div className="text-center">
        <Label className="text-green-600">Actual Time</Label>
      </div>
    ),
    columns: [
      // Check In Column
      columnHelper.accessor("checkInTime", {
        id: "checkInTime",
        header: () => <Label className="text-green-600">Check In</Label>,
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
        header: () => <Label className="text-green-600">Check Out</Label>,
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
      <div className="text-center">
        <Label className="text-blue-600">Shift Schedule</Label>
      </div>
    ),
    columns: [
      // Start Shift Column
      columnHelper.accessor("startShift", {
        id: "startShift",
        header: () => <Label className="text-blue-600">Start</Label>,
        cell: (info) => (
          <div className="text-center p-2">{info.getValue() || "-"}</div>
        ),
      }),
      // End Shift Column
      columnHelper.accessor("endShift", {
        id: "endShift",
        header: () => <Label className="text-blue-600">End</Label>,
        cell: (info) => (
          <div className="text-center p-2">{info.getValue() || "-"}</div>
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
  //   columnHelper.accessor("shiftGroup", {
  //     id: "shiftGroup",
  //     header: ({ column }) => (
  //       <Button
  //         variant="ghost"
  //         className="font-semibold"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Grup Shift
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     ),
  //     cell: (info) => <div className="pl-2">{info.getValue() || "-"}</div>,
  //   }),
];
