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
import { format, setHours, setMinutes } from "date-fns";
import { useActionState, useState } from "react";
import { Shift, User } from "../today/columns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon } from "lucide-react";
import { createAttendance } from "./actions";
import { cn } from "@/lib/utils";

// Initial state
const initialState = {
  success: false,
  message: "",
  inputs: {
    userId: "",
    attendanceDate: "",
    startTime: "",
    endTime: "",
  },
};

export default function FormEntryAttendance({
  setIsOpen,
  employees,
  shifts,
}: {
  setIsOpen: (open: boolean) => void;
  employees: User[];
  shifts: Shift[];
}) {
  const [attendanceDate, setAttendanceDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>();
  const [openEmployee, setOpenEmployee] = useState(false);

  const [state, action, isPending] = useActionState(
    createAttendance,
    initialState
  );

  return (
    <div className="grid">
      <form className="grid space-y-4" action={action}>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="userId">Select Employee</Label>
          <Input type="hidden" name="userId" value={selectedEmployee || ""} />
          <Popover open={openEmployee} onOpenChange={setOpenEmployee}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedEmployee
                  ? `${
                      employees.find(
                        (employee) => employee.id === selectedEmployee
                      )?.name
                    } - ${
                      employees.find(
                        (employee) => employee.id === selectedEmployee
                      )?.username
                    }`
                  : "Select Employee"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px]">
              <Command>
                <CommandInput placeholder="Search employee..." />
                <CommandList>
                  <CommandEmpty>No employee found.</CommandEmpty>
                  <CommandGroup>
                    {employees.map((employee) => (
                      <CommandItem
                        key={employee.id}
                        value={employee.name}
                        onSelect={(currentValue) => {
                          const selectedEmployee = employees.find(
                            (employee) => employee.name === currentValue
                          );
                          setSelectedEmployee(selectedEmployee?.id);
                          setOpenEmployee(false);
                        }}
                      >
                        {employee.name} - {employee.username}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {state.errors?.userId && (
          <p className="text-red-500">{state.errors.userId}</p>
        )}

        <div className="flex flex-col space-y-2">
          <Label htmlFor="attendanceDate">Attendance Date</Label>
          <Input
            type="hidden"
            name="attendanceDate"
            value={attendanceDate?.getTime() || ""}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(" text-left font-normal", "flex-grow")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {attendanceDate ? (
                  format(attendanceDate, "eeee, dd MMM-yyyy")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={attendanceDate}
                onSelect={(newDate) => {
                  setAttendanceDate(newDate);
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
        </div>
        {state.errors?.attendanceDate && (
          <p className="text-red-500">{state.errors.attendanceDate}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="time"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            {state.errors?.startTime && (
              <p className="text-red-500">{state.errors.startTime}</p>
            )}
          </div>
          <div className="col-span-1 space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="time"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            {state.errors?.endTime && (
              <p className="text-red-500">{state.errors.endTime}</p>
            )}
          </div>
        </div>

        {!state.success && (
          <p className="text-red-500">{state.message}</p>
        )}
        {state.success && (
          <p className="text-green-500">{state.message}</p>
        )}

        <Button
          type="submit"
          disabled={
            isPending ||
            !attendanceDate ||
            !startTime ||
            !endTime ||
            !selectedEmployee
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
