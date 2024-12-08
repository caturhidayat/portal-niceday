"use client";

import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { Person } from "./makeData";
import { Filter, IndeterminateCheckbox } from "./columns";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Attendance } from "../../today/columns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function TableAttendancesList({
  table,
  refreshData,
}: {
  table: ReactTable<Attendance>;
  refreshData: () => void;
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter by name..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Filter by date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              onSelect={(event) => {
                table.getColumn("attendanceDate")?.setFilterValue(event);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {/* <Input
          type="date"
          onChange={(event) => {
            table
              .getColumn("attendanceDate")
              ?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        /> */}
      </div>
      <div className="h-2" />
      <Table>
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div className="pt-1 px-1">
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className="p-0 px-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <td className="p-2">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllPageRowsSelected(),
                  indeterminate: table.getIsSomePageRowsSelected(),
                  onChange: table.getToggleAllPageRowsSelectedHandler(),
                }}
              />
            </td>
            <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="h-2" />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            className="flex items-center justify-start space-x-2 py-4"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            variant={"outline"}
          >
            <ChevronsLeft className="h-4 w-4" />
            First
          </Button>
          <Button
            className="flex items-center justify-end space-x-2 py-4"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant={"outline"}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            className="flex items-center justify-end space-x-2 py-4"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant={"outline"}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            className="flex items-center justify-end space-x-2 py-4"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            variant={"outline"}
          >
            Last
            <ChevronsRight className="h-4 w-4" />
          </Button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <Button
            className="border rounded p-2 mb-2 bg-teal-500 text-white"
            onClick={() => refreshData()}
          >
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
}
