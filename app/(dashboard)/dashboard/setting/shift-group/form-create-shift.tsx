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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
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
import createShiftGroup from "./actions";
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

export default function FormCreateShiftGroup() {
    const [date, setDate] = useState<Date>();
    const [displayShift, setDisplayShift] = useState(false);
    const [cycleLength, setCycleLength] = useState(0);
    const [open, setOpen] = useState<Record<number, boolean>>({});
    const [value, setValue] = useState<Record<number, string>>({});
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getShiftsData = async () => {
            const shifts = await getAllShift();
            setShifts(shifts);
        };
        getShiftsData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error state
        const formData = new FormData(e.target as HTMLFormElement);
        const formObject = Object.fromEntries(formData);

        const payload = {
            name: formObject.name as string,
            description: formObject.description as string,
            startDate: formObject.startDate as string,
            cycleLength: Number(formObject.cycleLength),
            shiftId: Array.from({ length: cycleLength }, (_, index) => {
                const dayKey = `day-${index + 1}`;
                return (
                    shifts.find((shift) => shift.name === formObject[dayKey])
                        ?.id || ""
                );
            }),
        };

        try {
            await createShiftGroup(payload);
            // Handle success - you could redirect or show success message
        } catch (err) {
            if (err instanceof Error) {
                console.log("error bro :", err.message);
                setError(err.message);
            } else {
                setError("An error occurred while creating shift group");
            }
        }
    };

    return (
        <div className="space-y-4">
            <ScrollArea className="mt-4 h-4/5">
                <div className="grid gap-2">
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="name" className="w-60">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Name"
                                    className="flex-grow"
                                />
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                    {error}
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Label htmlFor="description" className="w-60">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    type="text"
                                    name="description"
                                    placeholder="Enter Dedcription"
                                    className="flex-grow"
                                />
                            </div>
                            <div className="flex items-center gap-2">
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
                                                format(date, "dd/MM/yy")
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
                                                    const epochMillis =
                                                        newDate.getTime();
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

                            <div className="flex items-center gap-2">
                                <Label htmlFor="cycleLength" className="w-60">
                                    Cycle Length
                                </Label>
                                <Input
                                    id="cycleLength"
                                    name="cycleLength"
                                    type="number"
                                    value={cycleLength}
                                    onChange={(e) =>
                                        setCycleLength(Number(e.target.value))
                                    }
                                    className="flex-grow"
                                />
                            </div>
                            <Button
                                type="button"
                                onClick={() => setDisplayShift(!displayShift)}
                            >
                                Add Shift
                            </Button>
                        </div>
                        <div>
                            {displayShift &&
                                Array.from({ length: cycleLength }).map(
                                    (_, index) => (
                                        <div key={index} className="mt-2">
                                            <div className="flex items-center gap-2">
                                                <Label
                                                    htmlFor={`day-${index}`}
                                                    className="w-60"
                                                >
                                                    Day {index + 1}
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
                                                            aria-expanded={
                                                                open[index]
                                                            }
                                                            className="w-[200px] justify-between"
                                                        >
                                                            {value[index]
                                                                ? shifts.find(
                                                                      (shift) =>
                                                                          shift.name ===
                                                                          value[
                                                                              index
                                                                          ]
                                                                  )?.name
                                                                : "Select shift..."}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search shift..." />
                                                            <CommandList>
                                                                <CommandEmpty>
                                                                    No shift
                                                                    found.
                                                                </CommandEmpty>
                                                                <CommandGroup>
                                                                    {shifts.map(
                                                                        (
                                                                            shift
                                                                        ) => (
                                                                            <CommandItem
                                                                                key={
                                                                                    shift.id
                                                                                }
                                                                                value={
                                                                                    shift.name
                                                                                }
                                                                                onSelect={(
                                                                                    currentValue
                                                                                ) => {
                                                                                    setValue(
                                                                                        (
                                                                                            prev
                                                                                        ) => ({
                                                                                            ...prev,
                                                                                            [index]:
                                                                                                currentValue ===
                                                                                                value[
                                                                                                    index
                                                                                                ]
                                                                                                    ? ""
                                                                                                    : currentValue,
                                                                                        })
                                                                                    );
                                                                                    setOpen(
                                                                                        (
                                                                                            prev
                                                                                        ) => ({
                                                                                            ...prev,
                                                                                            [index]:
                                                                                                false,
                                                                                        })
                                                                                    );
                                                                                    const hiddenInput =
                                                                                        document.getElementById(
                                                                                            `hiddenDay${index}`
                                                                                        ) as HTMLInputElement;
                                                                                    if (
                                                                                        hiddenInput
                                                                                    )
                                                                                        hiddenInput.value =
                                                                                            currentValue;
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        value[
                                                                                            index
                                                                                        ] ===
                                                                                            shift.id
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    shift.name
                                                                                }
                                                                            </CommandItem>
                                                                        )
                                                                    )}
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
                                    )
                                )}
                        </div>
                        <div className="flex justify-end ">
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </div>
            </ScrollArea>
        </div>
    );
}
