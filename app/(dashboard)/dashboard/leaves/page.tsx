"use client";

import Loading from "@/app/loading";
import { Suspense, useEffect, useState } from "react";
import { getLeaves, TLeave } from "./action";
import TableLeavesList from "./table/table";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { columnsLeaves } from "./table/columns";

export default function Page() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<TLeave[]>([]);

  useEffect(() => {
    async function getData() {
      const leaves = await getLeaves();
      setData(leaves);
    }

    getData();
  }, []);

  const columns = columnsLeaves;

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
    <div className="grid gap-4 p-4">
      <div>
        <h1 className="py-4 font-bold text-xl">Leaves</h1>
      </div>
      <div>
        <TableLeavesList table={table} refreshData={() => {}} />
      </div>
    </div>
  );
}
