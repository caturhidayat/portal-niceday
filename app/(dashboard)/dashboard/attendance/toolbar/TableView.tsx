"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Attendance, columnsToolbar } from "./columns";
import { useState } from "react";
import { rankItem } from "@tanstack/match-sorter-utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { columns } from "../today/columns";

// Definisikan tipe data untuk hasil filter attendance
// export type AttendanceData = {
//   id: string;
//   userId: string;
//   attendanceDate: string;
//   checkInTime: string | null;
//   checkOutTime: string | null;
//   isLate: boolean;
//   lateMinutes: number | null;
//   workHours: number | null;
//   fullName: string | null;
//   username: string | null;
//   department: string | null;
//   shiftName: string | null;
//   shiftGroup: string | null;
//   branch: string | null;
//   officeLocationName: string | null;
// };

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Komponen untuk menampilkan tabel hasil filter
export default function TableView<TData extends Attendance, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const table = useReactTable({
    data,
    columns: columnsToolbar,
    initialState: {
      sorting: [
        {
          id: "fullName",
          desc: true,
        },
        {
          id: "attendanceDate",
          desc: true,
        },
      ],
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting,
      grouping,
      rowSelection,
      columnFilters,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    enableRowSelection: true,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Fungsi untuk memformat tanggal dan waktu
  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return "-";
    return format(new Date(Number(timestamp)), "dd-MMM-yyyy");
  };

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return "-";
    return format(new Date(Number(timestamp)), "HH:mm:ss");
  };

  // Fungsi untuk export data ke CSV
  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error("Tidak ada data untuk diekspor");
      return;
    }

    // Header untuk CSV
    const headers = [
      "Name",
      "Department",
      "Shift",
      "Shift Group",
      "Date",
      "Check In",
      "Check Out",
      "Late Minutes",
      "Work Hours",
      "Location",
    ];

    // Mengubah data menjadi format CSV
    const csvRows = [];
    csvRows.push(headers.join(","));

    // for (const item of data) {
    //   const row = [
    //     `"${item.fullName || item.username || "-"}"`,
    //     `"${item.department || "-"}"`,
    //     `"${item.shiftName || "-"}"`,
    //     `"${item.shiftGroup || "-"}"`,
    //     `"${formatDate(item.attendanceDate)}"`,
    //     `"${formatTime(item.checkInTime)}"`,
    //     `"${formatTime(item.checkOutTime)}"`,
    //     `"${item.lateMinutes || 0}"`,
    //     `"${item.workHours || 0}"`,
    //     `"${item.officeLocationName || "-"}"`,
    //   ];
    //   csvRows.push(row.join(","));
    // }

    // Membuat blob dan download link
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `attendance_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    // <>
    //   <Toaster position="top-right" richColors />
    //   <Card>
    //     {/* <CardHeader className="flex flex-row items-center justify-between">
    //       <CardTitle>Attendance Data</CardTitle>
    //       <Button variant="outline" onClick={exportToCSV}>
    //         <Download className="mr-2 h-4 w-4" />
    //         Export CSV
    //       </Button>
    //     </CardHeader> */}
    //     <CardContent>
    //       <Table>
    //         <TableHeader>
    //           {table.getHeaderGroups().map((headerGroup) => (
    //             <TableRow key={headerGroup.id}>
    //               {headerGroup.headers.map((header) => {
    //                 return (
    //                   <TableHead key={header.id} colSpan={header.colSpan}>
    //                     {/* {header.isPlaceholder
    //                       ? null
    //                       : flexRender(
    //                           header.column.columnDef.header,
    //                           header.getContext()
    //                         )} */}
    //                     {header.isPlaceholder ? null : (
    //                       <div>
    //                         {header.column.getCanGroup() ? (
    //                           // If the header can be grouped, let's add a toggle
    //                           <button
    //                             {...{
    //                               onClick:
    //                                 header.column.getToggleGroupingHandler(),
    //                               style: {
    //                                 cursor: "pointer",
    //                               },
    //                             }}
    //                           >
    //                             {header.column.getIsGrouped()
    //                               ? `(${header.column.getGroupedIndex()}) `
    //                               : ``}
    //                           </button>
    //                         ) : null}{" "}
    //                         {flexRender(
    //                           header.column.columnDef.header,
    //                           header.getContext()
    //                         )}
    //                       </div>
    //                     )}
    //                   </TableHead>
    //                 );
    //               })}
    //               <TableHead>
    //                 <Button variant={"ghost"}>Acton</Button>
    //               </TableHead>
    //             </TableRow>
    //           ))}
    //         </TableHeader>
    //         <TableBody>
    //           {table.getRowModel().rows?.length ? (
    //             table.getRowModel().rows.map((row) => {
    //               return (
    //                 <TableRow
    //                   key={row.id}
    //                   data-state={row.getIsSelected() && "selected"}
    //                 >
    //                   {row.getVisibleCells().map((cell) => (
    //                     <TableCell key={cell.id} className="p-0 px-2">
    //                       {flexRender(
    //                         cell.column.columnDef.cell,
    //                         cell.getContext()
    //                       )}
    //                     </TableCell>
    //                   ))}

    //                   <TableCell className="p-0 px-2 flex">
    //                     {/* <DialogEditAttendance attendance={row.original} />
    //                   <AlertDialog>
    //                     <AlertDialogTrigger asChild>
    //                       <Button variant="ghost">
    //                         <Trash2 className="mr-2 h-4 w-4 text-red-600" />
    //                       </Button>
    //                     </AlertDialogTrigger>
    //                     <AlertDialogContent>
    //                       <AlertDialogHeader>
    //                         <AlertDialogTitle>
    //                           Are you sure you want to delete this attendance?
    //                         </AlertDialogTitle>
    //                         <AlertDialogDescription>
    //                           This action cannot be undone. This will
    //                           permanently delete your attendance.
    //                         </AlertDialogDescription>
    //                         <AlertDialogFooter>
    //                           <AlertDialogCancel>Cancel</AlertDialogCancel>
    //                           <AlertDialogAction
    //                             onClick={async () => {
    //                               await deleteAttendance(row.original.id);
    //                               table.resetRowSelection();
    //                             }}
    //                           >
    //                             Delete
    //                           </AlertDialogAction>
    //                         </AlertDialogFooter>
    //                       </AlertDialogHeader>
    //                     </AlertDialogContent>
    //                   </AlertDialog> */}
    //                   </TableCell>
    //                 </TableRow>
    //               );
    //             })
    //           ) : (
    //             <TableRow>
    //               <TableCell
    //                 colSpan={columns.length}
    //                 className="h-24 text-center"
    //               >
    //                 <Alert>
    //                   <AlertTitle>No results.</AlertTitle>
    //                   <AlertDescription>No data to display.</AlertDescription>
    //                 </Alert>
    //               </TableCell>
    //             </TableRow>
    //           )}
    //         </TableBody>
    //       </Table>
    //     </CardContent>
    //   </Card>
    // </>

    <div>
      <Table>
        <TableHeader className="bg-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {/* {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )} */}
                    {header.isPlaceholder ? null : (
                      <div>
                        {header.column.getCanGroup() ? (
                          // If the header can be grouped, let's add a toggle
                          <button
                            {...{
                              onClick: header.column.getToggleGroupingHandler(),
                              style: {
                                cursor: "pointer",
                              },
                            }}
                          >
                            {header.column.getIsGrouped()
                              ? `(${header.column.getGroupedIndex()}) `
                              : ``}
                          </button>
                        ) : null}{" "}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
              {/* <TableHead>
                <Button variant={"ghost"}>Acton</Button>
              </TableHead> */}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-0 px-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  <TableCell className="p-0 px-2 flex">
                    {/* <DialogEditAttendance attendance={row.original} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost">
                            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this attendance?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your attendance.
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  await deleteAttendance(row.original.id);
                                  table.resetRowSelection();
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog> */}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Alert>
                  <AlertTitle>No results.</AlertTitle>
                  <AlertDescription>No data to display.</AlertDescription>
                </Alert>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
