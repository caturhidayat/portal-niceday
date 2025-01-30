"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader,
  Loader2,
  Save,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Shift } from "../shift/table/columns";
import { get } from "@/lib/fetch-wrapper";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import createShiftGroup, { ActionResponseShiftGroup } from "./actions";
import { getAllShift } from "../shift/actions";

export type ShiftGroup = {
  id: string;
  name: string;
  startDate: string;
  description: string;
  cycleLength: number;
  createdAt: string;
  updatedAt: string;
};

const initialState: ActionResponseShiftGroup = {
  success: false,
  message: "",
  inputs: {
    name: "",
    startDate: "",
    description: "",
    cycleLength: 0,
    shiftName: [],
  },
};

export default function FormCreateShiftGroup({
  shifts,
}: {
  shifts: Shift[];
}) {
  const [date, setDate] = useState<Date>();
  const [displayShift, setDisplayShift] = useState(false);
  const [cycleLength, setCycleLength] = useState(0);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [value, setValue] = useState<Record<number, string>>({});

  const [state, action, isPending] = useActionState(
    createShiftGroup,
    initialState
  );

  return (
    <div>
      <ScrollArea className="mt-4 h-4/5">
        <div className="grid gap-2">
          <form className="space-y-2" action={action}>
            <div className="grid gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="w-60">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={state?.inputs?.name}
                  placeholder="Enter Name"
                  className="flex-grow"
                />
              </div>
              {state?.errors?.name && (
                <p className="text-sm text-red-600">{state?.errors?.name}</p>
              )}

              <div className="flex flex-col gap-2">
                <Label htmlFor="description" className="w-60">
                  Description
                </Label>
                <Input
                  id="description"
                  type="text"
                  name="description"
                  defaultValue={state?.inputs?.description}
                  placeholder="Enter Dedcription"
                  className="flex-grow"
                />
              </div>
              {state?.errors?.description && (
                <p className="text-sm text-red-600">
                  {state?.errors?.description}
                </p>
              )}

              <div className="flex flex-col gap-2">
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
                        <span>Pick a date</span>
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

              <div className="flex items-center gap-2">
                <Label htmlFor="cycleLength" className="w-60">
                  Cycle Length
                </Label>
                <Input
                  id="cycleLength"
                  name="cycleLength"
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  className="flex-grow"
                />
              </div>
              {state?.errors?.cycleLength && (
                <p className="text-sm text-red-600">
                  {state?.errors?.cycleLength}
                </p>
              )}

              <Button
                type="button"
                onClick={() => setDisplayShift(!displayShift)}
              >
                Display Shift
              </Button>
            </div>
            <div>
              {displayShift &&
                Array.from({ length: cycleLength }).map((_, index) => (
                  <div key={index} className="mt-2">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor={`day-${index}`}
                        className="pr-2 grid w-60"
                      >
                        Shift for day {index + 1}
                      </Label>
                      <Popover
                        open={open[index]}
                        onOpenChange={(isOpen) =>
                          setOpen((prev) => ({
                            ...prev,
                            [index]: isOpen,
                          }))
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open[index]}
                            className="w-full"
                          >
                            {value[index]
                              ? shifts.find(
                                  (shift) => shift.name === value[index]
                                )?.name
                              : "Select shift..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search shift..." />
                            <CommandList>
                              <CommandEmpty>No shift found.</CommandEmpty>
                              <CommandGroup>
                                {shifts.map((shift) => (
                                  <CommandItem
                                    key={shift.id}
                                    value={shift.name}
                                    onSelect={(currentValue) => {
                                      setValue((prev) => ({
                                        ...prev,
                                        [index]:
                                          currentValue === value[index]
                                            ? ""
                                            : currentValue,
                                      }));
                                      setOpen((prev) => ({
                                        ...prev,
                                        [index]: false,
                                      }));
                                      const hiddenInput =
                                        document.getElementById(
                                          `hiddenDay${index}`
                                        ) as HTMLInputElement;
                                      if (hiddenInput)
                                        hiddenInput.value = currentValue;
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value[index] === shift.id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {shift.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <input
                        type="hidden"
                        id={`hiddenDay${index}`}
                        name={`day-${index + 1}`}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-end ">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save />
                )}
                Save
              </Button>
            </div>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}
