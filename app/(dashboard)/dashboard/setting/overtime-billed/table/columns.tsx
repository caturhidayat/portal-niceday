"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Attendance } from "../../../attendance/today/columns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

//   name      String
//   as        String
// Overtime Reasons Type
export type OvertimeBilledType = {
  id: string;
  name: string;
  as: string;
};

// Custom filter function for date range
const dateRangeFilter = (
  row: any,
  columnId: string,
  filterValue: DateRange | undefined
) => {
  if (!filterValue?.from) return true;

  const rowDate = new Date(Number(row.getValue(columnId)));
  const from = filterValue.from;
  const to = filterValue.to || filterValue.from;

  return rowDate >= from && rowDate <= to;
};

export const columns: ColumnDef<OvertimeBilledType>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   cell: ({ row }) => {
  //     const id = row.getValue("id") as string;
  //     return <Badge variant="secondary">{id}</Badge>;
  //   },
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-2"
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
      >
        Name
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span> {name}</span>;
    },
  },
  {
    accessorKey: "as",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-2"
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
      >
        As
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const as = row.getValue("as") as string;
      return <span> {as}</span>;
    },
  },
];
