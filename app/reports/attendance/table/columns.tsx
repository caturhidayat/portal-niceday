"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronsUpDown } from "lucide-react";
import { Attendance } from "@/app/(dashboard)/dashboard/attendance/today/columns";

// Custom filter function for date range
const dateRangeFilter = (row: any, columnId: string, filterValue: DateRange | undefined) => {
  if (!filterValue?.from) return true;
  
  const rowDate = new Date(Number(row.getValue(columnId)));
  const from = filterValue.from;
  const to = filterValue.to || filterValue.from;

  return rowDate >= from && rowDate <= to;
};

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "username",
    header: "NIK",
    cell: ({ row }) => {
      const username = row.getValue("username") as string;
      return username;
    }
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("fullName") as string;
      return name;
    },
  },
  {
    accessorKey: "attendanceDate",
    header: ({ column }) => (
      <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("attendanceDate") as string;
      return format(new Date(Number(date)), "dd/MM/yyyy");
    },
    filterFn: dateRangeFilter,
  },
  {
    accessorKey: "shiftName",
    header: "Shift",
    cell: ({ row }) => {
      const shiftName = row.getValue("shiftName") as string;
      return shiftName;
    },
  },
  {
    accessorKey: "shiftStart",
    header: "Shift Start",
    cell: ({ row }) => {
      const time = row.getValue("shiftStart") as string;
      return time ? <span style={{ color: "red" }}>{format(new Date(Number(time)), "HH:mm")}</span> : "-";
    },
  },
  {
    accessorKey: "shiftEnd",
    header: "Shift End",
    cell: ({ row }) => {
      const time = row.getValue("shiftEnd") as string;
      return time ? <span style={{ color: "red" }}>{format(new Date(Number(time)), "HH:mm")}</span> : "-";
    },
  },
  {
    accessorKey: "checkInTime",
    header: "Check In",
    cell: ({ row }) => {
      const time = row.getValue("checkInTime") as string;
      return time ? format(new Date(Number(time)), "HH:mm") : "-";
    },
  },
  {
    accessorKey: "checkOutTime",
    header: "Check Out",
    cell: ({ row }) => {
      const time = row.getValue("checkOutTime") as string;
      return time ? format(new Date(Number(time)), "HH:mm") : "-";
    },
  },
  {
    accessorKey: "workHours",
    header: "Work Hours",
    cell: ({ row }) => {
      const hours = row.getValue("workHours") as number;
      return hours ? `${hours} Minutes` : "-";
    },
  },
  {
    accessorKey: "overtimeStatus",
    header: "status",
    cell: ({ row }) => {
      const overtime = row.getValue("overtimeStatus") as string;
      const status = row.original.overtimeStatus;
      return overtime === "PENDING" ? (
        <Badge className="bg-orange-200 text-orange-600 hover:bg-orange-300">{status || "Pending"}</Badge>
      ) : overtime === "APPROVED" ? (
        <Badge className="bg-green-200 text-green-600 hover:bg-green-300">{status || "Approved"}</Badge>
      ) : overtime === "REJECTED"? (
        <Badge className="bg-destructive hover:bg-red-600">{status || "Rejected"}</Badge>
      ) : "-";
    },
  },
  {
    accessorKey: "overtimeStart",
    header: "Overtime Start",
    cell: ({ row }) => {
      const time = row.getValue("overtimeStart") as string;
      return time ? <span style={{ color: "red" }}>{format(new Date(Number(time)), "HH:mm")}</span> : "-";
    },
  },
  {
    accessorKey: "overtimeEnd",
    header: "Overtime End",
    cell: ({ row }) => {
      const time = row.getValue("overtimeEnd") as string;
      return time ? <span style={{ color: "red" }}>{format(new Date(Number(time)), "HH:mm")}</span> : "-";
    },
  },
  {
    accessorKey: "overtimeTotalHours",
    header: "Overtime Total Hours",
    cell: ({ row }) => {
      const hours = row.getValue("overtimeTotalHours") as number;
      return hours ? `${hours} Minutes` : "-";
    },
  },
  {
    accessorKey: "overtimeReason",
    header: ({ column }) => (
      <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Reason
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const reason = row.getValue("overtimeReason") as string;
      return reason? reason : "-";
    },
  },
  {
    accessorKey: "overtimeReasonAs",
    header: ({ column }) => (
      <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Reason As
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => {
      const as = row.getValue("overtimeReasonAs") as string;
      return as? as : "-";
    },
  },
  {
    accessorKey: "overtimeRemark",
    header: "Remark",
    cell: ({ row }) => {
      const remark = row.getValue("overtimeRemark") as string;
      return remark? remark : "-";
    },
  }
];
