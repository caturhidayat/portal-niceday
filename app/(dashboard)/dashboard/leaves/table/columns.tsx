"use client";

import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { HTMLProps, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TLeave } from "../action";
import { User } from "../../attendance/today/columns";

export const columnsLeaves: ColumnDef<TLeave>[] = [
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
    accessorKey: "id",
    header: "Leave ID",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  // {
  //   accessorKey: "userId",
  //   header: "User ID",
  //   cell: (info) => info.getValue(),
  //   footer: (props) => props.column.id,
  // },
  {
    accessorKey: "user",
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
      const user = row.getValue("user") as User;
      return <div className="ml-2">{user.name}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => (
      <span className="p-2">
        {format(new Date(Number(row.getValue())), "dd-MM-yyyy")}
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
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (row) => (
      <span className="p-2">
        {format(new Date(Number(row.getValue())), "dd-MM-yyyy")}
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
    accessorKey: "dayUsed",
    header: "Day Used",
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("dayUsed") + " days"}</div>;
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "PENDING") {
        return <Badge className="bg-yellow-500">Pending</Badge>;
      } else if (status === "APPROVED") {
        return <Badge className="bg-green-500">Approved</Badge>;
      } else if (status === "REJECTED") {
        return <Badge className="bg-red-500">Rejected</Badge>;
      } else if (status === "CANCELLED") {
        return <Badge className="bg-gray-500">Cancelled</Badge>;
      }
    },
  },
  {
    accessorKey: "leaveType",
    header: "Leave Type",
    cell: ({ row }) => {
      // const leaveType = row.getValue("leaveType");
      return <div className="ml-2">{row.getValue("leaveType")}</div>;
      // if (leaveType === "SICK") {
      //   return <Badge variant={"outline"} className="text-yellow-500">Sick</Badge>;
      // } else if (leaveType === "CASUAL") {
      //   return <Badge variant={"outline"} className="text-green-500">Casual</Badge>;
      // } else if (leaveType === "ANNUAL") {
      //   return <Badge variant={"outline"} className="text-red-500">Annual</Badge>;
      // } else if (leaveType === "UNPAID") {
      //   return <Badge variant={"outline"} className="text-gray-500">Unpaid</Badge>;
      // } else if (leaveType === "MATERNITY") {
      //   return <Badge variant={"outline"} className="text-gray-500">Maternity</Badge>;
      // } else if (leaveType === "PATERNITY") {
      //   return <Badge variant={"outline"} className="text-gray-500">Paternity</Badge>;
      // } else if (leaveType === "BEREAVEMENT") {
      //   return <Badge variant={"outline"} className="text-gray-500">Bereavement</Badge>;
      // } else if (leaveType === "STUDY") {
      //   return <Badge variant={"outline"} className="text-gray-500">Study</Badge>;
      // }
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "approvedById",
    header: "Approved By",
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("approvedById")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const leave = row.original;

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
              onClick={() => navigator.clipboard.writeText(leave.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>View leave details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-blue-600">Partial approve</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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
