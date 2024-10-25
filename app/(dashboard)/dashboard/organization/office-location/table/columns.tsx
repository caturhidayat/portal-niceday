"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { OfficeLocation } from "../page";

export const columns: ColumnDef<OfficeLocation>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "latitude",
        header: "Latitude",
    },
    {
        accessorKey: "longitude",
        header: "Longitude",
    },
    {
        accessorKey: "radius",
        header: "Radius",
    },
    {
        accessorKey: "officeStart",
        header: "Office Start",
        cell: ({ row }) => {
            const officeStart = row.getValue("officeStart");
            const parsedDate = parseInt(officeStart as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4"> --:--:-- </div>;
            }

            const date = format(new Date(parsedDate), "HH:mm:ss");
            return <div className="ml-4"> {date} </div>;
        },
    },
    {
        accessorKey: "officeEnd",
        header: "Office End",
        cell: ({ row }) => {
            const officeEnd = row.getValue("officeEnd");
            const parsedDate = parseInt(officeEnd as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4"> --:--:-- </div>;
            }

            const date = format(new Date(parsedDate), "HH:mm:ss");
            return <div className="ml-4"> {date} </div>;
        },
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
