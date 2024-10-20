"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export type ShiftGroup = {
    id: string;
    name: string;
    startDate: string;
    description: string;
    cycleLength: number;
    createdAt: string;
    updatedAt: string;
};

export const columns: ColumnDef<ShiftGroup>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            return <div className="ml-4">{name}</div>;
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) => {
            const startDate = row.getValue("startDate");
            const parsedDate = parseInt(startDate as string);

            if (isNaN(parsedDate)) {
                return <div> --/--/--</div>;
            } 

            const date = format(new Date(parsedDate), "dd/MM/yy");
            return <div className="ml-4">{date}</div>;
        },
    },
    {
        accessorKey: "cycleLength",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cycle Length" />
        ),
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt");
            const parsedDate = parseInt(createdAt as string);

            if (isNaN(parsedDate)) {
                return <div>Invalid date</div>;
            }

            const date = format(new Date(parsedDate), "dd/MM/yy");
            return <div className="ml-4">{date}</div>;
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => {
            const updatedAt = row.getValue("updatedAt");
            const parsedDate = parseInt(updatedAt as string);

            if (isNaN(parsedDate)) {
                return <div>Invalid date</div>;
            }

            const date = format(new Date(parsedDate), "dd/MM/yy");
            return <div className="ml-4">{date}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
