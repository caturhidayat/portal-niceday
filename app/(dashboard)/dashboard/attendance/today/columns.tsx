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
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";

import { format } from "date-fns";

export type User = {
    id: string;
    name: string;
    username: string;
    password: string;
    role: "EMPLOYEE" | "ADMIN";
    departmentId: number;
    department: string;
    branchId: number;
    branch: string;
    createdAt: string;
    updatedAt: string;
};

export type Shift = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
};

// export type Attendance = {
//     id: string;
//     userId: string;
//     user: User;
//     attendanceDate: string;
//     checkInTime: string;
//     checkOutTime: string;
//     checkInPhotoUrl: string;
//     checkOutPhotoUrl: string;
//     inLatitude: number;
//     inLongitude: number;
//     outLatitude: number;
//     outLongitude: number;
//     isLate: boolean;
//     workHours: number;
//     officeLocationId: string;
//     shiftId: string;
//     shift: Shift;
//     createdAt: string;
//     updatedAt: string;
// };
export type Attendance = {
    id: string;
    attendanceDate: string;
    checkInTime: string;
    checkOutTime: string;
    checkInPhotoUrl: string;
    checkOutPhotoUrl: string;
    inLatitude: number;
    inLongitude: number;
    outLatitude: number;
    outLongitude: number;
    isLate: boolean;
    workHours: number;
    shiftName: string;
    shiftStart: string;
    shiftEnd: string;
    fullName: string;
    username: string;
    officeLocationName: string;

    userId: string;
    shiftId: string;
    officeLocationId: string;

    department: string;
    branch: string;

    overtime: string;
    overtimeId: string;
    overtimeStart: string;
    overtimeEnd: string;
    overtimeTotalHours: number;
    overtimeReason: string;
    overtimeReasonAs: string;
    overtimeRemark: string;
    overtimeStatus: string;
    overtimeCreatedAt: string;
    overtimeUpdatedAt: string;
    overtimeDeletedAt: string;

    createdAt: string;
    updatedAt: string;
};

export const columns: ColumnDef<Attendance>[] = [
    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == "asc")
                    }
                >
                    Name
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="ml-2">{row.getValue("fullName")}</div>;
        },
    },

    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == "asc")
                    }
                >
                    NIK
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="ml-2">{row.getValue("username")}</div>;
        },
    },
    {
        accessorKey: "attendanceDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == "asc")
                    }
                >
                    Attd Date
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const attendanceDates = row.getValue("attendanceDate");
            const parsedDate = parseInt(attendanceDates as string);

            if (isNaN(parsedDate)) {
                return <div>Invalid date</div>;
            }

            const date = format(new Date(parsedDate), "dd/MM/yyyy");
            return <div className="ml-4">{date}</div>;
        },
    },
    {
        accessorKey: "shiftStart",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == "asc")
                    }
                >
                    Shift Start
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const shiftStartTime = row.getValue("shiftStart");
            const parsedDate = parseInt(shiftStartTime as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4">--:--:--</div>;
            }

            const date = format(new Date(parsedDate), "HH:mm:ss");
            return <div className="ml-4 text-destructive">{date}</div>;
        },
    },
    {
        accessorKey: "shiftEnd",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == "asc")
                    }
                >
                    Shift End
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const shiftEndTime = row.getValue("shiftEnd");
            const parsedDate = parseInt(shiftEndTime as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4">--:--:--</div>;
            }

            const date = format(new Date(parsedDate), "HH:mm:ss");
            return <div className="ml-4 text-destructive">{date}</div>;
        },
    },
    {
        accessorKey: "checkInTime",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == "asc")
                    }
                >
                    Check In
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const checkInTime = row.getValue("checkInTime");
            const parsedDate = parseInt(checkInTime as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4">--:--</div>;
            }

            const date = format(new Date(parsedDate), "HH:mm");
            return <div className="ml-4">{date}</div>;
        },
    },
    {
        accessorKey: "checkOutTime",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() == "asc")
                    }
                >
                    Check Out
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const checkOutTime = row.getValue("checkOutTime");
            const parsedDate = parseInt(checkOutTime as string);

            if (isNaN(parsedDate)) {
                return <div className="ml-4">--:--</div>;
            }

            const date = format(new Date(parsedDate), "HH:mm");
            return <div className="ml-4">{date}</div>;
        },
    },
    {
        accessorKey: "isLate",
        header: "Late",
        cell: ({ row }) => {
            const isLate = row.getValue("isLate");
            return <div className="ml-2">{isLate ? "Late" : null}</div>;
        },
    },
    {
      accessorKey: "workHours",
      header: "Work Hours",
      cell: ({ row }) => {
        const workHours = row.getValue("workHours") as number;
        if (isNaN(workHours)) {
          return <div className="ml-4">--:--:--</div>;
        }
        return <div className="ml-4">{workHours} Minutes</div>;
      },
    },
    {
        accessorKey: "branch",
        header: "Branch",
        cell: ({ row }) => {
            return <div className="ml-4">{row.getValue("branch")}</div>;
        },
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => {
            return <div className="ml-4">{row.getValue("department")}</div>;
        },
    },
    {
      accessorKey: "shiftName",
      header: "Shift Name",
      cell: ({ row }) => {
        return <div className="ml-4">{row.getValue("shiftName")}</div>;
      },
    },
];

// "id": "ATT-1727423963019604",
// "userId": "USR-1727420995404807",
// "attendanceDate": "1727420908980",
// "checkInTime": "1727420908980",
// "checkOutTime": null,
// "checkInPhotoUrl": null,
// "checkOutPhotoUrl": null,
// "inLatitude": -6.7359191,
// "inLongitude": 16.7359111,
// "outLatitude": null,
// "outLongitude": null,
// "isLate": true,
// "workHours": null,
// "officeLocationId": null,
// "shiftId": null,
// "createdAt": "1727423963019",
// "updatedAt": "1727423963019"
