"use client";

import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { HTMLProps, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Attendance, Shift, User } from "../../today/columns";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, MoreHorizontal, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
// import FormEditAttendance from "../FormEditAttendance";
// import DialogEditAttendance from "../DialogEditAttendance";

export const columnsEditAttendance: ColumnDef<Attendance>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
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
    cell: (info) => (
      <span className="p-2">
        {format(new Date(Number(info.getValue())), "HH:mm")}
      </span>
    ),
    footer: (props) => props.column.id,
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
    cell: (info) => (
      <span className="p-2">
        {format(new Date(Number(info.getValue())), "HH:mm")}
      </span>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "isLate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Is Late
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isLate = row.getValue("isLate");
      return (
        <div className="ml-2">
          {isLate ? <Badge variant={"destructive"}>Late</Badge> : null}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "workHours",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
  //       >
  //         Work Hours
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const workHours = row.getValue("workHours") as number;
  //     if (isNaN(workHours)) {
  //       return <div className="ml-4">--:--:--</div>;
  //     }
  //     return <div className="ml-4">{workHours}</div>;
  //   },
  // },
  // {
  //   accessorKey: "branch",
  //   header: "Branch",
  //   cell: ({ row }) => {
  //     return <div className="ml-4">{row.getValue("branch")}</div>;
  //   },
  // },
  // {
  //   accessorKey: "department",
  //   header: "Department",
  //   cell: ({ row }) => {
  //     return <div className="ml-4">{row.getValue("department")}</div>;
  //   },
  // },
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
            <DropdownMenuItem>View User</DropdownMenuItem>

            <DropdownMenuItem>View attendance details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
] satisfies ColumnDef<Attendance>[];

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
    // <Checkbox
    //   ref={ref}
    //   className={className + "cursor-pointer"}
    //   {...rest}
    // />
  );
}
