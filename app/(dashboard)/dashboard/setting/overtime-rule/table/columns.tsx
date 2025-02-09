"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Attendance } from "../../../attendance/today/columns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

// name        String
//   description String?
//   isActive    Boolean @default(true)

//   // Relationship
//   multiplicators OvertimeMultiplicator[]
export type OvertimeRulesType = {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  multiplicators: OvertimeMultiplicatorType[];
};


// id         Int   @id @default(autoincrement())
//   ruleId     Int // Foreign key to OvertimeRule
//   hoursStart Float
//   hoursEnd   Float?
//   multiplier Float
export type OvertimeMultiplicatorType = {
  id: number;
  ruleId: number;
  hoursStart: number;
  hoursEnd: number
  multiplier: number
}

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

export const columns: ColumnDef<OvertimeRulesType>[] = [
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
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-2"
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
      >
        Description
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <span> {description}</span>;
    },
  },
];
