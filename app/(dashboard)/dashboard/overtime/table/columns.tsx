"use client";

import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { HTMLProps, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";

import { MoreHorizontal, Edit, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Overtime = {
  id: string;
  userId: string;
  username: string;
  name: string;
  overtimeDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  overtimeRateId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

// id: 'OVT-1732548828041588',
//       userId: 'USR-1731504639202783',
//       overtimeDate: '1732532400000',
//       startTime: '1732532400000',
//       endTime: '1732545300000',
//       totalHours: 6.58,
//       overtimeRateId: 'ORT-1732532400000',
//       status: 'SCHEDULED',
//       createdAt: '1732548828041',
//       updatedAt: '1732548828041',
//       deletedAt: '0'

// id             String         @id
// userId         String
// user           User           @relation(fields: [userId], references: [id])
// overtimeDate   BigInt
// startTime      BigInt?
// endTime        BigInt?
// totalHours     Float
// overtimeRateId String
// OvertimeRates  OvertimeRate   @relation(fields: [overtimeRateId], references: [id])
// status         OvertimeStatus

export const columns: ColumnDef<Overtime>[] = [
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
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "overtimeDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Overtime Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => (
      <span className="p-2">
        {format(new Date(Number(row.getValue())), "yyyy-MM-dd")}
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
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Start Time
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => (
      <span className="p-2">
        {format(new Date(Number(info.getValue())), "HH:mm")}
      </span>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          End Time
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => (
      <span className="p-2">
        {format(new Date(Number(info.getValue())), "HH:mm")}
      </span>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "totalHours",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Total Hours
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("totalHours")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("status")}</div>;
    },
  },
] satisfies ColumnDef<Overtime>[];

export function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <Input
        type="number"
        value={((column.getFilterValue() as any)?.[0] ?? "") as string}
        onChange={(e) =>
          column.setFilterValue((old: any) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <Input
        type="number"
        value={((column.getFilterValue() as any)?.[1] ?? "") as string}
        onChange={(e) =>
          column.setFilterValue((old: any) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <Input
      type="text"
      value={(column.getFilterValue() ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}

// TODO:Function Indeterminate Checkbox
export function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: {
  indeterminate: boolean;
} & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <Input
      type="checkbox"
      ref={ref}
      className={className + "cursor-pointer"}
      {...rest}
    />
  );
}
