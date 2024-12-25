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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

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
  shiftStartTime: string;
  shiftEndTime: string;
  name: string;
  username: string;
  officeLocationName: string;

  userId: string;
  shiftId: string;
  officeLocationId: string;

  createdAt: string;
  updatedAt: string;
};

// shiftName: item.shift?.name ?? null,
//       shiftStartTime: item.shift?.startTime ?? null,
//       shiftEndTime: item.shift?.endTime ?? null,
//       name: item.user?.name ?? null,
//       username: item.user?.username ?? null,
//       officeLocationName: item.OfficeLocation?.name ?? null,

export const columns: ColumnDef<Attendance>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "attendanceDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Attendances Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          NIK
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("username")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-2">{row.getValue("name")}</div>;
    },
  },

  {
    accessorKey: "shiftStartTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Shift Start
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const shiftStartTime = row.getValue("shiftStartTime");
      const parsedDate = parseInt(shiftStartTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm:ss");
      return <div className="ml-4">{date}</div>;
    },
  },
  {
    accessorKey: "shiftEndTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Shift End
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const shiftEndTime = row.getValue("shiftEndTime");
      const parsedDate = parseInt(shiftEndTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm:ss");
      return <div className="ml-4">{date}</div>;
    },
  },
  {
    accessorKey: "checkInTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Check In
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const checkInTime = row.getValue("checkInTime");
      const parsedDate = parseInt(checkInTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm:ss");
      return <div className="ml-4">{date}</div>;
    },
  },
  {
    accessorKey: "checkOutTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Check Out
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const checkOutTime = row.getValue("checkOutTime");
      const parsedDate = parseInt(checkOutTime as string);

      if (isNaN(parsedDate)) {
        return <div className="ml-4">--:--:--</div>;
      }

      const date = format(new Date(parsedDate), "HH:mm:ss");
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
      return <div className="ml-4">{workHours}</div>;
    },
  },
  // {
  //     accessorKey: "officeLocationId",
  //     header: "Office Location",
  //     cell: ({ row }) => {
  //         const officeLocationId = row.getValue("officeLocationId");
  //         if (!officeLocationId) {
  //             return <div className="ml-4">--</div>;
  //         }
  //         return <div className="ml-4">{String(officeLocationId)}</div>;
  //     },
  // },
  {
    accessorKey: "shiftName",
    header: "Shift Name",
    cell: ({ row }) => {
      return <div className="ml-4">{row.getValue("shiftName")}</div>;
    },
  },
  //   {
  //     accessorKey: "createdAt",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
  //         >
  //           Created At
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //     cell: ({ row }) => {
  //       const createdAt = row.getValue("createdAt");
  //       const parsedDate = parseInt(createdAt as string);

  //       if (isNaN(parsedDate)) {
  //         return <div>Invalid date</div>;
  //       }

  //       const date = format(new Date(parsedDate), "dd/MM/yy - HH:mm");
  //       return <div className="ml-4">{date}</div>;
  //     },
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      const attendance = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-bold">Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(attendance.id)}
            >
              Copy Attendance ID
            </DropdownMenuItem>
            <DropdownMenuItem>View user</DropdownMenuItem>
            <DropdownMenuItem>View attendance details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
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
