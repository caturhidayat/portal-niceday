"use client";

import {
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { Suspense, useEffect, useState } from "react";
import { columnsAttendance } from "./table/columns";
import { getAttendance } from "./actions";
import { Attendance } from "../today/columns";
import { DataTableC } from "../../employees/data-table";
import DialogCreate from "./DialogCreate";

export default function Page() {
  const [data, setData] = useState<Attendance[]>([]);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    async function getData() {
      const res = await getAttendance();
      setData(res);
    }
    getData();
  }, []);

  const columns = columnsAttendance;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    // getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-xl">Attendance List</h1>
      <div className="flex justify-end py-2">
        <DialogCreate />
      </div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <TableAttendancesList table={table} refreshData={() => {}} /> */}
      <DataTableC columns={columns} data={data} />
      {/* </Suspense> */}
    </div>
  );
}
