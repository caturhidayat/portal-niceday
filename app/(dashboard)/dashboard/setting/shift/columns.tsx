"use client";

import { Button } from "@/components/ui/button";
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

import { DataTableColumnHeader } from "./data-table-column-header";

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
        cell: ({ row }) => {
            const shift = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="font-bold">
                            Action
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(shift.id)
                            }
                        >
                            Copy Shift ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>View shift details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

// model Shift {
//     id         String         @id
//     name       String
//     startTime  BigInt?
//     endTime    BigInt?
//     isDynamic  Boolean?       @default(false)
//     ShiftGroup ShiftOnGroup[]

//     createdAt  DateTime     @default(now())
//     updatedAt  DateTime     @updatedAt
//     Attendance Attendance[]

//     @@unique([name])
//     @@map("shifts")
//   }
