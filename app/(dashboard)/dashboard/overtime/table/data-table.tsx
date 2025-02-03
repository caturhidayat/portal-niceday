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
  SortingFn,
  sortingFns,
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
import { DataTablePagination } from "@/components/table/data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


import { format } from "date-fns";
import { OvertimeBilledType } from "../../setting/overtime-billed/table/columns";
import { Attendance } from "../../attendance/today/columns";
import { BadgeCheck, CalendarCheck, CalendarX } from "lucide-react";
import { approveOvertime, rejectOvertime } from "../actions";
import { OvertimeRulesType } from "../../setting/overtime-rule/table/columns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED"
}


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  overtimeBilled: OvertimeBilledType[];
  overtimeRules: OvertimeRulesType[];
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

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export function DataTableOvertime<TData extends Attendance, TValue>({
  columns,
  data,
  overtimeBilled,
  overtimeRules
}: DataTableProps<TData, TValue>) {
  // Tanstack table state
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

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
        pageSize: 20,
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

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
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
                <TableHead>Approve</TableHead>
                <TableHead>Reject</TableHead>
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
                    <TableCell>
                      {row.original.overtimeStatus === "PENDING" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"ghost"}
                              size="sm"
                            // disabled={!row.original.checkOutTime}
                            >
                              <CalendarCheck className="h-4 w-4 text-green-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Approve this Overtime?
                              </DialogTitle>
                            </DialogHeader>
                            <div>
                              <Alert>
                                <AlertTitle>
                                  Details Attendance
                                </AlertTitle>
                                <AlertDescription>
                                  <div className="grid gap-2 pt-2">
                                    <span>
                                      Shift - {format(new Date(+row.original.shiftStart), 'HH:mm')} - {format(new Date(+row.original.shiftEnd), 'HH:mm')}
                                    </span>
                                    <span>
                                      Actual Attendance - {format(new Date(+row.original.checkInTime), 'HH:mm')} - {format(new Date(+row.original.checkOutTime), 'HH:mm')}
                                    </span>
                                    <span className="text-green-500">
                                      Overtime - {format(new Date(+row.original.overtimeStart), 'HH:mm')} - {format(new Date(+row.original.overtimeEnd), 'HH:mm')}
                                    </span>
                                  </div>
                                </AlertDescription>
                              </Alert>
                            </div>
                            <Button onClick={async () => {
                              await approveOvertime(row.original.overtimeId)
                            }}>
                              Approve Overtime Request
                            </Button>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.original.overtimeStatus === "PENDING" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                            // disabled={!row.original.checkOutTime}
                            >
                              <CalendarX className="h-4 w-4 text-destructive" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Reject this Overtime?
                              </DialogTitle>
                            </DialogHeader>
                            <div>
                              <Alert>
                                <AlertTitle>
                                  Details Attendance
                                </AlertTitle>
                                <AlertDescription>
                                  <div className="grid gap-2 pt-2">
                                    <span>
                                      Shift - {format(new Date(+row.original.shiftStart), 'HH:mm')} - {format(new Date(+row.original.shiftEnd), 'HH:mm')}
                                    </span>
                                    <span>
                                      Actual Attendance - {format(new Date(+row.original.checkInTime), 'HH:mm')} - {format(new Date(+row.original.checkOutTime), 'HH:mm')}
                                    </span>
                                    <span className="text-destructive">
                                      Overtime - {format(new Date(+row.original.overtimeStart), 'HH:mm')} - {format(new Date(+row.original.overtimeEnd), 'HH:mm')}
                                    </span>
                                  </div>
                                </AlertDescription>
                              </Alert>
                            </div>
                            <div className="pt-2">
                              <form>
                                <Label>
                                  Rejection Reason
                                </Label>
                                <Textarea name="rejectionReason" placeholder="Please enter a reason of rejection" required/>
                              </form>
                            </div>
                            <Button className="bg-destructive text-muted hover:bg-red-600 hover:text-destructive-foreground" onClick={async () => {
                              await rejectOvertime(row.original.overtimeId)
                            }}>
                              Reject Overtime Request
                            </Button>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
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
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
