"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Departments } from "../page";

export const columns: ColumnDef<Departments>[] = [
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

            const date = format(new Date(parsedDate), "dd/MM/yyyy HH:mm:ss");
            return <div className="ml-4"> {date} </div>;
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
            const updatedAt = row.getValue("updatedAt");
            const parsedDate = parseInt(updatedAt as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4"> --:--:-- </div>;
            }

            const date = format(new Date(parsedDate), "dd/MM/yyyy HH:mm:ss");
            return <div className="ml-4"> {date} </div>;
        },
    },
];
