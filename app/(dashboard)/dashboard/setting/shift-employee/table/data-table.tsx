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
import { Branches, Departments, ShiftGroup, User } from "./columns";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CalendarCog,
  CalendarIcon,
  CalendarPlus,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import createShiftEmployee, { updateShiftEmployee } from "../actions";
import DialogAssignShift from "../DialogAssignShift";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // branches: Branches[];
  // departments: Departments[];
  shiftGroups: ShiftGroup[];
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

export function DataTableC<TData extends User, TValue>({
  columns,
  data,
  // branches,
  // departments,
  shiftGroups,
}: DataTableProps<TData, TValue>) {
  // Tanstack table state
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [selectShiftGroup, setSelectShiftGroup] = useState<ShiftGroup>();
  const [date, setDate] = useState<Date>();

  // Define table
  const table = useReactTable({
    data,
    columns,
    initialState: {
      sorting: [
        {
          id: "username",
          desc: true,
        },
      ],
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
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
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
                <TableHead>
                  <Button variant={"ghost"}>Assign / Update Shift</Button>
                </TableHead>
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

                    <TableCell className="p-0 px-2">
                      {/* <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {row.original.shiftName ? (
                            <Button variant="link">
                              <CalendarCog className="mr-2 h-4 w-4" />
                              Change Shift
                            </Button>
                          ) : null}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Change Shift</AlertDialogTitle>
                            <AlertDialogDescription>
                              Please select shift group and start date for{" "}
                              <strong>
                                {row.original.username} - {row.original.name}
                              </strong>
                            </AlertDialogDescription>

                            <div className="flex flex-col gap-2 pt-4">
                              <Label htmlFor="startDate" className="w-60">
                                Start Date
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      " text-left font-normal",
                                      "flex-grow"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                      format(date, "eeee, dd MMM-yyyy")
                                    ) : (
                                      <span>Pick a date to start shift</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(newDate) => {
                                      setDate(newDate);
                                      if (newDate) {
                                        const epochMillis = newDate.getTime();
                                        const hiddenInput =
                                          document.getElementById(
                                            "hiddenStartDate"
                                          ) as HTMLInputElement;
                                        if (hiddenInput) {
                                          hiddenInput.value =
                                            epochMillis.toString();
                                        }
                                      }
                                    }}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <input
                                type="hidden"
                                id="hiddenStartDate"
                                name="startDate"
                              />
                            </div>

                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-full justify-between"
                                >
                                  {selectShiftGroup
                                    ? selectShiftGroup.name
                                    : "Select Shift Group"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[600px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search shift group..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No shift group found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {shiftGroups.map((shiftGroup) => (
                                        <CommandItem
                                          key={shiftGroup.id}
                                          value={shiftGroup.name}
                                          onSelect={(currentValue) => {
                                            const selectedShiftGroup =
                                              shiftGroups.find(
                                                (group) =>
                                                  group.name === currentValue
                                              );
                                            setSelectShiftGroup(
                                              selectedShiftGroup
                                            );
                                            setOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={`mr-2 h-4 w-4 ${
                                              selectShiftGroup?.id ===
                                              shiftGroup.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                            }`}
                                          />
                                          {shiftGroup.name}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  console.log("submit data : ", {
                                    userId: row.original.id,
                                    shiftGroupId: selectShiftGroup?.id,
                                    startDate: date,
                                  });

                                  // const startDate = new Date(date!)
                                  //   .getTime()
                                  //   .toString();

                                  await updateShiftEmployee({
                                    userId: row.original.id,
                                    shiftGroupId: selectShiftGroup?.id,
                                    startDate: date?.getTime().toString(),
                                  });
                                  // await table.resetRowSelection();
                                }}
                              >
                                Update Shift
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog> */}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          {!row.original?.shiftName ? (
                            <Button variant="link">
                              <CalendarPlus className="mr-2 h-4 w-4" />
                              Assign Shift
                            </Button>
                          ) : null}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Update Shift</AlertDialogTitle>
                            <AlertDialogDescription>
                              Please select shift group and start date for{" "}
                              <strong>
                                {row.original.username} - {row.original.name}
                              </strong>
                            </AlertDialogDescription>

                            <div className="flex flex-col gap-2 pt-4">
                              <Label htmlFor="startDate" className="w-60">
                                Start Date
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      " text-left font-normal",
                                      "flex-grow"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                      format(date, "eeee, dd MMM-yyyy")
                                    ) : (
                                      <span>Pick a date to start shift</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(newDate) => {
                                      setDate(newDate);
                                      if (newDate) {
                                        const epochMillis = newDate.getTime();
                                        const hiddenInput =
                                          document.getElementById(
                                            "hiddenStartDate"
                                          ) as HTMLInputElement;
                                        if (hiddenInput) {
                                          hiddenInput.value =
                                            epochMillis.toString();
                                        }
                                      }
                                    }}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <input
                                type="hidden"
                                id="hiddenStartDate"
                                name="startDate"
                              />
                            </div>

                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-full justify-between"
                                >
                                  {selectShiftGroup
                                    ? selectShiftGroup.name
                                    : "Select Shift Group"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[600px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search shift group..." />
                                  <CommandList>
                                    <CommandEmpty>
                                      No shift group found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {shiftGroups.map((shiftGroup) => (
                                        <CommandItem
                                          key={shiftGroup.id}
                                          value={shiftGroup.name}
                                          onSelect={(currentValue) => {
                                            const selectedShiftGroup =
                                              shiftGroups.find(
                                                (group) =>
                                                  group.name === currentValue
                                              );
                                            setSelectShiftGroup(
                                              selectedShiftGroup
                                            );
                                            setOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={`mr-2 h-4 w-4 ${
                                              selectShiftGroup?.id ===
                                              shiftGroup.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                            }`}
                                          />
                                          {shiftGroup.name}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  console.log("submit data : ", {
                                    userId: row.original.id,
                                    shiftGroupId: selectShiftGroup?.id,
                                    startDate: date,
                                  });

                                  // const startDate = new Date(date!)
                                  //   .getTime()
                                  //   .toString();

                                  await createShiftEmployee({
                                    userId: row.original.id,
                                    shiftGroupId: selectShiftGroup?.id,
                                    startDate: date?.getTime().toString(),
                                  });
                                  // await table.resetRowSelection();
                                }}
                              >
                                Assign Shift
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
