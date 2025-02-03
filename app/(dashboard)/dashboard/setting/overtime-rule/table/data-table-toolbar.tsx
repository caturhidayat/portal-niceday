"use client"

import { DataTableViewOptions } from "@/components/table/data-table-view-option"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Find by name..."
          value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "h-8 w-[240px] justify-start text-left font-normal",
                !table.getColumn("attendanceDate")?.getFilterValue() && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {table.getColumn("attendanceDate")?.getFilterValue() ? (
                `${format(
                  (table.getColumn("attendanceDate")?.getFilterValue() as DateRange)?.from as Date,
                  "LLL dd, y"
                )} - ${format(
                  (table.getColumn("attendanceDate")?.getFilterValue() as DateRange)?.to as Date,
                  "LLL dd, y"
                )}`
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={(table.getColumn("attendanceDate")?.getFilterValue() as DateRange)?.from}
              selected={table.getColumn("attendanceDate")?.getFilterValue() as DateRange}
              onSelect={(range) => {
                table.getColumn("attendanceDate")?.setFilterValue(range)
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}