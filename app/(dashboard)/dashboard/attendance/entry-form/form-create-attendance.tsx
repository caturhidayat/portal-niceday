"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Cookies from "js-cookie";

import { getAllShift } from "../../setting/shift/actions";
import { Shift } from "../../setting/shift/table/columns";
import { getAllEmployee } from "./actions";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NEXT_PUBLIC_API_URL, SESSION_COOKIE } from "@/lib/constant";
import { toast } from "sonner";

type Employee = {
    id: string;
    name: string;
    username: string;
};

const AttendanceSchemas = z.object({
    userId: z.string({
        required_error: "Please select an employee",
    }),
    attendanceDate: z.string({
        required_error: "Please select an attendance date",
    }),
    startTime: z.string({
        required_error: "Please Input check in time",
    }),
    endTime: z.string({
        required_error: "Please Input check out time",
    }),
    shiftId: z.string({
        required_error: "Please select a shift",
    }),
});

export default function FormCreateAttendance() {
    const [attendanceDate, setAttendanceDate] = useState<Date>();
    const [openShift, setOpenShift] = useState(false);
    const [openEmployee, setOpenEmployee] = useState(false);
    const [valueShift, setValueShift] = useState("");
    const [valueEmployee, setValueEmployee] = useState("");
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const token = Cookies.get(SESSION_COOKIE);


    console.log("token : ", token);
    // React Hook Form
    const form = useForm<z.infer<typeof AttendanceSchemas>>({
        resolver: zodResolver(AttendanceSchemas),
    });

    // Submit function for React Hook Form
    const onSubmit = async (data: z.infer<typeof AttendanceSchemas>) => {
        console.log(data);
        console.log(NEXT_PUBLIC_API_URL);

        console.log("token", token);
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/attendances/entry`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            toast.success("Attendance has been created", {
                description: "Attendance has been created successfully",
                duration: 5000,
            });
        } else {
            toast.error("Failed to create attendance", {
                description:
                    "Failed to create attendance, please try again " +
                    res.statusText,
                duration: 5000,
            });
        }
    };

    // Get Shifts from the server using useEffect and fetch
    useEffect(() => {
        const getShiftsData = async () => {
            const shifts = await getAllShift();
            const employees = await getAllEmployee();

            console.log("shift", shifts);
            console.log("employee", employees);
            setShifts(shifts);
            setEmployees(employees);
        };
        getShiftsData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            userId: employees.find(
                (employee) => employee.name === formData.get("userId")
            )?.id,
            attendanceDate: formData.get("attendanceDate"),
            checkInTime: formData.get("startTime"),
            checkOutTime: formData.get("endTime"),
            inLatitude: formData.get("inLatitude"),
            inLongitude: formData.get("inLongitude"),
            outLatitude: formData.get("outLatitude"),
            outLongitude: formData.get("outLongitude"),
            shiftId: shifts.find(
                (shift) => shift.name === formData.get("shiftId")
            )?.id,
        };
        console.log(data);
    };

    return (
        <div>
            <Form {...form}>
                <form
                    className="w-2/3 m-auto space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="grid">
                                        Employee
                                    </FormLabel>
                                    <Popover
                                        open={openEmployee}
                                        onOpenChange={(isOpen) =>
                                            setOpenEmployee(isOpen)
                                        }
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openEmployee}
                                                className={cn(
                                                    "justify-start text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? employees.find(
                                                          (employee) =>
                                                              employee.id ===
                                                              field.value
                                                      )?.username
                                                    : "Select employee..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Search employee..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No employee found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {employees.map(
                                                            (employee) => (
                                                                <CommandItem
                                                                    key={
                                                                        employee.id
                                                                    }
                                                                    value={
                                                                        employee.username
                                                                    }
                                                                    onSelect={(
                                                                        currentValue
                                                                    ) => {
                                                                        setValueEmployee(
                                                                            currentValue ===
                                                                                field.value
                                                                                ? ""
                                                                                : currentValue
                                                                        );
                                                                        form.setValue(
                                                                            "userId",
                                                                            employee.id
                                                                        );
                                                                        setOpenEmployee(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value ===
                                                                                employee.username
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {
                                                                        employee.name
                                                                    }{" "}
                                                                    (NIK:{" "}
                                                                    {
                                                                        employee.username
                                                                    }
                                                                    )
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="grid">
                                        Employee
                                    </FormLabel>
                                    <Popover
                                        open={openEmployee}
                                        onOpenChange={(isOpen) =>
                                            setOpenEmployee(isOpen)
                                        }
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    aria-expanded={openEmployee}
                                                    className={cn(
                                                        "justify-start text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? employees.find(
                                                              (employee) =>
                                                                  employee.id ===
                                                                  field.value
                                                          )?.name
                                                        : "Select Employee..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Command>
                                                <CommandInput placeholder="Search employee..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No employee found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {employees.map(
                                                            (employee) => (
                                                                <CommandItem
                                                                    key={
                                                                        employee.id
                                                                    }
                                                                    value={
                                                                        employee.name
                                                                    }
                                                                    onSelect={(
                                                                        currentValue
                                                                    ) => {
                                                                        setValueEmployee(
                                                                            currentValue ===
                                                                                field.value
                                                                                ? ""
                                                                                : currentValue
                                                                        );
                                                                        form.setValue(
                                                                            "userId",
                                                                            employee.id
                                                                        );
                                                                        setOpenEmployee(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value ===
                                                                                field.name
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {
                                                                        employee.name
                                                                    }{" "}
                                                                    (NIK:{" "}
                                                                    {
                                                                        employee.username
                                                                    }
                                                                    )
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}

                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="attendanceDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="grid">
                                        Attendance Date
                                    </FormLabel>
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
                                                    format(
                                                        attendanceDate,
                                                        "PPP"
                                                    )
                                                ) : (
                                                    <span>Select Date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={attendanceDate}
                                                onSelect={(date) => {
                                                    setAttendanceDate(date);
                                                    if (date) {
                                                        form.setValue(
                                                            "attendanceDate",
                                                            date
                                                                .getTime()
                                                                .toString()
                                                        );
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check In Time</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="time" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Check Out Time</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="time" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="shiftId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="grid">
                                        Shift
                                    </FormLabel>
                                    <Popover
                                        open={openShift}
                                        onOpenChange={(isOpen) =>
                                            setOpenShift(isOpen)
                                        }
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openShift}
                                                className={cn(
                                                    "justify-start text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? shifts.find(
                                                          (shift) =>
                                                              shift.id ===
                                                              field.value
                                                      )?.name
                                                    : "Select shift..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Search shift..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No shift found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {shifts.map((shift) => (
                                                            <CommandItem
                                                                key={shift.id}
                                                                value={
                                                                    shift.name
                                                                }
                                                                onSelect={(
                                                                    currentValue
                                                                ) => {
                                                                    setValueShift(
                                                                        currentValue ===
                                                                            field.value
                                                                            ? ""
                                                                            : currentValue
                                                                    );
                                                                    form.setValue(
                                                                        "shiftId",
                                                                        shift.id
                                                                    );
                                                                    setOpenShift(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value ===
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
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
