"use client";

import Loading from "@/app/loading";
import { Suspense, useEffect, useState } from "react";
import { getLeaves, TLeave } from "./action";
import TableLeavesList from "./table/table";
import {
  ColumnFiltersState,
  FilterFn,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { columnsLeaves } from "./table/columns";
import { compareItems, RankingInfo, rankItem } from "@tanstack/match-sorter-utils";

// Fuzzy search prepare config
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

export default function Page() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<TLeave[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
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
  });

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="font-bold text-xl">Leaves</h1>
      </div>
      <div>
        <TableLeavesList table={table} refreshData={() => {}} />
      </div>
    </div>
  );
}
