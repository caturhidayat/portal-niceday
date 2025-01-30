"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type Vendor = {
  id: string;
  name: string;
  description: string;
  users: string[];
};

// name        String
// description String?
// Users       User[]

export const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const parsedDate = parseInt(createdAt as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4"> --:--:-- </div>;
      }

      const date = format(new Date(parsedDate), "dd/MM/yyyy");
      return <div className="ml-4"> {date} </div>;
    },
  },
];
