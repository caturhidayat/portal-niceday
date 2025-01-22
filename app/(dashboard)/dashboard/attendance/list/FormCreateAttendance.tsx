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
import { format } from "date-fns";
import { useState } from "react";
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

export default function FormEntryAttendance({
  setIsOpen,
  employees,
  shifts,
}: {
  setIsOpen: (open: boolean) => void;
  employees: User[];
  shifts: Shift[];
}) {
  const [date, setDate] = useState<Date>();
  const [selectedEmployee, setSelectedEmployee] = useState<User>();
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openShift, setOpenShift] = useState(false);

  return (
    <div className="grid">
      <form className="grid space-y-4">
        <div className="flex flex-col space-y-2">
          <Label>Select Employee</Label>
          <Popover open={openEmployee} onOpenChange={setOpenEmployee}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedEmployee
                  ? `${
                      employees.find(
                        (employee) => employee.id === selectedEmployee.id
                      )?.username
                    } - ${selectedEmployee.name}`
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
                          setSelectedEmployee(selectedEmployee);
                          setOpenEmployee(false);
                        }}
                      >
                        {employee.username} - {employee.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Attendance Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  <span>{format(date, "eeee, dd MMM-yyyy")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                selected={date}
                mode="single"
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Label>Check In</Label>
            <Input type="time" />
          </div>
          <div className="col-span-1">
            <Label>Check Out</Label>
            <Input type="time" />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Select Shift</Label>
          <Popover open={openShift} onOpenChange={setOpenShift}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {selectedShift
                  ? `${
                      shifts.find((shift) => shift.name === selectedShift)?.name
                    }`
                  : "Select Shift"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px]">
              <Command>
                <CommandInput placeholder="Search shift..." />
                <CommandList>
                  <CommandEmpty>No shift found.</CommandEmpty>
                  <CommandGroup className="flex flex-col">
                    {shifts.map((shift) => (
                      <CommandItem
                        key={shift.id}
                        value={shift.name}
                        onSelect={(currentValue) => {
                          const selectedShift = shifts.find(
                            (shift) => shift.name === currentValue
                          );
                          setSelectedShift(selectedShift?.name || "");
                          setOpenShift(false);
                        }}
                      >
                        <div>{shift.name}</div> -{" "}
                        <div>
                          {format(+shift.startTime, "HH:mm")} -{" "}
                          {format(+shift.endTime, "HH:mm")}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
