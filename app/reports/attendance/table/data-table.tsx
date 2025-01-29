"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  FilterFn,
} from "@tanstack/react-table";
import {
  rankItem,
  compareItems,
  RankingInfo,
} from "@tanstack/match-sorter-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Attendance } from "@/app/(dashboard)/dashboard/attendance/today/columns";
import { useRef } from "react";
import { utils, writeFileXLSX } from "xlsx";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FileSpreadsheet } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  start: string;
  end: string;
}

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
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


export function DataTableAttendanceReports<TData extends Attendance, TValue>({
  columns,
  data,
  start,
  end
}: DataTableProps<TData, TValue>) {
  // Tanstack table state
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Table reference
  const tbl = useRef(null)

  // Define table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 1000,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  });

  // format date
  const startDate = format(+start, 'yyyy-MM-dd');
  const endDate = format(+end, 'yyyy-MM-dd');

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-end">
          <Button className="bg-green-700 hover:bg-green-800" onClick={() => {
              // Get headers from columns
              const headers = columns.reduce((acc: { [key: string]: string }, column: any) => {
                const header = typeof column.header === 'string' 
                  ? column.header 
                  : column.header === undefined 
                    ? column.accessorKey 
                    : typeof column.header === 'function'
                      ? column.accessorKey.charAt(0).toUpperCase() + column.accessorKey.slice(1)
                      : column.accessorKey;
                acc[column.accessorKey] = header;
                return acc;
              }, {});

              // Create worksheet from the data directly instead of table
              const ws_data = table.getRowModel().rows.map(row => {
                const rowData: any = {};
                row.getVisibleCells().forEach(cell => {
                  const columnId = cell.column.id;
                  const value = cell.getValue();
                  
                  // Handle time columns specifically
                  if (['shiftStart', 'shiftEnd', 'checkInTime', 'checkOutTime', 'overtimeStart', 'overtimeEnd'].includes(columnId)) {
                    if (value) {
                      rowData[headers[columnId] || columnId] = format(new Date(Number(value)), 'HH:mm');
                    } else {
                      rowData[headers[columnId] || columnId] = '-';
                    }
                  } else if (columnId === 'attendanceDate') {
                    rowData[headers[columnId] || columnId] = format(new Date(Number(value)), 'dd/MM/yyyy');
                  } else {
                    rowData[headers[columnId] || columnId] = cell.getValue();
                  }
                });
                return rowData;
              });

              // Create workbook and add worksheet
              const wb = utils.book_new();
              const ws = utils.json_to_sheet(ws_data);

              // Add worksheet to workbook
              utils.book_append_sheet(wb, ws, "Attendance Report");
              
              // write to XLSX
              writeFileXLSX(wb, `Reports_Attendances_${startDate}_${endDate}.xlsx`);
            }}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export XLSX
          </Button>
      </div>
      {/* <DataTableToolbar table={table} /> */}
      <div className="rounded-md border">
        <Table ref={tbl}>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                      <TableCell key={cell.id} className="p-3 px-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center "
                >
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
    </div>
  );
}
