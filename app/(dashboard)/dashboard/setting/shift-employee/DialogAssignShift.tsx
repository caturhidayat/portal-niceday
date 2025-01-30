"use client";

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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ShiftGroup } from "./table/columns";
import { cn } from "@/lib/utils";

import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import {
  CalendarPlus,
  CalendarIcon,
  ChevronsUpDown,
  Command,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import createShiftEmployee from "./actions";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DialogAssignShift({
  row,
  shiftGroups,
}: {
  row: any;
  shiftGroups: ShiftGroup[];
}) {
  const [open, setOpen] = useState(false);
  const [selectShiftGroup, setSelectShiftGroup] = useState<ShiftGroup>();
  const [date, setDate] = useState<Date>();

  console.log("Shift Group => : ", shiftGroups);
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="link" disabled={!!row.shiftName}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Assign Shift
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Assign Shift</AlertDialogTitle>
            <AlertDialogDescription>
              Please select shift group and start date for{" "}
              <strong>
                {row.username} - {row.name}
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
                    className={cn(" text-left font-normal", "flex-grow")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "eeee, dd MMM-yyyy")
                    ) : (
                      <span>Pick a date to start shift</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate) {
                        const epochMillis = newDate.getTime();
                        const hiddenInput = document.getElementById(
                          "hiddenStartDate"
                        ) as HTMLInputElement;
                        if (hiddenInput) {
                          hiddenInput.value = epochMillis.toString();
                        }
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" id="hiddenStartDate" name="startDate" />
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
                    <CommandEmpty>No shift group found.</CommandEmpty>
                    <CommandGroup>
                      {shiftGroups.map((shiftGroup) => (
                        <CommandItem
                          key={shiftGroup.id}
                          value={shiftGroup.name}
                          onSelect={(currentValue) => {
                            const selectedShiftGroup = shiftGroups.find(
                              (group) => group.name === currentValue
                            );
                            setSelectShiftGroup(selectedShiftGroup);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectShiftGroup?.id === shiftGroup.id
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
    </div>
  );
}
