"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { format, fromUnixTime } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export type Shift = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
};

export const columns: ColumnDef<Shift>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const name = row.getValue("name");
            return <div className="ml-2">{name as string}</div>;
        },
    },
    {
        accessorKey: "startTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Time" />
        ),
        cell: ({ row }) => {
            const startTime = row.getValue("startTime");
            const parsedDate = parseInt(startTime as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4">--:--:--</div>;
            }

            const date = format(new Date(parsedDate), "HH:mm:ss");
            return <div className="ml-4">{date}</div>;
        },
    },
    {
        accessorKey: "endTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End Time" />
        ),
        cell: ({ row }) => {
            const endTime = row.getValue("endTime");
            const parsedDate = parseInt(endTime as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4">--:--:--</div>;
            }

            const date = format(new Date(parsedDate), "HH:mm:ss");
            return <div className="ml-4">{date}</div>;
        },
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
