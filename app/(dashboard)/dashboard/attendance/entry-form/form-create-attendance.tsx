"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { getAllShift } from "../../setting/shift/actions";
import { Shift } from "../../setting/shift/table/columns";
import { getAllEmployee } from "./actions";

type Employee = {
    id: string;
    name: string;
};

export default function FormCreateAttendance() {
    const [attendanceDate, setAttendanceDate] = useState<Date>();
    const [openShift, setOpenShift] = useState(false);
    const [openEmployee, setOpenEmployee] = useState(false);
    const [valueShift, setValueShift] = useState("");
    const [valueEmployee, setValueEmployee] = useState("");
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);

    // Get Shifts from the server using useEffect and fetch
    useEffect(() => {
        const getShiftsData = async () => {
            const shifts = await getAllShift();
            const employees = await getAllEmployee();
            setShifts(shifts);
            setEmployees(employees);
        };
        getShiftsData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            userId: employees.find(employee => employee.name === formData.get("userId"))?.id,
            attendanceDate: attendanceDate?.getTime(),
            checkInTime: formData.get("startTime"),
            checkOutTime: formData.get("endTime"),
            inLatitude: formData.get("inLatitude"),
            inLongitude: formData.get("inLongitude"),
            outLatitude: formData.get("outLatitude"),
            outLongitude: formData.get("outLongitude"),
            shiftId: shifts.find(shift => shift.name === formData.get("shiftId"))?.id
        };
        console.log(data);
    };

    return (
        <div>
            <form className="w-1/3 m-auto space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 gap-4">
                        <Label>Employee</Label>
                        <Popover
                            open={openEmployee}
                            onOpenChange={(isOpen) => setOpenEmployee(isOpen)}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    aria-expanded={openEmployee}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !valueEmployee && "text-muted-foreground"
                                    )}
                                >
                                    {valueEmployee
                                        ? employees.find(
                                              (employee) =>
                                                  employee.name ===
                                                  valueEmployee
                                          )?.name
                                        : "Select Employee..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Command>
                                    <CommandInput placeholder="Search employee..." />
                                    <CommandList>
                                        <CommandEmpty>
                                            No employee found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {employees.map((employee) => (
                                                <CommandItem
                                                    key={employee.id}
                                                    value={employee.name}
                                                    onSelect={(
                                                        currentValue
                                                    ) => {
                                                        setValueEmployee(
                                                            currentValue ===
                                                                valueEmployee
                                                                ? ""
                                                                : currentValue
                                                        );
                                                        setOpenEmployee(false);
                                                        const hiddenInput =
                                                            document.getElementById(
                                                                `hiddenDay0`
                                                            ) as HTMLInputElement;
                                                        if (hiddenInput)
                                                            hiddenInput.value =
                                                                currentValue;
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            valueEmployee ===
                                                                employee.name
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {employee.name} (ID: {employee.id})
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label>Attendance Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !attendanceDate &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {attendanceDate ? (
                                        format(attendanceDate, "PPP")
                                    ) : (
                                        <span>Select Date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={attendanceDate}
                                    onSelect={setAttendanceDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label>Check In Time</Label>
                        <Input name="startTime" type="time" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label>Check Out Time</Label>
                        <Input name="endTime" type="time" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label>In Latitude</Label>
                        <Input type="number" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label>In Longitude</Label>
                        <Input type="number" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label>Out Latitude</Label>
                        <Input type="number" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Label>Out Longitude</Label>
                        <Input type="number" />
                    </div>
                    <Popover
                        open={openShift}
                        onOpenChange={(isOpen) => setOpenShift(isOpen)}
                    >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openShift}
                                className="justify-between"
                            >
                                {valueShift
                                    ? shifts.find(
                                          (shift) => shift.name === valueShift
                                      )?.name
                                    : "Select shift..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
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
                                                    setValueShift(
                                                        currentValue ===
                                                            valueShift
                                                            ? ""
                                                            : currentValue
                                                    );
                                                    setOpenShift(false);
                                                    const hiddenInput =
                                                        document.getElementById(
                                                            `hiddenDay0`
                                                        ) as HTMLInputElement;
                                                    if (hiddenInput)
                                                        hiddenInput.value =
                                                            currentValue;
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        valueShift ===
                                                            shift.name
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
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}

//   user                 User
//   attendanceDate       BigInt
//   checkInTime          BigInt?
//   checkOutTime         BigInt?
//   checkInPhotoUrl      String?
//   checkOutPhotoUrl     String?
//   inLatitude           Float?
//   inLongitude          Float?
//   outLatitude          Float?
//   outLongitude         Float?
//   isLate               Boolean?

//   shift                Shift?
