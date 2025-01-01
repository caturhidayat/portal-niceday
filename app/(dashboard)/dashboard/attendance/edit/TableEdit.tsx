"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Users, X } from "lucide-react";
import { DataTableC } from "../today/data-table";
import { columnsEditAttendance } from "./table/columns";
import { Attendance } from "../today/columns";
import { Branches, Departments } from "../../employees/columns";
import { useState } from "react";
import TableAttendancesList from "./table/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TableEdit({
  data,
  branch,
  departments,
}: {
  data: Attendance[];
  branch: Branches[];
  departments: Departments[];
}) {
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Tanstack table
  const columns = columnsEditAttendance;
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      // columnVisibility: {
      //   isLate: false,
      //   workHours: false,
      //   branch: false,
      //   department: false,
      //   shiftName: false,
      //   createdAt: false,
      // },
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div className="rounded-lg">
        {/* Input Time */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Label>New Start Time</Label>
            <Input
              type="time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label>New End Time</Label>
            <Input
              type="time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
            />
          </div>
          <Button
            // onClick={updateEmployeeTime}
            className="px-4 py-2 self-end"
            variant={"default"}
          >
            Update Attendances
          </Button>
        </div>

        <Alert className="mb-4">
          <AlertTitle className="flex items-center gap-x-2 font-bold">
            <Users className="mr-2 h-4 w-4" />
            Info :
          </AlertTitle>
          <AlertDescription>
            {Object.keys(rowSelection).length} of{" "}
            {table.getPreFilteredRowModel().rows.length} Total Rows Selected
          </AlertDescription>
        </Alert>
        <ul>
          <div>
            <ul>
              {Object.entries(table.getState().rowSelection).map(
                ([key, value]) => {
                  if (value) {
                    const row = table.getRow(key);
                    return (
                      <Badge
                        key={key}
                        variant={"secondary"}
                        className="mr-2 mb-2 p-1"
                      >
                        {row.getValue("username")} - {row.getValue("name")}
                        <X
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newSelection = {
                              ...table.getState().rowSelection,
                            };
                            delete newSelection[key];
                            table.setRowSelection(newSelection);
                          }}
                        />
                      </Badge>
                    );
                  }
                  return null;
                }
              )}
            </ul>
          </div>
        </ul>
      </div>
      <div className="rounded-lg lg:col-span-2">
        {/* <ScrollArea type="auto" className="h-[800px]"> */}
        <TableAttendancesList
          table={table}
          branch={branch}
          departments={departments}
          rowSelection={rowSelection}
        />
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}
