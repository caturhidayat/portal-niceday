'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Shift } from "../shift/table/columns";
import { get } from "@/lib/fetch-wrapper";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";


export type ShiftGroup = {
    id: string;
    name: string;
    startDate: string;
    description: string;
    cycleLength: number;
    createdAt: string;
    updatedAt: string;
};


export default function FormCreateShiftGroup() {

    const [date, setDate] = useState<Date>();
    const [displayShift, setDisplayShift] = useState(false);
    const [cycleLength, setCycleLength] = useState(0);
    const [open, setOpen] = useState<Record<number, boolean>>({})
    const [value, setValue] = useState<Record<number, string>>({})

    const shifts = [
        {
            id: "1",
            name: "Shift 1",
            startTime: "08:00",
            endTime: "16:00",
            createdAt: "2021-09-21T06:59:59.000Z",
            updatedAt: "2021-09-21T06:59:59.000Z",
        },
        {
            id: "2",
            name: "Shift 2",
            startTime: "16:00",
            endTime: "00:00",
            createdAt: "2021-09-21T06:59:59.000Z",
            updatedAt: "2021-09-21T06:59:59.000Z",
        },
        {
            id: "3",
            name: "Shift 3",
            startTime: "00:00",
            endTime: "08:00",
            createdAt: "2021-09-21T06:59:59.000Z",
            updatedAt: "2021-09-21T06:59:59.000Z",
        },
    {
        id: "4",
        name: "Shift 4",
        startTime: "09:00",
        endTime: "17:00",
        createdAt: "2023-06-15T10:30:00.000Z",
        updatedAt: "2023-06-15T10:30:00.000Z",
    },
    {
        id: "5",
        name: "Shift 5",
        startTime: "14:00",
        endTime: "22:00",
        createdAt: "2023-06-15T11:00:00.000Z",
        updatedAt: "2023-06-15T11:00:00.000Z",
    },
    {
        id: "6",
        name: "Night Shift",
        startTime: "22:00",
        endTime: "06:00",
        createdAt: "2023-06-15T11:30:00.000Z",
        updatedAt: "2023-06-15T11:30:00.000Z",
    }
    ];

    return (
        <div className="space-y-4">
            <ScrollArea className="h-2/3">

                <div className="grid gap-2">

                    <div className="grid gap-4">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="name" className="w-60">Name</Label>
                            <Input id="name" type="text" name="name" placeholder="Enter Name" className="flex-grow" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="startDate" className="w-60">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn(" text-left font-normal", "flex-grow")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "dd/MM/yy") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="cycleLength" className="w-60">Cycle Length</Label>
                            <Input id="cycleLength" type="number" value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} className="flex-grow" />
                        </div>
                        <Button onClick={() => setDisplayShift(!displayShift)}>Add Shift</Button>

                    </div>
                    <div>
                        {displayShift && Array.from({ length: cycleLength }).map((_, index) => (
                            <div key={index} className="mt-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor={`day-${index}`} className="w-60">Day {index + 1}</Label>
                                    <Popover open={open[index]} onOpenChange={(isOpen) => setOpen(prev => ({ ...prev, [index]: isOpen }))}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open[index]}
                                                className="w-[200px] justify-between"
                                            >
                                                {value[index]
                                                    ? shifts.find((shift) => shift.id === value[index])?.name
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
                                                                value={shift.id}
                                                                onSelect={(currentValue) => {
                                                                    setValue(prev => ({
                                                                        ...prev,
                                                                        [index]: currentValue === value[index] ? "" : currentValue
                                                                    }));
                                                                    setOpen(prev => ({ ...prev, [index]: false }));
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        value[index] === shift.id ? "opacity-100" : "opacity-0"
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
                            </div>
                        ))}

                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
