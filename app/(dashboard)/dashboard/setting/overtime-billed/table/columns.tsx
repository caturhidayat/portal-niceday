"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type OvertimeBilledType = {
  id: string;
  name: string;
};

export const columns: ColumnDef<OvertimeBilledType>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
