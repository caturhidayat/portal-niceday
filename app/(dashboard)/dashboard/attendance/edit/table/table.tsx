"use client";

import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { useReducer, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function TableEdit({
  table,
  refreshData,
}: {
  table: ReactTable<Person>;
  rowSelection: Object;
  refreshData: () => void;
}) {
  const rerender = useReducer(() => ({}), {})[1];

  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setGlobalFilter(value);
            table.setGlobalFilter(value);
          }}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <Table>
        <TableHeader className="">
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
